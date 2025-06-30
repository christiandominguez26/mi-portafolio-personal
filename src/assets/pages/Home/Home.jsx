import React, { useRef, useState } from "react";
import profilePic from '../../../assets/images/cds.png';
import vinylImg from '../../../assets/images/vinyl_disc.png';
import musicFile from '../../../assets/audio/watch_the_party_die.mp3';
import { FaPlay, FaPause } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import './Home.css'

const Home = () => {
    const audioRef = useRef(null);
    const vinylRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const controls = useAnimation();
    const [currentRotation, setCurrentRotation] = useState(0);

    const getRotationAngle = () => {
    const computedStyle = getComputedStyle(vinylRef.current);
    const matrix = new DOMMatrixReadOnly(computedStyle.transform);
    const angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    return angle;
  };

  const togglePlay = async () => {
    if (isPlaying) {
      audioRef.current.pause();
      controls.stop();
      const angle = getRotationAngle();
      setCurrentRotation(angle);
    } else {
      audioRef.current.play();
      controls.start({
        rotate: [currentRotation, currentRotation + 360],
        transition: {
          repeat: Infinity,
          ease: 'linear',
          duration: 6,
        },
      });
    }
    setIsPlaying(!isPlaying);
  };

    return(
      <>
        <div className="container-fluid home-container d-flex justify-content-center align-items-center">
          <div className="row align-items-center justify-content-center">
            <div className="col-5 border text-center">
              <p className="greeting-text pb-4">Hola, qué tal!</p>
              <h2 className="pb-5">mi nombre es</h2>
              <p className="name-text pb-4">Christian Domínguez</p>
              <h2 className="pb-4">Desarrollador Frontend</h2>
              <p>Desarrollando experiencias web modernas y eficientes.</p>
            </div>

            <div className="col-2 border">
              <div className="music-player text-center">
                <motion.img
                  ref={vinylRef}
                  src={vinylImg}
                  alt="Vinilo girando"
                  className="vinyl-img"
                  animate={controls}
                  initial={{ rotate: currentRotation }}
                  style={{ originX: 0.5, originY: 0.5 }}
                />
                <audio ref={audioRef} src={musicFile} />
                <motion.button
                  className="music-btn mt-3"
                  onClick={togglePlay}
                  whileTap={{ scale: 1.2, opacity: 0.8 }}
                >
                  {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
                </motion.button>
              </div>
            </div>

            <div className="col-3 border text-center">
                <div className="home-image">
                    <img src={profilePic} className="profile-img img-fluid" />
                </div>
            </div>

            <div className="col-2 border">
                
            </div>
          </div>
        </div>
      </>
    );
}

export default Home;