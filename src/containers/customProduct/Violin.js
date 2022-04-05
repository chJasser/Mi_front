/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/violin.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.violinrestbody.geometry} material={nodes.violinrestbody.material} position={[0, 0.9, 0.1]} scale={0.01} />
      <mesh geometry={nodes.violintinypiecesSAMEmaterial.geometry} material={nodes.violintinypiecesSAMEmaterial.material} position={[0.04, 1.35, -0.02]} scale={0.01} />
      <mesh geometry={nodes.violin_body.geometry} material={nodes.violin_body.material} position={[0, 0.47, 0]} scale={0.01} />
      <mesh geometry={nodes.violinbowSAMEmaterial.geometry} material={nodes.violinbowSAMEmaterial.material} position={[0.04, 1.35, -0.02]} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/violin.glb')