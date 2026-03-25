import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useAuth } from '../../context/AuthContext';
import { Calendar, CreditCard, Smartphone, CheckCircle, Clock, Loader2, ArrowRight, BedDouble } from 'lucide-react';

const MyBookings = () => {
    const { user, token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/bookings/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setBookings(data.bookings);
                } else {
                    setError(data.message || 'Failed to load bookings');
                }
            } catch (err) {
                setError('Could not connect to the server');
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchBookings();
    }, [token]);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

    const getNights = (checkIn, checkOut) =>
        Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

    const isUpcoming = (checkIn) => new Date(checkIn) >= new Date();

    return (
        <div className="page-wrapper pt-nav-mb">
            <Navbar />
            <div className="container section">
                {/* Header */}
                <div className="bookings-header mb-12">
                    <div className="user-avatar-lg">{user?.name?.charAt(0).toUpperCase()}</div>
                    <div className="text-center mt-4">
                        <h1 className="bookings-title">My Bookings</h1>
                        <p className="text-dim text-lg">{user?.email}</p>
                    </div>
                </div>

                {loading && (
                    <div className="empty-state">
                        <Loader2 className="animate-spin" size={40} />
                        <p className="text-dim mt-4">Loading your bookings...</p>
                    </div>
                )}

                {error && (
                    <div className="empty-state">
                        <p className="text-error">{error}</p>
                        <Link to="/rooms" className="btn btn-primary mt-4">Book a Room</Link>
                    </div>
                )}

                {!loading && !error && bookings.length === 0 && (
                    <div className="empty-state glass-card">
                        <BedDouble size={56} className="text-dim mb-4" />
                        <h2 className="text-lg text-white font-bold mb-2">No Bookings Yet</h2>
                        <p className="text-dim mb-6">You haven't made any reservations. Start exploring our rooms!</p>
                        <Link to="/rooms" className="btn btn-primary">
                            Explore Rooms <ArrowRight size={16} className="inline ml-1" />
                        </Link>
                    </div>
                )}

                {!loading && bookings.length > 0 && (
                    <div className="bookings-grid">
                        {bookings.map((booking) => {
                            const upcoming = isUpcoming(booking.checkIn);
                            const nights = getNights(booking.checkIn, booking.checkOut);

                            return (
                                <div key={booking._id} className="booking-card glass-card animate-fade-in">
                                    {/* Card Top Badge */}
                                    <div className="booking-card-header">
                                        <span className={`status-badge ${upcoming ? 'status-upcoming' : 'status-past'}`}>
                                            {upcoming ? <><Clock size={13} /> Upcoming</> : <><CheckCircle size={13} /> Completed</>}
                                        </span>
                                        <span className="booking-id text-dim">
                                            #{booking._id.substring(0, 8).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Room Info */}
                                    <h3 className="room-title-card text-primary">{booking.roomTitle}</h3>
                                    {booking.roomNumber && (
                                        <div className="room-number-badge mb-4">
                                            <BedDouble size={14} /> Room {booking.roomNumber}
                                        </div>
                                    )}

                                    {/* Dates Row */}
                                    <div className="dates-row-premium">
                                        <div className="date-box date-box-left">
                                            <span className="date-label-premium">Check In</span>
                                            <span className="date-value-premium">{formatDate(booking.checkIn)}</span>
                                            {booking.checkInTime && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>at {booking.checkInTime}</span>}
                                        </div>
                                        <div className="nights-connector">
                                            <div className="connector-line"></div>
                                            <span className="nights-pill">{nights} Nights</span>
                                            <div className="connector-line"></div>
                                        </div>
                                        <div className="date-box date-box-right">
                                            <span className="date-label-premium">Check Out</span>
                                            <span className="date-value-premium">{formatDate(booking.checkOut)}</span>
                                            {booking.checkOutTime && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>at {booking.checkOutTime}</span>}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="card-divider" />

                                    {/* Payment & Total */}
                                    <div className="payment-row">
                                        <div className="payment-method-info">
                                            {booking.paymentMethod === 'card'
                                                ? <><CreditCard size={16} /> Card</>
                                                : <><Smartphone size={16} /> UPI</>}
                                        </div>
                                        <div className="payment-status">
                                            <CheckCircle size={14} className="text-success" />
                                            <span className="text-success text-sm font-bold">Paid</span>
                                        </div>
                                        <div className="total-amount">${booking.totalAmount.toFixed(2)}</div>
                                    </div>

                                    {/* Guest Info */}
                                    <div className="guest-info text-dim text-sm mt-3">
                                        <span>📞 {booking.phone}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />

            <style>{`
                .pt-nav-mb { padding-top: calc(var(--nav-height) + 1rem); }
                .mb-8 { margin-bottom: 2rem; }
                .mt-4 { margin-top: 1rem; }
                .mt-3 { margin-top: 0.75rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .ml-1 { margin-left: 0.25rem; }
                .text-dim { color: var(--text-dim); }
                .text-primary { color: var(--primary); }
                .text-white { color: #fff; }
                .text-sm { font-size: 0.875rem; }
                .text-lg { font-size: 1.125rem; }
                .text-right { text-align: right; }
                .text-success { color: #10b981; }
                .text-error { color: #ef4444; }
                .font-bold { font-weight: 700; }
                .inline { display: inline; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }

                .bookings-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-bottom: 3.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .user-avatar-lg {
                    width: 76px; height: 76px;
                    border-radius: 50%;
                    background: var(--primary);
                    color: #1a1a1a;
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 700; font-size: 2rem;
                    flex-shrink: 0;
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
                    margin-bottom: 1rem;
                }

                .bookings-title {
                    font-size: 3rem;
                    color: #fff;
                    font-weight: 700;
                    font-family: 'Algerian', serif;
                    margin-bottom: 0.5rem;
                    letter-spacing: 0.03em;
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    min-height: 40vh;
                    padding: 3rem;
                    max-width: 480px;
                    margin: 0 auto;
                }

                .bookings-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    max-width: 850px;
                    margin: 0 auto;
                }

                .booking-card {
                    padding: 2rem;
                    border-radius: 20px;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .booking-card:hover {
                    transform: translateY(-5px);
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(212, 175, 55, 0.2);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.4);
                }

                .booking-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.3rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.78rem;
                    font-weight: 600;
                }

                .status-upcoming {
                    background: rgba(56, 189, 248, 0.12);
                    color: var(--primary);
                    border: 1px solid rgba(56, 189, 248, 0.25);
                }

                .status-past {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }

                .booking-id { font-size: 0.78rem; font-family: monospace; opacity: 0.6; }

                .room-title-card {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    text-align: center;
                    letter-spacing: 0.02em;
                }

                .room-number-badge {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.2rem;
                    background: rgba(56, 189, 248, 0.08);
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--primary);
                    width: fit-content;
                    margin: 0 auto 1.5rem;
                }

                .dates-row-premium {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    padding: 1.25rem;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .date-box { display: flex; flex-direction: column; gap: 0.35rem; }
                .date-box-right { text-align: right; }
                .date-label-premium { font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
                .date-value-premium { font-size: 1.1rem; color: #fff; font-weight: 600; }

                .nights-connector {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 0 1.5rem;
                    min-width: 120px;
                }
                .connector-line { width: 1px; height: 10px; background: rgba(212, 175, 55, 0.3); }
                .nights-pill {
                    padding: 0.3rem 0.8rem;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--primary);
                    white-space: nowrap;
                    margin: 0.2rem 0;
                }

                .card-divider {
                    height: 1px;
                    background: var(--glass-border);
                    margin: 1rem 0;
                }

                .payment-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 0.5rem;
                }

                .payment-method-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: var(--text-dim);
                    background: rgba(255,255,255,0.05);
                    padding: 0.4rem 0.8rem;
                    border-radius: 6px;
                }

                .payment-status {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                }

                .total-amount {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: var(--primary);
                    font-family: 'Inter', sans-serif;
                }

                .guest-info {
                    display: flex;
                    gap: 1.5rem;
                }

                @media (max-width: 640px) {
                    .bookings-grid { grid-template-columns: 1fr; }
                    .bookings-title { font-size: 1.6rem; }
                    .user-avatar-lg { width: 50px; height: 50px; font-size: 1.4rem; }
                }
            `}</style>
        </div>
    );
};

export default MyBookings;
