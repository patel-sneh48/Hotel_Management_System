import Navbar from './Navbar';
import Footer from './Footer';

import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const pageStyles = `
        @media (max-width: 968px) {
            .contact-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
            }
        }
        
        @media (max-width: 768px) {
            .contact-header h1 {
                font-size: 2.5rem !important;
            }
            .contact-header p {
                font-size: 1rem !important;
            }
            .contact-content {
                padding: 2rem 1rem !important;
            }
        }
        
        @media (max-width: 480px) {
            .contact-header h1 {
                font-size: 2rem !important;
            }
            .contact-info-item {
                flex-direction: column;
                text-align: center;
            }
        }
    `;

    return (
        <>
            <style>{pageStyles}</style>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />

                {/* Page Header */}
                <div className="contact-header" style={{
                    height: '40vh',
                    minHeight: '300px',
                    background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?fit=crop&w=1920&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'var(--nav-height)',
                    padding: '0 1rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{
                            fontSize: '3.5rem',
                            marginBottom: '1rem',
                            fontWeight: 700,
                            letterSpacing: '0.02em'
                        }}>Contact Us</h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#cbd5e1',
                            fontFamily: "'Caveat', cursive",
                            fontWeight: 300
                        }}>We're Here to Help</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container contact-content section" style={{ flex: 1 }}>
                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        maxWidth: '1100px',
                        margin: '0 auto'
                    }}>

                        {/* Contact Info */}
                        <div>
                            <h2 style={{
                                marginBottom: '2rem',
                                color: 'var(--primary)',
                                fontSize: '2.2rem',
                                fontWeight: 700
                            }}>Get in Touch</h2>

                            <p style={{
                                marginBottom: '2rem',
                                color: 'var(--text-muted)',
                                lineHeight: '1.6',
                                fontFamily: "'Caveat', cursive",
                                fontWeight: 300,
                                fontSize: '1rem'
                            }}>
                                Have questions about your booking or special requests? Reach out to our concierge team 24/7.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="contact-info-item" style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'var(--bg-card)',
                                        borderRadius: '50%',
                                        color: 'var(--primary)',
                                        flexShrink: 0
                                    }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.2rem',
                                            marginBottom: '0.5rem',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 600
                                        }}>Phone</h3>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 300,
                                            fontSize: '0.95rem'
                                        }}>+91 9909599765</p>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 300,
                                            fontSize: '0.95rem'
                                        }}>+91 9876543210</p>
                                    </div>
                                </div>

                                <div className="contact-info-item" style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'var(--bg-card)',
                                        borderRadius: '50%',
                                        color: 'var(--primary)',
                                        flexShrink: 0
                                    }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.2rem',
                                            marginBottom: '0.5rem',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 600
                                        }}>Email</h3>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 300,
                                            fontSize: '0.95rem'
                                        }}>concierge@luxestay.com</p>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 300,
                                            fontSize: '0.95rem'
                                        }}>bookings@luxestay.com</p>
                                    </div>
                                </div>

                                <div className="contact-info-item" style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'var(--bg-card)',
                                        borderRadius: '50%',
                                        color: 'var(--primary)',
                                        flexShrink: 0
                                    }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.2rem',
                                            marginBottom: '0.5rem',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 600
                                        }}>Location</h3>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 300,
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6'
                                        }}>LuxeStay Hotel Malabar Hill</p>
                                        <p style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 300,
                                            fontSize: '0.95rem',
                                            lineHeight: '1.6'
                                        }}>73, Nepean Sea Road, Opp. Petit Hall,<br />Vasant Vihar, Mumbai, Maharashtra 400006, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div style={{
                            background: 'var(--bg-card)',
                            padding: '2.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(204, 164, 59, 0.2)',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                        }}>
                            <h3 style={{
                                marginBottom: '1.5rem',
                                fontSize: '1.8rem',
                                fontFamily: "'Caveat', cursive",
                                fontWeight: 700,
                                color: 'var(--primary)'
                            }}>Send a Message</h3>

                            <form onSubmit={(e) => { e.preventDefault(); alert("Message sent! We will get back to you soon."); }}>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem',
                                        fontFamily: "'Caveat', cursive",
                                        fontWeight: 500
                                    }}>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem',
                                            borderRadius: '8px',
                                            border: '1px solid #334155',
                                            background: '#0f172a',
                                            color: '#fff',
                                            fontFamily: "'Caveat', cursive",
                                            fontSize: '0.95rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#334155'}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem',
                                        fontFamily: "'Caveat', cursive",
                                        fontWeight: 500
                                    }}>Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem',
                                            borderRadius: '8px',
                                            border: '1px solid #334155',
                                            background: '#0f172a',
                                            color: '#fff',
                                            fontFamily: "'Caveat', cursive",
                                            fontSize: '0.95rem',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#334155'}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.95rem',
                                        fontFamily: "'Caveat', cursive",
                                        fontWeight: 500
                                    }}>Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="How can we help you?"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem',
                                            borderRadius: '8px',
                                            border: '1px solid #334155',
                                            background: '#0f172a',
                                            color: '#fff',
                                            fontFamily: "'Caveat', cursive",
                                            fontSize: '0.95rem',
                                            resize: 'vertical',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = '#334155'}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontFamily: "'Caveat', cursive",
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        padding: '1rem'
                                    }}
                                >
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Contact;
