import React from "react";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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
        gltf.scene.rotation.y -= 0.02;
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight color="white" position={[0, 1, 0]} />
            <primitive object={gltf.scene} position={[0, 0, 0]}
                onPointerOver={() => gltf.scene.position.z = 0.05}
                onPointerOut={() => gltf.scene.position.z = 0} />

        </>
    )
}

export default Header;