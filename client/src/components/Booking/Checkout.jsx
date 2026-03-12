import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, Smartphone, CheckCircle, ArrowLeft, Loader2, Calendar, Users } from 'lucide-react';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const { room, checkIn, checkOut, totalAmount, nights } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        guestName: user?.name || '',
        email: user?.email || '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        upiId: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        // Redirect if not logged in
        if (!user) {
            navigate('/login', { replace: true, state: { from: { pathname: '/checkout' }, bookingState: location.state } });
            return;
        }
        // Redirect if no booking data is present in state
        if (!room) {
            navigate('/rooms', { replace: true });
        }
    }, [room, navigate, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const bookingData = {
                guestName: formData.guestName,
                email: formData.email,
                phone: formData.phone,
                roomId: room._id || "mock_room_id", // handle mock room ids if needed
                roomTitle: room.title,
                checkIn,
                checkOut,
                totalAmount,
                paymentMethod
            };

            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                navigate(`/booking-success/${data.bookingId}`, { replace: true });
            } else {
                alert('Booking failed. Please try again.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert('An error occurred during payment processing.');
            setIsProcessing(false);
        }
    };

    if (!room) return null;

    return (
        <div className="page-wrapper pt-nav">
            <Navbar />

            <div className="container section">
                <Link to={`/rooms/${room._id}`} className="back-link btn-with-icon mb-4">
                    <ArrowLeft size={16} /> Back to Room Details
                </Link>

                <div className="checkout-layout">
                    {/* Left Column: Form & Payment */}
                    <div className="checkout-main">
                        <h1 className="section-title text-left mb-6">Complete your booking</h1>

                        <form onSubmit={handlePayment} className="checkout-form-container">
                            {/* Guest Details */}
                            <div className="checkout-section glass-card">
                                <h2 className="checkout-subtitle">Guest Details</h2>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="guestName"
                                            value={formData.guestName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="checkout-section glass-card mt-6">
                                <h2 className="checkout-subtitle">Payment Method</h2>
                                <p className="text-dim mb-4 text-sm">This is a secure, simulated payment environment.</p>

                                <div className="payment-options">
                                    <button
                                        type="button"
                                        className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <CreditCard size={20} /> Credit/Debit Card
                                    </button>
                                    <button
                                        type="button"
                                        className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                                        onClick={() => setPaymentMethod('upi')}
                                    >
                                        <Smartphone size={20} /> UPI App
                                    </button>
                                </div>

                                <div className="payment-details-form mt-4">
                                    {paymentMethod === 'card' && (
                                        <div className="form-grid animate-fade-in">
                                            <div className="form-group full-width">
                                                <label>Card Number</label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    maxLength="16"
                                                    placeholder="0000 0000 0000 0000"
                                                    required={paymentMethod === 'card'}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={formData.expiry}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    required={paymentMethod === 'card'}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>CVV</label>
                                                <input
                                                    type="password"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    maxLength="4"
                                                    placeholder="123"
                                                    required={paymentMethod === 'card'}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div className="form-grid animate-fade-in">
                                            <div className="form-group full-width">
                                                <label>UPI ID / VPA</label>
                                                <input
                                                    type="text"
                                                    name="upiId"
                                                    value={formData.upiId}
                                                    onChange={handleInputChange}
                                                    placeholder="yourname@upi"
                                                    required={paymentMethod === 'upi'}
                                                />
                                            </div>
                                            <div className="upi-apps pt-2 pb-2">
                                                <div className="upi-icons">
                                                    <span className="upi-badge">GPay</span>
                                                    <span className="upi-badge">PhonePe</span>
                                                    <span className="upi-badge">Paytm</span>
                                                    <span className="upi-badge">BHIM</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mobile only pay button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-full mt-6 checkout-submit-mobile"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={20} /> Processing...</span>
                                ) : (
                                    <span>Pay ${totalAmount.toFixed(2)} securely <CheckCircle size={18} className="inline ml-1" /></span>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <aside className="checkout-sidebar">
                        <div className="booking-summary glass-card sticky-sidebar">
                            <h2 className="summary-title text-center pb-4 border-b">Booking Summary</h2>

                            <div className="summary-room-image mt-4 mb-4" style={{ backgroundImage: `url("${room.imageUrl}")` }}></div>

                            <h3 className="room-name text-lg text-primary font-bold">{room.title}</h3>
                            <p className="room-type text-sm text-dim mb-4">{room.type} Room • {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} Nights</p>

                            <div className="summary-details">
                                <div className="detail-row">
                                    <div className="detail-icon"><Calendar size={16} /> Check In</div>
                                    <span>{new Date(checkIn).toLocaleDateString()}</span>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-icon"><Calendar size={16} /> Check Out</div>
                                    <span>{new Date(checkOut).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="summary-pricing mt-6 pt-4 border-t">
                                <div className="price-row text-dim">
                                    <span>${room.price} x {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="price-row text-dim mt-2">
                                    <span>Taxes & Fees</span>
                                    <span>Included</span>
                                </div>
                                <div className="price-row total mt-4 pt-4 border-t">
                                    <span>Total Amount</span>
                                    <span className="text-primary text-2xl font-bold">${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Desktop pay button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-full mt-6 checkout-submit-desktop"
                                onClick={(e) => {
                                    // Trigger form submit
                                    const form = document.querySelector('.checkout-form-container');
                                    if (form.checkValidity()) {
                                        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                    } else {
                                        form.reportValidity();
                                    }
                                }}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={20} /> Processing...</span>
                                ) : (
                                    <span>Pay ${totalAmount.toFixed(2)} securely <CheckCircle size={18} className="inline ml-1" /></span>
                                )}
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />

            <style>{`
                .pt-nav { padding-top: calc(var(--nav-height) + 2rem); }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .mt-4 { margin-top: 1rem; }
                .mt-6 { margin-top: 1.5rem; }
                .pt-4 { padding-top: 1rem; }
                .pb-4 { padding-bottom: 1rem; }
                .pt-2 { padding-top: 0.5rem; }
                .pb-2 { padding-bottom: 0.5rem; }
                .ml-1 { margin-left: 0.25rem; }
                .text-left { text-align: left; }
                .text-center { text-align: center; }
                .text-dim { color: var(--text-dim); }
                .text-sm { font-size: 0.875rem; }
                .text-lg { font-size: 1.125rem; }
                .text-2xl { font-size: 1.5rem; }
                .font-bold { font-weight: 700; }
                .border-t { border-top: 1px solid var(--glass-border); }
                .border-b { border-bottom: 1px solid var(--glass-border); }
                .inline { display: inline; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-center { justify-content: center; }
                .gap-2 { gap: 0.5rem; }
                
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }

                .back-link {
                    color: var(--text-main);
                    text-decoration: none;
                    font-size: 0.9rem;
                    opacity: 0.7;
                    transition: var(--transition-fast);
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .back-link:hover { opacity: 1; color: var(--primary); }

                .checkout-layout {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 3rem;
                    margin-bottom: 4rem;
                }

                .checkout-section {
                    padding: 2rem;
                    border-radius: 12px;
                }

                .checkout-subtitle {
                    font-size: 1.25rem;
                    margin-bottom: 1.5rem;
                    color: #fff;
                    font-weight: 600;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.25rem;
                }

                .form-group.full-width { grid-column: 1 / -1; }
                
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                
                .form-group input {
                    width: 100%;
                    padding: 0.85rem;
                    background: rgba(15, 23, 42, 0.4);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    color: #fff;
                    transition: var(--transition-fast);
                }
                
                .form-group input:focus {
                    border-color: var(--primary);
                    outline: none;
                    background: rgba(15, 23, 42, 0.6);
                }

                .payment-options {
                    display: flex;
                    gap: 1rem;
                    border-bottom: 1px solid var(--glass-border);
                    padding-bottom: 1rem;
                }

                .payment-tab {
                    flex: 1;
                    padding: 1rem;
                    background: transparent;
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    color: var(--text-main);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: var(--transition-fast);
                    font-weight: 500;
                }

                .payment-tab:hover {
                    border-color: var(--text-dim);
                }

                .payment-tab.active {
                    background: rgba(56, 189, 248, 0.1);
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .upi-apps .upi-icons {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .upi-badge {
                    padding: 0.25rem 0.75rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    border-radius: 20px;
                    font-size: 0.75rem;
                    color: var(--text-dim);
                }

                .sticky-sidebar {
                    position: sticky;
                    top: calc(var(--nav-height) + 2rem);
                    padding: 2rem;
                }

                .summary-room-image {
                    height: 160px;
                    border-radius: 8px;
                    background-size: cover;
                    background-position: center;
                }

                .summary-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.9rem;
                }

                .detail-icon {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-dim);
                }

                .price-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .checkout-submit-mobile { display: none; }

                @media (max-width: 1024px) {
                    .checkout-layout { grid-template-columns: 1fr; gap: 2rem; }
                    .checkout-sidebar { order: -1; }
                    .sticky-sidebar { position: static; }
                    .checkout-submit-desktop { display: none; }
                    .checkout-submit-mobile { display: block; }
                    .form-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Checkout;
