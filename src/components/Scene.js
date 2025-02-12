import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, Plane, useTexture, OrbitControls, CameraShake } from '@react-three/drei';

import styles from './Scene.module.css';

// Component to handle the image rendering with 3D effect
const Image = ({ selectedImage, threeD, deformValue }) => {
    const [hovered, setHover] = useState(false);
    const depthMaterial = useRef();

    // Load the main texture and depth map
    const texture = useTexture(`/${selectedImage}.jpg`);
    const depthMap = useTexture(`/${selectedImage}_depth.png`);
    const dispTexture = useTexture(`/14.jpg`);

    // Update the shader material's uniform values on each frame
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (threeD === 'auto') {
            // Use time for deformation
            depthMaterial.current.uMouse = [Math.sin(time) * deformValue, Math.cos(time) * deformValue];
            depthMaterial.current.dispFactor = Math.sin(time * 0.5) * 0.1;
        } else if (threeD === 'mouse') {
            // Use mouse position for deformation
            depthMaterial.current.uMouse = [state.mouse.x * deformValue, state.mouse.y * deformValue];
            depthMaterial.current.dispFactor = state.mouse.x * deformValue;
        } else {
            // Use camera rotation for deformation
            const { rotation } = state.camera;
            depthMaterial.current.uMouse = [rotation.x * deformValue, rotation.y * deformValue];
            depthMaterial.current.dispFactor = rotation.x * deformValue;
        }
    });

    // Extend the shader material with custom uniforms and shaders
    extend({
        DepthMaterial: shaderMaterial(
            {
                uMouse: [0, 0],
                uImage: null,
                uDepthMap: null,
                effectFactor: 0.5,
                dispFactor: 0,
                disp: null
            },
            `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`,
            `            
                varying vec2 vUv;
                uniform vec2 uMouse;
                uniform vec2 uD;
                uniform sampler2D uImage;
                uniform sampler2D uDepthMap;
                uniform sampler2D disp;
                uniform float dispFactor;
                uniform float effectFactor;
            
                void main() {
                    vec2 uv = vUv;
                    vec4 disp = texture2D(disp, uv);
                    vec4 depthDistortion = texture2D(uDepthMap, vUv);
                    float parallaxMult = depthDistortion.g;
                    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y + (uMouse * parallaxMult));
            
                    vec2 parallax = (uMouse) * parallaxMult;
            
                    vec4 color = texture2D(uImage, (vUv + parallax));
                    vec4 distortedColor = texture2D(uImage, distortedPosition);
            
                    gl_FragColor = distortedColor; // Apply both effects to the image
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
                disp={dispTexture}
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