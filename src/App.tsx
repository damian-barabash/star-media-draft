import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Btn, T } from './components/ui'
import { UI } from './content/common'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Talents = lazy(() => import('./pages/Talents'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Influencer = lazy(() => import('./pages/Influencer'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

function NotFound() {
  return (
    <section className="chapter chapter-dark nf">
      <div>
        <div className="mono" style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>404</div>
        <h1 className="large" style={{ marginBottom: '2rem' }}>
          <T text={UI.notFound} />
        </h1>
        <Btn to="/">
          <T text={UI.backHome} />
        </Btn>
      </div>
    </section>
  )
}

const Fallback = () => <div className="chapter chapter-dark" aria-busy="true" />

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/talenty" element={<Talents />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/uslugi/:slug" element={<ServiceDetail />} />
          <Route path="/influencer-marketing" element={<Influencer />} />
          <Route path="/projekty" element={<Projects />} />
          <Route path="/kontakt" element={<Contact />} />
          {/* legacy static URLs */}
          <Route path="/index.html" element={<Home />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/talents.html" element={<Talents />} />
          <Route path="/services.html" element={<Services />} />
          <Route path="/influencer-marketing.html" element={<Influencer />} />
          <Route path="/cases.html" element={<Projects />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
