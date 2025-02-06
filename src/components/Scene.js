import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, Plane, useTexture, OrbitControls, CameraShake } from '@react-three/drei';

import styles from './Scene.module.css';

// Component to handle the image rendering with 3D effect
const Image = ({ selectedImage, threeD, deformValue }) => {
    const depthMaterial = useRef();

    // Load the main texture and depth map
    const texture = useTexture(`/${selectedImage}.jpg`);
    const depthMap = useTexture(`/${selectedImage}_depth.png`);

    // Update the shader material's uniform values on each frame
    useFrame((state) => {
        if (threeD === 'mouse') {
            // Use mouse position for deformation
            depthMaterial.current.uMouse = [state.mouse.x * deformValue, state.mouse.y * deformValue];
        } else {
            // Use camera rotation for deformation
            const { rotation } = state.camera;
            depthMaterial.current.uMouse = [rotation.x * deformValue, rotation.y * deformValue];
        }
    });

    // Extend the shader material with custom uniforms and shaders
    extend({
        DepthMaterial: shaderMaterial(
            { uMouse: [0, 0], uImage: null, uDepthMap: null },
            `
          varying vec2 vUv;
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectionPosition = projectionMatrix * viewPosition;
            gl_Position = projectionPosition;
            vUv = uv;
          }`,
            `
          precision mediump float;
      
          uniform vec2 uMouse;
          uniform sampler2D uImage;
          uniform sampler2D uDepthMap;
      
          varying vec2 vUv;
          
          void main() {
             vec4 depthDistortion = texture2D(uDepthMap, vUv);
             float parallaxMult = depthDistortion.g;
      
             vec2 parallax = (uMouse) * parallaxMult;
      
             gl_FragColor = texture2D(uImage, (vUv + parallax));;
          }
          `,
        ),
    });

    // Render the mesh with the custom shader material
    return (
        <mesh>
            <sphereGeometry args={[100, 256, 256]} />
            <depthMaterial
                ref={depthMaterial}
                uImage={texture}
                uDepthMap={depthMap}
                side={THREE.BackSide}
            />
        </mesh>
    );
};

// Main Scene component
const Scene = ({ selectedImage, threeD, deformValue }) => {
    return (
        <div className={styles.scene}>
            <Canvas>
                <color attach="background" args={['#000']} />
                <Image selectedImage={selectedImage} threeD={threeD} deformValue={deformValue} />
                <ambientLight intensity={5} />
                <directionalLight position={[0, 0, 0]} color="red" />
                <OrbitControls makeDefault minDistance={100} maxDistance={100} enablePan={false} />
                <CameraShake yawFrequency={0.5} maxYaw={0.05} pitchFrequency={0.3} maxPitch={0.05} rollFrequency={0.2} maxRoll={0.5} intensity={0.3} />
            </Canvas>
        </div>
    );
};

export default Scene;