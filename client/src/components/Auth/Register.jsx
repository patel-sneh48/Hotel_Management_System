import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        const result = await register(formData.name, formData.email, formData.password);
        if (!result.success) {
            setError(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="page-wrapper pt-nav auth-page">
            <Navbar />

            <div className="container section auth-container">
                <div className="auth-card glass-card animate-fade-in mx-auto">
                    <div className="auth-header text-center mb-6">
                        <h1 className="auth-title mb-2">Create Account</h1>
                        <p className="text-dim">Join us to book your ultimate stay.</p>
                    </div>

                    {error && <div className="auth-error mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group relative">
                            <label>Full Name</label>
                            <div className="input-with-icon">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group relative mt-4">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group relative mt-4">
                            <label>Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    minLength="6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group relative mt-4">
                            <label>Confirm Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    minLength="6"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full mt-6 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><Loader2 className="animate-spin" size={20} /> Creating Account...</>
                            ) : (
                                <>Sign Up <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer mt-6 text-center text-sm">
                        <span className="text-dim">Already have an account? </span>
                        <Link to="/login" className="auth-link text-primary font-bold">Log In</Link>
                    </div>
                </div>
            </div>

            <Footer />

            <style>{`
                /* Reusing styles from Login to keep file neat */
                .auth-page { display: flex; flex-direction: column; min-height: 100vh; }
                .auth-container { display: flex; align-items: center; justify-content: center; flex: 1; padding: 4rem 1rem; }
                
                .auth-card {
                    width: 100%;
                    max-width: 480px;
                    padding: 3rem;
                    background: rgba(15, 23, 42, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                }

                .auth-title { font-size: 2rem; color: #fff; font-weight: 700; }
                
                .auth-error {
                    padding: 0.75rem 1rem;
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 8px;
                    color: #ef4444;
                    font-size: 0.875rem;
                    text-align: center;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .input-with-icon { position: relative; }
                
                .input-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-dim);
                }

                .input-with-icon input {
                    width: 100%;
                    padding: 0.85rem 1rem 0.85rem 3rem;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--glass-border);
                    border-radius: 8px;
                    color: #fff;
                    transition: var(--transition-fast);
                }

                .input-with-icon input:focus {
                    border-color: var(--primary);
                    outline: none;
                    background: rgba(0, 0, 0, 0.4);
                }

                .auth-link { text-decoration: none; transition: var(--transition-fast); }
                .auth-link:hover { text-decoration: underline; }

                .mx-auto { margin-left: auto; margin-right: auto; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-6 { margin-bottom: 1.5rem; }
                .mt-4 { margin-top: 1rem; }
                .mt-6 { margin-top: 1.5rem; }
                .text-center { text-align: center; }
                .text-dim { color: var(--text-dim); }
                .text-sm { font-size: 0.875rem; }
                .text-primary { color: var(--primary); }
                .font-bold { font-weight: 700; }
                .relative { position: relative; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-center { justify-content: center; }
                .gap-2 { gap: 0.5rem; }

                @keyframes spin { 100% { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }

                @media (max-width: 600px) {
                    .auth-card { padding: 2rem 1.5rem; border-radius: 12px; border: none; }
                }
            `}</style>
        </div>
    );
};

export default Register;
