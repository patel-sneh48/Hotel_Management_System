import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { CheckCircle, Calendar, CreditCard, Smartphone, User, ArrowRight, Loader2 } from 'lucide-react';

const BookingSuccess = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
            <div className="page-wrapper pt-nav">
                <Navbar />
                <div className="loader-container full-height">
                    <div className="loader"></div>
                    <span>Confirming your reservation...</span>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="page-wrapper pt-nav">
                <Navbar />
                <div className="container section text-center">
                    <h2 className="section-title">Encountered an issue</h2>
                    <p className="section-subtitle">{error}</p>
                    <Link to="/rooms" className="btn btn-primary mt-4">Explore Rooms</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-wrapper pt-nav">
            <Navbar />

            <div className="container section">
                <div className="success-container glass-card mx-auto">
                    <div className="success-header text-center pb-6 border-b">
                        <div className="success-icon-wrapper mx-auto mb-4 animate-bounce-in">
                            <CheckCircle size={48} className="text-success" />
                        </div>
                        <h1 className="success-title text-success font-bold mb-2">Booking Confirmed!</h1>
                        <p className="text-dim">Thank you, {booking.guestName}. Your reservation is complete.</p>
                        <p className="text-sm text-dim mt-1">Booking ID: <span className="text-white opacity-70">#{booking._id.substring(0, 8).toUpperCase()}</span></p>
                    </div>

                    <div className="success-body py-6">
                        <h2 className="text-lg font-bold mb-4 text-white border-l-4 border-primary pl-3">Reservation Details</h2>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label"><User size={16} /> Guest Name</span>
                                <span className="detail-value">{booking.guestName}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Room Type</span>
                                <span className="detail-value text-primary font-bold">{booking.roomTitle}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label"><Calendar size={16} /> Check In</span>
                                <span className="detail-value">{new Date(booking.checkIn).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label"><Calendar size={16} /> Check Out</span>
                                <span className="detail-value">{new Date(booking.checkOut).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                        </div>

                        <div className="payment-receipt mt-6 p-4 rounded-xl">
                            <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                                {booking.paymentMethod === 'card' ? <CreditCard size={18} /> : <Smartphone size={18} />}
                                Payment Receipt
                            </h3>
                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span className="text-dim">Payment Status</span>
                                <span className="text-success flex items-center gap-1 font-bold">
                                    <CheckCircle size={14} /> {booking.paymentStatus.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-2 text-sm">
                                <span className="text-dim">Payment Method</span>
                                <span>{booking.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI App'}</span>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-3 border-t text-lg font-bold text-white">
                                <span>Total Paid</span>
                                <span className="text-primary">${booking.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="success-footer pt-6 border-t flex gap-4 justify-center">
                        <Link to="/" className="btn btn-outline">Go to Home</Link>
                        <Link to="/rooms" className="btn btn-primary flex items-center gap-2">Book Another <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </div>

            <Footer />

            <style>{`
                .pt-nav { padding-top: calc(var(--nav-height) + 2rem); }
                .mx-auto { margin-left: auto; margin-right: auto; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-3 { margin-bottom: 0.75rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mt-1 { margin-top: 0.25rem; }
                .mt-3 { margin-top: 0.75rem; }
                .mt-4 { margin-top: 1rem; }
                .mt-6 { margin-top: 1.5rem; }
                .pb-6 { padding-bottom: 1.5rem; }
                .pt-3 { padding-top: 0.75rem; }
                .pt-6 { padding-top: 1.5rem; }
                .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
                .pl-3 { padding-left: 0.75rem; }
                .p-4 { padding: 1rem; }
                .text-center { text-align: center; }
                .text-dim { color: var(--text-dim); }
                .text-sm { font-size: 0.875rem; }
                .text-md { font-size: 1rem; }
                .text-lg { font-size: 1.125rem; }
                .text-success { color: #10b981; }
                .text-white { color: #fff; }
                .text-primary { color: var(--primary); }
                .font-bold { font-weight: 700; }
                .border-t { border-top: 1px solid var(--glass-border); }
                .border-b { border-bottom: 1px solid var(--glass-border); }
                .border-l-4 { border-left-width: 4px; border-left-style: solid; }
                .border-primary { border-left-color: var(--primary); }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .justify-center { justify-content: center; }
                .gap-1 { gap: 0.25rem; }
                .gap-2 { gap: 0.5rem; }
                .gap-4 { gap: 1rem; }
                .rounded-xl { border-radius: 0.75rem; }
                .opacity-70 { opacity: 0.7; }
                .full-height { flex: 1; }
                
                .success-container {
                    max-width: 600px;
                    padding: 2.5rem;
                }

                .success-icon-wrapper {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(16, 185, 129, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .success-title { font-size: 2rem; }

                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 1; }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-in { animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .detail-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                }

                .detail-label {
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                }

                .detail-value {
                    color: #fff;
                    font-size: 1rem;
                }

                .payment-receipt {
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px dashed rgba(255,255,255,0.1);
                }

                @media (max-width: 600px) {
                    .details-grid { grid-template-columns: 1fr; gap: 1rem; }
                    .success-container { padding: 1.5rem; }
                    .success-footer { flex-direction: column; }
                    .success-footer .btn { width: 100%; justify-content: center; }
                }
            `}</style>
        </div>
    );
};

export default BookingSuccess;
