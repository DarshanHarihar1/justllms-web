'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

interface CodeBlock3DProps {
  code: string
  title: string
  language?: string
}

function FloatingCodePanel({ 
  text, 
  position, 
  rotation 
}: { 
  text: string
  position: [number, number, number]
  rotation: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color="#1f2937"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <Html
        position={position}
        transform
        distanceFactor={10}
        style={{
          width: '300px',
          height: '200px',
          pointerEvents: 'none',
        }}
      >
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-xs font-mono text-green-400 overflow-hidden">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {text}
          </pre>
        </div>
      </Html>
    </Float>
  )
}

function SyntaxHighlighter({ code }: { code: string }) {
  const lines = code.split('\n')
  
  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        let className = 'text-gray-300'
        
        if (line.includes('from') || line.includes('import')) {
          className = 'text-purple-400'
        } else if (line.includes('client') || line.includes('JustLLM')) {
          className = 'text-blue-400'
        } else if (line.includes('"') || line.includes("'")) {
          className = 'text-green-400'
        } else if (line.includes('#')) {
          className = 'text-gray-500'
        } else if (line.includes('def') || line.includes('class')) {
          className = 'text-yellow-400'
        }
        
        return (
          <div key={index} className={`${className} leading-relaxed`}>
            <span className="text-gray-500 mr-3 select-none">{(index + 1).toString().padStart(2, ' ')}</span>
            {line || ' '}
          </div>
        )
      })}
    </div>
  )
}

function ParticleSystem({ count = 50 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.02
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
  }

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2]
        
        // Wrap around
        if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1
        if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1
        if (Math.abs(positions[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.6}
      />
    </points>
  )
}

export default function CodeBlock3D({ code, title, language = 'python' }: CodeBlock3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const codeSnippets = [
    'from justllms import JustLLM\n\nclient = JustLLM({\n  "providers": {\n    "openai": {"api_key": "key"}\n  }\n})',
    'response = client.completion.create(\n  messages=[{\n    "role": "user",\n    "content": "Hello AI!"\n  }]\n)',
    'client = JustLLM({\n  "routing": {\n    "strategy": "cost"\n  }\n})\n\n# Auto-routes to cheapest'
  ]

  return (
    <div 
      className="w-full h-[400px] relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#6366f1" />
        
        {/* Particle system background */}
        <ParticleSystem count={30} />
        
        {/* Floating code panels */}
        <FloatingCodePanel
          text={codeSnippets[0]}
          position={[-2, 0.5, -1]}
          rotation={[0, 0.3, 0]}
        />
        
        <FloatingCodePanel
          text={codeSnippets[1]}
          position={[2, 0, -0.5]}
          rotation={[0, -0.3, 0]}
        />
        
        <FloatingCodePanel
          text={codeSnippets[2]}
          position={[0, -1, -1.5]}
          rotation={[0.2, 0, 0]}
        />
        
        {/* Central glowing orb */}
        <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial
              color="#6366f1"
              metalness={0.8}
              roughness={0.2}
              emissive="#6366f1"
              emissiveIntensity={isHovered ? 0.5 : 0.2}
            />
          </mesh>
        </Float>
      </Canvas>
      
      {/* Code overlay */}
      <div className="absolute inset-4 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">{title}</h3>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="font-mono text-sm">
          <SyntaxHighlighter code={code} />
        </div>
      </div>
      
      {/* Language indicator */}
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
        {language}
      </div>
      
      {/* Interactive hint */}
      <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
        Hover to illuminate 3D elements
      </div>
    </div>
  )
}