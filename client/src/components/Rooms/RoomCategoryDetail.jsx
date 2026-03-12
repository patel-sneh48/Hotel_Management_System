import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { ArrowLeft, Check, Users, Maximize, Wifi, Wind, Coffee, Tv, Bath, Star } from 'lucide-react';
import RoomImageCarousel from './RoomImageCarousel';
import { useAuth } from '../../context/AuthContext';


// Import shared room data
import { ROOM_CATEGORIES } from '../../constants/roomData';



const roomCategories = ROOM_CATEGORIES;


const RoomCategoryDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const category = roomCategories[slug];
    const { user } = useAuth();
    const [showBooking, setShowBooking] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [bookingError, setBookingError] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const handleInitialBookClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            setShowBooking(true);
        }
    };

    const handleBook = () => {
        setBookingError('');
        if (!checkIn || !checkOut) {
            setBookingError('Please select both check-in and check-out dates.');
            return;
        }
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        if (end <= start) {
            setBookingError('Check-out must be after check-in.');
            return;
        }
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalAmount = nights * category.price;

        // Build a room object that matches what Checkout expects
        const room = {
            _id: slug,
            title: category.title,
            type: category.title,
            price: category.price,
            imageUrl: category.images[0],
        };

        navigate('/checkout', { state: { room, checkIn, checkOut, nights, totalAmount } });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!category) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div className="container section" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Room category not found</h2>
                    <Link to="/rooms" className="btn btn-primary">Back to Rooms</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Hero Banner */}
            <div style={{
                height: '55vh',
                background: `linear-gradient(rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.85)), url("${category.images[0]}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative'
            }}>
                <div className="container" style={{ paddingBottom: '3rem', width: '100%' }}>
                    <Link to="/rooms" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', textDecoration: 'none',
                        fontSize: '0.95rem', transition: 'color 0.2s'
                    }}
                        onMouseOver={e => e.currentTarget.style.color = '#fff'}
                        onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                    >
                        <ArrowLeft size={16} /> Back to Rooms
                    </Link>
                    <h1 style={{
                        fontSize: '3.2rem', color: '#fff',
                        fontWeight: 700,
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)', marginBottom: '0.5rem'
                    }}>{category.title}</h1>
                    <p style={{
                        fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)',
                        fontFamily: "'Caveat', cursive"
                    }}>{category.subtitle}</p>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ background: '#f8fafc', flex: 1 }}>
                <div className="container" style={{ padding: '4rem 2rem' }}>

                    {/* Quick Info Bar */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem',
                        marginBottom: '4rem', padding: '1.5rem 2rem',
                        background: '#fff', borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        marginTop: '-3rem', position: 'relative', zIndex: 2
                    }}>
                        {category.features.map((feat, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                color: '#334155', fontWeight: 500, fontSize: '1.05rem'
                            }}>
                                <Check size={18} color="#0ea5e9" /> {feat}
                            </div>
                        ))}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            color: '#0ea5e9', fontWeight: 700, fontSize: '1.3rem'
                        }}>
                            ${category.price} <span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#64748b' }}>/ night</span>
                        </div>

                    </div>

                    {/* Description */}
                    <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
                        <h2 style={{
                            fontSize: '2.2rem',
                            color: '#1e293b', marginBottom: '1.5rem'
                        }}>About This Room</h2>
                        <p style={{
                            color: '#475569', lineHeight: '1.9', fontSize: '1.1rem'
                        }}>{category.description}</p>
                    </div>

                    {/* Image Gallery - Upgraded to 3D Carousel */}
                    <h2 style={{
                        fontSize: '2.4rem',
                        color: '#1e293b', textAlign: 'center', marginBottom: '1rem'
                    }}>Immersive Room Gallery</h2>

                    <RoomImageCarousel
                        images={category.images}
                        descriptions={category.imageDescriptions}
                    />


                    {/* Amenities */}
                    <div style={{
                        background: '#fff', borderRadius: '20px', padding: '3rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '3rem'
                    }}>
                        <h2 style={{
                            fontSize: '2.2rem',
                            color: '#1e293b', textAlign: 'center', marginBottom: '2rem'
                        }}>Amenities & Services</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '1rem'
                        }}>
                            {category.amenities.map((amenity, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '1rem 1.2rem', background: '#f0f9ff',
                                    borderRadius: '12px', border: '1px solid #e0f2fe',
                                    transition: 'background 0.2s, transform 0.2s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    <Check size={18} color="#0ea5e9" />
                                    <span style={{ color: '#334155', fontWeight: 500 }}>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        {!showBooking ? (
                            <button className="btn btn-primary" style={{
                                padding: '1rem 3.5rem', fontSize: '1.15rem',
                                borderRadius: '50px', cursor: 'pointer'
                            }}
                                onClick={handleInitialBookClick}
                            >
                                Book This Room — ${category.price}/night
                            </button>
                        ) : (
                            <div style={{
                                background: '#fff', borderRadius: '20px', padding: '2rem',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)', maxWidth: '480px',
                                margin: '0 auto', textAlign: 'left'
                            }}>
                                <h3 style={{ fontSize: '1.6rem', color: '#1e293b', marginBottom: '1.25rem', textAlign: 'center' }}>
                                    Select Your Dates
                                </h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check In</label>
                                        <input
                                            type="date"
                                            value={checkIn}
                                            min={today}
                                            onChange={e => setCheckIn(e.target.value)}
                                            style={{
                                                width: '100%', padding: '0.65rem 0.75rem',
                                                border: '1px solid #e2e8f0', borderRadius: '8px',
                                                fontSize: '0.9rem', color: '#1e293b', outline: 'none'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check Out</label>
                                        <input
                                            type="date"
                                            value={checkOut}
                                            min={checkIn || today}
                                            onChange={e => setCheckOut(e.target.value)}
                                            style={{
                                                width: '100%', padding: '0.65rem 0.75rem',
                                                border: '1px solid #e2e8f0', borderRadius: '8px',
                                                fontSize: '0.9rem', color: '#1e293b', outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>

                                {bookingError && (
                                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.75rem', textAlign: 'center' }}>{bookingError}</p>
                                )}

                                {checkIn && checkOut && new Date(checkOut) > new Date(checkIn) && (
                                    <p style={{ color: '#0ea5e9', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>
                                        {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights
                                        &nbsp;—&nbsp; Total: ${(Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * category.price).toFixed(2)}
                                    </p>
                                )}

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => { setShowBooking(false); setBookingError(''); }}
                                        style={{
                                            flex: 1, padding: '0.8rem', borderRadius: '10px',
                                            border: '1px solid #e2e8f0', background: '#f8fafc',
                                            color: '#64748b', cursor: 'pointer', fontSize: '0.95rem'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleBook}
                                        className="btn btn-primary"
                                        style={{ flex: 2, padding: '0.8rem', borderRadius: '10px', fontSize: '0.95rem' }}
                                    >
                                        Proceed to Checkin →
                                    </button>
                                </div>
                            </div>
                        )}

                        <p style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '0.9rem' }}>
                            No credit card required for reservation
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RoomCategoryDetail;
