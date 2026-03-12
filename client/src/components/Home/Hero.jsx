import { Link } from 'react-router-dom';
import homeBgVideo from '../../assets/IMG_8969 .MP4';


const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    minWidth: '100%',
                    minHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    zIndex: -1,
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover'
                }}
            >
                <source src={homeBgVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for better text visibility */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(15, 23, 42, 0.5)',
                zIndex: 0
            }}></div>

            <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
                <h1 style={{
                    fontSize: '5.5rem',
                    marginBottom: '1rem',
                    lineHeight: '0.9',
                    fontWeight: 700,
                    textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                    Experience Luxury<br />
                    <span style={{ fontSize: '4rem' }}>Like Never Before</span>
                </h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2.5rem', color: '#e2e8f0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Discover our handpicked collection of premium rooms and suites.</p>
            </div>
        </section>
    );
};

export default Hero;
