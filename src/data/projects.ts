export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  slug?: string
  caseStudy?: {
    challenge: string
    approach: string
    features?: { title: string; description: string }[]
    screenshots?: string[]
    videoUrl?: string
    thumbnail?: string
    reportUrl?: string
    awards?: {
      title: string
      description: string
    }[]
    tables?: {
      title: string
      headers: string[]
      rows: string[][]
    }[]
  }
}


export const projects: Project[] = [
  {
    title: 'Vigil 24x7',
    description: 'Intelligent management system for private security with automated digitization of operational processes.',
    tags: ['.NET', 'Angular', 'SQL Server', 'Docker', 'OCR'],
    link: 'https://github.com/Martinmiranda9/Sistema-de-Gestion-de-Vigiladores---V24X7',
    slug: 'vigil-24x7',
    caseStudy: {
      challenge: 'Private security companies manage shift schedules and attendance records using handwritten paper forms, leading to manual data entry errors, delayed reporting, and inefficient resource allocation across multiple sites.',
      approach: 'Built an integral platform for human resources optimization and attendance control. The system implements an OCR (Optical Recognition) engine to transform handwritten shift forms into processable digital data, eliminating manual entry errors. Includes an automated dashboard for critical metrics visualization and real-time personnel management.',
      features: [
        { title: 'OCR Engine', description: 'Optical Character Recognition system that transforms handwritten shift schedules into structured digital data, eliminating manual entry errors.' },
        { title: 'AI-First Workflow', description: 'Intelligent processing pipeline that automates data extraction, validation, and integration into the management system.' },
        { title: 'Automated Dashboard', description: 'Real-time visualization of critical metrics: attendance, shift coverage, overtime hours, and personnel allocation across sites.' },
        { title: 'CI/CD Pipeline', description: 'Containerized with Docker and automated deployments via GitHub Actions for continuous integration and delivery.' }
      ],
      thumbnail: '/images/vigil/vigil1.png',
      screenshots: [
        '/images/vigil/vigil1.png',
        '/images/vigil/vigil2.png',
        '/images/vigil/vigil3.png',
        '/images/vigil/vigil4.png',
        '/images/vigil/vigil5.png',
        '/images/vigil/vigil6.png'
      ]
    }
  },
  {
    title: 'Vivero Quilino',
    description: 'Full-stack agricultural e-commerce platform for the digitalization and scalability of regional sales.',
    tags: ['Node.js', 'Angular', 'PrimeNG', 'Tailwind CSS', 'MySQL'],
    link: 'https://github.com/Martinmiranda9/Vivero-Quilino-',
    slug: 'vivero-quilino',
    caseStudy: {
      challenge: 'The Quilino Municipal Nursery needed to modernize its sales processes, which were carried out in a traditional and limited way. The challenge was to design a digital solution that would centralize the product catalog, manage orders in real time, and expand the nursery\'s reach toward a functional and scalable e-commerce model.',
      approach: 'Developed the end-to-end user interface alongside a team, prioritizing modular architecture and reactivity. The platform enables fluid catalog navigation, shopping cart management, and clean integration with backend services. A professional design system was implemented using advanced component libraries to guarantee an optimal user experience (UX).',
      features: [
        { title: 'Reactive Catalog', description: 'Dynamic interface built with Angular that allows filtering and searching agricultural products with high performance.' },
        { title: 'E-commerce Management', description: 'Shopping cart system and automated order flow linked with WhatsApp to simplify sales conversion.' },
        { title: 'Inventory Management (CRUD)', description: 'Implementation of a complete system for adding, removing, and modifying products and services, ensuring the catalog is kept updated in real time.' }
      ],
      thumbnail: '/images/vivero/vivero8.png',
      screenshots: [
        '/images/vivero/vivero8.png',
        '/images/vivero/vivero5.png',
        '/images/vivero/vviero6.png',
        '/images/vivero/vivero3.png',
        '/images/vivero/vivero4.png',
        '/images/vivero/vivero7.png',
        '/images/vivero/vivero9.png'
      ]
    }
  },
  {
    title: 'CNN Architecture Comparison',
    description: 'Benchmarked three CNN architectures on 120K+ food images, proving EfficientNetB0 matches ResNet-50 while being 5.9x smaller.',
    tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
    link: 'https://github.com/omorros/deep-learning-cnn-comparison',
    slug: 'deep-learning-cnn-comparison',
    caseStudy: {
      challenge: 'Determining whether lightweight CNNs can match heavy architectures for domain-specific image classification while minimizing compute cost.',
      approach: 'Benchmarked three CNN architectures on 120K+ food images. EfficientNetB0 matched ResNet-50\'s 99.75% accuracy while being 5.9x smaller and 35% faster to train.',
      features: [
        { title: '120K+ Image Pipeline', description: 'Merged three Kaggle sources with SHA-256 deduplication and stratified splitting.' },
        { title: '99.75% Accuracy', description: 'EfficientNetB0 matched ResNet-50 via transfer learning on domain-specific data.' },
        { title: '5.9x Model Compression', description: 'EfficientNetB0 achieved parity at 40 MB vs ResNet-50\'s 211 MB.' },
        { title: 'Class-Weighted Training', description: 'Maintained >0.98 F1 scores even on minority classes with 113:1 imbalance.' }
      ],
      tables: [
        {
          title: 'Model Performance Comparison',
          headers: ['Model', 'Test Accuracy', 'Parameters', 'Size', 'Training Time'],
          rows: [
            ['Custom CNN', '97.97%', '4.96M', '56.9 MB', '14.8h'],
            ['EfficientNetB0', '99.75%', '4.07M', '40.0 MB', '6.7h'],
            ['ResNet-50', '99.76%', '24.13M', '211.0 MB', '10.3h']
          ]
        },
        {
          title: 'Dataset Specifications',
          headers: ['Property', 'Value'],
          rows: [
            ['Total Images', '120,842 (deduplicated)'],
            ['Classes', '14 (Fruits & Vegetables)'],
            ['Split (Train/Val/Test)', '84,582 / 18,119 / 18,141'],
            ['Resolution', '224×224 RGB']
          ]
        }
      ]
    }
  },
  {
    title: 'Personal Web Portfolio',
    description: 'Single-page portfolio with custom full-page navigation, cursor-reactive gradients, and 95+ Lighthouse scores.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/omorros/omorros.com',
    slug: 'personal-web-portfolio',
    caseStudy: {
      challenge: 'Traditional scrolling portfolios feel generic and fail to guide user attention effectively.',
      approach: 'Built a single-page app with custom full-page navigation, cursor-reactive gradient backgrounds, and GPU-accelerated section transitions. Scores 95+ on all Lighthouse metrics.',
      features: [
        { title: 'Custom Navigation Engine', description: 'Debounce-protected handler manages full-page transitions via scroll, swipe, and keyboard.' },
        { title: '60fps Animations', description: 'Framer Motion transitions and GPU-accelerated CSS transforms for smooth performance.' },
        { title: 'Cursor-Following Glow', description: '500px radial glow follows the cursor and adapts color to the active section theme.' },
        { title: '95+ Lighthouse Scores', description: 'SVG gradients and Next.js App Router for optimal bundle splitting and performance.' }
      ],
      tables: [
        {
          title: 'Technology Stack',
          headers: ['Category', 'Technology', 'Purpose'],
          rows: [
            ['Framework', 'Next.js 14', 'App Router architecture'],
            ['Language', 'TypeScript', 'Type safety'],
            ['Styling', 'Tailwind CSS', 'Utility-first styling'],
            ['Animation', 'Framer Motion', 'Complex state transitions'],
            ['Deployment', 'Vercel', 'Edge network hosting']
          ]
        },
        {
          title: 'Design System',
          headers: ['Section', 'Primary Color', 'Theme Hex'],
          rows: [
            ['Home', 'Green/Purple', '#27c029 / #8f46db'],
            ['About', 'Magenta', '#9e005d'],
            ['Education', 'Orange', '#ff6b35'],
            ['Skills', 'Burgundy', '#83394c'],
            ['Projects', 'Deep Blue', '#001b70']
          ]
        }
      ]
    }
  },
  {
    title: 'Wikipedia Scraper',
    description: 'Async crawler with 100 concurrent workers, O(1) URL deduplication, and a 20-second global deadline.',
    tags: ['Python', 'Asyncio', 'Aiohttp', 'BeautifulSoup'],
    link: 'https://github.com/omorros/wikipedia_scraper',
    slug: 'wikipedia-scraper',
    caseStudy: {
      challenge: 'Efficiently crawling large-scale websites requires balancing speed with resource management under strict time constraints.',
      approach: 'Built a high-concurrency async crawler with 100 workers, O(1) URL deduplication, and a global 20-second deadline using Python\'s asyncio and aiohttp.',
      features: [
        { title: '100 Concurrent Workers', description: 'Saturates network bandwidth and masks I/O latency with massive parallelism.' },
        { title: '20s Deadline Enforcement', description: 'Global deadline propagation cancels all pending tasks exactly at the time limit.' },
        { title: 'URL Deduplication', description: 'Hash set guarantees O(1) lookup time, preventing redundant processing and infinite loops.' },
        { title: 'Non-Blocking Architecture', description: 'Full async event loop with robust link normalization and protocol handling.' }
      ]
    }
  },
  {
    title: 'University Library System',
    description: 'Java MVC console app with inheritance hierarchies, polymorphic loan rules, and custom CSV persistence.',
    tags: ['Java', 'OOP', 'JUnit', 'File I/O'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
    slug: 'university-library-system',
    caseStudy: {
      challenge: 'Modelling complex entity relationships and enforcing role-specific business rules with file-based persistence and no database.',
      approach: 'Developed a Java MVC console app using inheritance hierarchies, polymorphic loan rules, and a custom CSV persistence engine.',
      features: [
        { title: 'MVC + OOP Architecture', description: 'Model-View-Controller with abstract base classes and composition patterns.' },
        { title: 'CSV Persistence Engine', description: 'Custom DataLoader serializes complex object graphs, decoupling logic from storage.' },
        { title: 'Role-Based Loan Rules', description: 'Polymorphic constraints enforce per-role limits (10 Adult, 3 Child) and suspension states.' },
        { title: 'JUnit + Functional Tests', description: 'White-box unit tests for core logic combined with end-to-end workflow testing.' }
      ],
      reportUrl: '/reports/MOD004883_Component2_Report_2270056.pdf',
      screenshots: [
        '/images/university-library-ui.jpg'
      ],
      awards: [
        {
          title: 'Distinction Grade (80%)',
          description: 'Achieved a First-Class mark for software architecture quality, clean code practices, and comprehensive documentation.'
        }
      ],
      tables: [
        {
          title: 'Class Hierarchy',
          headers: ['Base Class', 'Subclasses', 'Key Responsibilities'],
          rows: [
            ['Product (Abstract)', 'Book, CD, DVD, Audiobook', 'Stores metadata (ISBN, Title), manages loan status'],
            ['User (Abstract)', 'Student, ChildUser, AdultUser', 'Manages personal info, active loans, and permissions'],
            ['Loan', 'N/A', 'Links Users to Products, tracks due dates and fines']
          ]
        },
        {
          title: 'Testing Verification',
          headers: ['Test Type', 'Scope', 'Key Scenarios Verified'],
          rows: [
            ['Functional', 'End-to-End User Flows', 'Login, Product Visibility (DVDs hidden for Students), Error Handling'],
            ['Unit (JUnit)', 'Core Business Logic', 'Borrowing Limits (10/5/3), Guardian Assignment, ID Uniqueness'],
            ['Regression', 'Bug Fix Verification', 'Loan state consistency between Controller and User classes']
          ]
        }
      ]
    }
  },
]
