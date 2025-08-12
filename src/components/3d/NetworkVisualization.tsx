'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, Html } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

interface ProviderNodeProps {
  position: [number, number, number]
  color: string
  label: string
  isActive: boolean
  onClick: () => void
}

function ProviderNode({ position, color, label, isActive, onClick }: ProviderNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        scale={hovered ? 1.2 : isActive ? 1.1 : 1}
      >
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isActive ? 0.3 : hovered ? 0.2 : 0.1}
        />
      </mesh>
      
      <Html position={[position[0], position[1] - 1.5, position[2]]}>
        <div className={`text-center text-sm font-semibold transition-all duration-300 ${
          isActive ? 'text-white scale-110' : hovered ? 'text-gray-200 scale-105' : 'text-gray-400'
        }`}>
          {label}
        </div>
      </Html>
    </Float>
  )
}

function ConnectionLine({ start, end, active }: { start: [number, number, number], end: [number, number, number], active: boolean }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial 
        color={active ? "#6366f1" : "#374151"} 
        opacity={active ? 0.8 : 0.3} 
        transparent 
        linewidth={active ? 3 : 1}
      />
    </line>
  )
}

function CenterHub({ activeProvider }: { activeProvider: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.9}
        roughness={0.1}
        emissive="#6366f1"
        emissiveIntensity={0.4}
      />
      <Html position={[0, -1.8, 0]}>
        <div className="text-center text-sm font-bold text-white">
          JustLLMs
          <br />
          <span className="text-xs text-gray-300">Intelligent Router</span>
        </div>
      </Html>
    </mesh>
  )
}

const providers = [
  { name: 'OpenAI', color: '#10b981', position: [-3, 2, 0] as [number, number, number] },
  { name: 'Google', color: '#f59e0b', position: [3, 2, 0] as [number, number, number] },
  { name: 'Anthropic', color: '#8b5cf6', position: [3, -2, 0] as [number, number, number] },
  { name: 'Azure', color: '#06b6d4', position: [-3, -2, 0] as [number, number, number] },
  { name: 'xAI', color: '#ef4444', position: [0, 3, 0] as [number, number, number] },
  { name: 'DeepSeek', color: '#6366f1', position: [0, -3, 0] as [number, number, number] },
]

export default function NetworkVisualization() {
  const [activeProvider, setActiveProvider] = useState(0)

  const connections = useMemo(() => {
    return providers.map((provider, index) => ({
      start: [0, 0, 0] as [number, number, number],
      end: provider.position,
      active: index === activeProvider
    }))
  }, [activeProvider])

  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        
        {/* Center hub */}
        <CenterHub activeProvider={activeProvider} />
        
        {/* Provider nodes */}
        {providers.map((provider, index) => (
          <ProviderNode
            key={provider.name}
            position={provider.position}
            color={provider.color}
            label={provider.name}
            isActive={index === activeProvider}
            onClick={() => setActiveProvider(index)}
          />
        ))}
        
        {/* Connections */}
        {connections.map((connection, index) => (
          <ConnectionLine
            key={index}
            start={connection.start}
            end={connection.end}
            active={connection.active}
          />
        ))}
      </Canvas>
      
      {/* Control panel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {providers.map((provider, index) => (
          <button
            key={provider.name}
            onClick={() => setActiveProvider(index)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
              index === activeProvider 
                ? 'bg-white text-black' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            style={{ backgroundColor: index === activeProvider ? provider.color : undefined }}
          >
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  )
}