// Single source of truth for everything the site says.
// Sourced from the two current resumes in src/resumes (SWE-focused and ML-focused).

export const profile = {
  name: "Krish Mehta",
  handle: "Krish020902",
  role: "Software & ML Engineer",
  location: "Baltimore, MD",
  email: "krishmm02@gmail.com",
  phone: "(667) 431-6543",
  phoneHref: "tel:+16674316543",
  github: "https://github.com/Krish020902",
  linkedin: "https://www.linkedin.com/in/krish-mehta-227b93219",
  status: "Open to SWE / ML roles",
  about: [
    "Software and ML engineer finishing an MS in Computer Science at UMBC (4.0 GPA). I've owned backend services for a health platform with 2M+ users, trained computer-vision models that went from camera feed to production dashboard, and made a real-time options-analytics pipeline 30× faster.",
    "I do my best work where systems and models meet: low-latency APIs, data pipelines, and ML that holds up under real traffic. This year I'm researching LLM routing at UMBC, where a learned router across four models beat the best single model by 15 points.",
  ],
};

export const stats = [
  { value: "2M+", label: "users on the platform I built backend services for" },
  { value: "30K", label: "concurrent users served at peak" },
  { value: "30×", label: "faster options-pricing engine" },
  { value: "4.0", label: "GPA, MS Computer Science" },
];

export type Variant = { role: string; points: string[] };
export type Experience = {
  company: string;
  location: string;
  period: string;
  tags: string[];
  swe: Variant;
  ml?: Variant;
  branch?: boolean;
};

export const experiences: Experience[] = [
  {
    company: "FitterFly",
    location: "Mumbai",
    period: "Jan 2025 – Jun 2025",
    tags: ["REST APIs", "Redis", "Caching", "CI/CD", "GitHub Actions", "Distributed Systems", "YOLOv8", "Computer Vision", "PyTorch"],
    swe: {
      role: "Software Development Engineer",
      points: [
        "Owned backend services for food logging on a health platform with 2M+ users, building REST APIs and core service logic that sustained 30K concurrent users at peak.",
        "Cut p95 latency from ~180 ms to ~60 ms on high-traffic read endpoints with Redis caching, and moved to a stateless API design that scaled horizontally as traffic grew.",
        "Shipped backend releases through CI/CD (GitHub Actions), coordinating API contracts with product and mobile teams so features landed without breaking existing clients.",
      ],
    },
    ml: {
      role: "ML Engineer, Computer Vision & Nutrition AI",
      points: [
        "Built a photo-based meal-logging pipeline for a 2M+ user health platform that classifies food images across 300+ Indian dish classes and maps each item to macro and micronutrient profiles.",
        "Improved YOLOv8 top-1 accuracy from 71% to 84% through error analysis on the most-confused classes, targeted label cleanup and class-balanced augmentation.",
        "Served inference at ~120 ms per image for 30K concurrent users at peak, with Redis caching cutting p95 latency from ~180 ms to ~60 ms.",
        "Validated on 15K+ real meal logs with product, CV and mobile teams, catching 40+ failure cases before release.",
      ],
    },
  },
  {
    company: "Cerebulb",
    location: "GIFT City",
    period: "Jun 2024 – Dec 2024",
    tags: ["Flask", "REST APIs", "SQL", "CI/CD", "GitHub Actions", "CNNs", "TensorFlow", "Computer Vision", "Python"],
    swe: {
      role: "Backend Developer",
      points: [
        "Developed Flask REST APIs, SQL schemas and data pipelines powering real-time equipment-monitoring dashboards, with validation enforced at ingestion.",
        "Set up CI/CD (GitHub Actions) running 150+ automated tests on every push, cutting deployment time from ~45 min to under 10 min.",
        "Trained a CNN anode-lifecycle classifier reaching 92% accuracy through dataset balancing and hyperparameter tuning.",
      ],
    },
    ml: {
      role: "Machine Learning Engineer",
      points: [
        "Automated visual inspection of 568+ anode and cathode plates across 2 production zones for a zinc-mining client, training a CNN on purpose-installed camera feeds; inspection became 56%+ faster.",
        "Raised lifecycle classification accuracy from 76% to 92% with class balancing, hyperparameter tuning and TensorFlow/Keras augmentation pipelines.",
        "Deployed Flask inference APIs behind real-time dashboards, cutting defect alerts from hours to under 5 minutes.",
      ],
    },
  },
  {
    company: "BlissQuants",
    location: "Surat",
    period: "Jan 2023 – Jun 2024",
    tags: ["Flask", "AWS", "NumPy", "React Native", "Python", "REST APIs", "Time-Series Modeling"],
    swe: {
      role: "Software Development Engineer, App Team",
      points: [
        "Built a near-real-time F&O analytics pipeline (Flask, AWS Lambda) that served implied-volatility and delta-hedging signals to React Native clients on a 3-second refresh cycle.",
        "Vectorised IV computation across the option chain (NumPy, Newton–Raphson warm-started from the previous tick), cutting per-cycle compute from ~3.2 s to ~110 ms, about 30× faster.",
        "Turned hedging strategies from financial specialists into production service logic exposed through APIs to the mobile app.",
      ],
    },
    ml: {
      role: "Machine Learning & Quantitative Developer",
      points: [
        "Built an IV alert engine that notifies users when implied volatility crosses their thresholds and suggests put or call positions against 23 years of historical NSE IV data.",
        "Cut IV computation from ~3.2 s to ~110 ms (~30×) per option-chain cycle by vectorising a Newton–Raphson solver in NumPy, keeping alerts inside the 3-second window.",
        "Automated collection and validation of 2,000+ option contracts per refresh, feeding the alert engine and live delta-hedging signals.",
      ],
    },
  },
  {
    company: "Tech Elecon",
    location: "Anand",
    period: "Jul 2023 – Dec 2023",
    tags: ["React.js", "Express.js", "Node.js", "MongoDB", "JavaScript"],
    branch: true,
    swe: {
      role: "Full-Stack Developer",
      points: [
        "Created an admin portal (React.js, Express.js, Node.js) with role-based access for 200+ internal users across teams.",
        "Modelled the MongoDB schema for grievances, products and employee tasks around how each team actually worked.",
      ],
    },
  },
];

