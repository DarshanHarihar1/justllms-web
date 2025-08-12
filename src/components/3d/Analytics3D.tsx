'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html, Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function BarChart({ data, position }: { data: number[], position: [number, number, number] }) {
  return (
    <group position={position}>
      {data.map((value, index) => (
        <mesh key={index} position={[index * 0.5 - 1, value / 2, 0]}>
          <boxGeometry args={[0.3, value, 0.3]} />
          <meshStandardMaterial
            color={`hsl(${220 + index * 20}, 70%, ${50 + value * 10}%)`}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      ))}
      <Html position={[0, -1, 0]}>
        <div className="text-center text-xs text-gray-300">
          <div className="font-semibold">Usage by Provider</div>
        </div>
      </Html>
    </group>
  )
}

function CostMeter({ value, position }: { value: number, position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -Math.PI / 2 + (value / 100) * Math.PI * 2
    }
  })

  return (
    <group position={position}>
      {/* Base ring */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Progress ring */}
      <mesh ref={ringRef} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[1, 0.12, 16, Math.floor((value / 100) * 100)]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Center text */}
      <Html position={[0, 0, 0]}>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{value}%</div>
          <div className="text-xs text-gray-300">Cost Savings</div>
        </div>
      </Html>
    </group>
  )
}

function DataPoint({ 
  position, 
  value, 
  label, 
  color 
}: { 
  position: [number, number, number]
  value: string
  label: string
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <Html position={[position[0], position[1] - 0.8, position[2]]}>
        <div className="text-center">
          <div className="text-lg font-bold text-white">{value}</div>
          <div className="text-xs text-gray-300">{label}</div>
        </div>
      </Html>
    </Float>
  )
}

function NetworkGraph({ nodes, connections }: { 
  nodes: Array<{ pos: [number, number, number], color: string }>
  connections: Array<[number, number]>
}) {
  const lineGeometries = useMemo(() => {
    return connections.map(([startIdx, endIdx]) => {
      const start = new THREE.Vector3(...nodes[startIdx].pos)
      const end = new THREE.Vector3(...nodes[endIdx].pos)
      const points = [start, end]
      return new THREE.BufferGeometry().setFromPoints(points)
    })
  }, [nodes, connections])

  return (
    <group>
      {/* Nodes */}
      {nodes.map((node, index) => (
        <mesh key={index} position={node.pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Connections */}
      {lineGeometries.map((geometry, index) => (
        <line key={index}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial color="#6366f1" opacity={0.6} transparent />
        </line>
      ))}
    </group>
  )
}

const usageData = [2.5, 3.2, 1.8, 2.1, 2.8]
const costSavings = 67

const dataPoints = [
  { position: [-3, 2, 0] as [number, number, number], value: '11K', label: 'Requests/day', color: '#10b981' },
  { position: [3, 2, 0] as [number, number, number], value: '2.3s', label: 'Avg Response', color: '#f59e0b' },
  { position: [-3, -2, 0] as [number, number, number], value: '99.9%', label: 'Uptime', color: '#8b5cf6' },
  { position: [3, -2, 0] as [number, number, number], value: '$0.02', label: 'Cost/Request', color: '#06b6d4' },
]

const networkNodes = [
  { pos: [-1, 0, 0] as [number, number, number], color: '#10b981' },
  { pos: [0, 1, 0] as [number, number, number], color: '#f59e0b' },
  { pos: [1, 0, 0] as [number, number, number], color: '#8b5cf6' },
  { pos: [0, -1, 0] as [number, number, number], color: '#06b6d4' },
  { pos: [0, 0, 0] as [number, number, number], color: '#6366f1' },
]

const networkConnections: Array<[number, number]> = [
  [4, 0], [4, 1], [4, 2], [4, 3]
]

export default function Analytics3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        
        {/* Cost savings meter */}
        <CostMeter value={costSavings} position={[0, 0, 0]} />
        
        {/* Usage bar chart */}
        <BarChart data={usageData} position={[-4, -1, 0]} />
        
        {/* Performance metrics */}
        {dataPoints.map((point, index) => (
          <DataPoint
            key={index}
            position={point.position}
            value={point.value}
            label={point.label}
            color={point.color}
          />
        ))}
        
        {/* Network visualization */}
        <group position={[4, 0.5, 0]} scale={0.8}>
          <NetworkGraph nodes={networkNodes} connections={networkConnections} />
          <Html position={[0, -2, 0]}>
            <div className="text-center text-xs text-gray-300">
              <div className="font-semibold">Provider Network</div>
            </div>
          </Html>
        </group>
      </Canvas>
      
      {/* Dashboard overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2">Real-time Analytics</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Active Providers:</span>
            <span className="text-green-400">6</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Cache Hit Rate:</span>
            <span className="text-blue-400">84%</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Token Efficiency:</span>
            <span className="text-yellow-400">92%</span>
          </div>
        </div>
      </div>
      
      {/* Export options */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button className="px-3 py-2 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition-colors">
          Export CSV
        </button>
        <button className="px-3 py-2 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors">
          Export PDF
        </button>
      </div>
    </div>
  )
}