import { Bento } from '../components/Bento'
import { Contact } from '../components/Contact'
import { CredentialsPreview } from '../components/CredentialsPreview'
import { Experience } from '../components/Experience'
import { FeaturedProject } from '../components/FeaturedProject'
import { ForwardPass } from '../components/ForwardPass'
import { Hero } from '../components/Hero'
import { Statement } from '../components/Statement'
import { WorkGallery } from '../components/WorkGallery'
import { WritingPreview } from '../components/WritingPreview'
import { profile } from '../content/profile'

export function HomePage() {
  return (
    <>
      <Hero />
      <Statement eyebrow="How I work" text={profile.statement} />
      <ForwardPass />
      <WorkGallery />
      <FeaturedProject />
      <Bento />
      <CredentialsPreview />
      <Experience />
      <WritingPreview />
      <Contact />
    </>
  )
}