export type Project = {
  id: string;
  file: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  metric?: string;
  period?: string;
};

export const projects: Project[] = [
  {
    id: "superbDiamonds",
    file: "superb-diamonds.ts",
    title: "Superb Diamonds",
    subtitle: "Full-stack commerce platform with ML pricing",
    color: "#2a4597",
    description:
      "Launched superbdiamonds.in (React.js, Node.js) for a diamond trader: inventory, certificates, grading reports and broker dashboards that give 20+ brokers self-serve access to live stock. Its ElasticNet pricing model, trained on 20 years of RapNet data, predicts within ~7% mean error against 15% for list-price baselines. Deployed on AWS with load balancing and CDN.",
    tech: ["React.js", "Node.js", "Flask", "ElasticNet", "AWS EC2", "CDN"],
    link: "https://superbdiamonds.in",
    github: "https://github.com/krishmm02/SuperbDiamonds",
    metric: "~7% pricing error, 20+ brokers",
    period: "Jul 2024 – Feb 2025",
  },
  {
    id: "melodyMind",
    file: "melody-mind.py",
    title: "MelodyMind",
    subtitle: "AI-based therapeutic music system",
    color: "#7b2340",
    description:
      "A transformer that classifies six Ekman emotions from multichannel physiological signals (heart rate, HRV, skin conductance, breathing rate) at 78% held-out accuracy. Each emotion maps to tempo, intensity and key using the ISO principle, meeting the listener where they are and then shifting toward a target mood, served through Flask to a therapist dashboard.",
    tech: ["Transformers", "Time-Series Modeling", "Flask", "React.js"],
    link: "https://melodymind-waves.vercel.app/",
    github: "https://github.com/krishmm02/MelodyMind",
    metric: "78% held-out accuracy",
    period: "Dec 2023 – Feb 2024",
  },
  {
    id: "anodeClassifier",
    file: "anode-classifier.py",
    title: "Anode Lifecycle Classifier",
    subtitle: "Computer vision for zinc mining",
    color: "#2f6b55",
    description:
      "A CNN that grades anode and cathode plates from camera feeds into lifecycle stages. Class balancing and augmentation took accuracy from 76% to 92%, and Flask APIs push results to real-time dashboards so defects surface in minutes instead of hours.",
    tech: ["TensorFlow", "Keras", "CNNs", "Flask", "Python"],
    github: "https://github.com/krishmm02/Anode-Lifecycle-Classifier",
    metric: "76% → 92% accuracy",
  },
  {
    id: "voyagr",
    file: "voyagr.js",
    title: "VoyagR",
    subtitle: "Travel companion matching app",
    color: "#1f5f66",
    description:
      "Pairs travellers by budget, destination and preferences using the Gale–Shapley stable matching algorithm, with Socket.IO chat for planning trips together. Written up as a research paper.",
    tech: ["React.js", "Socket.IO", "Node.js", "Algorithms"],
    github: "https://github.com/krishmm02/VoyagR",
    metric: "stable matching, O(n²)",
  },
  {
    id: "starWars",
    file: "star-wars.ts",
    title: "Star Wars Game",
    subtitle: "Browser fighting game with a CPU opponent",
    color: "#b8932f",
    description:
      "A retro 2D Star Wars-themed fighter with arcade gameplay and an AI-driven CPU opponent for solo play. Runs entirely in the browser.",
    tech: ["TypeScript", "JavaScript", "HTML Canvas", "Node.js"],
    link: "https://star-wars-fighting-game.netlify.app/",
    github: "https://github.com/krishmm02/Star_Wars_Game",
    metric: "playable now",
  },
  {
    id: "moneyTrack",
    file: "money-track.tsx",
    title: "MoneyTrack",
    subtitle: "Personal finance tracker",
    color: "#4a4f5c",
    description:
      "A faster alternative to expense spreadsheets: quick logging, custom budget cycles, spend analytics against your own history, and savings-goal projections.",
    tech: ["React.js", "TypeScript", "Auth", "Analytics"],
    link: "https://moneytrack-app-614.netlify.app/",
    github: "https://github.com/krishmm02/budget-buddy-app-288",
    metric: "budget cycles + projections",
  },
];

