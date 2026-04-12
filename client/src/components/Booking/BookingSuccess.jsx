import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { CheckCircle, Calendar, CreditCard, Smartphone, User, ArrowRight, Loader2, Hash, ShieldCheck } from 'lucide-react';

const BookingSuccess = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBooking = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bookings/${id}`);
                const data = await response.json();
                if (data.success) {
                    setBooking(data.booking);
                } else {
                    setError('Booking not found');
                }
            } catch (err) {
                setError('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    if (loading) {
        return (
            <div className="success-page-root loading">
                <Navbar />
                <div className="loading-content">
                    <Loader2 className="spinning-premium" size={48} />
                    <p>Securing your luxury stay...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="success-page-root">
                <Navbar />
                <div className="error-content container section text-center">
                    <h2 className="brand-font-premium text-2xl mb-4">Reservation not found</h2>
                    <p className="opacity-70 mb-6">We couldn't retrieve the details for this booking ID.</p>
                    <Link to="/rooms" className="premium-action-btn">Explore Other Rooms</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', damping: 20, stiffness: 100 }
        }
    };

    return (
        <div className="success-page-root">
            <Navbar />

            <motion.div
                className="success-main-container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Hero Section */}
                <motion.div className="success-hero" variants={itemVariants}>
                    <motion.div
                        className="hero-icon-wrapper"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.5 }}
                    >
                        <CheckCircle size={60} color="#10b981" />
                    </motion.div>
                    <h1 className="brand-font-premium confirmed-title">BOOKING CONFIRMED!</h1>
                    <p className="hero-subtitle">Thank you, {booking.guestName}. Your reservation is complete.</p>
                    <div className="booking-id-badge">
                        <Hash size={14} /> <span>Booking ID: #{booking._id.substring(0, 8).toUpperCase()}</span>
                    </div>
                </motion.div>

                {/* Details Section */}
                <motion.div className="details-section-premium glass-card-premium" variants={itemVariants}>
                    <div className="section-header-premium">
                        <div className="accent-line"></div>
                        <h2 className="brand-font-premium section-title-inner">RESERVATION DETAILS</h2>
                    </div>

                    <div className="details-grid-premium">
                        <div className="detail-box-premium">
                            <label><User size={16} /> Guest Name</label>
                            <p>{booking.guestName}</p>
                        </div>
                        <div className="detail-box-premium">
                            <label>Room Type</label>
                            <p className="room-type-highlight">{booking.roomTitle}</p>
                        </div>
                        <div className="detail-box-premium">
                            <label><Calendar size={16} /> Check In</label>
                            <div className="date-time-box">
                                <p>{new Date(booking.checkIn).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                {booking.checkInTime && <span className="time-accent">at {booking.checkInTime}</span>}
                            </div>
                        </div>
                        <div className="detail-box-premium">
                            <label><Calendar size={16} /> Check Out</label>
                            <div className="date-time-box">
                                <p>{new Date(booking.checkOut).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                {booking.checkOutTime && <span className="time-accent">at {booking.checkOutTime}</span>}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Section */}
                <motion.div className="receipt-section-premium glass-card-premium" variants={itemVariants}>
                    <div className="receipt-header-premium">
                        <div className="receipt-icon-circle">
                            {booking.paymentMethod === 'card' ? <CreditCard size={20} /> : <Smartphone size={20} />}
                        </div>
                        <h3 className="brand-font-premium">PAYMENT RECEIPT</h3>
                    </div>

                    <div className="receipt-content-premium">
                        <div className="receipt-row">
                            <span className="label">Payment Status</span>
                            <span className="status-badge-premium"><ShieldCheck size={14} /> {booking.paymentStatus.toUpperCase()}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="label">Method</span>
                            <span>{booking.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI Transaction'}</span>
                        </div>

                        <div className="receipt-dashed-divider"></div>

                        <div className="receipt-total-row">
                            <div className="total-label-box">
                                <span>Total Paid</span>
                                <p>Standard Room Rate + Taxes</p>
                            </div>
                            <div className="total-amount-premium">₹{booking.totalAmount.toFixed(2)}</div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Actions */}
                <motion.div className="success-actions-premium" variants={itemVariants}>
                    <Link to="/" className="outline-btn-premium">Return Home</Link>
                    <Link to="/rooms" className="primary-btn-premium">
                        Book Another Stay <ArrowRight size={18} />
                    </Link>
                </motion.div>

                <motion.p className="policy-note" variants={itemVariants}>
                    A confirmation email has been sent to your registered address.
                    <br />Need help? Contact our 24/7 concierge at <span className="text-primary">+91 9909599765</span>
                </motion.p>
            </motion.div>

            <Footer />

            <style>{`
                .success-page-root {
                    min-height: 100vh;
                    background: radial-gradient(circle at top right, #0f172a, #020617);
                    color: #fff;
                    padding-top: calc(var(--nav-height) + 2rem);
                }

                .success-main-container {
                    max-width: 850px;
                    margin: 0 auto;
                    padding: 0 2rem 5rem;
                    font-family: 'Inter', sans-serif;
                }

                .brand-font-premium {
                    font-family: 'Algerian', serif;
                    letter-spacing: 0.05em;
                }

                .loading-content {
                    height: 60vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                }
                .spinning-premium { animation: spin 1.5s linear infinite; color: var(--primary); }
                @keyframes spin { 100% { transform: rotate(360deg); } }

                .success-hero {
                    text-align: center;
                    margin-bottom: 3.5rem;
                }

                .hero-icon-wrapper {
                    width: 100px;
                    height: 100px;
                    background: rgba(16, 185, 129, 0.1);
                    border: 2px solid rgba(16, 185, 129, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                    box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
                }

                .confirmed-title {
                    font-size: 3.5rem;
                    background: linear-gradient(135deg, #10b981, #059669);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1.5rem;
                    filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.2));
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.9);
                    font-style: italic;
                    margin-bottom: 1rem;
                }

                .booking-id-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.25rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .glass-card-premium {
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                    padding: 2.5rem;
                    margin-bottom: 2rem;
                }

                .section-header-premium {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 2.5rem;
                }

                .accent-line {
                    width: 4px;
                    height: 24px;
                    background: var(--primary);
                    border-radius: 2px;
                }

                .section-title-inner {
                    font-size: 1.5rem;
                    color: #fff;
                }

                .details-grid-premium {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.5rem;
                }

                .detail-box-premium label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                }

                .detail-box-premium p {
                    font-size: 1.15rem;
                    color: #fff;
                    font-weight: 500;
                }

                .room-type-highlight {
                    font-family: 'Algerian', serif;
                    color: var(--primary) !important;
                }

                .date-time-box {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .time-accent {
                    font-size: 0.85rem;
                    color: var(--primary);
                    font-weight: 700;
                }

                .receipt-header-premium {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .receipt-icon-circle {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                }

                .receipt-header-premium h3 { font-size: 1.25rem; }

                .receipt-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.25rem;
                    font-size: 0.95rem;
                }
                .receipt-row .label { color: rgba(255, 255, 255, 0.5); }

                .status-badge-premium {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #10b981;
                    font-weight: 700;
                    font-size: 0.9rem;
                }

                .receipt-dashed-divider {
                    margin: 2rem 0;
                    border-top: 1px dashed rgba(255, 255, 255, 0.2);
                }

                .receipt-total-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .total-label-box span { font-size: 0.9rem; color: #fff; display: block; }
                .total-label-box p { font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); margin-top: 0.25rem; }
                .total-amount-premium {
                    font-size: 2.8rem;
                    font-weight: 800;
                    color: var(--primary);
                    line-height: 1;
                    font-family: 'Inter', sans-serif;
                }

                .success-actions-premium {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 3rem;
                    margin-bottom: 2.5rem;
                }

                .primary-btn-premium {
                    background: linear-gradient(135deg, #0ea5e9, #0284c7);
                    color: #fff;
                    padding: 1.1rem 2.2rem;
                    border-radius: 14px;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-weight: 700;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3);
                }
                .primary-btn-premium:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 15px 30px rgba(14, 165, 233, 0.4);
                }

                .outline-btn-premium {
                    color: #fff;
                    padding: 1.1rem 2.2rem;
                    border-radius: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                .outline-btn-premium:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .policy-note {
                    text-align: center;
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.7;
                }
                .policy-note .text-primary { font-weight: 700; }

                @media (max-width: 768px) {
                    .confirmed-title { font-size: 2.5rem; }
                    .details-grid-premium { grid-template-columns: 1fr; gap: 1.5rem; }
                    .success-actions-premium { flex-direction: column; }
                    .primary-btn-premium, .outline-btn-premium { width: 100%; justify-content: center; }
                    .total-amount-premium { font-size: 2.2rem; }
                    .success-main-container { padding: 0 1.5rem 4rem; }
                }
            `}</style>
        </div>
    );
};

export default BookingSuccess;
