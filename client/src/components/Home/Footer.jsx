import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-main">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-item">
                        <div className="footer-icon-box">
                            <Phone size={24} />
                        </div>
                        <h4 className="footer-item-title font-fancy">Call Us</h4>
                        <p className="footer-item-text">+91 9909599765</p>
                    </div>

                    <div className="footer-item">
                        <div className="footer-icon-box">
                            <Mail size={24} />
                        </div>
                        <h4 className="footer-item-title font-fancy">Email Us</h4>
                        <p className="footer-item-text">bookings@luxestay.com</p>
                    </div>

                    <div className="footer-item">
                        <div className="footer-icon-box">
                            <MapPin size={24} />
                        </div>
                        <h4 className="footer-item-title font-fancy">Visit Us</h4>
                        <p className="footer-item-text">
                            73, Nepean Sea Road, Malabar Hill, Mumbai, India
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} LuxeStay Hotels. All rights reserved.</p>
                </div>
            </div>

            <style>{`
                .footer-main {
                    background-color: var(--bg-card);
                    padding: 0.5rem 0 0.5rem 0;
                    margin-top: auto;
                    border-top: 1px solid var(--glass-border);
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2.5rem;
                }

                .footer-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1rem;
                    transition: var(--transition-normal);
                }

                .footer-item:hover {
                    transform: translateY(-5px);
                }

                .footer-icon-box {
                    padding: 1rem;
                    background: var(--bg-main);
                    border-radius: 50%;
                    color: var(--primary);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--glass-border);
                    transition: var(--transition-normal);
                }

                .footer-item:hover .footer-icon-box {
                    background: var(--primary);
                    color: #000;
                    border-color: var(--primary);
                }

                .footer-item-title {
                    font-size: 1.4rem;
                    color: var(--text-main);
                    font-family: 'Algerian', serif;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                }

                .footer-item-text {
                    color: var(--text-muted);
                    max-width: 250px;
                }

                .footer-bottom {
                    border-top: 1px solid var(--glass-border);
                    padding-top: 1rem;
                    text-align: center;
                    color: var(--text-dim);
                    font-size: 0.9rem;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
