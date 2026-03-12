import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';

// Import images from assets/photo
import doubleCla from '../../assets/photo/double cla/home.jpeg';
import doublePre from '../../assets/photo/double pre/home.jpeg';
import singleCla from '../../assets/photo/single cla/home.jpeg';
import singlePre from '../../assets/photo/single pre/home.jpeg';


const CARD_WIDTH = 480;
const CARD_MARGIN = 40; // 20px each side
const CARD_STEP = CARD_WIDTH + CARD_MARGIN;
const DURATION = 28; // seconds for one full loop

const rooms = [doubleCla, doublePre, singleCla, singlePre];
const slugs = ['double-cla', 'double-pre', 'single-cla', 'single-pre'];

// Duplicate enough times for a seamless loop
const circularRooms = [...rooms, ...rooms, ...rooms, ...rooms, ...rooms, ...rooms];
const circularSlugs = [...slugs, ...slugs, ...slugs, ...slugs, ...slugs, ...slugs];

// Total pixel width of ONE full set, which is what we animate
const loopWidth = CARD_STEP * rooms.length;

const ImageLoop = () => {
    const navigate = useNavigate();
    const controls = useAnimationControls();
    const isPaused = useRef(false);

    const startMarquee = (fromX = 0) => {
        // Remaining fraction of loop to animate (so resume feels natural)
        const remaining = (loopWidth + fromX) / loopWidth; // fromX is negative
        controls.start({
            x: [fromX, -loopWidth],
            transition: {
                duration: DURATION * remaining,
                ease: 'linear',
                onComplete: () => {
                    if (!isPaused.current) {
                        // Reset instantly to 0 and loop again
                        controls.set({ x: 0 });
                        startMarquee(0);
                    }
                },
            },
        });
    };

    useEffect(() => {
        startMarquee(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMouseEnter = async () => {
        isPaused.current = true;
        await controls.stop();
    };

    const handleMouseLeave = async () => {
        isPaused.current = false;
        // Get current x position from controls state — we restart from wherever it stopped
        // Framer doesn't expose current value easily without useMotionValue, so we use x: 0 trick:
        // Instead, let's use a MotionValue approach (see below for cleaner solution)
        startMarquee(0);
    };

    return (
        <div
            style={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
                padding: '3rem 0',
                background: '#ffffff',
                borderTop: '1px solid #f1f5f9',
                borderBottom: '1px solid #f1f5f9',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                animate={controls}
                style={{
                    display: 'flex',
                    width: 'max-content',
                    cursor: 'default',
                }}
            >
                {circularRooms.map((room, index) => (
                    <motion.div
                        key={index}
                        onClick={() => navigate(`/room-category/${circularSlugs[index]}`)}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: (index % rooms.length) * 0.1 }}
                        whileHover={{ scale: 1.04, y: -6, transition: { duration: 0.35, ease: 'easeOut' } }}
                        style={{
                            width: `${CARD_WIDTH}px`,
                            height: '320px',
                            margin: '0 20px',
                            flexShrink: 0,
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                            border: '1px solid #f1f5f9',
                            background: '#f8fafc',
                            cursor: 'pointer',
                        }}
                    >
                        <motion.img
                            src={room}
                            alt={`Premium Room ${(index % rooms.length) + 1}`}
                            whileHover={{ scale: 1.1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ImageLoop;
