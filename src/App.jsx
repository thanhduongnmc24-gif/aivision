import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MagicParticles from './MagicParticles';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <MagicParticles />
      <OrbitControls makeDefault />
    </Canvas>
  );
}
export default App;