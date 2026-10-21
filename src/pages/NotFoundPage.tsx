import { Link } from 'react-router'
import { PageHero } from '../components/PageHero'

export function NotFoundPage() {
  return (
    <PageHero eyebrow="404" title="Page not found." lead="That page doesn’t exist — but there’s plenty that does.">
      <Link className="btn btn--primary" to="/">
        Back to home
      </Link>
    </PageHero>
  )
}
