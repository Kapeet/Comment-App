import React, { Suspense, useEffect } from "react";
import { AmbientLightProps, Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { PerspectiveCamera } from "three";

const Header: React.FunctionComponent = () => {

    return (
        <>
            <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
                <MyScene />
            </Canvas>
        </>
    );
}

const MyScene: React.FunctionComponent = () => {
    const { camera } = useThree();
    const gltf = useLoader(GLTFLoader, '/message.glb');
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = .3;

    useFrame(() => {
        // camera.position.x -= 0.01;
        // // camera.position.y -= 0.01;
        // camera.position.z += 0.01;
        gltf.scene.rotation.y -= 0.02;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[0, 1, 0]} />
            <primitive object={gltf.scene} position={[0, 0, 0]} />

        </>
    )
}

export default Header;