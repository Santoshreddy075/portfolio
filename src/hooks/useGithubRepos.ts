import { useEffect, useState } from 'react'

export type RepoItem = {
  name: string
  description: string
  url: string
  language?: string
  stars?: number
}

type GithubRepo = {
  name: string
  fork: boolean
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
}

type State = { repos: RepoItem[]; live: boolean }

/**
 * Most recently pushed public repos for `username`, straight from the GitHub API
 * (no token needed). Until they arrive — or if the username is empty, the request
 * fails, or GitHub rate-limits us — it returns `fallback`, so callers always have
 * something to show.
 */
export function useGithubRepos(username: string, fallback: RepoItem[], limit = 4): State {
  const [live, setLive] = useState<RepoItem[] | null>(null)

  useEffect(() => {
    if (!username) return
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? (res.json() as Promise<GithubRepo[]>) : Promise.reject(new Error(`${res.status}`))))
      .then((repos) => {
        const items = repos
          .filter((repo) => !repo.fork)
          .slice(0, limit)
          .map((repo) => ({
            name: repo.name,
            description: repo.description ?? '',
            url: repo.html_url,
            language: repo.language ?? undefined,
            stars: repo.stargazers_count,
          }))
        if (items.length > 0) setLive(items)
      })
      .catch(() => {
        // Keep showing the fallback.
      })

    return () => controller.abort()
  }, [username, limit])

  return live && username ? { repos: live, live: true } : { repos: fallback, live: false }
}
