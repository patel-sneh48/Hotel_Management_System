import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, CheckCircle, Utensils, MapPin,
  History, User, Package, Loader2, Star
} from 'lucide-react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useBasket } from '../../context/BasketContext';
import { useAuth } from '../../context/AuthContext';

const RoomServiceOrder = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, token } = useAuth();
  const { clearBasket }  = useBasket();
  const { items, dish, activeBooking } = location.state || {};

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastOrderInfo,    setLastOrderInfo]    = useState(null);
  const [activeTab,        setActiveTab]        = useState('current');
  const [orderHistory,     setOrderHistory]     = useState([]);
  const [loadingHistory,   setLoadingHistory]   = useState(false);
  const [now,              setNow]              = useState(Date.now());

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // tick every second so countdown re-renders
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (user && token) fetchOrderHistory();
  }, [user, token]);

  const fetchOrderHistory = async () => {
    setLoadingHistory(true);
    try {
      const res  = await fetch('http://localhost:5000/api/room-service/my-history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setOrderHistory(data.history);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingHistory(false);
    }
  };

  const orderItems        = items || (dish ? [dish] : []);
  const currentTotalPrice = orderItems.reduce((sum, item) => {
    const p = typeof item.price === 'string'
      ? parseFloat(item.price.replace('$', ''))
      : item.price;
    return sum + p * (item.quantity || 1);
  }, 0);

  const handleConfirm = async () => {
    try {
      const orderData = {
        guestName:   activeBooking.guestName,
        roomNumber:  activeBooking.roomNumber,
        items: orderItems.map(it => ({
          name:     it.name,
          price:    typeof it.price === 'string' ? parseFloat(it.price.replace('$', '')) : it.price,
          quantity: it.quantity || 1,
          image:    it.image,
        })),
        totalAmount: currentTotalPrice,
      };

      const res  = await fetch('http://localhost:5000/api/room-service', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify(orderData),
      });
      const data = await res.json();

      if (data.success) {
        setLastOrderInfo(orderData);
        setShowSuccessModal(true);
        if (items) clearBasket();
        fetchOrderHistory();
      } else {
        alert(data.message || 'Failed to place order.');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/room-service/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrderHistory(prev => prev.filter(o => o._id !== orderId));
      } else {
        alert(data.message || 'Could not cancel order.');
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred.');
    }
  };

  // helpers
  const CANCEL_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
  const getRemainingMs   = (createdAt) => {
    const elapsed = now - new Date(createdAt).getTime();
    return Math.max(0, CANCEL_WINDOW_MS - elapsed);
  };
  const fmtCountdown = (ms) => {
    const s   = Math.floor(ms / 1000);
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  /* ─── render ─── */
  return (
    <>
      <Navbar />

      <div className="rs-page">

        {/* ── Top nav bar ── */}
        <div className="rs-topbar">
          <div className="rs-topbar-inner">
            {/* user pill */}
            <div className="rs-user-pill">
              <div className="rs-avatar">{user?.name?.charAt(0) || <User size={16} />}</div>
              <div className="rs-user-info">
                <span className="rs-user-name">{user?.name}</span>
              </div>
            </div>

            {/* tabs */}
            <div className="rs-tabs">
              <button
                className={`rs-tab ${activeTab === 'current' ? 'rs-tab--active' : ''}`}
                onClick={() => setActiveTab('current')}
              >
                <Utensils size={15} /> Order
              </button>
              <button
                className={`rs-tab ${activeTab === 'history' ? 'rs-tab--active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <History size={15} /> History
              </button>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="rs-content">

          {/* ══════════ CURRENT ORDER TAB ══════════ */}
          {activeTab === 'current' && (
            <motion.div
              key="current"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Link to="/restaurant" className="rs-back-link">
                <ArrowLeft size={16} /> Back to Menu
              </Link>

              {!activeBooking ? (
                /* empty state */
                <div className="rs-empty-card">
                  <Package size={52} strokeWidth={1.5} className="rs-empty-icon" />
                  <h2 className="rs-empty-title">Ready for Room Service?</h2>
                  <p className="rs-empty-sub">Select your favourite dishes from our restaurant menu to begin.</p>
                  <Link to="/restaurant" className="rs-btn-primary">Explore Menu</Link>
                </div>
              ) : (
                /* ── Order review layout ── */
                <div className="rs-order-grid">

                  {/* LEFT – items */}
                  <div className="rs-items-panel">
                    <div className="rs-panel-header">
                      <div>
                        <p className="rs-panel-label">Room Service</p>
                        <h1 className="rs-panel-title">Review <span className="rs-gold">Order</span></h1>
                      </div>
                      <div className="rs-gold-line"></div>
                    </div>

                    {/* delivery info */}
                    <div className="rs-info-strip">
                      <div className="rs-info-chip">
                        <MapPin size={14} className="rs-chip-icon" />
                        <div>
                          <span className="rs-chip-label">GUEST</span>
                          <span className="rs-chip-value">{activeBooking.guestName}</span>
                        </div>
                      </div>
                      <div className="rs-info-chip">
                        <Utensils size={14} className="rs-chip-icon" />
                        <div>
                          <span className="rs-chip-label">ROOM</span>
                          <span className="rs-chip-value rs-gold">Room {activeBooking.roomNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* item list */}
                    <div className="rs-items-list">
                      {orderItems.map((item, i) => {
                        const price = typeof item.price === 'string'
                          ? parseFloat(item.price.replace('$', ''))
                          : item.price;
                        return (
                          <div key={i} className="rs-item-row">
                            <div className="rs-item-img-wrap">
                              <img src={item.image} alt={item.name} className="rs-item-img" />
                              <span className="rs-item-qty">{item.quantity || 1}</span>
                            </div>
                            <div className="rs-item-details">
                              <p className="rs-item-name">{item.name}</p>
                              <p className="rs-item-unit">per piece · in-room dining</p>
                            </div>
                            <p className="rs-item-price">${(price * (item.quantity || 1)).toFixed(2)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* RIGHT – summary */}
                  <div className="rs-summary-panel">
                    <div className="rs-summary-card">
                      <h2 className="rs-summary-heading">Order Summary</h2>
                      <div className="rs-summary-gold-bar"></div>

                      <div className="rs-summary-rows">
                        {orderItems.map((item, i) => {
                          const price = typeof item.price === 'string'
                            ? parseFloat(item.price.replace('$', ''))
                            : item.price;
                          return (
                            <div key={i} className="rs-summary-line">
                              <span>{item.name} <span className="rs-summary-qty">×{item.quantity || 1}</span></span>
                              <span>${(price * (item.quantity || 1)).toFixed(2)}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rs-summary-divider"></div>

                      <div className="rs-summary-line rs-summary-line--fee">
                        <span>Service Fee</span>
                        <span className="rs-fee-badge">Complimentary</span>
                      </div>

                      <div className="rs-summary-total">
                        <span>Total</span>
                        <span className="rs-total-amount">${currentTotalPrice.toFixed(2)}</span>
                      </div>

                      <button className="rs-btn-confirm" onClick={handleConfirm}>
                        <CheckCircle size={18} /> Confirm Order
                      </button>

                      <div className="rs-delivery-note">
                        <Clock size={13} />
                        <span>Delivered to your room in 15–20 min</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}

          {/* ══════════ HISTORY TAB ══════════ */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="rs-history-header">
                <div>
                  <p className="rs-panel-label">Your Dining Records</p>
                  <h1 className="rs-panel-title">Service <span className="rs-gold">History</span></h1>
                </div>
              </div>

              {loadingHistory ? (
                <div className="rs-loading">
                  <Loader2 className="rs-spinner" size={40} />
                  <p>Fetching your records…</p>
                </div>
              ) : orderHistory.length === 0 ? (
                <div className="rs-empty-card">
                  <History size={52} strokeWidth={1.5} className="rs-empty-icon" />
                  <h2 className="rs-empty-title">No Orders Yet</h2>
                  <p className="rs-empty-sub">Your in-room dining history will appear here once you place your first order.</p>
                  <button onClick={() => setActiveTab('current')} className="rs-btn-primary">Start Ordering</button>
                </div>
              ) : (
                <div className="rs-history-grid">
                  {orderHistory.map((order) => {
                    const remainMs   = getRemainingMs(order.createdAt);
                    const canCancel  = remainMs > 0;
                    const fmtDate = (d) =>
                      new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    return (
                      <motion.div
                        key={order._id}
                        className="rs-history-card"
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="rs-hcard-accent"></div>

                        <div className="rs-hcard-top">
                          {/* replaced status text with a simple dot + date */}
                          <div className="rs-hcard-dot-row">
                            <span className="rs-status-dot"></span>
                            <span className="rs-hcard-order-label">In-Room Dining</span>
                          </div>
                          <span className="rs-hcard-date">{fmtDate(order.createdAt)}</span>
                        </div>

                        {/* items preview */}
                        <div className="rs-hcard-items">
                          {order.items.slice(0, 2).map((it, idx) => (
                            <div key={idx} className="rs-hcard-item">
                              <img src={it.image} alt={it.name} className="rs-hcard-thumb" />
                              <div>
                                <p className="rs-hcard-item-name">{it.name}</p>
                                <p className="rs-hcard-item-qty">Qty: {it.quantity}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="rs-hcard-more">+{order.items.length - 2} more items</p>
                          )}
                        </div>

                        <div className="rs-hcard-footer">
                          <div>
                            <span className="rs-hcard-total-label">Total</span>
                            <span className="rs-hcard-total">${order.totalAmount.toFixed(2)}</span>
                          </div>

                          {/* 5-min cancel section */}
                          {canCancel && (
                            <div className="rs-cancel-zone">
                              <div className="rs-countdown">
                                <Clock size={11} />
                                <span>{fmtCountdown(remainMs)}</span>
                              </div>
                              <button
                                className="rs-btn-cancel"
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

        </div>{/* /rs-content */}

        {/* ══════════ SUCCESS MODAL ══════════ */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              className="rs-modal-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <motion.div
                className="rs-modal-box"
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 40, opacity: 0 }}
                transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              >
                {/* icon */}
                <div className="rs-modal-icon">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
                    <CheckCircle size={54} strokeWidth={1.5} className="rs-check-icon" />
                  </motion.div>
                </div>

                <h2 className="rs-modal-title">Order Confirmed!</h2>
                <p className="rs-modal-sub">
                  Your order is being prepared and will be delivered to{' '}
                  <strong className="rs-gold">Room {lastOrderInfo?.roomNumber}</strong>.
                </p>

                {/* delivery card */}
                <div className="rs-modal-delivery">
                  <Clock size={18} className="rs-gold" />
                  <div>
                    <p className="rs-modal-delivery-label">Estimated Arrival</p>
                    <p className="rs-modal-delivery-time">15 – 20 Minutes</p>
                  </div>
                </div>

                {/* summary */}
                <div className="rs-modal-summary">
                  <p className="rs-modal-summary-title">ORDER SUMMARY</p>
                  {lastOrderInfo?.items.map((it, i) => (
                    <div key={i} className="rs-modal-line">
                      <span>{it.name} <span className="rs-modal-qty">×{it.quantity}</span></span>
                      <span>${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="rs-modal-total-row">
                    <span>Total</span>
                    <span className="rs-gold">${lastOrderInfo?.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* actions */}
                <button
                  className="rs-btn-primary rs-btn-full"
                  onClick={() => { setShowSuccessModal(false); setActiveTab('history'); }}
                >
                  View History
                </button>
                <button
                  className="rs-btn-ghost rs-btn-full"
                  onClick={() => { setShowSuccessModal(false); navigate('/restaurant'); }}
                >
                  Back to Menu
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>

      {/* ══════════ STYLES ══════════ */}
      <style>{`
        /* ── Page shell ── */
        .rs-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #0b1120 0%, #0f172a 50%, #0b1120 100%);
          font-family: 'Outfit', 'Inter', system-ui, sans-serif;
          color: #fff;
          padding-top: var(--nav-height, 80px);
        }
        .rs-gold { color: #d4af37; }

        /* ── Topbar ── */
        .rs-topbar {
          position: sticky;
          top: var(--nav-height, 80px);
          z-index: 100;
          background: rgba(11, 17, 32, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,175,55,0.15);
        }
        .rs-topbar-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0.9rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .rs-user-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .rs-avatar {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg,#d4af37,#f1d37e);
          color: #000;
          font-weight: 900;
          font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .rs-user-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
          letter-spacing: 0.03em;
        }
        .rs-tabs {
          display: flex;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 50px;
          padding: 4px;
          gap: 4px;
        }
        .rs-tab {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.45rem 1.4rem;
          border-radius: 50px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.45);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.25s;
        }
        .rs-tab--active {
          background: #d4af37;
          color: #000;
          box-shadow: 0 2px 12px rgba(212,175,55,0.35);
        }
        .rs-tab:hover:not(.rs-tab--active) { color: #fff; }

        /* ── Content wrapper ── */
        .rs-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 2rem 6rem;
        }

        /* ── Back link ── */
        .rs-back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(212,175,55,0.75);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2.5rem;
          transition: all 0.2s;
        }
        .rs-back-link:hover { color: #d4af37; transform: translateX(-4px); }

        /* ── Panel header ── */
        .rs-panel-label {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(212,175,55,0.7);
          margin-bottom: 0.35rem;
        }
        .rs-panel-title {
          font-family: 'Algerian', serif;
          font-size: 2.4rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.02em;
          line-height: 1.1;
        }
        .rs-gold-line {
          width: 60px; height: 3px;
          background: #d4af37;
          border-radius: 2px;
          margin: 1rem 0 2rem;
        }

        /* ── Order grid ── */
        .rs-order-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2.5rem;
          align-items: start;
        }

        /* ── Items panel ── */
        .rs-panel-header { margin-bottom: 2rem; }
        .rs-items-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 2.5rem;
        }

        /* delivery info chips */
        .rs-info-strip {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .rs-info-chip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 0.9rem 1.5rem;
          flex: 1;
          min-width: 160px;
        }
        .rs-chip-icon { color: #d4af37; flex-shrink: 0; }
        .rs-chip-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.2rem;
        }
        .rs-chip-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
        }

        /* items list */
        .rs-items-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .rs-item-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1rem 1.25rem;
          transition: all 0.25s;
        }
        .rs-item-row:hover {
          border-color: rgba(212,175,55,0.25);
          background: rgba(212,175,55,0.04);
          transform: translateX(4px);
        }
        .rs-item-img-wrap { position: relative; flex-shrink: 0; }
        .rs-item-img {
          width: 68px; height: 68px;
          border-radius: 12px;
          object-fit: cover;
          display: block;
        }
        .rs-item-qty {
          position: absolute;
          top: -8px; right: -8px;
          background: #d4af37;
          color: #000;
          font-size: 0.7rem;
          font-weight: 900;
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #0b1120;
        }
        .rs-item-details { flex: 1; }
        .rs-item-name {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }
        .rs-item-unit {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          font-style: italic;
        }
        .rs-item-price {
          font-size: 1.15rem;
          font-weight: 800;
          color: #d4af37;
          white-space: nowrap;
        }

        /* ── Summary panel ── */
        .rs-summary-panel { position: sticky; top: calc(var(--nav-height, 80px) + 80px); }
        .rs-summary-card {
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 24px;
          padding: 2.25rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .rs-summary-heading {
          font-family: 'Algerian', serif;
          font-size: 1.35rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.05em;
          margin-bottom: 0.6rem;
        }
        .rs-summary-gold-bar {
          width: 40px; height: 3px;
          background: #d4af37;
          border-radius: 2px;
          margin-bottom: 1.75rem;
        }
        .rs-summary-rows { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1.25rem; }
        .rs-summary-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }
        .rs-summary-qty { color: #d4af37; font-weight: 700; }
        .rs-summary-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 1rem 0; }
        .rs-summary-line--fee { font-size: 0.88rem; color: rgba(255,255,255,0.5); margin-bottom: 1rem; }
        .rs-fee-badge {
          background: rgba(212,175,55,0.12);
          color: #d4af37;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.25rem 0.7rem;
          border-radius: 50px;
          letter-spacing: 0.06em;
        }
        .rs-summary-total {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(212,175,55,0.2);
          border-bottom: 1px solid rgba(212,175,55,0.2);
          margin-bottom: 1.75rem;
        }
        .rs-summary-total > span:first-child {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
        }
        .rs-total-amount {
          font-size: 2.2rem;
          font-weight: 900;
          color: #d4af37;
          letter-spacing: -0.03em;
        }
        .rs-btn-confirm {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 1.1rem;
          background: linear-gradient(135deg, #d4af37, #f1d37e);
          color: #000;
          font-size: 0.95rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          margin-bottom: 1rem;
          transition: all 0.3s;
          box-shadow: 0 8px 25px rgba(212,175,55,0.25);
        }
        .rs-btn-confirm:hover { transform: translateY(-3px); box-shadow: 0 14px 35px rgba(212,175,55,0.35); }
        .rs-delivery-note {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          justify-content: center;
          font-style: italic;
        }

        /* ── Empty state ── */
        .rs-empty-card {
          text-align: center;
          padding: 5rem 2rem;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.08);
          border-radius: 24px;
        }
        .rs-empty-icon { color: rgba(212,175,55,0.3); margin: 0 auto 1.5rem; display: block; }
        .rs-empty-title { font-size: 1.7rem; font-weight: 900; margin-bottom: 0.75rem; }
        .rs-empty-sub { color: rgba(255,255,255,0.4); font-size: 1rem; max-width: 380px; margin: 0 auto 2rem; line-height: 1.6; }

        /* ── Shared buttons ── */
        .rs-btn-primary {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.85rem 2.5rem;
          background: linear-gradient(135deg, #d4af37, #f1d37e);
          color: #000;
          font-weight: 900;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(212,175,55,0.25);
        }
        .rs-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(212,175,55,0.35); }
        .rs-btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.85rem 2.5rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .rs-btn-ghost:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .rs-btn-full { width: 100%; margin-bottom: 0.75rem; }

        /* ── History ── */
        .rs-history-header { margin-bottom: 2.5rem; }
        .rs-loading {
          text-align: center;
          padding: 5rem 0;
          color: rgba(255,255,255,0.4);
        }
        .rs-spinner { animation: spin 1s linear infinite; color: #d4af37; display: block; margin: 0 auto 1rem; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .rs-history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        .rs-history-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          overflow: hidden;
          transition: all 0.3s;
        }
        .rs-history-card:hover {
          border-color: rgba(212,175,55,0.25);
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35);
        }
        .rs-hcard-accent { height: 4px; background: linear-gradient(90deg, #d4af37, transparent); }
        .rs-hcard-top {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 1.5rem 0.75rem;
        }
        .rs-status-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
          padding: 0.3rem 0.9rem; border-radius: 50px;
          background: rgba(212,175,55,0.1); color: #d4af37;
        }
        .rs-status-dot { width: 5px; height: 5px; border-radius: 50%; background: #d4af37; }
        .rs-hcard-date { font-size: 0.8rem; color: rgba(255,255,255,0.35); }

        .rs-hcard-items { padding: 0.5rem 1.5rem 1rem; display: flex; flex-direction: column; gap: 0.65rem; }
        .rs-hcard-item { display: flex; align-items: center; gap: 0.85rem; }
        .rs-hcard-thumb { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
        .rs-hcard-item-name { font-size: 0.9rem; font-weight: 700; color: #fff; }
        .rs-hcard-item-qty { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
        .rs-hcard-more { font-size: 0.78rem; color: rgba(212,175,55,0.6); font-style: italic; }

        .rs-hcard-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.15);
          gap: 1rem;
        }
        .rs-hcard-total-label { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); display: block; }
        .rs-hcard-total { font-size: 1.4rem; font-weight: 900; color: #d4af37; }

        /* cancel zone */
        .rs-cancel-zone {
          display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0;
        }
        .rs-countdown {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.72rem; font-weight: 800;
          color: rgba(255,180,0,0.8);
          background: rgba(255,180,0,0.08);
          border: 1px solid rgba(255,180,0,0.2);
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.05em;
        }
        .rs-btn-cancel {
          padding: 0.4rem 1rem;
          border-radius: 50px;
          border: 1px solid rgba(239,68,68,0.4);
          background: rgba(239,68,68,0.08);
          color: #f87171;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.25s;
        }
        .rs-btn-cancel:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.7);
          color: #fff;
        }

        /* dot-row replaces status badge */
        .rs-hcard-dot-row {
          display: flex; align-items: center; gap: 0.5rem;
        }
        .rs-hcard-order-label {
          font-size: 0.72rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(212,175,55,0.65);
        }

        /* ── Modal ── */
        .rs-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(5,10,25,0.88);
          backdrop-filter: blur(14px);
          z-index: 3000;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .rs-modal-box {
          width: 100%; max-width: 420px;
          background: rgba(15,23,42,0.97);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 24px;
          padding: 2rem 1.75rem 1.75rem;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          max-height: 90vh;
          overflow-y: auto;
        }
        .rs-modal-icon {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.2);
          margin: 0 auto 1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .rs-check-icon { color: #d4af37; }
        .rs-modal-title { font-size: 1.5rem; font-weight: 900; color: #fff; margin-bottom: 0.4rem; }
        .rs-modal-sub { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.5; margin-bottom: 1rem; }

        .rs-modal-delivery {
          display: flex; align-items: center; gap: 0.75rem;
          justify-content: center;
          background: rgba(212,175,55,0.07);
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          text-align: left;
        }
        .rs-modal-delivery-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(212,175,55,0.65); }
        .rs-modal-delivery-time { font-size: 0.95rem; font-weight: 800; color: #fff; }

        .rs-modal-summary {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 0.9rem;
          text-align: left;
          margin-bottom: 1.25rem;
        }
        .rs-modal-summary-title {
          font-size: 0.65rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em;
          color: #d4af37; margin-bottom: 0.6rem;
        }
        .rs-modal-line {
          display: flex; justify-content: space-between;
          font-size: 0.82rem; color: rgba(255,255,255,0.7); margin-bottom: 0.35rem;
        }
        .rs-modal-qty { color: #d4af37; font-weight: 700; }
        .rs-modal-total-row {
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px dashed rgba(255,255,255,0.1);
          padding-top: 0.6rem; margin-top: 0.35rem;
          font-size: 0.88rem; font-weight: 800; color: #fff;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .rs-order-grid { grid-template-columns: 1fr; }
          .rs-summary-panel { position: static; }
          .rs-panel-title { font-size: 1.8rem; }
        }
        @media (max-width: 600px) {
          .rs-topbar-inner { flex-direction: column; align-items: flex-start; }
          .rs-history-grid { grid-template-columns: 1fr; }
          .rs-modal-box { padding: 2rem 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default RoomServiceOrder;