export type SkillGroup = { id: string; title: string; plate: string; color: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  { id: "lang", title: "Languages", plate: "I", color: "#2a4597", skills: ["Python", "SQL", "C/C++", "Java", "JavaScript", "TypeScript"] },
  { id: "ml", title: "ML & Deep Learning", plate: "II", color: "#7b2340", skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "CNNs", "Transformers", "YOLOv8", "Time-Series Modeling", "Computer Vision"] },
  { id: "llm", title: "LLMs & GenAI", plate: "III", color: "#5b3a8c", skills: ["LLM APIs", "Routing & Ensembles", "Prompt Engineering", "Structured Outputs", "LLM Evaluation"] },
  { id: "backend", title: "Backend & Systems", plate: "IV", color: "#1f5f66", skills: ["REST APIs", "Flask", "FastAPI", "Node.js", "Express.js", "Distributed Systems", "Kafka", "Caching"] },
  { id: "data", title: "Data & Databases", plate: "V", color: "#b8932f", skills: ["NumPy", "Pandas", "SciPy", "PostgreSQL", "MySQL", "Redis", "MongoDB"] },
  { id: "cloud", title: "Cloud & DevOps", plate: "VI", color: "#2f6b55", skills: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Git", "Linux"] },
  { id: "front", title: "Frontend", plate: "VII", color: "#4a4f5c", skills: ["React.js", "React Native", "HTML/CSS"] },
  { id: "found", title: "Foundations", plate: "VIII", color: "#1b1d24", skills: ["Algorithms & DS", "Object-Oriented Design", "Unit Testing", "SDLC"] },
];

