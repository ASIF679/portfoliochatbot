'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Github, Linkedin, Mail, Menu, X, Calendar, UserCircle, Wrench, Rocket, Briefcase, GraduationCap, Clock } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'project-card'
  projects?: Project[]
}

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

const navigationItems = [
  { id: 'about', label: 'About', icon: UserCircle },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'availability', label: 'Availability', icon: Clock },
]

export default function PortfolioChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isInitialized) {
      setMessages([
        {
          id: '1',
          content: "Hi! I'm Asif 😊\n\nI'm an AI/ML Engineer and Data Science Specialist. I design and deploy AI/ML models, chatbots, and data-driven solutions.\n\nFeel free to ask me about my experience, projects, skills, or availability for meetings!",
          sender: 'bot',
          timestamp: new Date(),
        }
      ])
      setIsInitialized(true)
    }
  }, [isInitialized])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim()
    if (!messageToSend) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      })

      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'bot',
        timestamp: new Date(),
        type: data.type || 'text',
        projects: data.projects || undefined,
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again!",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAvailabilitySlots = () => {
    const slots = []
    const today = new Date()
    
    // Generate slots for next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      
      // Morning slots (8 AM - 10:30 AM)
      const morningSlots = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM']
      const randomMorning = morningSlots[Math.floor(Math.random() * morningSlots.length)]
      
      // Evening slots (8:30 PM - 10:00 PM)
      const eveningSlots = ['8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']
      const randomEvening = eveningSlots[Math.floor(Math.random() * eveningSlots.length)]
      
      slots.push(`${dayName}, ${dateStr} at ${randomMorning}`)
      slots.push(`${dayName}, ${dateStr} at ${randomEvening}`)
    }
    
    return slots.slice(0, 5) // Return 5 random slots
  }

  const handleScheduleMeeting = () => {
    const availableSlots = generateAvailabilitySlots()
    const subject = "Meeting Request - Portfolio Discussion"
    const body = `Hi Asif,

I would like to schedule a meeting to discuss your portfolio and potential opportunities.

Here are some available time slots that work for me:
${availableSlots.map((slot, index) => `${index + 1}. ${slot}`).join('\n')}

Please let me know which time works best for you, or suggest an alternative time.

Best regards`

    const mailtoLink = `mailto:asifnawaz679@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
  }

  const handleQuickAction = (action: string) => {
    const prompts = {
      about: "Tell me about yourself",
      skills: "What are your technical skills?",
      projects: "Show me your projects",
      experience: "Tell me about your work experience",
      education: "What's your educational background?",
      availability: "When are you available for meetings?",
    }
    
    handleSendMessage(prompts[action as keyof typeof prompts])
    setIsSidebarOpen(false)
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white rounded-lg p-4 shadow-soft border border-gray-100 mb-3">
      <h4 className="font-semibold text-gray-800 mb-2">{project.title}</h4>
      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex h-[90vh]">
            {/* Left Sidebar */}
            <div className="w-80 bg-white/50 backdrop-blur-sm border-r border-gray-200/50 p-6">
              <div className="space-y-3">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleQuickAction(item.id)}
                      className="w-full flex items-center justify-between p-3 text-left bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 group shadow-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent size={18} className="text-white" />
                        <span className="font-medium text-white group-hover:text-gray-100">{item.label}</span>
                      </div>
                      <span className="text-gray-200">›</span>
                    </button>
                  );
                })}
                <button 
                  onClick={handleScheduleMeeting}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Calendar size={18} />
                  <span>Schedule a Meeting</span>
                </button>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                        <span className="text-white font-bold">AN</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">Asif Nawaz — AI/ML Engineer</h1>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className="text-sm">AI Nawazz</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.sender === 'bot' && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 shadow-lg border border-blue-200 max-w-md">
                          <div className="text-gray-800 whitespace-pre-wrap mb-4">
                            {message.content}
                          </div>
                          
                          {/* Tech Stack Icons */}
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                              <span className="text-xs font-semibold text-blue-600">🐍</span>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                              <span className="text-xs font-semibold text-orange-600">SQL</span>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                              <span className="text-xs font-semibold text-red-600">🔥</span>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                              <span className="text-xs font-semibold text-green-600">TF</span>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                              <span className="text-xs font-semibold text-purple-600">🦜</span>
                            </div>
                          </div>

                          {/* Tech Labels */}
                          <div className="flex items-center space-x-3 text-xs text-gray-600">
                            <span>Python</span>
                            <span>SQL</span>
                            <span>PyTorch</span>
                            <span>TensorFlow</span>
                            <span>LangChain</span>
                          </div>

                          {/* Powered by */}
                          <div className="mt-4 flex items-center space-x-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-gray-500">Powered by</span>
                          </div>

                          {message.projects && (
                            <div className="mt-3">
                              {message.projects.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {message.sender === 'user' && (
                        <div className="bg-blue-500 text-white rounded-2xl p-4 max-w-md">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 shadow-lg border border-blue-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200/50 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder="Ask me about my experience, projects, or availability..."
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-purple-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
