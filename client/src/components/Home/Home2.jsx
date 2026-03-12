import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import RoomCard from '../pages/RoomCard';
import ImageLoop from '../pages/ImageLoop';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                // In production, use env variable
                const res = await axios.get('http://localhost:5000/api/rooms');
                setRooms(res.data);
            } catch (err) {
                console.error("Failed to fetch rooms", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    // Handle hash scrolling for "Rooms" link
    useEffect(() => {
        if (window.location.hash === '#rooms') {
            const element = document.getElementById('rooms');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [rooms, loading]); // Run when rooms are loaded

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Hero />

            <section id="rooms" className="section container">
                <div className="section-title">Our Premium Rooms</div>
                <p className="section-subtitle">
                    Each of our rooms is designed with your comfort in mind, featuring premium amenities and breathtaking views.
                </p>

                <ImageLoop />

                {/* Refactored About Section */}
                <div style={{
                    padding: '3rem 2rem',
                    maxWidth: '900px',
                    margin: '4rem auto',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <h2 style={{
                        color: '#ffffff',
                        fontSize: '2.5rem',
                        marginBottom: '1.5rem',
                        fontFamily: "'Caveat', cursive",
                        fontWeight: 700
                    }}>About LuxeStay</h2>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: '1.8',
                        marginBottom: '2rem',
                        fontSize: '1.1rem',
                        maxWidth: '750px',
                        margin: '0 auto 2rem auto',
                        fontFamily: "'Caveat', cursive",
                        fontWeight: 300
                    }}>
                        Founded on the principles of unparalleled hospitality and architectural excellence, LuxeStay has established itself as a beacon of luxury in the world of hospitality. Every corner is designed to provide a sanctuary of calm and sophistication, ensuring your stay is nothing short of extraordinary.
                    </p>
                    <a href="/about" className="btn btn-primary" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        padding: '0.8rem 2rem'
                    }}>
                        View More Info <ArrowRight size={18} />
                    </a>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading rooms...</div>
                ) : (
                    <div className="grid-3">
                        {rooms.map(room => (
                            <RoomCard key={room._id} room={room} />
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
};
export default Home;