// how each skill is spelled in job descriptions
export const skillAliases: Record<string, string[]> = {
  Python: ["python"],
  SQL: ["sql"],
  "C/C++": ["c\\+\\+", "cpp", "c/c\\+\\+"],
  Java: ["java"],
  JavaScript: ["javascript", "js", "es6"],
  TypeScript: ["typescript", "ts"],
  PyTorch: ["pytorch", "torch"],
  TensorFlow: ["tensorflow", "keras"],
  "Scikit-Learn": ["scikit-learn", "sklearn", "scikit"],
  CNNs: ["cnns?", "convolutional"],
  Transformers: ["transformers?", "bert", "attention models?"],
  YOLOv8: ["yolo(?:v\\d+)?", "object detection"],
  "Time-Series Modeling": ["time[- ]series", "forecasting"],
  "Computer Vision": ["computer vision", "image (?:processing|classification|recognition)", "cv"],
  "LLM APIs": ["llms?", "large language models?", "gpt", "claude", "anthropic", "openai", "llama", "genai", "generative ai"],
  "Routing & Ensembles": ["routing", "ensembles?", "model routing"],
  "Prompt Engineering": ["prompt(?:ing| engineering)?"],
  "Structured Outputs": ["structured outputs?", "json mode", "function calling", "tool use"],
  "LLM Evaluation": ["evals?", "evaluation", "benchmarks?"],
  "REST APIs": ["restful", "rest apis?", "apis?", "web services"],
  Flask: ["flask"],
  FastAPI: ["fastapi"],
  "Node.js": ["node", "nodejs", "node\\.js"],
  "Express.js": ["express", "expressjs", "express\\.js"],
  "Distributed Systems": ["distributed systems?", "scalab(?:le|ility)", "microservices?", "high[- ]availability"],
  Kafka: ["kafka", "event streaming", "message queues?"],
  Caching: ["caching", "cache"],
  NumPy: ["numpy"],
  Pandas: ["pandas"],
  SciPy: ["scipy"],
  PostgreSQL: ["postgres", "postgresql"],
  MySQL: ["mysql"],
  Redis: ["redis"],
  MongoDB: ["mongo", "mongodb", "nosql"],
  AWS: ["aws", "amazon web services", "lambda", "s3", "ec2"],
  Docker: ["docker", "containers?", "containeri[sz]ation"],
  "CI/CD": ["ci/cd", "ci", "continuous integration", "continuous delivery", "continuous deployment"],
  "GitHub Actions": ["github actions"],
  Git: ["git", "version control"],
  Linux: ["linux", "unix", "bash", "shell"],
  "React.js": ["react", "reactjs", "react\\.js"],
  "React Native": ["react native"],
  "HTML/CSS": ["html", "css", "html5", "css3"],
  "Algorithms & DS": ["algorithms?", "data structures?", "dsa"],
  "Object-Oriented Design": ["oop", "object[- ]oriented"],
  "Unit Testing": ["unit tests?", "testing", "pytest", "jest", "tdd"],
  SDLC: ["sdlc", "software development life ?cycle", "agile", "scrum"],
};

// common requirements outside my stack, so the matcher can be honest about gaps
export const gapTerms: Record<string, string[]> = {
  Kubernetes: ["kubernetes", "k8s"],
  Go: ["golang"],
  Rust: ["rust"],
  Spark: ["spark", "pyspark"],
  GraphQL: ["graphql"],
  Terraform: ["terraform"],
  Angular: ["angular"],
  "Vue.js": ["vue", "vuejs"],
  Swift: ["swift", "ios"],
  Kotlin: ["kotlin"],
  Azure: ["azure"],
  GCP: ["gcp", "google cloud"],
  "C#/.NET": ["c#", "\\.net", "dotnet"],
  Ruby: ["ruby", "rails"],
  Django: ["django"],
  Spring: ["spring boot", "spring framework"],
  Scala: ["scala"],
  Elasticsearch: ["elasticsearch"],
  Airflow: ["airflow"],
  Snowflake: ["snowflake"],
};

