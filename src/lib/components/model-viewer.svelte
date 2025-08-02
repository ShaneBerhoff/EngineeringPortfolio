<script lang="ts">
import { Canvas, T } from '@threlte/core'
import { OrbitControls, Grid, GLTF } from '@threlte/extras'

// Component props
interface Props {
  modelUrl: string
}

let { modelUrl }: Props = $props()
</script>

<Canvas renderMode="always">
  <!-- Camera with mouse controls -->
  <T.PerspectiveCamera makeDefault position={[-5, 6, 10]} fov={25}>
    <OrbitControls enableDamping target={[0, 0, 0]} />
  </T.PerspectiveCamera>

  <!-- Basic lighting -->
  <T.DirectionalLight
    intensity={2.5}
    position={[5, 10, 5]}
    castShadow
    shadow.bias={-0.0001}
    shadow.camera.left={-10}
    shadow.camera.right={10}
    shadow.camera.top={10}
    shadow.camera.bottom={-10}
  />
  
  <T.DirectionalLight
    intensity={0.8}
    position={[-3, 5, -2]}
    color="#ffffff"
  />
  
  <T.DirectionalLight
    intensity={0.6}
    position={[-2, 2, 8]}
    color="#e6f3ff"
  />
  
  <T.AmbientLight intensity={0.5} />

  <!-- 3D Model -->
  <GLTF url={modelUrl} />

  <!-- Grid background -->
  <Grid
    position.y={-0.001}
    cellColor="#ffffff"
    sectionColor="#ffffff"
    sectionThickness={0}
    fadeDistance={25}
    cellSize={2}
  />
</Canvas>