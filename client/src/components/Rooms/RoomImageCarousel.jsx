import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RoomImageCarousel = ({ images, descriptions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 4000); // Faster interval for more dynamic feel
        return () => clearInterval(timer);
    }, [images.length]);

    const getPositions = () => {
        const length = images.length;
        // Returns the indices of [left, center, right] images
        const left = (currentIndex - 1 + length) % length;
        const center = currentIndex;
        const right = (currentIndex + 1) % length;
        return { left, center, right };
    };

    const { left, center, right } = getPositions();

    const variants = {
        center: {
            x: '0%',
            scale: 1,
            zIndex: 5,
            opacity: 1,
            filter: 'brightness(1)',
        },
        left: {
            x: '-40%',
            scale: 0.8,
            zIndex: 3,
            opacity: 0.6,
            filter: 'brightness(0.5)',
        },
        right: {
            x: '40%',
            scale: 0.8,
            zIndex: 3,
            opacity: 0.6,
            filter: 'brightness(0.5)',
        },
        hidden: {
            x: '0%',
            scale: 0.5,
            zIndex: 0,
            opacity: 0,
        }
    };

    return (
        <div className="carousel-container">
            <div className="carousel-viewport">
                <AnimatePresence initial={false}>
                    {images.map((img, index) => {
                        let position = 'hidden';
                        if (index === center) position = 'center';
                        else if (index === left) position = 'left';
                        else if (index === right) position = 'right';

                        if (position === 'hidden') return null;

                        return (
                            <motion.div
                                key={index}
                                className="carousel-card"
                                initial="hidden"
                                animate={position}
                                exit="hidden"
                                variants={variants}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 25,
                                    duration: 0.6
                                }}
                            >
                                <motion.img
                                    src={img}
                                    alt={descriptions[index]}
                                    className="carousel-image"
                                    animate={{
                                        scale: position === 'center' ? 1.1 : 1,
                                        transition: { duration: 4, ease: "linear" }
                                    }}
                                />
                                {position === 'center' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="carousel-caption"
                                    >
                                        <p>{descriptions[index]}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>


            {/* Manual controls removed for autonomous cinematic flow */}
            <div className="carousel-nav-spacer" />

            <style>{`
                .carousel-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    padding: 4rem 0;
                    overflow: hidden;
                }

                .carousel-viewport {
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }

                .carousel-card {
                    position: absolute;
                    width: 60%;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                    background: #000;
                }

                .carousel-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .carousel-caption {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    padding: 2rem;
                    color: #fff;
                    text-align: center;
                }

                .carousel-caption p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.1rem;
                    line-height: 1.4;
                }

                .carousel-nav-spacer {
                    height: 2rem;
                }

                @media (max-width: 768px) {
                    .carousel-viewport { height: 350px; }
                    .carousel-card { width: 85%; }
                }
            `}</style>
        </div>
    );
};

export default RoomImageCarousel;