export const rolePresets = [
  { id: "backend", label: "Backend Engineer", wants: ["Python", "Java", "Node.js", "REST APIs", "SQL", "PostgreSQL", "Redis", "Kafka", "AWS", "Docker", "Distributed Systems", "Caching", "CI/CD", "Unit Testing", "Kubernetes"] },
  { id: "fullstack", label: "Full-Stack Engineer", wants: ["TypeScript", "JavaScript", "React.js", "Node.js", "Express.js", "REST APIs", "SQL", "MongoDB", "AWS", "Docker", "Git", "HTML/CSS", "GraphQL"] },
  { id: "ml", label: "ML Engineer", wants: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Computer Vision", "Transformers", "CNNs", "Time-Series Modeling", "NumPy", "Pandas", "FastAPI", "Docker", "AWS", "Spark"] },
  { id: "genai", label: "AI / LLM Engineer", wants: ["Python", "LLM APIs", "Prompt Engineering", "Structured Outputs", "LLM Evaluation", "Routing & Ensembles", "Transformers", "FastAPI", "PyTorch", "Docker", "AWS", "Kubernetes"] },
  { id: "cloud", label: "Cloud / Platform", wants: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Linux", "Python", "Distributed Systems", "Redis", "Kubernetes", "Terraform"] },
] as const;

export const education = [
  {
    school: "University of Maryland, Baltimore County",
    degree: "M.S. Computer Science",
    period: "Expected May 2027",
    score: "4.0 / 4.0 GPA",
  },
  {
    school: "Birla Vishvakarma Mahavidyalaya",
    degree: "B.Tech Information Technology",
    period: "May 2025",
    score: "8.46 / 10 CPI",
  },
];

export const research = {
  title: "LLM-Based Anomaly Detection in Stories",
  kind: "Independent study · UMBC",
  advisor: "Dr. Lara Martin",
  period: "Spring 2026",
  summary:
    "Designed an ML-routed ensemble in which a learned router picks among four LLMs for each story on the CRAB anomaly-detection benchmark. It reached 66.7% accuracy against 51.7% for the best single model (LLaMA-4-Maverick) on a stratified held-out set.",
  result: ["66.7%", "51.7%"],
};

export const publications = [
  {
    title: "Machine Learning Solutions for Adaptive Traffic Signal Control: A Review of Image-based Approaches (WJAETS)",
    status: "published",
    link: "https://wjaets.com/content/machine-learning-solutions-adaptive-traffic-signal-control-review-image-based-approaches",
  },
  { title: "Machine Learning for Automated Anode Grading in Mining", status: "research" },
  { title: "VoyagR: Stable Matching Based on Travel Preferences", status: "research" },
];

export type Activity = {
  id: string;
  role: string;
  org: string;
  period: string;
  link?: string;
  points: string[];
};

export const activities: Activity[] = [
  {
    id: "senator",
    role: "COEIT Senator",
    org: "UMBC Graduate Student Association",
    period: "Elected · 2025 – 2026",
    points: [
      "Represents graduate students in the College of Engineering and Information Technology.",
      "Advocates for student interests, departmental funding and academic policy.",
    ],
  },
  {
    id: "leetcode",
    role: "Competitive Programming",
    org: "LeetCode",
    period: "Ongoing",
    points: [
      "Contest rating 1713, in the top 12.65% of users.",
      "Regularly solves Medium and Hard data-structures and algorithms problems.",
    ],
  },
  {
    id: "sih",
    role: "Smart India Hackathon",
    org: "National hackathon, India",
    period: "Finalist",
    points: ["Reached the finals of India's national hackathon for student engineering teams."],
  },
  {
    id: "tutor",
    role: "Math Tutor",
    org: "Reach Together Tutoring Program · UMBC",
    period: "2025 – present",
    points: ["One-on-one and small-group tutoring in calculus, discrete mathematics and linear algebra."],
  },
  {
    id: "mentor",
    role: "Peer Mentor",
    org: "Birla Vishvakarma Mahavidyalaya",
    period: "Mar 2025",
    points: ["Coached second-year students through Data Structures and Algorithms; 20% of mentees reached Master on Codeforces."],
  },
  {
    id: "trs",
    role: "Head Web Developer",
    org: "The Robotic Society · BVM",
    period: "2021 – 2022",
    link: "https://www.bvmengineering.ac.in/TRS/2021-2022/webdevloper.html",
    points: ["Led the society's website and recruitment portal, with zero downtime through high-traffic events."],
  },
];

export const sections = [
  { id: "home", numeral: "", label: "Frontispiece" },
  { id: "about", numeral: "I", label: "Portrait" },
  { id: "fit", numeral: "II", label: "Skills & Fit" },
  { id: "experience", numeral: "III", label: "Experience" },
  { id: "projects", numeral: "IV", label: "Works" },
  { id: "education", numeral: "V", label: "Education" },
  { id: "service", numeral: "VI", label: "Service" },
  { id: "contact", numeral: "VII", label: "Correspondence" },
] as const;

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
};
