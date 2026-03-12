import { useParams, Link, useNavigate } from 'react-router-dom';
import { Wifi, Wind, Users, Check, ArrowLeft, Star, Coffee, Tv } from 'lucide-react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useRoom } from '../../hooks/useRooms';


const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { room, loading, error } = useRoom(id);

    // Helper to render amenity icon
    const getAmenityIcon = (amenityName) => {
        const lower = amenityName.toLowerCase();
        if (lower.includes('wifi')) return <Wifi size={18} />;
        if (lower.includes('ac') || lower.includes('air')) return <Wind size={18} />;
        if (lower.includes('tv')) return <Tv size={18} />;
        if (lower.includes('coffee') || lower.includes('bar')) return <Coffee size={18} />;
        return <Check size={18} />;
    };

    if (loading) return (
        <div className="page-wrapper pt-nav">
            <Navbar />
            <div className="loader-container full-height">
                <div className="loader"></div>
                <span>Preparing your sanctuary...</span>
            </div>
            <Footer />
        </div>
    );

    if (error || !room) return (
        <div className="page-wrapper pt-nav">
            <Navbar />
            <div className="container section text-center">
                <h2 className="section-title">Encountered an issue</h2>
                <p className="section-subtitle">{error || 'Room details unavailable'}</p>
                <Link to="/rooms" className="btn btn-primary mt-2">Explore Other Rooms</Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="page-wrapper">
            <Navbar />

            <div className="details-hero animate-fade-in" style={{ backgroundImage: `url("${room.imageUrl}")` }}>
                <div className="container hero-content">
                    <Link to="/rooms" className="back-link btn-with-icon">
                        <ArrowLeft size={16} /> Explore All Rooms
                    </Link>
                    <h1 className="room-title">{room.title}</h1>
                </div>
            </div>

            <div className="container section">
                <div className="details-layout">
                    {/* Left Column: Details */}
                    <div className="details-main">
                        <div className="stats-row">
                            <div className="stat-item">
                                <Users size={20} className="text-primary" />
                                <span>Up to {room.maxGuests} Guests</span>
                            </div>
                            <div className="stat-item">
                                <Star size={20} className="text-primary" />
                                <span>Premium Experience</span>
                            </div>
                        </div>

                        <div className="content-block">
                            <h2 className="block-title">Your Sanctuary</h2>
                            <p className="block-text">{room.description}</p>
                        </div>

                        <div className="content-block">
                            <h2 className="block-title">Amenities</h2>
                            <div className="amenities-grid">
                                {room.amenities.map((item, index) => (
                                    <div key={index} className="amenity-card">
                                        <span className="text-primary">{getAmenityIcon(item)}</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Card */}
                    <aside className="details-sidebar">
                        <div className="booking-card glass-card">
                            <div className="price-header">
                                <span className="label">Starting From</span>
                                <div className="price-main">
                                    ${room.price} <span className="period">/ night</span>
                                </div>
                            </div>

                            <form className="booking-form" onSubmit={(e) => {
                                e.preventDefault();
                                const checkIn = e.target.checkIn.value;
                                const checkOut = e.target.checkOut.value;

                                if (!checkIn || !checkOut) {
                                    alert('Please select both check-in and check-out dates.');
                                    return;
                                }

                                const start = new Date(checkIn);
                                const end = new Date(checkOut);

                                if (end <= start) {
                                    alert('Check-out date must be after check-in date.');
                                    return;
                                }

                                const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                                const totalAmount = nights * room.price;

                                // Assuming you've imported useNavigate from react-router-dom at the top
                                // We'll add it in the next step using multi_replace
                                navigate('/checkout', {
                                    state: {
                                        room,
                                        checkIn,
                                        checkOut,
                                        nights,
                                        totalAmount
                                    }
                                });
                            }}>
                                <div className="form-group">
                                    <label>Check In</label>
                                    <input type="date" name="checkIn" required min={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="form-group">
                                    <label>Check Out</label>
                                    <input type="date" name="checkOut" required min={new Date().toISOString().split('T')[0]} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-full">Reserve This Room</button>
                            </form>

                            <p className="booking-note">
                                Best price guaranteed. No credit card required until checkout.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />

            <style>{`
                .pt-nav { padding-top: var(--nav-height); }
                .full-height { flex: 1; }
                .mt-2 { margin-top: 2rem; }
                .text-center { text-align: center; }

                .details-hero {
                    height: 60vh;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    padding-bottom: 4rem;
                }

                .details-hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.9));
                }

                .hero-content { position: relative; z-index: 2; }
                
                .back-link {
                    color: var(--text-main);
                    text-decoration: none;
                    font-size: 0.9rem;
                    opacity: 0.7;
                    transition: var(--transition-fast);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .back-link:hover { opacity: 1; color: var(--primary); }

                .room-title { font-size: 4.5rem; color: #fff; }

                .details-layout {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 5rem;
                }

                .stats-row {
                    display: flex;
                    gap: 3rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid var(--glass-border);
                    margin-bottom: 3rem;
                }

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 500;
                    color: var(--text-main);
                }

                .content-block { margin-bottom: 4rem; }
                .block-title { font-size: 2rem; margin-bottom: 1.5rem; border-left: 4px solid var(--primary); padding-left: 1.5rem; }
                .block-text { color: var(--text-muted); line-height: 1.8; font-size: 1.1rem; }

                .amenities-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 1.25rem;
                }

                .amenity-card {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem;
                    background: var(--bg-card);
                    border-radius: 12px;
                    border: 1px solid var(--glass-border);
                    transition: var(--transition-normal);
                }

                .amenity-card:hover { border-color: var(--primary); transform: translateY(-3px); }

                .details-sidebar { position: relative; }
                .booking-card {
                    position: sticky;
                    top: 100px;
                    padding: 2.5rem;
                }

                .price-header { text-align: center; margin-bottom: 2rem; }
                .price-header .label { color: var(--text-dim); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; }
                .price-main { font-size: 3rem; font-weight: 700; color: var(--primary); }
                .price-main .period { font-size: 1rem; color: var(--text-main); font-weight: 400; }

                .booking-form { display: flex; flex-direction: column; gap: 1.25rem; }
                .form-group label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
                .form-group input {
                    width: 100%;
                    padding: 0.85rem;
                    background: var(--bg-main);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    color: #fff;
                    transition: var(--transition-fast);
                }

                .form-group input:focus { border-color: var(--primary); outline: none; }

                .booking-note { text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-dim); }

                @media (max-width: 1024px) {
                    .details-layout { grid-template-columns: 1fr; }
                    .details-sidebar { max-width: 500px; margin: 0 auto; }
                    .room-title { font-size: 3rem; }
                }
            `}</style>
        </div>
    );
};

export default RoomDetails;
