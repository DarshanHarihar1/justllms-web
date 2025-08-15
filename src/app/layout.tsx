import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://justllms.dev'),
  title: 'JustLLMs - Production-Ready Python Library for Multiple LLM Providers',
  description: 'Simplify LLM integration with intelligent routing, cost optimization, and enterprise analytics. Support for OpenAI, Anthropic, Google, Azure, xAI, and DeepSeek. Reduce costs by 60% with automatic provider selection.',
  keywords: ['LLM', 'Large Language Models', 'OpenAI', 'Anthropic', 'Python library', 'AI routing', 'cost optimization', 'enterprise AI', 'multi-provider', 'intelligent routing', 'RAG', 'analytics'],
  authors: [{ name: 'JustLLMs Team' }],
  creator: 'JustLLMs',
  publisher: 'JustLLMs',
  robots: 'index, follow',
  verification: {
    google: 'P3p1NvH2w2zDYjosaO9T4HzKyql14j1UFzfzSuScUos',
  },
  openGraph: {
    title: 'JustLLMs - Production-Ready Python Library for Multiple LLM Providers',
    description: 'Simplify LLM integration with intelligent routing, cost optimization, and enterprise analytics. Reduce costs by 60% with automatic provider selection.',
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
    title: 'JustLLMs - Production-Ready Python Library',
    description: 'Simplify LLM integration with intelligent routing and cost optimization. Support for 6+ providers.',
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
              "description": "A production-ready Python library that simplifies working with multiple Large Language Model providers through intelligent routing, comprehensive analytics, and enterprise-grade features.",
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
              "keywords": "LLM, Large Language Models, OpenAI, Anthropic, Python, AI routing, cost optimization",
              "releaseNotes": "Production-ready with intelligent routing and enterprise analytics",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "@ratingCount": "1"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}