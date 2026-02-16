/**
 * Projects section: cards data, filter tabs, and type styling.
 * Add or edit project cards here to keep Projects.jsx focused on layout and behavior.
 */

export const projectTypes = {
  professional: { label: 'Professional', class: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
  academic: { label: 'Academic', class: 'bg-slate-600/50 text-gray-300 border-slate-500/50' },
  internship: { label: 'Internship', class: 'bg-slate-600/50 text-gray-300 border-slate-500/50' },
  personal: { label: 'Personal', class: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
}

export const TAG_CLASS = 'bg-violet-700/40 text-violet-100 border-violet-500/60'

export const FILTER_CATEGORIES = [
  { id: 'professional', label: 'Professional' },
  { id: 'academic', label: 'Academic' },
  { id: 'personal', label: 'Personal' },
]

export const projects = [
  {
    title: 'Agentic AI Survey System',
    subtitle: 'AI-Powered Survey Generation & Analysis Platform',
    type: 'professional',
    image: '/projects/survey-system.jpg',
    description: 'Production-ready FastAPI backend with multi-agent architecture (4 specialized agents) automating end-to-end survey lifecycle: conversational generation, document extraction, knowledge-base search, and response analysis. LangGraph-based multi-step agentic workflow (9 stages) with episodic memory. Multi-collection vector database (Qdrant) with hybrid semantic+keyword search and PostgreSQL. Conversational chat with PostgreSQL-backed memory, LRU caching, multi-user support. Statistical and sentiment analysis pipelines with LLM-generated executive summaries. Langfuse for observability, prompt management, A/B testing, API auth, and rate limiting.',
    tech: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'OpenRouter', 'Google Gemini', 'Qdrant', 'PostgreSQL', 'spaCy', 'Docling', 'Tesseract', 'Docker', 'Langfuse'],
    tag: 'Agentic AI / Multi-Agent',
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'Agentic AI Evaluator',
    subtitle: 'Multi-Agent Agricultural Trial Evaluation System',
    type: 'professional',
    image: '/eval1_of3csr.png',
    images: ['/eval1_of3csr.png', '/eval2_qot7rd.png', '/eval3_kp3byo.png', '/eval4_ggk8ir.png', '/eval5_vqqphp.png'],
    description: '8-stage LangGraph workflow to process agricultural demo trial PDFs with quality gates and automatic retries. CrewAI multi-agent evaluation layer (4 specialized agents) with confidence-scored quality assessment. Hybrid semantic + keyword search over Qdrant with ensemble retriever. Conversational AI agent with 30+ specialized tools and PostgreSQL-backed memory, supporting Taglish/Filipino/English. Redis + ARQ background workers for async job processing, API authentication, rate limiting, and full LLM observability.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'CrewAI', 'LangChain', 'Google Gemini', 'OpenRouter', 'Qdrant', 'PostgreSQL', 'Redis/ARQ', 'Docker', 'Langfuse'],
    tag: 'Agentic AI / Multi-Agent',
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'Black Sigatoka Early Stage Detection System',
    subtitle: 'Banana Leaf Disease Detection using Computer Vision',
    type: 'professional',
    image: '/projects/black-sigatoka.jpg',
    description: 'End-to-end ML pipeline for 7 disease stages with strict image quality checks, intelligent 256×256 tiling, and stratified train-val-test split. YOLO12n model on combined dataset with unified 7-class mapping, real-time augmentation, and hyperparameter tuning (mAP50, precision, recall, F1). FastAPI inference service with validation, error handling, and model caching. Docker and Docker Compose for production deployment.',
    tech: ['Python', 'Ultralytics YOLO (YOLO12n)', 'PyTorch', 'OpenCV', 'Pillow', 'FastAPI', 'Docker', 'Jupyter'],
    tag: 'Computer Vision & Object Detection',
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'RHive (Research Hive)',
    subtitle: 'Thesis/Capstone Management System',
    type: 'academic',
    image: '/rhive1_wxjwpl.png',
    images: ['/rhive1_wxjwpl.png', '/rhive2_c0dpbd.png', '/rhive3_qt2y1n.png', '/rhive4_irbkdg.png'],
    description: 'Led design and implementation of IMRaD manuscript generation module, transforming raw research content into structured academic drafts. NLP-powered pipeline (Python + FastAPI) with preprocessing, section detection, and LLM-based prompts for IMRaD formatting. Integrated with main RHive web platform for automated manuscript formatting. Thesis system achieved ISO 25010:2023 software quality rating of 4.4 (Effective/Highly Effective) for usability, reliability, and security.',
    tech: ['Vite React', 'Tailwind CSS', 'Node.js', 'Express.js', 'Python (FastAPI)', 'Firestore', 'NLP/LLM'],
    tag: 'NLP & LLM Document Formatting',
    github: 'https://github.com/Cjoved/imrad-gen',
    demo: null,
  },
  {
    title: 'ReminderU',
    subtitle: 'Schedule & reminder app with intent-based chatbot and TTS alarms',
    type: 'academic',
    image: '/remideru1_rzfj9q.png',
    images: ['/remideru1_rzfj9q.png', '/remideru2_knlpbd.png', '/reminderu3_lkbwao.png'],
    description: "ReminderU has its own model for its chatbot feature using a Neural Network built with PyTorch, NLTK, and spaCy in Python. The model is served via a dedicated API that the mobile app calls to predict the user's intent. The app uses a custom dataset (AI-assisted) of natural scheduling statements, split into intents; the model only predicts intent, and the app then calls different API endpoints to add, update, or delete schedules. The alarm uses text-to-speech (expo-speech / react-native-tts) to remind the user of upcoming schedules—when and where they occur.",
    tech: ['Python', 'PyTorch', 'NLTK', 'spaCy', 'React Native', 'Expo', 'expo-speech', 'react-native-tts', 'Supabase', 'Express', 'TypeScript'],
    tag: 'Intent NLP & TTS',
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'Conversational Support & Ticketing System',
    subtitle: 'AI Intern – PROMPTING_AI AGENT',
    type: 'internship',
    image: '/support1_garqwr.png',
    images: ['/support1_garqwr.png', '/support2_o8qevh.png', '/support3_tq2fiw.png'],
    description: 'FastAPI + LangChain support agent routing user queries by intent and tone across multiple LLMs via OpenRouter. Intent and tone detection pipeline with LLM prompt design and retry/fallback logic. Ticketing workflow with automatic ticket creation (ID, priority, category, status) and database integration. /chat API with optional word-by-word streaming responses and cache management endpoints.',
    tech: ['Python', 'FastAPI', 'LangChain', 'OpenRouter (Mistral, DeepSeek, OpenChat)', 'MySQL', 'Pydantic'],
    tag: 'Conversational AI & LLM',
    github: 'https://github.com/Intern94/chat_support',
    demo: null,
  },
  {
    title: 'Portfolio (This Site)',
    subtitle: 'Personal portfolio — frontend-focused, in progress',
    type: 'personal',
    image: null,
    description: 'Single-page portfolio showcasing projects, skills, and contact. Built with React, responsive layout, project carousel with 3D-style cards, filterable sections (Professional / Academic / Personal), and modern UI with Tailwind CSS and Framer Motion. Frontend complete; more features planned.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite'],
    tag: 'Personal / Portfolio',
    github: 'https://github.com/Cjoved',
    demo: null,
  },
]
