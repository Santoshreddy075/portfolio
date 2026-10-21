import type { Profile } from './types'

/**
 * Everything the site says lives here. Edit this file, push to GitHub, and the
 * Pages workflow rebuilds and redeploys the site.
 */
export const profile: Profile = {
  name: 'Santosh Maryada',
  initials: 'SM',
  role: 'Master of AI student',
  location: 'Melbourne, Australia',
  email: 'santoshreddy75@icloud.com',
  resumeUrl: '',
  githubUsername: 'Santoshreddy075',
  liveGithubRepos: false,

  hero: {
    eyebrow: 'Santosh Maryada — Master of AI, La Trobe University',
    title: 'Machine learning, from prototype to',
    accent: 'production.',
    subtitle:
      'I build machine learning and computer vision models in Python — and think about how they’re deployed, secured and scaled.',
  },

  statement:
    'I start with the simplest model, measure it honestly, then improve. I think about how a model will be deployed, secured and scaled — not just trained — and I check what AI tools tell me instead of trusting them blindly.',

  about: {
    title: 'Where cloud meets AI.',
    body: 'Master of Artificial Intelligence student at La Trobe University in Melbourne, building on a Bachelor’s in Computer Science. I build machine learning models in Python and take them from prototype to production.',
  },

  copy: {
    workLead: 'Four projects across computer vision, machine learning, blockchain and the web.',
    highlightsLead: 'A quick look at who I am, what I’ve done and what I’m up to right now.',
    experienceLead: 'Two degrees, one internship, and a habit of measuring before improving.',
    contactTitle: 'Let’s build something intelligent.',
    contactLead:
      'I’m looking for Associate or Graduate Machine Learning Engineer and AI Engineer roles in Melbourne. Let’s connect.',
  },

  projects: [
    {
      slug: 'supermarket-vision',
      title: 'Zero-shot product classifier',
      category: 'Computer vision',
      tagline: 'Classified supermarket product images with 96% accuracy using the LLaVA vision-language model — before training a single model.',
      year: '2026',
      stack: ['Python', 'LLaVA', 'Prompt engineering', 'Google Colab'],
      art: 'vision',
      palette: ['#4facfe', '#a78bfa', '#f472b6'],
      theme: 'dark',
      links: [{ label: 'Read the case study', href: '#case-study' }],
    },
    {
      slug: 'census-income',
      title: 'Census income classifier',
      category: 'Machine learning',
      tagline: 'A classification pipeline that predicts income levels from census data, evaluated well beyond a single accuracy number.',
      year: '2026',
      stack: ['Python', 'TensorFlow', 'Keras', 'scikit-learn'],
      art: 'metrics',
      palette: ['#34d399', '#22d3ee', '#a3e635'],
      theme: 'light',
      links: [],
    },
    {
      slug: 'blockchain-records',
      title: 'Blockchain academic records',
      category: 'Blockchain · Security',
      tagline: 'A three-layer blockchain model with Ethereum smart contracts that keeps student records tamper-proof and access-controlled.',
      year: '2025',
      stack: ['Ethereum', 'Smart contracts', 'HTML5', 'CSS'],
      art: 'chain',
      palette: ['#fb923c', '#f43f5e', '#facc15'],
      theme: 'dark',
      links: [],
    },
    {
      slug: 'music-recommender',
      title: 'Mood music recommender',
      category: 'Recommender systems',
      tagline: 'A streaming platform that recommends music by mood — Happy, Relaxed, Energetic — with an admin panel and personal listening history.',
      year: '2024',
      stack: ['HTML5', 'CSS', 'Recommender systems'],
      art: 'player',
      palette: ['#c084fc', '#818cf8', '#f472b6'],
      theme: 'light',
      links: [{ label: 'Source', href: 'https://github.com/Santoshreddy075/Music_recommend' }],
    },
  ],

  featured: {
    projectSlug: 'supermarket-vision',
    eyebrow: 'Case study · Zero-shot product classifier',
    title: 'Strong results, zero training.',
    steps: [
      {
        eyebrow: '01 — The question',
        title: 'What can a pretrained model already do?',
        body: 'Before building a custom classifier for supermarket product images, I measured what a pretrained vision-language model could manage on its own — the baseline any custom model would have to beat.',
        metric: { value: '0', label: 'models trained for the baseline' },
        art: 'vision',
      },
      {
        eyebrow: '02 — The approach',
        title: 'The prompt is part of the model.',
        body: 'Using LLaVA in Google Colab, the work was prompt engineering: describe the task clearly, limit the answer to the label set, and check every output. Wording and output format got the same testing as code.',
        metric: { value: 'LLaVA', label: 'vision-language model, run in Google Colab' },
        art: 'prompt',
      },
      {
        eyebrow: '03 — The result',
        title: '96%, and a clear next step.',
        body: 'The zero-shot model classified 96% of products correctly. The misclassified 4% is exactly where a custom deep learning model has to earn its place — so I built one next to compare the two approaches.',
        metric: { value: '96%', label: 'zero-shot accuracy' },
        art: 'metrics',
      },
    ],
  },

  stats: [
    { value: 7, label: 'certifications across ML, deep learning, cloud and front-end' },
    { value: 96, suffix: '%', label: 'zero-shot accuracy on supermarket product images' },
    { value: 4, label: 'end-to-end projects in ML, blockchain and the web' },
    { value: 2, label: 'degrees — Computer Science done, AI underway' },
  ],

  stack: [
    'Python',
    'TensorFlow',
    'Keras',
    'scikit-learn',
    'Pandas',
    'NumPy',
    'Generative AI',
    'Google Colab',
    'AWS · EC2 · VPC · S3',
    'React',
    'JavaScript',
  ],

  now: {
    updated: 'October 2026',
    items: [
      { label: 'Studying', value: 'Master of AI, La Trobe University' },
      { label: 'Building', value: 'A custom vision model to beat my zero-shot baseline' },
      { label: 'Learning', value: 'AWS, on the way to Solutions Architect' },
      { label: 'Looking for', value: 'Graduate ML & AI engineer roles in Melbourne' },
    ],
  },

  experience: [
    {
      company: 'La Trobe University',
      role: 'Master of Artificial Intelligence',
      start: '2026',
      end: 'Present',
      summary: 'Machine learning, deep learning, computer vision and generative AI, in Melbourne.',
      highlights: [
        'Zero-shot product classification with LLaVA — 96% accuracy',
        'Census income classification pipeline with TensorFlow and scikit-learn',
      ],
    },
    {
      company: 'CVR College of Engineering, Hyderabad',
      role: 'Bachelor’s in Computer Science',
      start: '2021',
      end: '2025',
      summary: 'Computer science foundations, with final projects in blockchain and recommender systems.',
      highlights: ['Blockchain-based access control for academic records', 'Mood-based music recommendation platform'],
    },
    {
      company: 'Intrainz',
      role: 'ML Intern',
      start: 'Nov 2022',
      end: 'Dec 2022',
      summary: 'Remote internship building and training machine learning models in Python, from raw data to evaluation.',
      highlights: [
        'Cleaned data and engineered features with Pandas, NumPy and scikit-learn',
        'Compared classification models and evaluated them on held-out data',
      ],
    },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/Santoshreddy075' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/santosh-maryada075' },
  ],
}
