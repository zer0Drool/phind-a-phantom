import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './Interface.module.css';

// Register the GSAP plugin
gsap.registerPlugin(useGSAP);

const Interface = ({ devMode, images, selectedImage, setSelectedImage, threeD, setThreeD, deformValue, setDeformValue }) => {

    const ref = useRef();
    const { contextSafe } = useGSAP({ scope: ref });

    // Define the animation function
    const animate = contextSafe(() => {
        gsap.to(".logo", { rotation: "+=360", duration: 1, ease: "expo.out" });
    });

    // Handle image change
    const handleImageChange = (event) => {
        setSelectedImage(event.target.value);
    };

    // Handle 3D mode change
    const handleThreeDChange = (event) => {
        setThreeD(event.target.value);
    };

    // Handle deform value change
    const handleDeformValueChange = (event) => {
        setDeformValue(event.target.value);
    };

    // Handle random image selection and randomize threeD and deformValue
    const handleRandom = () => {
        let randomImage;
        do {
            randomImage = images[Math.floor(Math.random() * images.length)];
        } while (randomImage === selectedImage);
        setSelectedImage(randomImage);

        if (devMode) {
            const randomThreeD = Math.random() > 0.5 ? 'mouse' : 'camera';
            const randomDeformValue = Math.random() * 0.3; // Ensure deformValue is between 0 and 0.3

            setThreeD(randomThreeD);
            setDeformValue(randomDeformValue);
        }

        animate();
    };

    // Initial animation on component mount
    useGSAP(() => {
        gsap.to(".container", { y: "+220", duration: 2, ease: "bounce", delay: 0.5 });
    });

    return (
        <div ref={ref} className={styles.interface}>
            <div className="container">
                <div>
                    <img className="logo" src='/phntm-logo-invert.svg' alt='logo' />
                    <select name="images" id="images" value={selectedImage} onChange={handleImageChange}>
                        {images.map((image, i) => {
                            return <option key={i} value={image}>{image}</option>
                        })}
                    </select>
                    {devMode &&
                        <>
                            <select name="images" id="images" value={threeD} onChange={handleThreeDChange}>
                                <option value="auto">auto</option>
                                <option value="mouse">mouse</option>
                                <option value="camera">camera</option>
                            </select>
                            <input type="range" min="0" max="0.3" step="0.005" value={deformValue} onChange={handleDeformValueChange} />
                        </>
                    }
                    <button onClick={handleRandom}>rantom</button>
                </div>
                <p>choose a phantom <br/> auto parallax or base on mouse/camera <br/> adjust the intensity</p>
            </div>
        </div>
    );

};

export default Interface;