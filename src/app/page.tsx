'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Zap, BarChart3, Shield, Cpu, Code, Github, Download, Star, CheckCircle, TrendingUp, Layers, Brain, Search, Book } from 'lucide-react'
import Link from 'next/link'

const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return <span>{displayedText}<span className="animate-pulse">|</span></span>
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  metric, 
  delay = 0,
  gradient 
}: { 
  icon: any
  title: string
  description: string
  metric: string
  delay?: number
  gradient: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500 blur-xl`}></div>
    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-500">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
      <div className="text-sm font-mono bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg inline-block text-green-400">
        {metric}
      </div>
    </div>
  </motion.div>
)

const ProviderBadge = ({ 
  name, 
  color, 
  isActive, 
  onClick 
}: { 
  name: string
  color: string
  isActive: boolean
  onClick: () => void
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
      isActive 
        ? `${color} text-white shadow-2xl` 
        : 'bg-white/10 text-gray-300 hover:bg-white/20'
    }`}
  >
    {isActive && (
      <motion.div
        layoutId="activeProvider"
        className={`absolute inset-0 rounded-full ${color} blur-lg opacity-50`}
        initial={false}
        transition={{ duration: 0.3 }}
      />
    )}
    <span className="relative z-10">{name}</span>
  </motion.button>
)

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
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    <div className="relative bg-gray-950/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50 bg-gray-900/50">
        <div>
          <h3 className="text-white font-semibold text-base">{title}</h3>
          {description && <p className="text-gray-400 text-xs mt-1">{description}</p>}
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium">
            {language}
          </span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full opacity-80"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-80"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full opacity-80"></div>
          </div>
        </div>
      </div>
      
      <div className="p-4 overflow-x-auto bg-gray-950/60">
        <pre className="text-sm leading-relaxed font-medium">
          <code className="text-gray-200">{code}</code>
        </pre>
      </div>
      
      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
    </div>
  </motion.div>
)

