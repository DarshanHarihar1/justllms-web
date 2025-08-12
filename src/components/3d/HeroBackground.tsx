'use client'

import { Canvas } from '@react-three/fiber'
import { Float, Text3D, OrbitControls, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FloatingShape({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  )
}

function NetworkNode({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function Connections() {
  const points = [
    new THREE.Vector3(-3, 2, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, -1, 0),
    new THREE.Vector3(-2, -2, 0),
    new THREE.Vector3(2, 2, 0),
  ]
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <line>
      <primitive object={lineGeometry} attach="geometry" />
      <lineBasicMaterial color="#6366f1" opacity={0.6} transparent />
    </line>
  )
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="opacity-60"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
        
        {/* Environment for better lighting */}
        <Environment preset="night" />
        
        {/* Floating geometric shapes */}
        <FloatingShape position={[-4, 2, -2]} color="#ee7752" scale={0.8} />
        <FloatingShape position={[3, -1, -1]} color="#e73c7e" scale={1.2} />
        <FloatingShape position={[-2, -3, -3]} color="#23a6d5" scale={0.6} />
        <FloatingShape position={[4, 1, -2]} color="#23d5ab" scale={0.9} />
        <FloatingShape position={[0, 3, -4]} color="#6366f1" scale={1.1} />
        
        {/* Network visualization */}
        <NetworkNode position={[-3, 2, 0]} color="#ee7752" />
        <NetworkNode position={[0, 0, 0]} color="#6366f1" />
        <NetworkNode position={[3, -1, 0]} color="#e73c7e" />
        <NetworkNode position={[-2, -2, 0]} color="#23a6d5" />
        <NetworkNode position={[2, 2, 0]} color="#23d5ab" />
        
        <Connections />
        
        {/* Subtle camera controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}