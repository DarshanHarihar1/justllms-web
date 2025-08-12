'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Home, 
  Github, 
  Download, 
  Zap, 
  Settings, 
  Brain, 
  Code, 
  Book, 
  Database, 
  BarChart3, 
  Search, 
  Shield,
  ChevronRight,
  MessageSquare,
  Layers,
  Clock,
  CheckCircle,
  ArrowUp
} from 'lucide-react'

const SyntaxHighlighter = ({ code }: { code: string }) => {
  const lines = code.split('\n')
  
  const highlightLine = (line: string) => {
    if (!line.trim()) return <span className="text-gray-300"> </span>
    
    // Process line character by character to avoid token conflicts
    const result: React.ReactNode[] = []
    let i = 0
    let currentToken = ''
    let inString = false
    let stringChar = ''
    let inComment = false
    
    const flushToken = (className = 'text-gray-300') => {
      if (currentToken) {
        result.push(<span key={result.length} className={className}>{currentToken}</span>)
        currentToken = ''
      }
    }
    
    const isKeyword = (word: string) => 
      /^(from|import|def|class|if|else|elif|try|except|for|while|with|as|return|yield|lambda|and|or|not|in|is|True|False|None)$/.test(word)
    
    const isBuiltin = (word: string) => 
      /^(print|len|str|int|float|list|dict|set|tuple|range|client|response)$/.test(word)
    
    const isClassName = (word: string) => 
      /^[A-Z][a-zA-Z0-9_]*$/.test(word)
    
    while (i < line.length) {
      const char = line[i]
      
      // Handle comments
      if (char === '#' && !inString) {
        flushToken()
        result.push(<span key={result.length} className="text-gray-500">{line.slice(i)}</span>)
        break
      }
      
      // Handle strings
      if ((char === '"' || char === "'") && !inComment) {
        if (!inString) {
          flushToken()
          inString = true
          stringChar = char
          currentToken = char
        } else if (char === stringChar) {
          currentToken += char
          flushToken('text-green-400')
          inString = false
          stringChar = ''
        } else {
          currentToken += char
        }
      } else if (inString) {
        currentToken += char
      }
      // Handle regular tokens
      else if (/\w/.test(char)) {
        currentToken += char
      } else {
        if (currentToken) {
          let className = 'text-gray-300'
          if (isKeyword(currentToken)) className = 'text-pink-400'
          else if (isBuiltin(currentToken)) className = 'text-yellow-400'
          else if (isClassName(currentToken)) className = 'text-blue-300'
          flushToken(className)
        }
        result.push(<span key={result.length} className="text-gray-300">{char}</span>)
      }
      
      i++
    }
    
    // Flush any remaining token
    if (currentToken) {
      let className = 'text-gray-300'
      if (inString) className = 'text-green-400'
      else if (isKeyword(currentToken)) className = 'text-pink-400'
      else if (isBuiltin(currentToken)) className = 'text-yellow-400'
      else if (isClassName(currentToken)) className = 'text-blue-300'
      flushToken(className)
    }
    
    return result
  }

  return (
    <div>
      {lines.map((line, index) => (
        <div key={index}>
          {highlightLine(line)}
        </div>
      ))}
    </div>
  )
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('installation')

  const sections = [
    { id: 'installation', title: 'Installation', icon: Download },
    { id: 'quick-start', title: 'Quick Start', icon: Zap },
    { id: 'multi-provider', title: 'Multi-Provider Support', icon: Settings },
    { id: 'rag', title: 'RAG Integration', icon: Search },
    { id: 'intelligent-routing', title: 'Intelligent Routing', icon: Brain },
    { id: 'streaming', title: 'Real-time Streaming', icon: Code },
    { id: 'conversation', title: 'Conversation Management', icon: MessageSquare },
    { id: 'caching', title: 'Smart Caching', icon: Database },
    { id: 'analytics', title: 'Enterprise Analytics', icon: BarChart3 },
    { id: 'validation', title: 'Business Rules & Validation', icon: Shield },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  // Auto-detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean)

      const currentSection = sectionElements.find(element => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const CodeBlock = ({ 
    title, 
    code, 
    language = 'python',
    description 
  }: { 
    title: string
    code: string
    language?: string
    description?: string
  }) => (
    <div className="relative bg-gray-950/80 backdrop-blur-xl border border-gray-800/50 rounded-xl overflow-hidden mb-6">
      <div className="flex items-center justify-between p-3 border-b border-gray-800/50 bg-gray-900/50">
        <div>
          <span className="text-white font-medium text-sm">{title}</span>
          {description && <p className="text-gray-400 text-xs mt-1">{description}</p>}
        </div>
        <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
          {language}
        </span>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code>
            <SyntaxHighlighter code={code} />
          </code>
        </pre>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen text-white relative">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
                <Home className="w-5 h-5" />
                <span className="font-semibold">JustLLMs</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">Documentation</span>
            </div>
            <a
              href="https://github.com/just-llms/justllms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map(({ id, title, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        activeSection === id
                          ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              {/* Hero */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Just
                  </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    LLMs
                  </span>{' '}
                  Documentation
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Complete guide to building production-ready LLM applications with intelligent routing, 
                  enterprise analytics, and multi-provider management.
                </p>
              </div>

              {/* Installation */}
              <section id="installation" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Download className="w-8 h-8 text-blue-400" />
                  Installation
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Get started with JustLLMs in seconds. Choose the installation option that fits your needs.
                </p>
                
                <div className="space-y-6">
                  <CodeBlock
                    title="Basic Installation"
                    language="bash"
                    code="pip install justllms"
                  />

                  <CodeBlock
                    title="With PDF Export Support"
                    language="bash"
                    code="pip install justllms[pdf]"
                  />

                  <CodeBlock
                    title="Full Installation (All Features)"
                    language="bash"
                    code="pip install justllms[all]"
                    description="Includes PDF export, Redis caching, and advanced analytics"
                  />

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-300 mb-2">📦 Package Stats</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white ml-2 font-mono">1.1MB</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Lines of Code:</span>
                        <span className="text-white ml-2 font-mono">~11K</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Dependencies:</span>
                        <span className="text-white ml-2">Minimal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  Quick Start
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Get your first LLM response in under 30 seconds with automatic provider routing.
                </p>

                <CodeBlock
                  title="Quick Start Example"
                  code={`from justllms import JustLLM

# Initialize with your API keys
client = JustLLM({
    "providers": {
        "openai": {"api_key": "your-openai-key"},
        "google": {"api_key": "your-google-key"},
        "anthropic": {"api_key": "your-anthropic-key"}
    }
})

# Simple completion - automatically routes to best provider
response = client.completion.create(
    messages=[{"role": "user", "content": "Explain quantum computing"}]
)

print(response.content)
print(f"Used provider: {response.provider}")
print(f"Cost: \${response.cost:.4f}")`}
                />

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <h4 className="font-semibold text-green-300 mb-2">✅ That's it!</h4>
                  <p className="text-gray-300">
                    JustLLMs automatically chose the best provider based on cost, availability, and performance. 
                    No manual provider switching required.
                  </p>
                </div>
              </section>

              {/* Multi-Provider Support */}
              <section id="multi-provider" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Settings className="w-8 h-8 text-purple-400" />
                  Multi-Provider Support
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Connect to all major LLM providers with a single, consistent interface.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    'OpenAI (GPT-5, GPT-4, etc.)',
                    'Google (Gemini 2.0, Gemini 1.5)',
                    'Anthropic (Claude 3.5, Claude 3)',
                    'Azure OpenAI',
                    'xAI Grok',
                    'DeepSeek'
                  ].map((provider) => (
                    <div key={provider} className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{provider}</span>
                    </div>
                  ))}
                </div>

                <CodeBlock
                  title="Multi-Provider Configuration"
                  code={`from justllms import JustLLM

client = JustLLM({
    "providers": {
        "openai": {
            "api_key": "your-openai-key",
        },
        "anthropic": {
            "api_key": "your-anthropic-key",
        },
        "google": {
            "api_key": "your-google-key",
        }
    },
    "default_provider": "openai",  # Fallback if routing fails
    "timeout": 30  # Request timeout in seconds
})`}
                />
              </section>

              {/* RAG Integration */}
              <section id="rag" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Search className="w-8 h-8 text-emerald-400" />
                  RAG Integration
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Enterprise-ready document search and knowledge retrieval with support for multiple vector databases.
                </p>

                <CodeBlock
                  title="Setup RAG with Pinecone"
                  code={`from justllms.rag import RAGPipeline

rag = RAGPipeline({
    "vector_store": "pinecone",
    "pinecone_config": {
        "api_key": "your-pinecone-key",
        "environment": "us-east-1-aws",
        "index_name": "knowledge-base"
    },
    "embedding_model": "text-embedding-ada-002",
    "chunk_size": 1000,
    "chunk_overlap": 200
})`}
                />

                <CodeBlock
                  title="Index Documents"
                  code={`# Index PDF documents
rag.index_documents([
    "./documents/company_handbook.pdf",
    "./documents/product_specs.pdf",
    "./documents/faq.pdf"
])

# Index text content
rag.index_text(
    content="Your company policies and procedures...",
    metadata={"source": "hr_policies", "date": "2024-01-15"}
)`}
                />

                <CodeBlock
                  title="RAG-Enhanced Completions"
                  code={`# Ask questions with document context
response = client.completion.create(
    messages=[{
        "role": "user", 
        "content": "What is our remote work policy?"
    }],
    rag_enabled=True,
    rag_config={
        "top_k": 5,           # Retrieve top 5 relevant chunks
        "similarity_threshold": 0.7,
        "include_sources": True
    }
)

print(response.content)
print("Sources:")
for source in response.sources:
    print(f"- {source.filename} (page {source.page})")`}
                />
              </section>

              {/* Intelligent Routing */}
              <section id="intelligent-routing" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Brain className="w-8 h-8 text-pink-400" />
                  Intelligent Routing
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Automatically route requests to the optimal provider based on cost, speed, or quality preferences.
                </p>

                <CodeBlock
                  title="Cost-Optimized Routing"
                  code={`client = JustLLM({
    "providers": {...},
    "routing": {
        "strategy": "cost",          # Route to cheapest provider
        "fallback": True,           # Auto-fallback on failure
        "max_retries": 3,          # Retry failed requests
        "prefer_cached": True      # Use cached responses when available
    }
})`}
                />

                <CodeBlock
                  title="Speed-Optimized Routing"
                  code={`client = JustLLM({
    "providers": {...},
    "routing": {
        "strategy": "speed",        # Route to fastest provider
        "response_time_weight": 0.8, # How much to weight response time
        "availability_weight": 0.2   # How much to weight uptime
    }
})`}
                />

                <CodeBlock
                  title="Quality-Based Routing"
                  code={`client = JustLLM({
    "providers": {...},
    "routing": {
        "strategy": "quality",      # Route based on model capabilities
        "task_type": "reasoning",   # Options: reasoning, creative, coding
        "model_preferences": {
            "reasoning": ["gpt-4", "claude-3-5-sonnet"],
            "creative": ["gpt-4", "gemini-pro"],
            "coding": ["gpt-4", "claude-3-5-sonnet"]
        }
    }
})`}
                />

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                  <h4 className="font-semibold text-yellow-300 mb-2">💰 Cost Savings</h4>
                  <p className="text-gray-300">
                    Intelligent routing typically reduces LLM costs by 40-60% while maintaining quality. 
                    The system learns from usage patterns and automatically optimizes over time.
                  </p>
                </div>
              </section>

              {/* Real-time Streaming */}
              <section id="streaming" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Code className="w-8 h-8 text-green-400" />
                  Real-time Streaming
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Stream responses in real-time for better user experience with automatic provider streaming support.
                </p>

                <CodeBlock
                  title="Basic Streaming"
                  code={`# Stream a response
stream = client.completion.create(
    messages=[{"role": "user", "content": "Write a story about AI"}],
    stream=True
)

for chunk in stream:
    if chunk.content:
        print(chunk.content, end="", flush=True)
    if chunk.done:
        print(f"\\nCompleted using {chunk.provider}")
        break`}
                />

                <CodeBlock
                  title="Advanced Streaming with Error Handling"
                  code={`from justllms.exceptions import StreamingError

try:
    stream = client.completion.create(
        messages=[{"role": "user", "content": "Explain machine learning"}],
        stream=True,
        max_tokens=500,
        temperature=0.7
    )
    
    collected_content = ""
    for chunk in stream:
        if chunk.content:
            collected_content += chunk.content
            print(chunk.content, end="", flush=True)
        
        # Access streaming metadata
        if chunk.usage:
            print(f"\\nTokens used: {chunk.usage.total_tokens}")
            print(f"Cost so far: \${chunk.cost:.4f}")
            
except StreamingError as e:
    print(f"Streaming failed: {e}")
    # Automatically falls back to non-streaming
    response = client.completion.create(messages=messages)
    print(response.content)`}
                />
              </section>

              {/* Conversation Management */}
              <section id="conversation" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                  Conversation Management
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Maintain context across multiple exchanges with automatic conversation history and token management.
                </p>

                <CodeBlock
                  title="Conversation Sessions"
                  code={`# Create a conversation session
conversation = client.conversation.create(
    name="user_chat_001",
    max_history=10,        # Keep last 10 exchanges
    max_tokens=4000        # Auto-trim when approaching limits
)

# Add messages to conversation
conversation.add_user_message("What is machine learning?")
response1 = conversation.complete()
print(f"AI: {response1.content}")

# Continue the conversation - context is maintained
conversation.add_user_message("Give me a practical example")
response2 = conversation.complete()
print(f"AI: {response2.content}")

# View conversation history
print(f"Total exchanges: {len(conversation.history)}")
print(f"Total cost: \${conversation.total_cost:.4f}")`}
                />

                <CodeBlock
                  title="Conversation Persistence"
                  code={`# Save conversation to file
conversation.save("./conversations/user_001.json")

# Load conversation from file  
conversation = client.conversation.load("./conversations/user_001.json")

# Export conversation history
history = conversation.export(format="markdown")
with open("chat_history.md", "w") as f:
    f.write(history)`}
                />
              </section>

              {/* Smart Caching */}
              <section id="caching" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Database className="w-8 h-8 text-cyan-400" />
                  Smart Caching
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Reduce costs and improve response times with intelligent caching that understands semantic similarity.
                </p>

                <CodeBlock
                  title="Enable Caching"
                  code={`client = JustLLM({
    "providers": {...},
    "caching": {
        "enabled": True,
        "backend": "memory",        # Options: memory, redis, file
        "ttl": 3600,               # Cache for 1 hour
        "similarity_threshold": 0.85, # How similar queries must be
        "max_cache_size": 1000     # Maximum cached responses
    }
})`}
                />

                <CodeBlock
                  title="Redis Caching (Production)"
                  code={`client = JustLLM({
    "providers": {...},
    "caching": {
        "enabled": True,
        "backend": "redis",
        "redis_config": {
            "host": "localhost",
            "port": 6379,
            "password": "your_redis_password",
            "db": 0
        },
        "ttl": 86400,              # Cache for 24 hours
        "similarity_threshold": 0.90
    }
})`}
                />

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
                  <h4 className="font-semibold text-cyan-300 mb-2">⚡ Performance Impact</h4>
                  <p className="text-gray-300">
                    Smart caching typically improves response times by 90%+ for similar queries while 
                    reducing API costs. The system uses semantic similarity to match related questions.
                  </p>
                </div>
              </section>

              {/* Enterprise Analytics */}
              <section id="analytics" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-orange-400" />
                  Enterprise Analytics
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Comprehensive usage tracking with detailed cost analysis, performance insights, and exportable reports.
                </p>

                <CodeBlock
                  title="Enable Analytics"
                  code={`client = JustLLM({
    "providers": {...},
    "analytics": {
        "enabled": True,
        "track_costs": True,
        "track_performance": True,
        "track_usage": True,
        "export_format": "csv"      # Options: csv, json, pdf
    }
})`}
                />

                <CodeBlock
                  title="Generate Analytics Report"
                  code={`# Generate comprehensive usage report
report = client.analytics.generate_report(
    start_date="2024-01-01",
    end_date="2024-01-31",
    group_by="provider"     # Options: provider, model, user, date
)

print(f"Total requests: {report.total_requests}")
print(f"Total cost: \${report.total_cost:.2f}")
print(f"Average response time: {report.avg_response_time:.2f}s")

# Export to different formats
report.export("monthly_report.csv")
report.export("monthly_report.pdf")  # Requires justllms[pdf]

# Get top performers
top_models = report.get_top_models_by_performance()
cost_breakdown = report.get_cost_breakdown_by_provider()`}
                />

                <CodeBlock
                  title="Real-time Monitoring"
                  code={`# Set up real-time monitoring
monitor = client.analytics.create_monitor(
    alerts={
        "high_cost": {"threshold": 100, "period": "daily"},
        "slow_response": {"threshold": 5.0, "period": "hourly"},
        "error_rate": {"threshold": 0.05, "period": "hourly"}
    },
    webhooks=["https://your-app.com/webhook"]
)

# Check current metrics
metrics = client.analytics.get_current_metrics()
print(f"Requests today: {metrics.requests_today}")
print(f"Cost today: \${metrics.cost_today:.2f}")
print(f"Average response time: {metrics.avg_response_time:.2f}s")`}
                />
              </section>


              {/* Business Rules & Validation */}
              <section id="validation" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-red-400" />
                  Business Rules & Validation
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Implement content filtering, compliance rules, and response validation for enterprise safety.
                </p>

                <CodeBlock
                  title="Content Filtering"
                  code={`client = JustLLM({
    "providers": {...},
    "validation": {
        "input_filters": [
            {"type": "profanity", "action": "reject"},
            {"type": "pii", "action": "mask"},
            {"type": "custom", "pattern": r"confidential", "action": "alert"}
        ],
        "output_filters": [
            {"type": "harmful_content", "action": "reject"},
            {"type": "off_topic", "threshold": 0.3, "action": "flag"}
        ]
    }
})`}
                />

                <CodeBlock
                  title="Custom Validation Rules"
                  code={`from justllms.validation import ValidationRule

# Define custom validation
def financial_compliance_check(content):
    prohibited_terms = ["insider trading", "financial advice"]
    for term in prohibited_terms:
        if term.lower() in content.lower():
            return {"valid": False, "reason": f"Contains prohibited term: {term}"}
    return {"valid": True}

# Register custom validator
client.add_validation_rule(
    ValidationRule(
        name="financial_compliance",
        validator=financial_compliance_check,
        apply_to="output"
    )
)

# Responses are automatically validated
response = client.completion.create(
    messages=[{"role": "user", "content": "Tell me about stocks"}]
)
print(f"Validation passed: {response.validation.passed}")
print(f"Validation flags: {response.validation.flags}")`}
                />
              </section>


            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 opacity-80 hover:opacity-100"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}