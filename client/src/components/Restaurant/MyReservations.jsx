import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Clock, Utensils, ChevronRight } from 'lucide-react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useAuth } from '../../context/AuthContext';

const MyReservations = () => {
    const { user, token } = useAuth();
    const [reservationHistory, setReservationHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchReservationHistory = async () => {
            if (!user || !token) return;
            setLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/reservations/my-reservations', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setReservationHistory(data.reservations);
                }
            } catch (err) {
                console.error('❌ Error fetching reservations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservationHistory();
    }, [user, token]);

    return (
        <div className="page-wrapper basket-page">
            <Navbar />

            <div className="container section basket-container">
                <div className="ordered-history-section" style={{ marginTop: '2rem' }}>
                    <div className="section-header-history">
                        <History className="history-icon-main" />
                        <h2 className="history-main-title">My Table Reservations</h2>
                        <div className="history-line" />
                    </div>

                    {loading ? (
                        <div className="history-loading">Fetching your reservations...</div>
                    ) : reservationHistory.length === 0 ? (
                        <div className="glass-card history-empty">
                            <History size={32} className="text-dim mb-3" />
                            <p>No table reservations found.</p>
                        </div>
                    ) : (
                        <div className="history-list">
                            {reservationHistory.map((res, idx) => (
                                <motion.div
                                    key={res._id}
                                    className="history-card glass-card table-res-card"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    <div className="history-card-header">
                                        <div className="history-date-box">
                                            <Clock size={14} className="text-primary" />
                                            <span>
                                                {new Date(res.date).toLocaleDateString('en-US', {
                                                    month: 'short', day: 'numeric', year: 'numeric'
                                                })} • {res.time}
                                            </span>
                                        </div>
                                        <div className="history-status-badge">{res.tableNumber}</div>
                                    </div>

                                    <div className="history-card-body">
                                        <div className="res-details-preview">
                                            <div className="res-guest-info">
                                                <span className="text-dim">Reserved for:</span>
                                                <span className="res-guest-name">{res.guestName}</span>
                                            </div>
                                            <div className="res-detail-line">
                                                <Utensils size={16} className="text-gold" />
                                                <span>Fine Dining Experience</span>
                                            </div>
                                            <div className="res-detail-line" style={{ display: 'flex', gap: '2rem' }}>
                                                <div>
                                                    <span className="text-dim">Party Size:</span>
                                                    <span className="font-bold ml-2">{res.guests}</span>
                                                </div>
                                                <div>
                                                    <span className="text-dim">ID:</span>
                                                    <span className="font-bold ml-2">RSV-{res._id.slice(-6).toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="history-card-right">
                                            <div className="history-status-label">Status</div>
                                            <div className="history-status-val" style={{ color: '#10b981', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '800', marginBottom: '1rem' }}>
                                                Confirmed
                                            </div>
                                            <button 
                                                className="history-view-btn"
                                                onClick={() => alert("🎟️ Digital Reservation Slip\n\nID: RSV-" + res._id.slice(-6).toUpperCase() + "\nGuest: " + res.guestName + "\nTable: " + res.tableNumber + "\nDate: " + new Date(res.date).toLocaleDateString() + "\nTime: " + res.time + "\n\nShow this slip at the restaurant entrance.")}
                                            >
                                                Digital Slip <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <style>{`
                .basket-page { 
                    background: radial-gradient(circle at top right, #0f172a, #020617);
                    color: var(--text-main); 
                    min-height: 100vh;
                }
                .basket-container { 
                    padding-top: calc(var(--nav-height) + 3rem); 
                    padding-bottom: 6rem; 
                    max-width: 1200px;
                }
                .glass-card {
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                }
                .ordered-history-section { max-width: 900px; margin: 0 auto; }
                .section-header-history { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; position: relative; }
                .history-icon-main { color: #d4af37; width: 28px; height: 28px; }
                .history-main-title { font-family: 'Algerian', serif; color: #fff; font-size: 2rem; white-space: nowrap; }
                .history-line { flex-grow: 1; height: 1px; background: linear-gradient(90deg, rgba(212,175,55,0.4) 0%, transparent 100%); }
                .history-loading, .history-empty { text-align: center; color: var(--text-muted); padding: 4rem; font-size: 1.1rem; }
                .text-dim { color: rgba(255, 255, 255, 0.5); }
                .text-primary { color: #d4af37; }
                .text-gold { color: #d4af37; }
                .font-bold { font-weight: 700; }
                .ml-2 { margin-left: 0.5rem; }
                .mb-3 { margin-bottom: 1rem; }

                .history-list { display: flex; flex-direction: column; gap: 1.5rem; }
                .history-card { padding: 1.5rem; transition: transform 0.3s; }
                .history-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-color: rgba(212,175,55,0.2); }
                .history-card-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 1rem; }
                .history-date-box { display: flex; align-items: center; gap: 0.5rem; color: #94a3b8; font-size: 0.9rem; font-weight: 600; }
                .history-status-badge { background: rgba(212,175,55,0.15); color: #d4af37; padding: 0.3rem 0.8rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; border: 1px solid rgba(212,175,55,0.3); }
                .history-card-body { display: flex; justify-content: space-between; align-items: stretch; gap: 2rem; }
                @media (max-width: 640px) { .history-card-body { flex-direction: column; } }

                .res-details-preview { flex: 1; display: flex; flex-direction: column; gap: 0.8rem; border-right: 1px solid rgba(255,255,255,0.06); padding-right: 2rem; }
                @media (max-width: 640px) { .res-details-preview { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); padding-right: 0; padding-bottom: 1rem; } }
                .res-guest-info { display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; }
                .res-guest-name { font-weight: 700; color: #fff; font-size: 1.1rem; }
                .res-detail-line { display: flex; align-items: center; gap: 0.6rem; color: #cbd5e1; font-size: 0.9rem; }

                .history-card-right { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; min-width: 140px; }
                @media (max-width: 640px) { .history-card-right { align-items: flex-start; } }
                .history-status-label { font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 0.2rem; }
                .history-view-btn { padding: 0.6rem 1rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; transition: all 0.2s; }
                .history-view-btn:hover { background: #d4af37; color: #000; border-color: #d4af37; }
            `}</style>
        </div>
    );
};

export default MyReservations;
