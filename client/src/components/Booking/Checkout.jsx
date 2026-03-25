import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, Smartphone, CheckCircle, ArrowLeft, Loader2, Calendar, ShieldCheck, Info, User, Phone, Mail } from 'lucide-react';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const { room, checkIn, checkOut, checkInTime, checkOutTime, totalAmount, nights } = location.state || {};

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
        if (!user) {
            navigate('/login', { replace: true, state: { from: { pathname: '/checkout' }, bookingState: location.state } });
            return;
        }
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
            await new Promise(resolve => setTimeout(resolve, 2500));

            const bookingData = {
                guestName: formData.guestName,
                email: formData.email,
                phone: formData.phone,
                roomId: room._id || "mock_room_id",
                roomTitle: room.title,
                checkIn,
                checkInTime,
                checkOut,
                checkOutTime,
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
                alert(data.message || 'Booking failed. Please try again.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert('An error occurred during payment processing.');
            setIsProcessing(false);
        }
    };

    if (!room) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="checkout-page-root">
            <Navbar />

            <motion.div
                className="checkout-container"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header Section */}
                <motion.div className="checkout-header" variants={itemVariants}>
                    <Link to={`/rooms/${room._id}`} className="premium-back-btn">
                        <ArrowLeft size={18} />
                        <span>Back to {room.title}</span>
                    </Link>
                    <h1 className="premium-title">Complete Reservation</h1>
                    <div className="security-badge">
                        <ShieldCheck size={16} /> 256-bit Secure Checkout
                    </div>
                </motion.div>

                <div className="checkout-content-grid">
                    {/* Main Form Area */}
                    <div className="checkout-main-area">
                        <form onSubmit={handlePayment} className="premium-booking-form">

                            {/* Guest Info Section */}
                            <motion.section className="form-section-premium glass-card-premium" variants={itemVariants}>
                                <div className="section-header-premium">
                                    <div className="section-icon-circle"><User size={20} /></div>
                                    <h3>Guest Information</h3>
                                </div>

                                <div className="form-row-premium">
                                    <div className="input-group-premium full-width">
                                        <label><User size={14} /> Full Name</label>
                                        <input
                                            type="text"
                                            name="guestName"
                                            value={formData.guestName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="input-group-premium">
                                        <label><Mail size={14} /> Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="input-group-premium">
                                        <label><Phone size={14} /> Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>
                            </motion.section>

                            {/* Payment Section */}
                            <motion.section className="form-section-premium glass-card-premium" variants={itemVariants}>
                                <div className="section-header-premium">
                                    <div className="section-icon-circle"><CreditCard size={20} /></div>
                                    <h3>Secure Payment</h3>
                                </div>
                                <p className="payment-hint">Select your preferred payment method below</p>

                                <div className="payment-method-selector">
                                    <button
                                        type="button"
                                        className={`pay-method-btn ${paymentMethod === 'card' ? 'selected' : ''}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <div className="method-indicator"></div>
                                        <CreditCard size={20} />
                                        <span>Credit / Debit Card</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`pay-method-btn ${paymentMethod === 'upi' ? 'selected' : ''}`}
                                        onClick={() => setPaymentMethod('upi')}
                                    >
                                        <div className="method-indicator"></div>
                                        <Smartphone size={20} />
                                        <span>UPI Transaction</span>
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    {paymentMethod === 'card' ? (
                                        <motion.div
                                            key="card-form"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="payment-subform"
                                        >
                                            <div className="input-group-premium full-width">
                                                <label>Card Number</label>
                                                <div className="card-input-wrapper-v2">
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
                                                <div className="payment-brands-row">

                                                    <div className="brand-chip"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" /></div>

                                                </div>
                                            </div>
                                            <div className="form-row-premium">
                                                <div className="input-group-premium">
                                                    <label>Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={formData.expiry}
                                                        onChange={handleInputChange}
                                                        placeholder="MM / YY"
                                                        required={paymentMethod === 'card'}
                                                    />
                                                </div>
                                                <div className="input-group-premium">
                                                    <label>Security Code (CVV)</label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        maxLength="4"
                                                        placeholder="•••"
                                                        required={paymentMethod === 'card'}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="upi-form"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="payment-subform"
                                        >
                                            <div className="input-group-premium full-width">
                                                <label>Unified Payment ID</label>
                                                <input
                                                    type="text"
                                                    name="upiId"
                                                    value={formData.upiId}
                                                    onChange={handleInputChange}
                                                    placeholder="username@bank"
                                                    required={paymentMethod === 'upi'}
                                                />
                                            </div>
                                            <div className="upi-apps-logos">
                                                <div className="upi-logo-wrapper">
                                                    <img src="https://cdn.worldvectorlogo.com/logos/google-pay-1.svg" alt="Google Pay" className="upi-logo" />
                                                </div>
                                                <div className="upi-logo-wrapper">
                                                    <img src="https://cdn.worldvectorlogo.com/logos/paytm-1.svg" alt="Paytm" className="upi-logo" />
                                                </div>
                                                <div className="upi-logo-wrapper">
                                                    <img src="https://cdn.worldvectorlogo.com/logos/phonepe-1.svg" alt="PhonePe" className="upi-logo" />
                                                </div>
                                            </div>
                                            <div className="upi-info-alert">
                                                <Info size={16} />
                                                <span>You will receive a notification in your selected UPI app to authorize the payment.</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.section>

                            <motion.div className="mobile-only-pay-container" variants={itemVariants}>
                                <button
                                    type="submit"
                                    className={`premium-pay-btn ${isProcessing ? 'processing' : ''}`}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <><Loader2 className="spinning" size={20} /> Authorizing...</>
                                    ) : (
                                        <>Confirm Booking • ${totalAmount?.toFixed(2)}</>
                                    )}
                                </button>
                            </motion.div>
                        </form>
                    </div>

                    {/* Sidebar Area */}
                    <div className="checkout-sidebar-area">
                        <motion.div className="luxury-receipt glass-card-premium sticky-sidebar" variants={itemVariants}>
                            <div className="receipt-header">
                                <h2 className="brand-font">Reservation Details</h2>
                                <p>Reference: #LS{Math.floor(Math.random() * 90000 + 10000)}</p>
                            </div>

                            <div className="receipt-room-preview" style={{ backgroundImage: `url("${room.imageUrl}")` }}>
                                <div className="room-preview-overlay">
                                    <span className="room-label">{room.type}</span>
                                </div>
                            </div>

                            <div className="receipt-body">
                                <h3 className="room-title-luxury">{room.title}</h3>

                                <div className="receipt-entry">
                                    <div className="entry-icon"><Calendar size={18} /></div>
                                    <div className="entry-content">
                                        <label>Stay Duration</label>
                                        <p>{new Date(checkIn).toLocaleDateString()} — {new Date(checkOut).toLocaleDateString()}</p>
                                        <span className="nights-pill-luxury">{nights} Nights</span>
                                    </div>
                                </div>

                                <div className="time-grid-luxury">
                                    <div className="time-item">
                                        <label>Arrival</label>
                                        <p>{checkInTime}</p>
                                    </div>
                                    <div className="time-divider"></div>
                                    <div className="time-item">
                                        <label>Departure</label>
                                        <p>{checkOutTime}</p>
                                    </div>
                                </div>

                                <div className="receipt-divider"></div>

                                <div className="billing-summary-luxury">
                                    <div className="billing-row">
                                        <span>Standard Rate</span>
                                        <span>${room.price} / night</span>
                                    </div>
                                    <div className="billing-row">
                                        <span>Subtotal ({nights} nights)</span>
                                        <span>${totalAmount?.toFixed(2)}</span>
                                    </div>
                                    <div className="billing-row highlight">
                                        <span>Service Tax & Fees</span>
                                        <span>Included</span>
                                    </div>

                                    <div className="total-row-luxury">
                                        <div className="total-label">
                                            <span>Total Amount Due</span>
                                            <p>All taxes included</p>
                                        </div>
                                        <div className="total-value">${totalAmount?.toFixed(2)}</div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="premium-pay-btn desktop-only-btn"
                                    onClick={(e) => {
                                        const form = document.querySelector('.premium-booking-form');
                                        if (form.checkValidity()) {
                                            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                        } else {
                                            form.reportValidity();
                                        }
                                    }}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <><Loader2 className="spinning" size={20} /> Processing...</>
                                    ) : (
                                        <>Proceed to Payment <CheckCircle size={18} /></>
                                    )}
                                </button>

                                <div className="trust-badges">
                                    <span>🔒 SSL Encrypted</span>
                                    <span>✨ Cancellation Policy</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <Footer />

            <style>{`
                .checkout-page-root {
                    min-height: 100vh;
                    background: radial-gradient(circle at top right, #0f172a, #020617);
                    color: #fff;
                    padding-top: calc(var(--nav-height) + 2rem);
                }

                .checkout-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem 4rem;
                    font-family: 'Inter', sans-serif;
                }

                .checkout-header {
                    margin-bottom: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .premium-back-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary);
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }
                .premium-back-btn:hover { opacity: 1; }

                .premium-title {
                    font-size: 3rem;
                    font-family: 'Algerian', serif;
                    letter-spacing: 0.02em;
                    color: #fff;
                    text-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
                }

                .security-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #10b981;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .checkout-content-grid {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 3rem;
                    align-items: start;
                }

                .form-section-premium {
                    padding: 2.5rem;
                    margin-bottom: 2rem;
                }

                .glass-card-premium {
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                }

                .section-header-premium {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .section-icon-circle {
                    width: 44px;
                    height: 44px;
                    background: rgba(56, 189, 248, 0.1);
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                }

                .section-header-premium h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .form-row-premium {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .input-group-premium {
                    margin-bottom: 1.5rem;
                }
                .input-group-premium.full-width { grid-column: 1 / -1; }

                .input-group-premium label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 0.6rem;
                    font-weight: 500;
                }

                .input-group-premium input {
                    width: 100%;
                    padding: 0.9rem 1.25rem;
                    background: rgba(2, 6, 23, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1rem;
                    transition: all 0.3s;
                }

                .input-group-premium input:focus {
                    outline: none;
                    border-color: var(--primary);
                    background: rgba(56, 189, 248, 0.05);
                    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
                }

                .payment-hint {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    margin-bottom: 1.5rem;
                }

                .payment-method-selector {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .pay-method-btn {
                    flex: 1;
                    padding: 1.25rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    transition: all 0.3s;
                    position: relative;
                }

                .pay-method-btn.selected {
                    background: rgba(56, 189, 248, 0.1);
                    border-color: var(--primary);
                    color: var(--primary);
                }

                .method-indicator {
                    width: 6px;
                    height: 6px;
                    background: transparent;
                    border-radius: 50%;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
                .pay-method-btn.selected .method-indicator {
                    background: var(--primary);
                    box-shadow: 0 0 10px var(--primary);
                }

                .card-input-wrapper {
                    position: relative;
                }
                .card-logos {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    gap: 0.5rem;
                    pointer-events: none;
                }
                .card-logos img { height: 20px; opacity: 0.7; }

                .payment-brands-row {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .brand-chip {
                    background: white;
                    padding: 0.4rem 0.75rem;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 28px;
                    width: 55px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .brand-chip img {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                }

                .upi-apps-logos {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    margin-bottom: 1.5rem;
                    padding: 1.25rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    justify-content: center;
                }

                .upi-logo-wrapper {
                    background: white;
                    padding: 0.5rem 0.8rem;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    height: 36px;
                    width: 70px;
                }

                .upi-logo-wrapper:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
                }

                .upi-logo {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                }

                .upi-info-alert {
                    display: flex;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: rgba(56, 189, 248, 0.08);
                    border-radius: 12px;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: var(--primary);
                }

                /* Luxury Receipt Sidebar */
                .luxury-receipt {
                    border-radius: 28px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                }

                .receipt-header {
                    padding: 2rem;
                    background: rgba(56, 189, 248, 0.05);
                    text-align: center;
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
                }
                .brand-font { font-family: 'Algerian', serif; color: var(--primary); font-size: 1.4rem; }
                .receipt-header p { font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); margin-top: 0.5rem; }

                .receipt-room-preview {
                    height: 180px;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                }
                .room-preview-overlay {
                    position: absolute;
                    bottom: 1rem;
                    left: 1rem;
                }
                .room-label {
                    background: var(--primary);
                    color: #000;
                    padding: 0.25rem 0.75rem;
                    border-radius: 50px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .receipt-body {
                    padding: 2rem;
                }

                .room-title-luxury {
                    font-size: 1.3rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    color: #fff;
                    text-align: center;
                }

                .receipt-entry {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .entry-icon {
                    width: 32px;
                    height: 32px;
                    background: rgba(56, 189, 248, 0.1);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    flex-shrink: 0;
                }
                .entry-content label { font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; font-weight: 700; }
                .entry-content p { font-size: 0.9rem; font-weight: 500; margin: 0.2rem 0; }
                .nights-pill-luxury { 
                    font-size: 11px;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 2px 8px;
                    border-radius: 4px;
                    color: #fff;
                }

                .time-grid-luxury {
                    display: grid;
                    grid-template-columns: 1fr 1px 1fr;
                    background: rgba(2, 6, 23, 0.4);
                    padding: 1rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                }
                .time-item { text-align: center; }
                .time-item label { font-size: 0.6rem; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; }
                .time-item p { font-size: 0.9rem; font-weight: 700; color: var(--primary); margin-top: 0.25rem; }
                .time-divider { background: rgba(255, 255, 255, 0.1); }

                .receipt-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    margin: 2rem 0;
                }

                .billing-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 0.75rem;
                }
                .billing-row.highlight { color: #10b981; font-weight: 600; }

                .total-row-luxury {
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .total-label span { font-size: 0.85rem; color: #fff; display: block; }
                .total-label p { font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); margin-top: 0.2rem; }
                .total-value { font-size: 2.2rem; font-weight: 800; color: var(--primary); line-height: 1; }

                .premium-pay-btn {
                    width: 100%;
                    padding: 1.25rem;
                    margin-top: 2rem;
                    background: linear-gradient(135deg, #0ea5e9, #0284c7);
                    border: none;
                    border-radius: 16px;
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    transition: all 0.3s;
                    box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3);
                }
                .premium-pay-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 15px 30px rgba(14, 165, 233, 0.4);
                    filter: brightness(1.1);
                }
                .premium-pay-btn.processing {
                    opacity: 0.8;
                    cursor: wait;
                    transform: none;
                }

                .trust-badges {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.3);
                }

                .spinning { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }

                .mobile-only-pay-container { display: none; }

                @media (max-width: 1024px) {
                    .checkout-content-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .checkout-sidebar-area { order: -1; }
                    .desktop-only-btn { display: none; }
                    .mobile-only-pay-container { display: block; position: sticky; bottom: 2rem; z-index: 100; }
                    .luxury-receipt { position: static; }
                }

                @media (max-width: 640px) {
                    .premium-title { font-size: 2rem; }
                    .form-row-premium { grid-template-columns: 1fr; }
                    .payment-method-selector { flex-direction: column; }
                    .form-section-premium { padding: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default Checkout;
