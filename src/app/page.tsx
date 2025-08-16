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
    <div className="relative bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl p-6 sm:p-8 h-full hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 sm:mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-300 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">{description}</p>
      <div className="text-xs sm:text-sm font-mono bg-white/[0.06] backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg inline-block text-emerald-400">
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
    className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
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
    <div className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-500/[0.12] to-purple-500/[0.12] mb-3 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
    </div>
    <div className="text-2xl sm:text-3xl font-semibold text-white mb-2">{value}</div>
    <div className="text-gray-400 text-xs sm:text-sm px-2">{label}</div>
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
      {/* Sophisticated Dark Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-purple-900/20"></div>
      </div>

      {/* Enhanced Aesthetic Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Left side decorative elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)'
          }}
        />
        
        {/* Left side floating orbs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 -left-10 w-24 h-24 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))'
          }}
        />
        
        {/* Left side accent lines */}
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-4 w-0.5 h-32 bg-gradient-to-b from-blue-400/20 to-transparent rounded-full"
        />
        
        {/* Right side decorative elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)'
          }}
        />
        
        {/* Right side floating orbs */}
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -right-8 w-20 h-20 rounded-full"
          style={{
            background: 'conic-gradient(from 180deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))'
          }}
        />
        
        {/* Right side accent lines */}
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [1, 1.3, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-2/3 right-4 w-0.5 h-24 bg-gradient-to-b from-purple-400/20 to-transparent rounded-full"
        />
        
        {/* Floating particles */}
        <motion.div
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-blue-400/50"
        />
        
        <motion.div
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-purple-400/50"
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-4 sm:px-6 py-2.5 mb-8 sm:mb-10 text-center hover:bg-white/[0.12] transition-all duration-300"
          >
            <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-200">Production-Ready Python Library</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 sm:mb-8 px-2 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Just
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LLMs
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 sm:mb-16 max-w-4xl mx-auto px-4"
          >
            <div className="relative group">
              {/* Terminal window */}
              <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-900/50 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">~/justllms</div>
                  <div className="text-xs text-gray-500">bash</div>
                </div>
                
                {/* Terminal content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 text-sm sm:text-base">$</span>
                    <div className="flex-1 font-mono text-sm sm:text-base md:text-lg text-gray-300">
                      <TypewriterText text="git checkout -b feature/actually-working-llm-routing" speed={30} />
                    </div>
                  </div>
                  
                  {/* Optional: Add a response line */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3 }}
                    className="mt-3 text-xs sm:text-sm text-gray-500 font-mono"
                  >
                    Switched to a new branch 'feature/actually-working-llm-routing'
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center mt-6 text-sm text-gray-400"
            >
              <span className="inline-block px-3 py-1 bg-white/[0.05] rounded-full border border-white/[0.08]">
                🚀 Ship faster with intelligent LLM routing
              </span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16 sm:mb-20 px-4 max-w-4xl mx-auto"
          >
            {/* PyPI Button */}
            <motion.a
              href="https://pypi.org/project/justllms/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl px-6 py-3.5 flex items-center justify-center gap-2.5">
                <Download className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">View on PyPI</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>

            {/* Documentation Button */}
            <Link href="/docs">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/[0.06] rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] rounded-xl px-6 py-3.5 flex items-center justify-center gap-2.5 group-hover:bg-white/[0.08] group-hover:border-white/[0.2] transition-all">
                  <Book className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Documentation</span>
                </div>
              </motion.div>
            </Link>

            {/* GitHub Button */}
            <motion.a
              href="https://github.com/just-llms/justllms"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/[0.06] rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] rounded-xl px-6 py-3.5 flex items-center justify-center gap-2.5 group-hover:bg-white/[0.08] group-hover:border-white/[0.2] transition-all">
                <Github className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">View on GitHub</span>
                <Star className="w-4 h-4 text-white/60" />
              </div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-6xl mx-auto"
          >
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 hover:border-green-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                  />
                </div>
                <div className="text-3xl font-bold text-white mb-1">60%</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Cost Reduction</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                    <Layers className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">6+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">LLM Providers</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                    <Download className="w-5 h-5 text-purple-400" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8"
                  >
                    <svg viewBox="0 0 32 32" className="w-full h-full">
                      <circle cx="16" cy="16" r="14" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="2" fill="none" />
                      <circle cx="16" cy="16" r="14" stroke="url(#purple-gradient)" strokeWidth="2" fill="none" strokeDasharray="20 100" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">1.1MB</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Package Size</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg">
                    <Code className="w-5 h-5 text-orange-400" />
                  </div>
                  <motion.div className="flex items-center space-x-0.5">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: [8, 16, 12, 20][i] }}
                        transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                        className="w-1 bg-gradient-to-t from-orange-400 to-red-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">11K</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Lines of Code</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 px-2 tracking-tight text-white">
              Why <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">JustLLMs</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
              Managing multiple LLM providers is complex. JustLLMs is the superior alternative to LangChain and LiteLLM, offering better cost optimization, enterprise features, and intelligent routing across all major AI providers.
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
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight">
                Multi-Provider <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Network</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">Connect to all major LLM providers with a single interface</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-4">
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
              <p className="text-lg text-gray-300 leading-relaxed">
                Now featuring: <span className="text-blue-400 font-semibold">{features[currentFeature]}</span>
              </p>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
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

      {/* Comparison Section */}
      <section className="py-16 sm:py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
              Why Choose JustLLMs Over <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Alternatives</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Unlike LangChain and LiteLLM, JustLLMs is purpose-built for enterprise production environments with superior cost optimization and intelligent routing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* JustLLMs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex px-3 py-1 bg-green-500/20 rounded-full mb-3">
                    <span className="text-green-400 font-semibold text-sm">RECOMMENDED</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">JustLLMs</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    60% cost reduction with intelligent routing
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    Enterprise analytics & usage tracking
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    Built-in RAG with vector search
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    Production-ready reliability
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    Lightweight (1.1MB package)
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* LangChain */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white">LangChain</h3>
                <p className="text-gray-400 text-sm">Framework Heavy</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  Complex setup and learning curve
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  No built-in cost optimization
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  Heavy dependencies (100MB+)
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  Limited enterprise features
                </li>
              </ul>
            </motion.div>

            {/* LiteLLM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-2xl p-6"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white">LiteLLM</h3>
                <p className="text-gray-400 text-sm">Basic Proxy</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  Basic routing without intelligence
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  Limited analytics capabilities
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  No RAG or vector search
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-4 h-4 bg-red-500/20 rounded-full mr-3 flex-shrink-0 flex items-center justify-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  </span>
                  Less enterprise-ready
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-400 mb-6">
              Join thousands of developers who switched from LangChain and LiteLLM to JustLLMs
            </p>
            <motion.a
              href="https://pypi.org/project/justllms/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5" />
              Try JustLLMs Today
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
              Simple to Start, <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Powerful</span> to Scale
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
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
                    <span className="text-white font-semibold">JustLLMs</span>
                  </div>
                  <span className="text-gray-400 text-sm">Quick Start Demo</span>
                </div>
                
                <div className="p-4 sm:p-6 bg-gray-950/60 overflow-x-auto code-scroll">
                  <pre className="text-xs sm:text-sm leading-relaxed font-mono whitespace-pre min-w-max">
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
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 tracking-tight">
              Stop being the human <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">load balancer</span> for your LLM requests
            </h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
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