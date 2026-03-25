import Navbar from './Navbar';
import Footer from './Footer';


const About = () => {
    const pageStyles = `
        @media (max-width: 768px) {
            .about-header h1 {
                font-size: 2.5rem !important;
            }
            .about-header p {
                font-size: 1rem !important;
            }
            .stats-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            .about-content {
                padding: 2rem 1rem !important;
            }
        }
        
        @media (max-width: 480px) {
            .about-header h1 {
                font-size: 2rem !important;
            }
        }
    `;

    return (
        <>
            <style>{pageStyles}</style>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />

                {/* Page Header */}
                <div className="about-header" style={{
                    height: '40vh',
                    minHeight: '300px',
                    background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=1920&q=80")',
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
                            letterSpacing: '0.05em',
                            fontFamily: "'Algerian', serif"
                        }}>About Us</h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#cbd5e1',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 400
                        }}>Experience the Pinnacle of Luxury</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container about-content section" style={{ flex: 1 }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{
                            marginBottom: '2rem',
                            color: 'var(--primary)',
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            fontFamily: "'Algerian', serif"
                        }}>Our Story</h2>

                        <p style={{
                            marginBottom: '1.5rem',
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            color: 'var(--text-muted)',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 300,
                            textAlign: 'justify'
                        }}>
                            Founded on the principles of unparalleled hospitality and architectural excellence, LuxeStay has established itself as a beacon of luxury in the hospitality industry.
                            From our humble beginnings as a boutique establishment to becoming a premier destination for travelers worldwide, our journey has been defined by a relentless pursuit of perfection.
                        </p>

                        <p style={{
                            marginBottom: '3rem',
                            lineHeight: '1.8',
                            fontSize: '1.1rem',
                            color: 'var(--text-muted)',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 300,
                            textAlign: 'justify'
                        }}>
                            Every corner of our hotel is thoughtfully designed to provide a sanctuary of calm and sophistication. Whether you are here for business or leisure, our dedicated team is committed to ensuring your stay is nothing short of extraordinary.
                        </p>

                        <div className="stats-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '2rem',
                            marginTop: '4rem',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                padding: '2rem',
                                background: 'var(--bg-card)',
                                borderRadius: '12px',
                                border: '1px solid rgba(204, 164, 59, 0.2)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(204, 164, 59, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                <h3 style={{
                                    fontSize: '3rem',
                                    color: 'var(--primary)',
                                    marginBottom: '0.5rem',
                                    fontFamily: "'Algerian', serif",
                                    fontWeight: 700
                                }}>10+</h3>
                                <p style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>Years of Service</p>
                            </div>

                            <div style={{
                                padding: '2rem',
                                background: 'var(--bg-card)',
                                borderRadius: '12px',
                                border: '1px solid rgba(204, 164, 59, 0.2)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(204, 164, 59, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                <h3 style={{
                                    fontSize: '3rem',
                                    color: 'var(--primary)',
                                    marginBottom: '0.5rem',
                                    fontFamily: "'Algerian', serif",
                                    fontWeight: 700
                                }}>4+</h3>
                                <p style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>Rooms</p>
                            </div>

                            <div style={{
                                padding: '2rem',
                                background: 'var(--bg-card)',
                                borderRadius: '12px',
                                border: '1px solid rgba(204, 164, 59, 0.2)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(204, 164, 59, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                <h3 style={{
                                    fontSize: '3rem',
                                    color: 'var(--primary)',
                                    marginBottom: '0.5rem',
                                    fontFamily: "'Algerian', serif",
                                    fontWeight: 700
                                }}>15k+</h3>
                                <p style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>Happy Guests</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default About;
