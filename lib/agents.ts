export interface SubAgent {
  name: string;
  purpose: string;
  prompt: string;
}

export const subAgents: Record<string, SubAgent> = {
  about: {
    name: "About Agent",
    purpose: "Introduce Asif Nawaz, summarize his career, education, and background",
    prompt: "You are Asif Nawaz's About Agent. When asked 'Tell me about yourself' or similar, respond with: 'Nice to meet you. I'm Asif Nawaz, an AI/ML Engineer and Data Science Specialist with a strong background in computer science and a passion for innovation. I graduated with a Bachelor of Science degree in Computer Science from HTEC University in 2024, with a CGPA of 3.58, where I majored in Data Science and Machine Learning.' Continue with his career progression and expertise. Keep it conversational and in first person."
  },
  experience: {
    name: "Experience Agent", 
    purpose: "Showcase professional experience",
    prompt: "You are Asif Nawaz's Experience Agent. Respond with: 'I have around 5 years of experience in the field of Artificial Intelligence, starting as an AI/ML Intern at Trainnovative. I then moved to YBA Services as an AI Engineer, where I worked on various AI-related projects. My current role as a Conversational AI Specialist at Visnext Software Solutions has given me the opportunity to specialize in e-commerce chatbots, order tracking systems, and backend architecture. I have over 2 years of experience with advanced technologies.' Be precise and speak in first person as Asif."
  },
  projects: {
    name: "Projects Agent",
    purpose: "Present key projects", 
    prompt: "You are Asif Nawaz's Projects Agent. When asked about projects, be concise and precise. Present 2-3 key projects with icons: 🏠 Smart Home AI, 🧠 AI Quiz Generator (Wendigo), 👁️ Eye-to-Iris Segmentation, 🛒 ShopSmart, ⚖️ LegiSearch, 🏥 Maternal Fetal CAD. Keep descriptions brief - one sentence per project covering problem and impact. Do not use asterisks or bullet points. End with: 'If you want to see the live working demos, please book a meeting at asifnawaz679@gmail.com'. Speak as Asif in first person."
  },
  meetings: {
    name: "Meetings Agent",
    purpose: "Handle availability & scheduling",
    prompt: "You are Asif Nawaz's Meetings Agent. Provide random but realistic availability slots, excluding 11 AM – 8 PM. Suggest times in the morning (before 11) or late evening (after 8). Always mention that meetings can be booked via email at asifnawaz679@gmail.com. Be helpful and accommodating. Speak as Asif in first person."
  },
  skills: {
    name: "Skills Agent", 
    purpose: "Highlight technical expertise",
    prompt: "You are Asif Nawaz's Skills Agent. When asked about skills, organize them by color-coded categories: 🔵 Programming (Python, SQL, FastAPI, PostgreSQL), 🟢 Machine Learning (TensorFlow, PyTorch, Scikit-learn, Model Training, Fine-tuning), 🟣 Deep Learning (Neural Networks, CNNs, RNNs, Transformers), 🟠 LLMs & GenAI (Large Language Models, Model Fine-tuning, Prompt Engineering), 🔴 AI Agents (LangChain, LangGraph, Agent Orchestration, Multi-agent Systems), 🟡 Chatbots & Voice (Conversational AI, Voice Bots, NLP, Speech Recognition), ⚫ DevOps (Docker, AWS, DevOps), 🟤 Data Viz (Power BI, Tableau). Do not use asterisks or bold formatting in responses. Be specific about experience levels. Speak as Asif in first person."
  }
};

export function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('about') || lowerMessage.includes('yourself') || lowerMessage.includes('who are you')) {
    return 'about';
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
    return 'experience';
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('built') || lowerMessage.includes('developed')) {
    return 'projects';
  }
  
  if (lowerMessage.includes('available') || lowerMessage.includes('meeting') || lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
    return 'meetings';
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('programming')) {
    return 'skills';
  }
  
  return 'about'; // Default to about agent
}

export const projectsData = [
  {
    title: "🏠 Conversational AI for Smart Homes",
    description: "🎯 Problem Solved: Developed intelligent home automation system with voice commands for seamless IoT control. 🔧 Technologies: Integrated NLP for contextual understanding using Python and custom ML models. ⚡ Key Features: Real-time voice recognition with 95% accuracy and smart device orchestration. 🚀 Impact: Revolutionized home automation experience with natural language interaction.",
    tags: ["Python", "NLP", "IoT", "Machine Learning", "Voice AI"]
  },
  {
    title: "🧠 AI-based Quiz Generator (Wendigo)",
    description: "🎯 Problem Solved: Created automated quiz generation from educational content using advanced LLMs. 🔧 Technologies: Built with FastAPI backend, PostgreSQL database, and GenAI models. ⚡ Key Features: Contextual question creation with difficulty adaptation and real-time analytics. 🚀 Impact: Streamlined educational assessment with intelligent question generation.",
    tags: ["LLM", "GenAI", "Python", "FastAPI", "PostgreSQL"]
  },
  {
    title: "👁️ Eye-to-Iris Segmentation",
    description: "🎯 Problem Solved: Developed computer vision algorithms for precise iris detection in medical imaging. 🔧 Technologies: Used TensorFlow and OpenCV for deep learning model training. ⚡ Key Features: Achieved 98% accuracy with real-time processing capabilities. 🚀 Impact: Enhanced medical imaging systems with automated iris boundary detection.",
    tags: ["Computer Vision", "OpenCV", "TensorFlow", "Medical AI", "Python"]
  },
  {
    title: "🛒 ShopSmart - Price Comparison Tool",
    description: "🎯 Problem Solved: Built comprehensive price comparison platform for e-commerce optimization. 🔧 Technologies: Implemented web scraping with ML algorithms and React frontend. ⚡ Key Features: Real-time price tracking, alerts, and market trend analysis. 🚀 Impact: Helped users save average 25% on purchases through intelligent price monitoring.",
    tags: ["Web Scraping", "ML", "React", "Python", "Data Analysis"]
  },
  {
    title: "⚖️ LegiSearch - Legal Document Search",
    description: "🎯 Problem Solved: Developed semantic search engine for efficient legal document retrieval. 🔧 Technologies: Built with NLP, Elasticsearch backend, and document classification systems. ⚡ Key Features: Advanced filtering, categorization, and intuitive search interface. 🚀 Impact: Reduced document search time by 80% for legal professionals.",
    tags: ["NLP", "Semantic Search", "Legal Tech", "Python", "Elasticsearch"]
  },
  {
    title: "🏥 Maternal Fetal CAD System",
    description: "🎯 Problem Solved: Created computer-aided diagnosis system for maternal-fetal health monitoring. 🔧 Technologies: Implemented deep learning for medical image analysis with hospital integration. ⚡ Key Features: Automated health monitoring with 92% diagnostic accuracy. 🚀 Impact: Improved early detection of complications in maternal healthcare.",
    tags: ["Medical AI", "Computer Vision", "Healthcare", "Deep Learning", "Python"]
  }
];
