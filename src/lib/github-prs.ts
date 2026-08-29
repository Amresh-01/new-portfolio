export type PR = {
  title: string;
  repo: string;
  number: number;
  url: string;
  description?: string;
  date: string;
};

export async function fetchGithubPRs(username: string, state: "open" | "merged"): Promise<PR[]> {
  const q = `is:pr author:${username} is:public is:${state}`;
  const res = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=created&order=desc&per_page=30`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch GitHub PRs", res.status);
    return [];
  }

  const data = await res.json();
  
  const prs: PR[] = (data.items || []).map((item: any) => {
    const dateObj = new Date(item.created_at);
    const date = dateObj.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    const repo = item.repository_url.replace("https://api.github.com/repos/", "");

    return {
      title: item.title,
      repo,
      number: item.number,
      url: item.html_url,
      date,
    };
  });

  return prs;
}
