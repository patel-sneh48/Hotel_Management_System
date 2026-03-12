import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import RoomCard from '../Rooms/RoomCard';
import ImageLoop from './ImageLoop';

import { useRooms } from '../../hooks/useRooms';

const Home = () => {
    const { rooms, loading, error } = useRooms();

    // Handle hash scrolling for "Rooms" link
    useEffect(() => {
        if (!loading && window.location.hash === '#rooms') {
            const element = document.getElementById('rooms');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading]);

    return (
        <div className="page-wrapper">
            <Navbar />
            <Hero />

            <section id="rooms" className="section container">
                <div className="section-header">
                    <h2 className="section-title">Our Premium Rooms</h2>
                    <p className="section-subtitle">
                        Each of our rooms is designed with your comfort in mind, featuring premium amenities and breathtaking views.
                    </p>
                </div>

                <ImageLoop />
                <br />
                <br />

                <div className="about-preview-card glass-card" style={{ textAlign: 'center' }}>
                    <h2 className="about-title">About LuxeStay</h2>
                    <p className="about-text">
                        Founded on the principles of unparalleled hospitality and architectural excellence, LuxeStay has established itself as a beacon of luxury in the world of hospitality. Every corner is designed to provide a sanctuary of calm and sophistication, ensuring your stay is nothing short of extraordinary.
                    </p>
                    <br />
                    <a href="/about" className="btn btn-primary btn-with-icon">
                        View More Info <ArrowRight size={18} />
                    </a>
                </div>


            </section>
            <Footer />
        </div>
    );
};

export default Home;
