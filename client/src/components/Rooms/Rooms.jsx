import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { Star, Check } from 'lucide-react';
import { useRooms } from '../../hooks/useRooms';


// Import shared room data
import { ROOM_CATEGORIES } from './constants/roomData';





const Rooms = () => {
    const { rooms, loading, error } = useRooms();
    const [activeCategory, setActiveCategory] = useState('classic');
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        // Use requestAnimationFrame or a small timeout to ensure the scroll happens after render
        setTimeout(() => {
            if (scrollRef.current) {
                const navHeight = 90; // Precise offset to keep buttons visible under navbar
                const elementPosition = scrollRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 50);
    };

    // Categorize rooms
    const featuredClassicRooms = [
        ROOM_CATEGORIES['single-cla'],
        ROOM_CATEGORIES['double-cla']
    ];

    const classicRooms = [
        ...featuredClassicRooms.map(room => ({
            ...room,
            imageUrl: room.images[0] // Use first image as main
        })),
        ...rooms.filter(room =>
            (room.title.toLowerCase().includes('classic') || room.title.toLowerCase().includes('single')) &&
            !room.title.toLowerCase().includes('static')
        )
    ];

    const premiumRooms = [
        ROOM_CATEGORIES['single-pre'],
        ROOM_CATEGORIES['double-pre'],
        ...rooms.filter(room =>
            (room.title.toLowerCase().includes('premium') || room.title.toLowerCase().includes('double') || room.title.toLowerCase().includes('suite')) &&
            !room.title.toLowerCase().includes('static')
        )
    ].map(room => room.images ? { ...room, imageUrl: room.images[0] } : room);




    const StarRating = ({ count }) => (
        <div className="star-rating">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={18}
                    fill={i < count ? "var(--primary)" : "none"}
                    color={i < count ? "var(--primary)" : "#475569"}
                />
            ))}
        </div>
    );

    return (
        <div className="page-wrapper pt-nav">
            <Navbar />

            <div className="rooms-hero">
                <h1 className="hero-title">Our Accommodations</h1>
                <p className="hero-subtitle font-fancy">Luxury tailored to your lifestyle</p>
            </div>

            <div className="container category-selector-wrapper" ref={scrollRef}>
                <div className="category-tabs">
                    <button
                        className={`category-tab ${activeCategory === 'classic' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('classic')}
                    >
                        Classic Collection
                    </button>
                    <button
                        className={`category-tab ${activeCategory === 'premium' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('premium')}
                    >
                        Premium Selection
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <section className="category-section">
                <div className="container">
                    <div className="animate-fade-in" key={activeCategory}>
                        {activeCategory === 'classic' ? (
                            <>
                                <div className="section-header">
                                    <div className="category-label">Tier I</div>
                                    <h2 className="section-title text-fancy">Classic Collection</h2>
                                    <StarRating count={4} />
                                    <p className="section-description">
                                        Experience timeless comfort in our Classic Collection. These rooms offer a perfect blend of traditional elegance and modern convenience, designed for the traveler who appreciates refined simplicity.
                                    </p>
                                </div>

                                <div className="rooms-grid-large">
                                    {classicRooms.map((room) => (
                                        <div
                                            key={room._id}
                                            className="room-item-large"
                                            onClick={() => {
                                                if (room._id === 'static-single-classic') {
                                                    navigate('/room-category/single-cla');
                                                } else if (room._id === 'static-double-classic') {
                                                    navigate('/room-category/double-cla');
                                                } else {
                                                    navigate(`/rooms/${room._id}`);
                                                }
                                            }}
                                        >
                                            <div className="room-image-wrapper">

                                                <img src={room.imageUrl} alt={room.title} className="room-image" />
                                                <div className="room-overlay">
                                                    <div className="room-price-tag">${room.price}/night</div>
                                                    <div className="room-title-overlay">{room.title}</div>
                                                </div>
                                            </div>
                                            <div className="room-details-simple">
                                                <p>{room.description.substring(0, 120)}...</p>
                                                <div className="room-features-mini">
                                                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                                                        <span key={idx} className="feature-dot"><Check size={14} /> {amenity}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="section-header">
                                    <div className="category-label">Tier II</div>
                                    <h2 className="section-title text-fancy">Premium Selection</h2>
                                    <StarRating count={5} />
                                    <p className="section-description">
                                        Our Premium Selection represents the pinnacle of LuxeStay hospitality. Featuring expansive layouts, exclusive panoramic views, and bespoke personalized services, these suites are crafted for an unforgettable stay.
                                    </p>
                                </div>

                                <div className="rooms-grid-large">
                                    {premiumRooms.map((room) => (
                                        <div
                                            key={room._id}
                                            className="room-item-large"
                                            onClick={() => {
                                                if (room._id === 'static-single-premium') {
                                                    navigate('/room-category/single-pre');
                                                } else if (room._id === 'static-double-premium') {
                                                    navigate('/room-category/double-pre');
                                                } else {
                                                    navigate(`/rooms/${room._id}`);
                                                }
                                            }}
                                        >
                                            <div className="room-image-wrapper">

                                                <img src={room.imageUrl} alt={room.title} className="room-image" />
                                                <div className="room-overlay">
                                                    <div className="room-price-tag">${room.price}/night</div>
                                                    <div className="room-title-overlay">{room.title}</div>
                                                </div>
                                            </div>
                                            <div className="room-details-simple">
                                                <p>{room.description.substring(0, 120)}...</p>
                                                <div className="room-features-mini">
                                                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                                                        <span key={idx} className="feature-dot"><Check size={14} /> {amenity}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                .pt-nav { padding-top: var(--nav-height); }
                .full-height { min-height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
                
                .rooms-hero {
                    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=3840&q=100');
                    background-size: cover;
                    background-position: center;
                    color: #fff;
                    padding: 10rem 2rem;
                    text-align: center;
                }


                .hero-title { font-size: 5rem; margin-bottom: 1rem; }
                .hero-subtitle { font-size: 2rem; color: var(--primary); }

                .category-selector-wrapper {
                    margin-top: -40px;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
                    scroll-margin-top: 100px;
                }

                .category-tabs {
                    display: flex;
                    background: var(--bg-card);
                    padding: 0.5rem;
                    border-radius: 60px;
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(10px);
                    box-shadow: var(--shadow-xl);
                }

                .category-tab {
                    padding: 1.2rem 4rem;
                    border-radius: 50px;
                    border: none;
                    background: transparent;
                    color: var(--text-dim);
                    font-weight: 700;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: var(--transition-normal);
                    font-family: 'Algerian', serif;
                    letter-spacing: 0.05em;
                }

                .category-tab.active {
                    background: var(--primary);
                    color: #000;
                    box-shadow: var(--shadow-md);
                }

                .category-section { padding: 4rem 0 8rem 0; }

                .section-header {
                    text-align: center;
                    max-width: 800px;
                    margin: 0 auto 5rem auto;
                }

                .category-label {
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    color: var(--primary);
                    font-size: 0.8rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .star-rating {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .section-title { font-size: 3.5rem; margin-bottom: 1rem; }
                .section-description { color: var(--text-muted); line-height: 1.8; font-size: 1.1rem; }

                .rooms-grid-large {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
                    gap: 4rem;
                }


                .room-item-large {
                    cursor: pointer;
                    transition: var(--transition-normal);
                }

                .room-image-wrapper {
                    position: relative;
                    height: 800px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: var(--shadow-lg);
                    margin-bottom: 2rem;
                }



                .room-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: var(--transition-slow);
                    filter: brightness(1.05) contrast(1.1) saturate(1.1);
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                }


                .room-item-large:hover .room-image { transform: scale(1.08); }

                .room-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 2.5rem;
                    transition: var(--transition-normal);
                }

                .room-price-tag {
                    align-self: flex-start;
                    background: var(--primary);
                    color: #000;
                    padding: 0.5rem 1.25rem;
                    border-radius: 8px;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    box-shadow: var(--shadow-md);
                }

                .room-title-overlay {
                    font-size: 2.5rem;
                    color: #fff;
                    font-weight: 700;
                }

                .room-details-simple {
                    padding: 0 1rem;
                }

                .room-details-simple p {
                    color: var(--text-dim);
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .room-features-mini {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .feature-dot {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }

                @media (max-width: 768px) {
                    .rooms-grid-large { grid-template-columns: 1fr; }
                    .room-image-wrapper { height: 350px; }
                    .room-title-overlay { font-size: 1.8rem; }
                    .hero-title { font-size: 3rem; }
                    .category-tab { padding: 0.8rem 1.5rem; font-size: 1rem; }
                    .category-selector-wrapper { margin-top: -30px; }
                }
                
                .text-fancy { font-weight: 700; }
                .font-fancy { font-family: 'Caveat', cursive; }
                
                .animate-fade-in {
                    animation: fadeIn 0.6s ease forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Rooms;
