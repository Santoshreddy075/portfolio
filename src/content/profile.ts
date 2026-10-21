import type { Profile } from './types'

const post = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`

/**
 * Everything the site says lives here. Edit this file, push to GitHub, and the
 * Pages workflow rebuilds and redeploys the site.
 */
export const profile: Profile = {
  name: 'Santosh Maryada',
  initials: 'SM',
  role: 'Master of AI student',
  location: 'Melbourne, Australia',
  emails: ['santoshreddy75@icloud.com', 'santoshreddymaryada80@gmail.com'],
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
    photo: 'profile.jpg',
    photoAlt: 'Portrait of Santosh Maryada',
    long: [
      'I’m a Master of Artificial Intelligence student at La Trobe University in Melbourne, building on a Bachelor’s in Computer Science from CVR College of Engineering in Hyderabad.',
      'My focus has moved from cloud on its own to where cloud meets AI: building machine learning models in Python and taking them from prototype to production. Learning AWS means I think about how a model will be deployed, secured and scaled — not just trained.',
      'I use generative AI and LLM tools every day, and I’ve learned to check their output rather than trust it blindly. At university I work in cross-functional teams and enjoy explaining technical work clearly to people who aren’t technical.',
      'Whatever the project, I bring the same habit: start with the simplest model, measure it honestly, then improve.',
    ],
    journey: [
      {
        year: '2021',
        title: 'Computer Science in Hyderabad',
        body: 'Started my Bachelor’s in Computer Science at CVR College of Engineering.',
      },
      {
        year: '2022',
        title: 'First machine learning internship',
        body: 'Built and evaluated classification models in Python as an ML intern at Intrainz.',
      },
      {
        year: '2024',
        title: 'Projects that shipped',
        body: 'A mood-based music recommender, then a blockchain system for academic records.',
      },
      {
        year: '2025',
        title: 'Cloud and certifications',
        body: 'Finished my degree, started learning AWS in public, and earned certifications in React, JavaScript and machine learning.',
      },
      {
        year: '2026',
        title: 'Master of AI in Melbourne',
        body: 'Moved to Melbourne for a Master of Artificial Intelligence at La Trobe University.',
      },
    ],
    interests: ['Machine learning', 'Computer vision', 'Generative AI', 'Cloud', 'AR & VR'],
  },

  copy: {
    workLead: 'Four projects across computer vision, machine learning, blockchain and the web.',
    highlightsLead: 'A quick look at who I am, what I’ve done and what I’m up to right now.',
    experienceLead: 'Two degrees, one internship, and a habit of measuring before improving.',
    credentialsLead: 'Seven certifications across machine learning, deep learning, cloud and front-end — each one links to the issuer, so you can check it yourself.',
    writingLead: 'Notes from my Master of AI, my AWS journey and the projects in between — first published on LinkedIn.',
    contactTitle: 'Let’s build something intelligent.',
    contactLead:
      'I’m looking for Associate or Graduate Machine Learning Engineer and AI Engineer roles in Melbourne. Let’s connect.',
  },

  projects: [
    {
      slug: 'zero-shot-classifier',
      title: 'Zero-shot product classifier',
      category: 'Computer vision',
      tagline: 'Classified supermarket product images with 96% accuracy using the LLaVA vision-language model — before training a single model.',
      summary:
        'This semester I needed to classify supermarket product images. Before building a custom model, I measured how far a pretrained vision-language model could get on its own — and it got a long way.',
      role: 'Master of AI coursework',
      context: 'La Trobe University',
      period: '2026',
      result: { value: '96%', label: 'zero-shot accuracy' },
      stack: ['Python', 'LLaVA', 'Prompt engineering', 'Google Colab'],
      art: 'vision',
      palette: ['#4facfe', '#a78bfa', '#f472b6'],
      story: [
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
      highlights: [
        'Prompt engineering with the LLaVA vision-language model in Google Colab',
        'Answers limited to a fixed label set, with every output checked',
        'A custom deep learning model built next, to compare the two approaches',
      ],
      links: [{ label: 'Read the post on LinkedIn', href: post('7516094229518147584') }],
    },
    {
      slug: 'census-income-classifier',
      title: 'Census income classifier',
      category: 'Machine learning',
      tagline: 'A classification pipeline that predicts income levels from census data, evaluated well beyond a single accuracy number.',
      summary:
        'A complete classification pipeline that predicts income levels from census data — from exploring and cleaning the data to training and comparing models with TensorFlow, Keras and scikit-learn.',
      role: 'Master of AI coursework',
      context: 'La Trobe University',
      period: '2026',
      result: { value: 'Beyond accuracy', label: 'evaluated on more than one number' },
      stack: ['Python', 'TensorFlow', 'Keras', 'scikit-learn'],
      art: 'metrics',
      palette: ['#34d399', '#22d3ee', '#a3e635'],
      story: [
        {
          eyebrow: '01 — The data',
          title: 'Understand it before you model it.',
          body: 'The work started with data analysis and cleaning — getting to know each feature and preparing the census data properly before any model saw it.',
          art: 'hero',
        },
        {
          eyebrow: '02 — The models',
          title: 'Train, compare, repeat.',
          body: 'I trained classification models with TensorFlow, Keras and scikit-learn, comparing approaches instead of settling for the first one that worked.',
          art: 'metrics',
          focus: [50, 82, 1.7],
        },
        {
          eyebrow: '03 — The evaluation',
          title: 'More than one number.',
          body: 'A single accuracy figure can hide a weak model, so I evaluated the models well beyond it.',
          art: 'metrics',
        },
      ],
      highlights: [
        'Data analysis and cleaning on census data',
        'Models built with TensorFlow, Keras and scikit-learn',
        'Evaluation that looks beyond a single accuracy number',
      ],
      links: [],
    },
    {
      slug: 'blockchain-academic-records',
      title: 'Blockchain academic records',
      category: 'Blockchain · Security',
      tagline: 'A three-layer blockchain model with Ethereum smart contracts that keeps student records tamper-proof and access-controlled.',
      summary:
        'A secure, blockchain-based system for managing students’ academic records. It replaces manual processes with a decentralised, three-layer model that keeps records tamper-proof.',
      role: 'Undergraduate project',
      context: 'CVR College of Engineering',
      period: 'Dec 2024 – Apr 2025',
      result: { value: '3 layers', label: 'storage, access control and authentication' },
      stack: ['Ethereum', 'Smart contracts', 'HTML5', 'CSS'],
      art: 'chain',
      palette: ['#fb923c', '#f43f5e', '#facc15'],
      story: [
        {
          eyebrow: '01 — The problem',
          title: 'Manual records don’t scale.',
          body: 'Academic records were managed through manual processes — slow, error-prone and open to tampering.',
          art: 'chain',
          focus: [50, 76, 1.55],
        },
        {
          eyebrow: '02 — The design',
          title: 'Three blockchains, one system.',
          body: 'A Data Storage blockchain holds the records, an Access Control blockchain tracks every activity, and an Ethereum-based Authentication blockchain uses smart contracts to grant secure access.',
          metric: { value: '3', label: 'cooperating blockchains' },
          art: 'chain',
        },
        {
          eyebrow: '03 — The result',
          title: 'Integrity by design.',
          body: 'The decentralised approach protects data integrity, prevents tampering, and gives institutions, authorities and students safe access to the records they need.',
          art: 'chain',
          focus: [50, 26, 1.55],
        },
      ],
      highlights: [
        'Three-layer blockchain architecture',
        'Ethereum smart contracts for authentication',
        'A dedicated access-control chain that tracks every activity',
      ],
      links: [],
    },
    {
      slug: 'mood-music-recommender',
      title: 'Mood music recommender',
      category: 'Recommender systems',
      tagline: 'A streaming platform that recommends music by mood — Happy, Relaxed, Energetic — with an admin panel and personal listening history.',
      summary:
        'A mood-based music streaming platform that recommends songs by how you feel rather than by genre or artist — built around the listener, not the catalogue.',
      role: 'Undergraduate project',
      context: 'CVR College of Engineering',
      period: 'Jul – Nov 2024',
      result: { value: '3 moods', label: 'Happy, Relaxed and Energetic' },
      stack: ['HTML5', 'CSS', 'Recommender systems'],
      art: 'player',
      palette: ['#c084fc', '#818cf8', '#f472b6'],
      story: [
        {
          eyebrow: '01 — The idea',
          title: 'Music for how you feel.',
          body: 'Most recommendations follow genre and artist. This platform puts the listener first and matches music to their emotional state.',
          art: 'player',
          focus: [33, 42, 1.5],
        },
        {
          eyebrow: '02 — The approach',
          title: 'Songs sorted by mood.',
          body: 'Tracks are grouped into moods like Happy, Relaxed and Energetic, so discovery starts from a feeling — and a personal listening history builds up over time.',
          art: 'player',
          focus: [70, 45, 1.45],
        },
        {
          eyebrow: '03 — The platform',
          title: 'Built to be run.',
          body: 'A secure admin panel manages the catalogue, and real-time track revalidation keeps the library accurate.',
          art: 'player',
        },
      ],
      highlights: [
        'Mood-based discovery and recommendations',
        'A personal listening history for every user',
        'A secure admin panel with real-time track revalidation',
      ],
      links: [{ label: 'View the source on GitHub', href: 'https://github.com/Santoshreddy075/Music_recommend' }],
    },
  ],

  featured: {
    projectSlug: 'zero-shot-classifier',
    eyebrow: 'Case study · Zero-shot product classifier',
    title: 'Strong results, zero training.',
  },

  credentials: [
    {
      name: 'Software Engineer Intern',
      issuer: 'HackerRank',
      issued: 'Apr 2026',
      credentialId: '9379A3E88305',
      url: 'https://www.hackerrank.com/certificates/9379a3e88305',
      skills: ['Problem solving', 'Python'],
      tint: '#1ba94c',
    },
    {
      name: 'Introduction to Deep Learning & Neural Networks with Keras',
      issuer: 'IBM',
      issued: 'Jan 2026',
      credentialId: 'ZMMB4BNBN22N',
      url: 'https://www.coursera.org/account/accomplishments/records/ZMMB4BNBN22N',
      post: post('7412811333622128640'),
      skills: ['Deep learning', 'Neural networks', 'Keras'],
      tint: '#0f62fe',
    },
    {
      name: 'Machine Learning with Python',
      issuer: 'IBM',
      issued: 'Dec 2025',
      credentialId: 'U4EGBU8S3Q47',
      url: 'https://www.coursera.org/account/accomplishments/records/U4EGBU8S3Q47',
      post: post('7406178441399660544'),
      skills: ['Python', 'Machine learning'],
      tint: '#6929c4',
    },
    {
      name: 'AWS SimuLearn: Cloud Computing Essentials',
      issuer: 'Amazon Web Services',
      issued: 'Sep 2025',
      post: post('7376233738629804032'),
      skills: ['Amazon S3', 'Solution architecture'],
      tint: '#e47911',
    },
    {
      name: 'Learn React JS for Front-end Development',
      issuer: 'CodeChef',
      issued: 'Jun 2025',
      credentialId: '9591868',
      url: 'https://www.codechef.com/certificates/public/9591868',
      post: post('7345054447728738305'),
      skills: ['React', 'REST APIs'],
      tint: '#8a5a3c',
    },
    {
      name: 'Learn JavaScript',
      issuer: 'CodeChef',
      issued: 'May 2025',
      credentialId: 'e1496c1',
      url: 'https://www.codechef.com/certificates/public/e1496c1',
      post: post('7334198359072612352'),
      skills: ['JavaScript', 'DOM manipulation'],
      tint: '#b0802b',
    },
    {
      name: 'Frontend Developer (React)',
      issuer: 'HackerRank',
      issued: 'May 2025',
      credentialId: '02E9BF093F71',
      url: 'https://www.hackerrank.com/certificates/02e9bf093f71',
      post: post('7333333031971160066'),
      skills: ['React', 'REST APIs'],
      tint: '#0e8a6a',
    },
  ],

  posts: [
    {
      title: 'Strong results without training a single model',
      date: '2026-10-14',
      excerpt:
        'Classifying supermarket product images with 96% accuracy using LLaVA and careful prompt engineering — and why a zero-shot model makes a strong baseline.',
      url: post('7516094229518147584'),
      tags: ['Computer vision', 'Generative AI'],
    },
    {
      title: 'Starting my Master’s at La Trobe',
      date: '2026-03-02',
      excerpt: 'From a Bachelor’s in Computer Science to a Master of AI in Melbourne — the start of a new chapter.',
      url: post('7434090757457899520'),
      tags: ['Milestone'],
    },
    {
      title: 'What AWS SimuLearn taught me about S3',
      date: '2025-09-23',
      excerpt:
        'Static hosting on S3, scaling without servers, pairing it with Route 53 and CloudFront, least-privilege bucket policies, and why it’s so cost-efficient.',
      url: post('7376233738629804032'),
      tags: ['AWS', 'Cloud'],
    },
    {
      title: 'Compute and networking foundations: EC2 and VPC',
      date: '2025-09-21',
      excerpt:
        'Right-sizing EC2 instances, designing public and private subnets, and how security groups and network ACLs work together.',
      url: post('7375512154621489152'),
      tags: ['AWS', 'Cloud architecture'],
    },
    {
      title: 'Starting my AWS journey',
      date: '2025-09-14',
      excerpt: 'Setting clear goals — from Cloud Practitioner to Solutions Architect — and committing to learn in public.',
      url: post('7372869370257195008'),
      tags: ['AWS', 'Learning'],
    },
    {
      title: 'Making the most of the AWS Free Tier',
      date: '2025-08-12',
      excerpt: 'Which services are free, the limits worth knowing, and a plan to keep learning without surprise bills.',
      url: post('7361086152503676931'),
      tags: ['AWS'],
    },
    {
      title: 'What I learned building with React',
      date: '2025-06-29',
      excerpt: 'Components and props, state and lifecycle, routing and APIs — the foundations behind my CodeChef React certification.',
      url: post('7345054447728738305'),
      tags: ['React', 'Front-end'],
    },
  ],

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
      summary: 'Computer science foundations, with projects in blockchain and recommender systems.',
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
