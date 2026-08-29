import { Mermaid } from "@/components/mermaid";

const accountModelDiagram = `
graph TD
  Wallet["👛 Wallet (Keypair)"]
  ATA["Associated Token Account"]
  Mint["Token Mint"]
  Program["Your Program"]
  PDA["PDA (Program-Derived Address)"]
  State["App State Data"]

  Wallet -->|"owns"| ATA
  ATA -->|"holds balance of"| Mint
  Program -->|"derives"| PDA
  PDA -->|"stores"| State
  Program -->|"reads / writes"| State
  Wallet -->|"signs txn"| Program
`;

const deployDiagram = `
sequenceDiagram
  participant Dev as Developer
  participant CLI as Solana CLI
  participant RPC as RPC Node
  participant Chain as Blockchain

  Dev->>CLI: anchor build
  CLI-->>Dev: target/deploy/program.so
  Dev->>CLI: anchor deploy
  CLI->>RPC: send transaction (program bytes)
  RPC->>Chain: validate + store bytecode
  Chain-->>RPC: program ID confirmed
  RPC-->>CLI: deployment success
  CLI-->>Dev: Program ID: ABC...XYZ
`;

export default function BuildingOnSolana() {
  return (
    <>
      <h2>The thing that trips everyone up first</h2>
      <p>
        When I started building on Solana, I came from an Ethereum background. My mental model was:
        deploy a contract, it has state, users call functions on it. Clean. Simple.
      </p>
      <p>
        Solana is completely different, and if you don&apos;t internalize this early, you&apos;ll spend
        hours confused. <strong>Programs on Solana are stateless.</strong> They don&apos;t own data. They
        own <em>nothing</em>. All data lives in separate accounts, and programs are just code that
        operates on whatever accounts you pass in.
      </p>
      <p>
        That sounds minor. It&apos;s not. It changes everything about how you architect applications.
      </p>

      <h2>The Account Model</h2>
      <p>
        Every piece of data on Solana — a token balance, your app&apos;s state, a user&apos;s profile — lives
        in an <strong>account</strong>. An account is a blob of bytes with an owner (a program) and a
        lamport balance (to pay rent). Your wallet is an account. A token balance is an account.
        Your program&apos;s stored data is an account.
      </p>
      <p>
        Here&apos;s how the pieces fit together for a typical app:
      </p>

      <Mermaid chart={accountModelDiagram} />

      <p>
        The key insight: when a user calls your program, you pass in all the accounts it needs to
        read or write. The runtime validates that the program is allowed to touch those accounts.
        This is why Solana transactions can be parallelized — the runtime knows upfront which
        accounts each transaction touches, and non-overlapping transactions run simultaneously.
      </p>

      <h2>PDAs — the concept that broke my brain, then fixed it</h2>
      <p>
        Program-Derived Addresses (PDAs) are deterministic account addresses derived from a program
        ID and some seeds. They have no private key — no one can sign for them except the program
        that derived them.
      </p>
      <p>
        Here&apos;s why they&apos;re useful: imagine you&apos;re building a staking contract. Every user has their
        own staking account that only your program should modify. You could let users create any
        account and pass it in — but then how do you enforce it&apos;s their account? With a PDA, you
        derive the address from <code>["stake", user_pubkey]</code> + your program ID. It&apos;s
        deterministic, unique per user, and only your program can write to it.
      </p>
      <pre>{`// Anchor syntax
#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(
        init_if_needed,
        seeds = [b"stake", user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + StakeAccount::INIT_SPACE,
    )]
    pub stake_account: Account<'info, StakeAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}`}</pre>
      <p>
        The first time I read this, I thought it was boilerplate. It&apos;s not. Every field is a
        security constraint the runtime enforces. The <code>seeds</code> make the account derivable
        and unique. The <code>mut</code> constraint ensures you&apos;re declaring intent to write. If you
        pass the wrong account, the transaction fails. This is the runtime doing your input
        validation for free.
      </p>

      <h2>Why Rust is actually fine</h2>
      <p>
        I was dreading Rust. I&apos;d read enough about the borrow checker to be scared. Turns out,
        Anchor (the most popular Solana framework) handles the gnarly parts. The Rust you write for
        a Solana program is pretty approachable — you&apos;re mostly writing struct definitions and
        business logic.
      </p>
      <p>
        The borrow checker <em>does</em> catch real bugs that you&apos;d miss in JavaScript. I had a
        case where I tried to use a value after passing it into a function, and Rust simply refused
        to compile. In a JS program, that would have been a subtle runtime bug. Rust made it a
        compiler error. Once you stop fighting it and start listening to it, the compiler becomes
        your best reviewer.
      </p>
      <pre>{`// Rust prevents you from making this mistake
let data = account.data.borrow_mut();
process(&data);
// Can't use data here anymore — you moved it
// JS would let you try and fail at runtime`}</pre>

      <h2>The footguns nobody warned me about</h2>
      <p>
        <strong>Rent.</strong> Every account on Solana needs to maintain a minimum lamport balance
        or it gets garbage collected. When you <code>init</code> an account, you pay this rent
        upfront. When you close an account, you get it back. Forgetting to handle this properly
        means accounts silently disappearing. Always use <code>init_if_needed</code> carefully and
        close accounts when you&apos;re done with them.
      </p>
      <p>
        <strong>Account size is fixed at creation.</strong> Unlike Ethereum storage that grows
        dynamically, Solana accounts have a fixed size you declare when you create them. If you
        need more space later, you have to migrate. Plan your data structures before deploying to
        mainnet — adding a field means a migration, not just updating your struct.
      </p>
      <p>
        <strong>CPI (Cross-Program Invocations) can fail silently.</strong> When your program calls
        another program, errors don&apos;t automatically bubble up. You need to explicitly handle the
        return value. Unchecked CPIs are a real footgun in production programs.
      </p>

      <h2>The deploy workflow</h2>
      <p>
        Anchor makes this pretty smooth once you have the toolchain set up, but the first time is
        a maze of CLI tools. Here&apos;s the actual flow:
      </p>

      <Mermaid chart={deployDiagram} />

      <p>
        A few things that tripped me up during deploy:
      </p>
      <ul>
        <li>
          <code>anchor build</code> compiles to a <code>.so</code> file. This is the program
          bytecode. It&apos;s larger than you expect — expect 100-500KB for anything real.
        </li>
        <li>
          You need to fund the deployer keypair with enough SOL to cover the program account rent.
          On devnet, <code>solana airdrop 2</code> handles this. On mainnet, budget for it.
        </li>
        <li>
          Program upgrades work by sending new bytecode to the same program ID. But if you add new
          account types, existing clients using the old IDL will break. Versioning your IDL matters
          in production.
        </li>
      </ul>

      <h2>Things I&apos;d do differently</h2>
      <p>
        I&apos;d spend a day just reading Solana account examples before writing any code. The mental
        model shift is the bottleneck — not the Rust, not the tooling. Once you truly get that
        &quot;everything is accounts,&quot; the rest starts making sense fast.
      </p>
      <p>
        I&apos;d also start on devnet with a very simple program — like a counter — before trying to
        build anything real. The feedback loop is slow enough that fighting two problems at once
        (program logic + Solana concepts) makes progress painful.
      </p>
      <p>
        The Anchor docs and the <a href="https://solanacookbook.com" target="_blank" rel="noopener noreferrer">Solana Cookbook</a> are genuinely good. Use them.
      </p>
    </>
  );
}
