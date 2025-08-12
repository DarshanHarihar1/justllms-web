'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Trail } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

interface RequestParticle {
  id: number
  startPos: [number, number, number]
  endPos: [number, number, number]
  color: string
  progress: number
  strategy: string
}

function MovingParticle({ particle, onComplete }: { particle: RequestParticle, onComplete: (id: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      particle.progress += delta * 0.5
      
      if (particle.progress >= 1) {
        onComplete(particle.id)
        return
      }

      const currentPos = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...particle.startPos),
        new THREE.Vector3(...particle.endPos),
        particle.progress
      )
      
      meshRef.current.position.copy(currentPos)
      meshRef.current.rotation.y += delta * 5
    }
  })

  return (
    <Trail
      width={0.2}
      length={0.8}
      color={particle.color}
      attenuation={(width) => width}
    >
      <mesh ref={meshRef} scale={0.1}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={particle.color}
          emissive={particle.color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Trail>
  )
}

function RoutingNode({ 
  position, 
  color, 
  label, 
  metric, 
  isOptimal 
}: { 
  position: [number, number, number]
  color: string
  label: string
  metric: string
  isOptimal: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && isOptimal) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1)
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
      <mesh ref={meshRef} position={position} scale={isOptimal ? 1.2 : 1}>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 8]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={isOptimal ? 0.4 : 0.1}
        />
      </mesh>
      
      <Html position={[position[0], position[1] - 1.2, position[2]]}>
        <div className={`text-center text-xs transition-all duration-300 ${
          isOptimal ? 'text-white font-bold scale-110' : 'text-gray-300'
        }`}>
          <div className="font-semibold">{label}</div>
          <div className={`text-xs ${isOptimal ? 'text-yellow-300' : 'text-gray-400'}`}>
            {metric}
          </div>
        </div>
      </Html>
    </Float>
  )
}

const strategies = [
  {
    name: 'Cost Optimization',
    nodes: [
      { label: 'OpenAI', metric: '$0.03/1K', color: '#10b981', position: [-2, 1, 0] as [number, number, number] },
      { label: 'Google', metric: '$0.001/1K', color: '#f59e0b', position: [0, 1, 0] as [number, number, number], optimal: true },
      { label: 'Anthropic', metric: '$0.015/1K', color: '#8b5cf6', position: [2, 1, 0] as [number, number, number] },
    ]
  },
  {
    name: 'Speed Optimization', 
    nodes: [
      { label: 'OpenAI', metric: '1.2s', color: '#10b981', position: [-2, 1, 0] as [number, number, number], optimal: true },
      { label: 'Google', metric: '2.1s', color: '#f59e0b', position: [0, 1, 0] as [number, number, number] },
      { label: 'Anthropic', metric: '1.8s', color: '#8b5cf6', position: [2, 1, 0] as [number, number, number] },
    ]
  },
  {
    name: 'Quality Optimization',
    nodes: [
      { label: 'OpenAI', metric: '85%', color: '#10b981', position: [-2, 1, 0] as [number, number, number] },
      { label: 'Google', metric: '88%', color: '#f59e0b', position: [0, 1, 0] as [number, number, number] },
      { label: 'Anthropic', metric: '92%', color: '#8b5cf6', position: [2, 1, 0] as [number, number, number], optimal: true },
    ]
  }
]

export default function RoutingVisualization() {
  const [activeStrategy, setActiveStrategy] = useState(0)
  const [particles, setParticles] = useState<RequestParticle[]>([])
  const [nextId, setNextId] = useState(0)

  const currentStrategy = strategies[activeStrategy]
  const optimalNode = currentStrategy.nodes.find(n => n.optimal) || currentStrategy.nodes[0]

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle: RequestParticle = {
        id: nextId,
        startPos: [-4, 0, 0],
        endPos: optimalNode.position,
        color: optimalNode.color,
        progress: 0,
        strategy: currentStrategy.name
      }
      
      setParticles(prev => [...prev, newParticle])
      setNextId(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [activeStrategy, nextId, optimalNode, currentStrategy])

  const handleParticleComplete = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
        
        {/* Request source */}
        <Float speed={1} rotationIntensity={0.3}>
          <mesh position={[-4, 0, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
              color="#6366f1"
              metalness={0.8}
              roughness={0.2}
              emissive="#6366f1"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
        
        <Html position={[-4, -1, 0]}>
          <div className="text-center text-xs text-gray-300">
            <div className="font-semibold">Request</div>
            <div className="text-gray-400">Source</div>
          </div>
        </Html>
        
        {/* Provider nodes */}
        {currentStrategy.nodes.map((node, index) => (
          <RoutingNode
            key={`${activeStrategy}-${index}`}
            position={node.position}
            color={node.color}
            label={node.label}
            metric={node.metric}
            isOptimal={!!node.optimal}
          />
        ))}
        
        {/* Moving particles */}
        {particles.map((particle) => (
          <MovingParticle
            key={particle.id}
            particle={particle}
            onComplete={handleParticleComplete}
          />
        ))}
      </Canvas>
      
      {/* Strategy selector */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3 text-center">Routing Strategy</h3>
          <div className="flex space-x-2">
            {strategies.map((strategy, index) => (
              <button
                key={strategy.name}
                onClick={() => setActiveStrategy(index)}
                className={`px-3 py-2 rounded text-xs font-semibold transition-all duration-300 ${
                  index === activeStrategy
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {strategy.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info panel */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h4 className="text-white font-semibold mb-2">{currentStrategy.name}</h4>
        <p className="text-gray-300 text-sm">
          Intelligent routing automatically selects the{' '}
          <span className="text-yellow-300 font-semibold">
            {optimalNode.label}
          </span>{' '}
          provider based on your optimization strategy.
        </p>
      </div>
    </div>
  )
}