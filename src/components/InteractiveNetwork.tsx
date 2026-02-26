import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import gsap from 'gsap';

// Node interface for type safety
interface NetworkNode {
    id: number;
    position: THREE.Vector3;
    targetPosition: THREE.Vector3; // Fixed spherical position
    size: number;
    originalSize: number;
    depth: number;
}

// Particle interface
interface Particle {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    angle: number;
    speed: number;
    size: number;
}

// Connection interface
interface Connection {
    source: number;
    target: number;
    distance: number;
}

const InteractiveNeuralSphere: React.FC = () => {
    const [nodes, setNodes] = useState<NetworkNode[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePosition, setMousePosition] = useState(new THREE.Vector3(0, 0, 0));
    const [isHovered, setIsHovered] = useState(false);
    const sphereRef = useRef<THREE.Group>(null);
    const particleGroupRef = useRef<THREE.Group>(null);

    // Initialize perfect spherical network with geometric constraints
    useEffect(() => {
        const nodeCount = 60; // Fixed node count for perfect sphere
        const particleCount = 40; // Flowing particles
        const newNodes: NetworkNode[] = [];
        const newConnections: Connection[] = [];
        const newParticles: Particle[] = [];

        // Create nodes with STRICT spherical constraints
        for (let i = 0; i < nodeCount; i++) {
            // Golden spiral distribution for perfect spherical coverage
            const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            // FIXED spherical radius - NEVER changes
            const fixedRadius = 10;
            const position = new THREE.Vector3(
                fixedRadius * Math.sin(phi) * Math.cos(theta),
                fixedRadius * Math.sin(phi) * Math.sin(theta),
                fixedRadius * Math.cos(phi)
            );

            newNodes.push({
                id: i,
                position: position.clone(),
                targetPosition: position.clone(), // Immutable reference position
                size: 0.18 + Math.random() * 0.22, // Varied sizes
                originalSize: 0.18 + Math.random() * 0.22,
                depth: 0
            });
        }

        // Create dense web with geometric constraints (connect to 5-6 nearest neighbors)
        for (let i = 0; i < nodeCount; i++) {
            // Calculate distances to all other nodes
            const distances = newNodes.map((node, j) => ({
                index: j,
                distance: newNodes[i].position.distanceTo(node.position)
            })).filter(item => item.index !== i);

            // Sort by distance and connect to 5-6 nearest nodes
            distances.sort((a, b) => a.distance - b.distance);
            const connectionCount = 5 + Math.floor(Math.random() * 2); // 5-6 connections

            for (let k = 0; k < Math.min(connectionCount, distances.length); k++) {
                const targetIndex = distances[k].index;

                // Avoid duplicate connections
                if (!newConnections.some(conn =>
                    (conn.source === i && conn.target === targetIndex) ||
                    (conn.source === targetIndex && conn.target === i)
                )) {
                    newConnections.push({
                        source: i,
                        target: targetIndex,
                        distance: distances[k].distance
                    });
                }
            }
        }

        // Create flowing particles that orbit around the sphere
        for (let i = 0; i < particleCount; i++) {
            // Random orbital parameters
            const angle = (i / particleCount) * Math.PI * 2;
            const orbitRadius = 12 + Math.random() * 3; // Orbit around sphere
            const height = -8 + Math.random() * 16; // Vary height

            newParticles.push({
                id: i,
                position: new THREE.Vector3(
                    Math.cos(angle) * orbitRadius,
                    height,
                    Math.sin(angle) * orbitRadius
                ),
                velocity: new THREE.Vector3(0, 0, 0),
                angle: angle,
                speed: 0.02 + Math.random() * 0.03,
                size: 0.08 + Math.random() * 0.12
            });
        }

        setNodes(newNodes);
        setConnections(newConnections);
        setParticles(newParticles);
    }, []);

    // Mouse interaction handler
    const handleMouseMove = (event: any) => {
        const rect = event.target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition(new THREE.Vector3(x * 15, y * 15, 0));
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div
            className="relative w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Pure 3D Canvas - No text overlay */}
            <Canvas
                camera={{ position: [0, 0, 25], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[15, 15, 15]} intensity={1.5} color="#F7B500" distance={50} />
                <pointLight position={[-15, -15, -15]} intensity={0.8} color="#9EA3B5" distance={40} />
                <pointLight position={[0, 0, 20]} intensity={1.0} color="#F7B500" distance={35} />

                {/* Perfect Neural Sphere with GEOMETRIC CONSTRAINTS */}
                <ConstrainedNeuralSphere
                    nodes={nodes}
                    setNodes={setNodes}
                    connections={connections}
                    mousePosition={mousePosition}
                    isHovered={isHovered}
                    sphereRef={sphereRef}
                />

                {/* Flowing Particle System */}
                <ParticleFlowSystem
                    particles={particles}
                    setParticles={setParticles}
                    mousePosition={mousePosition}
                    isHovered={isHovered}
                    particleGroupRef={particleGroupRef}
                />

                {/* Shape-Safe Controls */}
                <SphereControls
                    isHovered={isHovered}
                    sphereRef={sphereRef}
                    particleGroupRef={particleGroupRef}
                    mousePosition={mousePosition}
                />
            </Canvas>
        </div>
    );
};

// PERFECT SPHERE with GEOMETRIC CONSTRAINTS - NEVER DEFORMS
const ConstrainedNeuralSphere: React.FC<{
    nodes: NetworkNode[];
    setNodes: React.Dispatch<React.SetStateAction<NetworkNode[]>>;
    connections: Connection[];
    mousePosition: THREE.Vector3;
    isHovered: boolean;
    sphereRef: React.RefObject<THREE.Group>;
}> = ({ nodes, setNodes, connections, mousePosition, isHovered, sphereRef }) => {
    const nodeRefs = useRef<THREE.Mesh[]>([]);
    const connectionRef = useRef<THREE.LineSegments>(null);

    useFrame((state) => {
        // UPDATE NODES WITH ABSOLUTE GEOMETRIC CONSTRAINTS
        setNodes(prevNodes => {
            return prevNodes.map((node, index) => {
                const newNode = { ...node };

                // CRITICAL: Maintain perfect spherical shape - NEVER modify targetPosition
                // Only update visual properties, NEVER the geometric constraints

                // Update mesh properties (visual only - no shape change)
                if (nodeRefs.current[index]) {
                    nodeRefs.current[index].position.copy(newNode.position);

                    // Depth-based rendering for 3D effect
                    const depth = newNode.position.z;
                    const depthFactor = Math.max(0.3, (depth + 12) / 24); // 0.3 to 1.0

                    // Mouse proximity effects (VISUAL ONLY - no position change)
                    const distanceToMouse = newNode.position.distanceTo(mousePosition);
                    const proximityScale = Math.max(0.8, 1 + (8 - distanceToMouse) * 0.15);
                    const finalScale = newNode.originalSize * depthFactor * proximityScale;
                    nodeRefs.current[index].scale.setScalar(finalScale);

                    // Material updates for glow effects (no shape change)
                    const material = nodeRefs.current[index].material as THREE.MeshStandardMaterial;
                    material.emissiveIntensity = 0.4 + depthFactor * 0.6; // 0.4 to 1.0
                    material.opacity = 0.8 + depthFactor * 0.2; // 0.8 to 1.0
                }

                return newNode;
            });
        });

        // Update connection lines with FIXED positions
        if (connectionRef.current && connectionRef.current.geometry) {
            const positions: number[] = [];
            const colors: number[] = [];

            connections.forEach(conn => {
                const sourceNode = nodes[conn.source];
                const targetNode = nodes[conn.target];

                if (sourceNode && targetNode) {
                    // FIXED positions - NEVER modified
                    positions.push(
                        sourceNode.position.x, sourceNode.position.y, sourceNode.position.z,
                        targetNode.position.x, targetNode.position.y, targetNode.position.z
                    );

                    // Depth and proximity-based coloring
                    const sourceDepth = (sourceNode.position.z + 12) / 24;
                    const targetDepth = (targetNode.position.z + 12) / 24;
                    const avgDepth = (sourceDepth + targetDepth) / 2;

                    const sourceDistance = sourceNode.position.distanceTo(mousePosition);
                    const targetDistance = targetNode.position.distanceTo(mousePosition);
                    const avgDistance = (sourceDistance + targetDistance) / 2;
                    const proximityFactor = Math.max(0.4, 1 - avgDistance * 0.08);

                    // Elegant color scheme with depth
                    const r = 0.6 + (0.4 * avgDepth) * proximityFactor;
                    const g = 0.6 + (0.4 * avgDepth) * proximityFactor;
                    const b = 0.4 + (0.2 * avgDepth) * proximityFactor;

                    colors.push(r, g, b, r, g, b);
                }
            });

            // Update geometry efficiently
            connectionRef.current.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(positions, 3)
            );
            connectionRef.current.geometry.setAttribute(
                'color',
                new THREE.Float32BufferAttribute(colors, 3)
            );
        }
    });

    return (
        <group ref={sphereRef}>
            {/* FIXED Connection Network - NEVER DEFORMS */}
            <lineSegments ref={connectionRef}>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.6}
                    linewidth={1}
                />
            </lineSegments>

            {/* FIXED Node Network - NEVER DEFORMS */}
            <group>
                {nodes.map((node, index) => (
                    <mesh
                        key={node.id}
                        ref={el => nodeRefs.current[index] = el!}
                        position={node.position} // FIXED position
                    >
                        <sphereGeometry args={[node.size, 12, 12]} />
                        <meshStandardMaterial
                            color="#F7B500"
                            emissive="#F7B500"
                            emissiveIntensity={0.5}
                            roughness={0.1}
                            metalness={0.9}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
};

// Particle Flow System - Orbits around sphere without deformation
const ParticleFlowSystem: React.FC<{
    particles: Particle[];
    setParticles: React.Dispatch<React.SetStateAction<Particle[]>>;
    mousePosition: THREE.Vector3;
    isHovered: boolean;
    particleGroupRef: React.RefObject<THREE.Group>;
}> = ({ particles, setParticles, mousePosition, isHovered, particleGroupRef }) => {
    const particleRefs = useRef<THREE.Mesh[]>([]);

    useFrame((state) => {
        // Update particle positions in orbital paths
        setParticles(prevParticles => {
            return prevParticles.map((particle, index) => {
                const newParticle = { ...particle };

                // Orbital motion around sphere
                newParticle.angle += newParticle.speed * (isHovered ? 1.5 : 1); // Speed up on hover
                const orbitRadius = 12 + Math.sin(state.clock.elapsedTime * 0.5 + particle.id) * 2;

                newParticle.position.x = Math.cos(newParticle.angle) * orbitRadius;
                newParticle.position.z = Math.sin(newParticle.angle) * orbitRadius;
                newParticle.position.y = -6 + Math.sin(state.clock.elapsedTime * 0.8 + particle.id * 0.3) * 8;

                // Update particle mesh
                if (particleRefs.current[index]) {
                    particleRefs.current[index].position.copy(newParticle.position);

                    // Mouse proximity effects for particles
                    const distanceToMouse = newParticle.position.distanceTo(mousePosition);
                    const proximityFactor = Math.max(0.5, 1 - distanceToMouse * 0.05);

                    // Scale and glow effects
                    const scale = newParticle.size * (isHovered ? 2 : 1) * proximityFactor;
                    particleRefs.current[index].scale.setScalar(scale);

                    const material = particleRefs.current[index].material as THREE.MeshStandardMaterial;
                    material.emissiveIntensity = 0.3 + (isHovered ? 0.7 : 0.4) * proximityFactor;
                }

                return newParticle;
            });
        });
    });

    return (
        <group ref={particleGroupRef}>
            {particles.map((particle, index) => (
                <mesh
                    key={particle.id}
                    ref={el => particleRefs.current[index] = el!}
                    position={particle.position}
                >
                    <sphereGeometry args={[particle.size, 8, 8]} />
                    <meshStandardMaterial
                        color="#F7B500"
                        emissive="#F7B500"
                        emissiveIntensity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
};

// SHAPE-SAFE CONTROLS - Only affects rotation and visual properties
const SphereControls: React.FC<{
    isHovered: boolean;
    sphereRef: React.RefObject<THREE.Group>;
    particleGroupRef: React.RefObject<THREE.Group>;
    mousePosition: THREE.Vector3;
}> = ({ isHovered, sphereRef, particleGroupRef, mousePosition }) => {
    useFrame((state) => {
        // SHAPE-SAFE ROTATION - Only affects group rotation, NEVER vertex positions
        if (sphereRef.current) {
            if (isHovered) {
                // Smooth rotation towards cursor - SHAPE SAFE
                const targetRotationY = mousePosition.x * 0.02;
                const targetRotationX = -mousePosition.y * 0.02;

                // GSAP-like easing for smooth rotation
                sphereRef.current.rotation.y += (targetRotationY - sphereRef.current.rotation.y) * 0.08;
                sphereRef.current.rotation.x += (targetRotationX - sphereRef.current.rotation.x) * 0.08;

                // Subtle floating - SHAPE SAFE
                sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
            } else {
                // Gentle auto-rotation when idle - SHAPE SAFE
                sphereRef.current.rotation.y += 0.003;
                sphereRef.current.rotation.x += 0.001;
                sphereRef.current.rotation.z += 0.0005;

                // Calm floating animation - SHAPE SAFE
                sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
            }
        }

        // Particle group rotation for visual interest - SHAPE SAFE
        if (particleGroupRef.current) {
            particleGroupRef.current.rotation.y += isHovered ? 0.008 : 0.004;
        }
    });

    return null;
};

export default InteractiveNeuralSphere;