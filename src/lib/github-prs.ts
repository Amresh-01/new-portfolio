export async function fetchPullRequestsForRepos(
  repos: string[],
  username: string
): Promise<{ title: string; link: string; description?: string }[]> {
  if (!repos.length || !username) return [];

  const githubToken = process.env.GRAPHQL_TOKEN || process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.warn('No GitHub token found for fetching PRs, falling back to unauthenticated (rate-limited) search.');
  }

  const repoQueries = repos.map(repo => `repo:${repo}`).join(' ');
  // Search for public or private merged PRs authored by the user in the specified repos
  const q = `is:pr is:merged author:${username} ${repoQueries}`;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    const res = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(
        q
      )}&sort=created&order=desc`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch PRs:', await res.text());
      return [];
    }

    const data = await res.json();

    return data.items.map((item: any) => ({
      title: `#${item.number} · ${item.title}`,
      link: item.html_url,
      description: item.body ? item.body.slice(0, 150) + (item.body.length > 150 ? '...' : '') : '',
    }));
  } catch (err) {
    console.error('Error fetching PRs:', err);
    return [];
  }
}
