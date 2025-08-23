# Asif Nawaz Portfolio Chatbot

A modern, interactive portfolio chatbot built with Next.js that represents Asif Nawaz, an AI/ML Engineer and Data Science Specialist. The chatbot uses Groq's Llama 70B model to provide intelligent responses about Asif's background, experience, projects, and availability.

## Features

- **Modern UI Design**: Clean, professional interface with soft shadows and rounded edges
- **Sub-Agent System**: Specialized agents for different topics (About, Experience, Projects, Skills, Availability)
- **Interactive Chat**: Real-time conversations with AI-powered responses
- **Project Cards**: Visual display of portfolio projects with tags and descriptions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Quick Actions**: Sidebar navigation for instant topic access

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: Groq SDK with Llama 3.1 70B model
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   The `.env.local` file is already configured with the Groq API key.

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
whyme/
├── app/
│   ├── api/chat/route.ts     # Groq API integration
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main chatbot interface
├── lib/
│   └── agents.ts            # Sub-agents configuration
├── .env.local               # Environment variables
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Sub-Agents

The chatbot includes specialized agents for different topics:

- **About Agent**: Personal introduction and background
- **Experience Agent**: Professional work history and roles
- **Projects Agent**: Portfolio projects with technical details
- **Skills Agent**: Technical expertise and tools
- **Meetings Agent**: Availability and scheduling

## Customization

To customize the chatbot for different users:

1. Update the agent prompts in `lib/agents.ts`
2. Modify the projects data in the same file
3. Adjust the UI colors and styling in `tailwind.config.js`
4. Update personal information in the main component

## Deployment

The project is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

```bash
npm run build
npm start
```

## Contact

For questions or customizations, reach out through the contact options in the chatbot interface.
