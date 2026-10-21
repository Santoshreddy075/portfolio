import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { type RepoItem, useGithubRepos } from '../hooks/useGithubRepos'

const fallback: RepoItem[] = [{ name: 'Sample project', description: 'Fallback project', url: '#' }]

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useGithubRepos', () => {
  it('returns the fallback without fetching when no username is set', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGithubRepos('', fallback))

    expect(result.current).toEqual({ repos: fallback, live: false })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('keeps the fallback when the request fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'))
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGithubRepos('someone', fallback))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    expect(result.current).toEqual({ repos: fallback, live: false })
  })

  it('keeps the fallback when GitHub answers with an error status', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) })
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGithubRepos('someone', fallback))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    expect(result.current).toEqual({ repos: fallback, live: false })
  })

  it('maps live repos, skipping forks and honouring the limit', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { name: 'forked', fork: true, description: 'x', html_url: 'u0', language: 'Go', stargazers_count: 1 },
        { name: 'alpha', fork: false, description: 'First', html_url: 'u1', language: 'TypeScript', stargazers_count: 5 },
        { name: 'beta', fork: false, description: null, html_url: 'u2', language: null, stargazers_count: 0 },
        { name: 'gamma', fork: false, description: 'Third', html_url: 'u3', language: 'Rust', stargazers_count: 9 },
      ],
    })
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGithubRepos('someone', fallback, 2))

    await waitFor(() => expect(result.current.live).toBe(true))
    expect(fetchMock.mock.calls[0][0]).toContain('/users/someone/repos')
    expect(result.current.repos).toEqual([
      { name: 'alpha', description: 'First', url: 'u1', language: 'TypeScript', stars: 5 },
      { name: 'beta', description: '', url: 'u2', language: undefined, stars: 0 },
    ])
  })
})
