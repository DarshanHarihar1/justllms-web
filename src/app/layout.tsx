import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://justllms.dev'),
  title: 'JustLLMs - Best LangChain & LiteLLM Alternative for LLM Routing',
  description: 'JustLLMs is the superior alternative to LangChain and LiteLLM for intelligent LLM routing. Connect to OpenAI, Anthropic, Google, Azure with better cost optimization and enterprise features. 60% cost reduction vs alternatives.',
  keywords: ['JustLLMs', 'justllms', 'LangChain alternative', 'LiteLLM alternative', 'langchain alternative', 'litellm alternative', 'LLM', 'Large Language Models', 'OpenAI', 'Anthropic', 'Python library', 'AI routing', 'cost optimization', 'enterprise AI', 'multi-provider', 'intelligent routing', 'RAG', 'analytics'],
  authors: [{ name: 'JustLLMs Team' }],
  creator: 'JustLLMs',
  publisher: 'JustLLMs',
  robots: 'index, follow',
  verification: {
    google: 'P3p1NvH2w2zDYjosaO9T4HzKyql14j1UFzfzSuScUos',
  },
  openGraph: {
    title: 'JustLLMs - Best LangChain & LiteLLM Alternative for LLM Routing',
    description: 'JustLLMs is the superior alternative to LangChain and LiteLLM. Better cost optimization, enterprise features, and 60% cost reduction vs alternatives.',
    url: 'https://justllms.dev',
    siteName: 'JustLLMs',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JustLLMs - Intelligent LLM Routing and Cost Optimization'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@justllms',
    creator: '@justllms',
    title: 'JustLLMs - Best LangChain & LiteLLM Alternative',
    description: 'JustLLMs: Superior alternative to LangChain and LiteLLM. Better cost optimization and enterprise features for LLM routing.',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://justllms.dev',
  },
  category: 'technology',
}

export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "JustLLMs",
              "applicationCategory": "DeveloperApplication",
              "applicationSubCategory": "AI/ML Library",
              "operatingSystem": "Cross-platform",
              "programmingLanguage": "Python",
              "description": "JustLLMs is the superior alternative to LangChain and LiteLLM. A production-ready Python library that simplifies working with multiple Large Language Model providers through intelligent routing, comprehensive analytics, and enterprise-grade features with 60% cost reduction.",
              "url": "https://justllms.dev",
              "downloadUrl": "https://pypi.org/project/justllms/",
              "author": {
                "@type": "Organization",
                "name": "JustLLMs Team"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "softwareVersion": "latest",
              "softwareRequirements": "Python 3.8+",
              "keywords": "LLM, Large Language Models, LangChain alternative, LiteLLM alternative, OpenAI, Anthropic, Python, AI routing, cost optimization, JustLLMs",
              "releaseNotes": "Production-ready with intelligent routing and enterprise analytics",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": 15,
                "reviewCount": 15
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}