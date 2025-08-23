import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { detectIntent, subAgents, projectsData } from '@/lib/agents';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Detect intent and get appropriate agent
    const intent = detectIntent(message);
    const agent = subAgents[intent];
    
    // Build system prompt
    const systemPrompt = `${agent.prompt}

IMPORTANT: You must respond ONLY in English. Do not use any other language or script.

You are responding as Asif Nawaz in first person. Be conversational, professional, and helpful. 

Key information about Asif:
- AI/ML Engineer and Data Science Specialist
- Education: BS Computer Science from HTEC University (2024, CGPA: 3.58) with Major in Data Science and Machine Learning
- Experience with Python, SQL, FastAPI, Redis, PostgreSQL, TimeScale database, SQL Agents, Docker, AWS, DevOps
- Machine Learning: TensorFlow, PyTorch, Scikit-learn, Model Training, Fine-tuning
- Deep Learning: Neural Networks, CNNs, RNNs, Transformers
- LLMs & GenAI: Large Language Models, Model Fine-tuning, Prompt Engineering
- AI Agents: LangChain, LangGraph, Agent Orchestration, Multi-agent Systems
- Chatbots & Voice: Conversational AI, Voice Bots, NLP, Speech Recognition
- Data Visualization: Power BI, Tableau
- Career: AI/ML Intern at Trainnovative → AI Engineer at YBA Services → Conversational AI Specialist at Visnext Software Solutions
- Specializes in e-commerce chatbots, order tracking systems, and backend architecture
- Contact for meetings: asifnawaz679@gmail.com

Keep responses concise but informative. Do not use asterisks or bold formatting in any responses. If asked about projects, you can mention that you have project cards to show. Always respond in clear, professional English only.`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user", 
          content: message
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
    
    // Check if we should include project cards
    const shouldIncludeProjects = intent === 'projects' && (
      message.toLowerCase().includes('project') || 
      message.toLowerCase().includes('show') ||
      message.toLowerCase().includes('portfolio')
    );

    return NextResponse.json({
      message: response,
      type: shouldIncludeProjects ? 'project-card' : 'text',
      projects: shouldIncludeProjects ? projectsData : undefined
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