const StatCard = ({ 
  value, 
  label, 
  icon: Icon 
}: { 
  value: string
  label: string
  icon: any
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="text-center group cursor-pointer"
  >
    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </motion.div>
)

export default function Home() {
  const [activeProvider, setActiveProvider] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)

  const providers = [
    { name: 'OpenAI', color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { name: 'Google', color: 'bg-gradient-to-r from-red-400 to-yellow-500' },
    { name: 'Anthropic', color: 'bg-gradient-to-r from-purple-400 to-pink-500' },
    { name: 'Azure', color: 'bg-gradient-to-r from-blue-400 to-cyan-500' },
    { name: 'xAI', color: 'bg-gradient-to-r from-orange-400 to-red-500' },
    { name: 'DeepSeek', color: 'bg-gradient-to-r from-indigo-400 to-purple-500' },
  ]

  const features = [
    'Intelligent Routing',
    'Enterprise Analytics', 
    'RAG Integration',
    'Multi-Provider Support'
  ]

  useEffect(() => {
    const providerInterval = setInterval(() => {
      setActiveProvider((prev) => (prev + 1) % providers.length)
    }, 3000)

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2500)

    return () => {
      clearInterval(providerInterval)
      clearInterval(featureInterval)
    }
  }, [providers.length, features.length])

  return (
    <main className="min-h-screen text-white overflow-x-hidden relative">
      {/* Dynamic Gradient Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      </div>

      {/* Animated Mesh Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/6 to-pink-500/6 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />

        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">Production-Ready Python Library</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Just
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              LLMs
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            <TypewriterText text="git checkout -b feature/actually-working-llm-routing" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center mb-16"
          >
            <motion.a
              href="https://pypi.org/project/justllms/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-2xl transition-all duration-300 justify-center"
            >
              <Download className="w-5 h-5" />
              View on PyPI
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <Link href="/docs">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 backdrop-blur-sm rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all duration-300 justify-center cursor-pointer"
              >
                <Book className="w-5 h-5" />
                Documentation
              </motion.div>
            </Link>
            <motion.a
              href="https://github.com/just-llms/justllms"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 backdrop-blur-sm rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-all duration-300 justify-center"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <Star className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <StatCard value="60%" label="Cost Reduction" icon={TrendingUp} />
            <StatCard value="6+" label="LLM Providers" icon={Layers} />
            <StatCard value="1.1MB" label="Package Size" icon={Download} />
            <StatCard value="11K" label="Lines of Code" icon={Code} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/30 rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">JustLLMs</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Managing multiple LLM providers is complex. JustLLMs solves these challenges with intelligent routing that optimizes for cost, speed and quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">
                Multi-Provider <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Network</span>
              </h3>
              <p className="text-gray-400">Connect to all major LLM providers with a single interface</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {providers.map((provider, index) => (
                <ProviderBadge
                  key={provider.name}
                  name={provider.name}
                  color={provider.color}
                  isActive={activeProvider === index}
                  onClick={() => setActiveProvider(index)}
                />
              ))}
            </div>

            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-gray-300">
                Now featuring: <span className="text-blue-400 font-semibold">{features[currentFeature]}</span>
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Intelligent Routing"
              description="Automatically routes requests to the optimal provider based on cost, speed, or quality preferences with real-time analysis."
              metric="60% cost reduction"
              delay={0.2}
              gradient="from-yellow-400 to-orange-500"
            />

            <FeatureCard
              icon={BarChart3}
              title="Enterprise Analytics"
              description="Comprehensive usage tracking with detailed cost analysis, performance insights, and exportable reports for finance teams."
              metric="Export to CSV/PDF"
              delay={0.4}
              gradient="from-blue-400 to-cyan-500"
            />

            <FeatureCard
              icon={Search}
              title="RAG (Retrieval-Augmented Generation)"
              description="Enterprise-ready document search and knowledge retrieval with support for Pinecone, ChromaDB, and intelligent chunking strategies."
              metric="PDF processing & Vector search"
              delay={0.6}
              gradient="from-green-400 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 px-4 bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple to Start, <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Powerful</span> to Scale
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Get started in minutes with our intuitive API
            </p>
            <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2">
              <code className="text-green-400 font-mono">pip install justllms</code>
            </div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gray-950/90 backdrop-blur-xl border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-800/50 bg-gray-900/80">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-white font-semibold">💖 JustLLMs</span>
                  </div>
                  <span className="text-gray-400 text-sm">Quick Start Demo</span>
                </div>
                
                <div className="p-6 bg-gray-950/60">
                  <pre className="text-sm leading-relaxed font-mono">
                    <code>
                      <span className="text-pink-400">from</span> <span className="text-blue-300">justllms</span> <span className="text-pink-400">import</span> <span className="text-blue-300">JustLLM</span>
                      {"\n\n"}
                      <span className="text-gray-500"># One client, multiple providers, zero headaches</span>
                      {"\n"}
                      <span className="text-blue-300">client</span> <span className="text-pink-400">=</span> <span className="text-blue-300">JustLLM</span><span className="text-gray-200">({`{`}</span>
                      {"\n"}
                      {"    "}<span className="text-green-400">"providers"</span><span className="text-gray-200">: {`{`}</span>
                      {"\n"}
                      {"        "}<span className="text-green-400">"openai"</span><span className="text-gray-200">: {`{`}</span><span className="text-green-400">"api_key"</span><span className="text-gray-200">:</span> <span className="text-green-400">"&lt;openai_key&gt;"</span><span className="text-gray-200">{`},`}</span>
                      {"\n"}
                      {"        "}<span className="text-green-400">"anthropic"</span><span className="text-gray-200">: {`{`}</span><span className="text-green-400">"api_key"</span><span className="text-gray-200">:</span> <span className="text-green-400">"&lt;anthropic_key&gt;"</span><span className="text-gray-200">{`},`}</span>
                      {"\n"}
                      {"        "}<span className="text-green-400">"google"</span><span className="text-gray-200">: {`{`}</span><span className="text-green-400">"api_key"</span><span className="text-gray-200">:</span> <span className="text-green-400">"&lt;gemini_key&gt;"</span><span className="text-gray-200">{`}`}</span>
                      {"\n"}
                      {"    "}<span className="text-gray-200">{`},`}</span>
                      {"\n"}
                      {"    "}<span className="text-green-400">"routing"</span><span className="text-gray-200">: {`{`}</span>
                      {"\n"}
                      {"        "}<span className="text-green-400">"strategy"</span><span className="text-gray-200">:</span> <span className="text-green-400">"cost"</span><span className="text-gray-200">,</span>  <span className="text-gray-500"># Save 60% automatically</span>
                      {"\n"}
                      {"        "}<span className="text-green-400">"fallback"</span><span className="text-gray-200">:</span> <span className="text-purple-400">True</span>     <span className="text-gray-500"># Never fails</span>
                      {"\n"}
                      {"    "}<span className="text-gray-200">{`}`}</span>
                      {"\n"}
                      <span className="text-gray-200">{`})`}</span>
                      {"\n\n"}
                      <span className="text-gray-500"># That's it! JustLLMs handles the rest</span>
                      {"\n"}
                      <span className="text-blue-300">response</span> <span className="text-pink-400">=</span> <span className="text-blue-300">client</span><span className="text-gray-200">.</span><span className="text-blue-300">completion</span><span className="text-gray-200">.</span><span className="text-yellow-400">create</span><span className="text-gray-200">(</span>
                      {"\n"}
                      {"    "}<span className="text-blue-300">messages</span><span className="text-pink-400">=</span><span className="text-gray-200">[{`{`}</span><span className="text-green-400">"role"</span><span className="text-gray-200">:</span> <span className="text-green-400">"user"</span><span className="text-gray-200">,</span> <span className="text-green-400">"content"</span><span className="text-gray-200">:</span> <span className="text-green-400">"Hello world!"</span><span className="text-gray-200">{`}]`}</span>
                      {"\n"}
                      <span className="text-gray-200">)</span>
                      {"\n\n"}
                      <span className="text-yellow-400">print</span><span className="text-gray-200">(</span><span className="text-green-400">f"Response from {`{`}response.provider{`}`}: {`{`}response.content{`}`}"</span><span className="text-gray-200">)</span>
                    </code>
                  </pre>
                </div>
                
                <div className="h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop being the human <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">load balancer</span> for your LLM requests
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Built by developers who got tired of the same problems you're facing right now.
            </p>
            
            <div className="flex justify-center mb-12">
              <motion.a
                href="https://github.com/just-llms/justllms"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-2xl transition-all duration-300 justify-center"
              >
                <Github className="w-5 h-5" />
                Star on GitHub
                <Star className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="border-t border-white/10 pt-8 text-gray-400">
              <p>&copy; 2025 JustLLMs. MIT License.</p>
              <p className="mt-2">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">JustLLMs</span> - Simple to start, powerful to scale, intelligent by design.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}