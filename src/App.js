import { useEffect, useState } from 'react';

import Interface from './components/Interface';
import Scene from './components/Scene';

import styles from './App.module.css';

function App() {

    // Enable dev mode
    const [devMode, setDevMode] = useState(true);

    // State to hold the list of images
    const [images, setImages] = useState([
        'phantom1',
        'phantom2',
        'phantom3',
    ]);

    // State to hold the currently selected image
    const [selectedImage, setSelectedImage] = useState(images[2]);

    // State to hold the 3D mode (either 'mouse' or 'camera')
    const [threeD, setThreeD] = useState('auto');

    // State to hold the deform value
    const [deformValue, setDeformValue] = useState(0.1);

    return (
        <div className={styles.app}>
            {/* Interface component to handle user interactions */}
            <Interface
                devMode={devMode}
                images={images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                threeD={threeD}
                setThreeD={setThreeD}
                deformValue={deformValue}
                setDeformValue={setDeformValue}
            />
            {/* Scene component to render the 3D scene */}
            <Scene
                selectedImage={selectedImage}
                threeD={threeD}
                deformValue={deformValue}
            />
        </div>
    );
}

export default App;