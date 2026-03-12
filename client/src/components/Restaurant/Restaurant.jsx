import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { Coffee, Utensils, Wine, Star, Clock, MapPin, Phone, Mail } from 'lucide-react';

// Using the generated images
import heroImage from '../../assets/restaurant/hero.png';
import signatureDish from '../../assets/restaurant/signature.png';

import signatureScallops from '../../assets/restaurant/Signature Fine Dining/Seared Scallops with Lemon Butter.jpeg';
import signatureTuna from '../../assets/restaurant/Signature Fine Dining/Tuna Tartare with Avocado & Citrus Dressing.jpeg';
import signatureBurrata from '../../assets/restaurant/Signature Fine Dining/Burrata with Heirloom Tomatoes & Basil Oil.jpeg';
import signatureWagyu from '../../assets/restaurant/Signature Fine Dining/Wagyu Beef Tenderloin with Truffle Sauce.jpeg';
import signatureLamb from '../../assets/restaurant/Signature Fine Dining/Herb-Crusted Rack of Lamb with Red Wine Jus.jpeg';
import signatureSeaBass from '../../assets/restaurant/Signature Fine Dining/Chilean Sea Bass with Champagne Cream.jpeg';
import signatureFondant from '../../assets/restaurant/Signature Fine Dining/Valrhona Chocolate Fondant.jpeg';
import signatureBrulee from '../../assets/restaurant/Signature Fine Dining/Vanilla Bean Crème Brûlée.jpeg';
import signatureMilleFeuille from '../../assets/restaurant/Signature Fine Dining/Raspberry Mille-Feuille.jpeg';

import indianGalouti from '../../assets/restaurant/Royal Indian Cuisine/Galouti Kebab with Saffron Paratha.jpeg';
import indianMurghMalai from '../../assets/restaurant/Royal Indian Cuisine/Murgh Malai Kebab.jpeg';
import indianBroccoli from '../../assets/restaurant/Royal Indian Cuisine/Tandoori Broccoli with Mint Chutney.jpeg';
import indianButterChicken from '../../assets/restaurant/Royal Indian Cuisine/Murgh Makhani (Butter Chicken).jpeg';
import indianRoganJosh from '../../assets/restaurant/Royal Indian Cuisine/Rogan Josh – Kashmiri Lamb Curry.jpeg';
import indianPaneer from '../../assets/restaurant/Royal Indian Cuisine/Paneer Lababdar.jpeg';
import indianShahiTukda from '../../assets/restaurant/Royal Indian Cuisine/Shahi Tukda with Rabri.jpeg';
import indianRasmalai from '../../assets/restaurant/Royal Indian Cuisine/Rasmalai Pistachio Cream.jpeg';
import indianKulfi from '../../assets/restaurant/Royal Indian Cuisine/kulfi falooda.jpeg';

import asianSatay from '../../assets/restaurant/Pan-Asian/Chicken Satay with Peanut Sauce.jpeg';
import asianTempura from '../../assets/restaurant/Pan-Asian/Crispy Prawn Tempura.jpeg';
import asianDimSum from '../../assets/restaurant/Pan-Asian/Vegetable Crystal Dim Sum.jpeg';
import asianGreenCurry from '../../assets/restaurant/Pan-Asian/Thai Green Curry Chicken.jpeg';
import asianBeef from '../../assets/restaurant/Pan-Asian/Black Pepper Beef Stir Fry.jpeg';
import asianSalmon from '../../assets/restaurant/Pan-Asian/Teriyaki Glazed Salmon.jpeg';
import asianMango from '../../assets/restaurant/Pan-Asian/Mango Sticky Rice.jpeg';
import asianMatcha from '../../assets/restaurant/Pan-Asian/Matcha Cheesecake.jpeg';
import asianMochi from '../../assets/restaurant/Pan-Asian/Mochi Ice Cream Trio.jpeg';

import medBurrata from '../../assets/restaurant/Italian Mediterranean/Burrata with Cherry Tomatoes & Olive Oil.jpeg';
import medCarpaccio from '../../assets/restaurant/Italian Mediterranean/Beef Carpaccio with Parmesan Shavings.jpeg';
import medBruschetta from '../../assets/restaurant/Italian Mediterranean/Classic Bruschetta with Tomato & Basil.jpeg';
import medRavioli from '../../assets/restaurant/Italian Mediterranean/Lobster Ravioli with Cream Sauce.jpeg';
import medRisotto from '../../assets/restaurant/Italian Mediterranean/Truffle Mushroom Risotto.jpeg';
import medSeaBass from '../../assets/restaurant/Italian Mediterranean/Grilled Mediterranean Sea Bass.jpeg';
import medTiramisu from '../../assets/restaurant/Italian Mediterranean/Classic Tiramisu.jpeg';
import medPannaCotta from '../../assets/restaurant/Italian Mediterranean/Vanilla Panna Cotta with Berry Compote.jpeg';
import medCannoli from '../../assets/restaurant/Italian Mediterranean/Cannoli with Ricotta Cream.jpeg';

const menuData = {
    signature: [
        {
            type: "Starters",
            dishes: [
                { name: "Seared Scallops with Lemon Butter", price: "$28", desc: "Pan-seared to perfection, finished with brown butter and citrus", image: signatureScallops },
                { name: "Tuna Tartare with Avocado & Citrus Dressing", price: "$32", desc: "Fresh Ahi tuna, avocado mousse, wasabi pearls", image: signatureTuna },
                { name: "Burrata with Heirloom Tomatoes & Basil Oil", price: "$26", desc: "Creamy burrata, balsamic reduction, basil oil", image: signatureBurrata }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Wagyu Beef Tenderloin with Truffle Sauce", price: "$68", desc: "Truffle sauce, potato pavé, charred asparagus", image: signatureWagyu },
                { name: "Herb-Crusted Rack of Lamb with Red Wine Jus", price: "$52", desc: "Rosemary jus, mint pea purée, roasted carrots", image: signatureLamb },
                { name: "Chilean Sea Bass with Champagne Cream", price: "$58", desc: "Champagne saffron sauce, leek fondant", image: signatureSeaBass }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Valrhona Chocolate Fondant", price: "$18", desc: "Warm molten center, Fleur de Sel, vanilla bean gelato", image: signatureFondant },
                { name: "Vanilla Bean Crème Brûlée", price: "$16", desc: "Madagascar vanilla, caramelized sugar, fresh berries", image: signatureBrulee },
                { name: "Raspberry Mille-Feuille", price: "$22", desc: "Crispy layers of puff pastry, vanilla diplomat cream, fresh raspberries", image: signatureMilleFeuille }
            ]
        }
    ],
    indian: [
        {
            type: "Starters",
            dishes: [
                { name: "Galouti Kebab with Saffron Paratha", price: "$26", desc: "Lucknowi lamb patties, saffron paratha, mint chutney", image: indianGalouti },
                { name: "Murgh Malai Kebab", price: "$24", desc: "Creamy chicken skewers, cheese, garlic, green chilies", image: indianMurghMalai },
                { name: "Tandoori Broccoli with Mint Chutney", price: "$20", desc: "Spiced hung curd marinade, char-grilled", image: indianBroccoli }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Murgh Makhani (Butter Chicken)", price: "$38", desc: "Smoked chicken, velvet tomato gravy, artisanal butter", image: indianButterChicken },
                { name: "Rogan Josh – Kashmiri Lamb Curry", price: "$42", desc: "Slow-cooked Kashmiri lamb, aromatic spices", image: indianRoganJosh },
                { name: "Paneer Lababdar", price: "$32", desc: "Cottage cheese cubes, creamy tomato and onion masala", image: indianPaneer }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Shahi Tukda with Rabri", price: "$18", desc: "Golden bread pudding, rabri, silver leaf, nut soil", image: indianShahiTukda },
                { name: "Rasmalai Pistachio Cream", price: "$16", desc: "Poached cottage cheese dumplings, saffron milk, pistachio dust", image: indianRasmalai },
                { name: "Kulfi Falooda", price: "$15", desc: "Traditional Indian ice cream with rose syrup and vermicelli", image: indianKulfi }
            ]
        }
    ],
    asian: [
        {
            type: "Starters",
            dishes: [
                { name: "Chicken Satay with Peanut Sauce", price: "$22", desc: "Grilled skewers, peanut sauce, cucumber relish", image: asianSatay },
                { name: "Crispy Prawn Tempura", price: "$28", desc: "Lightly battered jumbo prawns, tentsuyu sauce", image: asianTempura },
                { name: "Vegetable Crystal Dim Sum", price: "$20", desc: "Hand-rolled translucent dumplings, shiitake, water chestnut", image: asianDimSum }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Thai Green Curry Chicken", price: "$36", desc: "Coconut milk, kaffir lime, pea aubergine", image: asianGreenCurry },
                { name: "Black Pepper Beef Stir Fry", price: "$44", desc: "Stir-fried tenderloin, garlic, black pepper sauce", image: asianBeef },
                { name: "Teriyaki Glazed Salmon", price: "$42", desc: "Norwegian salmon, mirin-soy glaze, bok choy", image: asianSalmon }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Mango Sticky Rice", price: "$18", desc: "Sweet coconut rice, fresh Thai mango, gold leaf", image: asianMango },
                { name: "Matcha Cheesecake", price: "$16", desc: "Japanese matcha, black sesame crust", image: asianMatcha },
                { name: "Mochi Ice Cream Trio", price: "$18", desc: "Assortment of traditional mochi filled with rich ice cream", image: asianMochi }
            ]
        }
    ],
    mediterranean: [
        {
            type: "Starters",
            dishes: [
                { name: "Burrata with Cherry Tomatoes & Olive Oil", price: "$26", desc: "Basil oil, toasted focaccia, balsamic pearls", image: medBurrata },
                { name: "Beef Carpaccio with Parmesan Shavings", price: "$28", desc: "Paper-thin wagyu, arugula, truffle aioli, parmesan", image: medCarpaccio },
                { name: "Classic Bruschetta with Tomato & Basil", price: "$22", desc: "Toasted artisan bread, vine-ripened tomatoes, garlic, fresh basil", image: medBruschetta }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Lobster Ravioli with Cream Sauce", price: "$48", desc: "Handmade pasta, bisque reduction, fresh herbs", image: medRavioli },
                { name: "Truffle Mushroom Risotto", price: "$38", desc: "Arborio rice, wild mushrooms, white truffle oil, parmesan", image: medRisotto },
                { name: "Grilled Mediterranean Sea Bass", price: "$52", desc: "Herb-baked, roasted vegetables, lemon emulsion", image: medSeaBass }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Classic Tiramisu", price: "$18", desc: "Espresso-soaked ladyfingers, mascarpone, cocoa", image: medTiramisu },
                { name: "Vanilla Panna Cotta with Berry Compote", price: "$16", desc: "Vanilla bean, raspberry coulis, mint", image: medPannaCotta },
                { name: "Cannoli with Ricotta Cream", price: "$14", desc: "Crispy pastry shells filled with sweet ricotta and chocolate chips", image: medCannoli }
            ]
        }
    ]
};

const Restaurant = () => {
    const [activeCategory, setActiveCategory] = React.useState('signature');
    const [selectedDish, setSelectedDish] = React.useState(null);
    const menuRef = React.useRef(null);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);

        // Smooth scroll to menu section
        setTimeout(() => {
            if (menuRef.current) {
                const navHeight = 180; // Increased offset to prevent overlapping with navbar
                const elementPosition = menuRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedDish) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedDish]);

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="restaurant-page page-wrapper">
            <Navbar />

            {/* Hero Section */}
            <section className="restaurant-hero">
                <div
                    className="hero-bg-overlay"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <motion.div
                    className="hero-content-inner container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <div className="stars-wrapper">
                        <Star className="text-gold" size={20} fill="#d4af37" />
                        <Star className="text-gold" size={22} fill="#d4af37" />
                        <Star className="text-gold" size={24} fill="#d4af37" />
                        <Star className="text-gold" size={22} fill="#d4af37" />
                        <Star className="text-gold" size={20} fill="#d4af37" />
                    </div>
                    <h1 className="hero-title">
                        Epicurean <span className="text-gold italic-font">Delight</span>
                    </h1>
                    <p className="hero-subtitle">
                        A symphony of flavors awaits. Experience Michelin-worthy dining set against breathtaking views.
                    </p>
                    <div className="hero-hours-badge">
                        <Clock size={16} className="text-gold" />
                        <span>Daily: 7:00 AM - 11:00 PM</span>
                    </div>
                    <a href="#reserve" className="btn btn-primary reserve-btn">
                        Reserve a Table
                    </a>
                </motion.div>
            </section>

            {/* Category Selection Tabs */}
            <div className="container category-selector-wrapper">
                <div className="category-tabs">
                    {[
                        { id: 'signature', label: 'Signature Fine Dining' },
                        { id: 'indian', label: 'Royal Indian Cuisine' },
                        { id: 'asian', label: 'Pan-Asian' },
                        { id: 'mediterranean', label: 'Italian/Mediterranean' }
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Highlights Section */}
            <section id="menu" className="section bg-card-alt" ref={menuRef}>
                <div className="container">
                    <div className="section-header">
                        <h3 className="section-title text-gold">Dining <span className="italic-font">Menu</span></h3>
                        <p className="hero-subtitle" >Meticulously curated flavors for a refined palate</p>
                    </div>

                    <div className="menu-categories-grid">
                        {menuData[activeCategory].map((section, sIdx) => (
                            <div key={sIdx} className="menu-section-block">
                                <h4 className="premium-category-label">{section.type}</h4>
                                <motion.div
                                    className="menu-image-grid"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                >
                                    {section.dishes.map((dish, dIdx) => (
                                        <motion.div
                                            key={dIdx}
                                            variants={fadeInUp}
                                            className="dish-card-luxury clickable"
                                            onClick={() => setSelectedDish(dish)}
                                        >
                                            <div className="dish-image-container">
                                                <img src={dish.image} alt={dish.name} className="dish-visual" />
                                                <div className="premium-price-badge">{dish.price}</div>
                                            </div>
                                            <div className="dish-content-luxury">
                                                <h5>{dish.name}</h5>
                                                {/* Description hidden in card, shown in modal */}
                                                <span className="view-details-prompt">Click for details</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Reservation Section */}
            <section id="reserve" className="section bg-dark border-top">
                <div className="container">
                    <div className="reserve-grid-compact">
                        <div className="reserve-text">
                            <h2 className="tagline">Reservations</h2>
                            <h3 className="sub-title">Secure Your Table</h3>
                            <p className="description">Experience an unforgettable evening. Our dining room is intimate, providing a focused sensory experience.</p>
                            <div className="contact-mini-info">
                                <div className="c-info-item"><Phone size={18} className="text-gold" /> <span>+91 9909599765</span></div>
                                <div className="c-info-item"><Mail size={18} className="text-gold" /> <span>dining@luxestay.com</span></div>
                            </div>
                        </div>
                        <div className="reserve-form-box">
                            <form className="luxury-mini-form">
                                <div className="form-split">
                                    <input type="date" className="luxury-input" defaultValue={new Date().toISOString().split('T')[0]} />
                                    <select className="luxury-input" >
                                        <option>2 People</option>
                                        <option>4 People</option>
                                        <option>6+ People</option>
                                    </select>
                                </div>
                                <select className="luxury-input">
                                    <option >7:00 AM</option>
                                    <option>8:00 AM</option>
                                    <option>9:00 AM</option>
                                    <option>11:00 AM</option>
                                    <option>12:00 PM</option>
                                    <option>1:00 PM</option>
                                    <option>2:00 PM</option>
                                    <option>4:00 PM</option>
                                    <option>5:00 PM</option>
                                    <option>6:00 PM</option>
                                    <option>7:00 PM</option>
                                    <option>8:00 PM</option>
                                    <option>9:00 PM</option>
                                    <option>10:00 PM</option>
                                    <option>11:00 PM</option>
                                </select>
                                <button type="button" className="btn btn-primary w-100">Confirm Availability</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ambiance & Philosophy */}
            <section id="about" className="section bg-dark">
                <div className="container">
                    <div className="philosophy-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="philosophy-text"
                        >
                            <h2 className="tagline">The Philosophy</h2>
                            <h3 className="sub-title">Art on a Plate.<br />Passion in Every Bite.</h3>
                            <p className="description">
                                Our executive chefs source only the finest seasonal ingredients to craft a menu that celebrates modern gastronomy while honoring classic techniques.
                                <br /><br />
                                Whether you're here for an intimate dinner or a grand celebration, our ambiance creates the perfect backdrop for memories that linger long after the last course.
                            </p>

                            <div className="amenities-flex">
                                <div className="amenity-item">
                                    <div className="amenity-icon">
                                        <Utensils size={20} />
                                    </div>
                                    <span>Fine Dining</span>
                                </div>
                                <div className="amenity-item">
                                    <div className="amenity-icon">
                                        <Wine size={20} />
                                    </div>
                                    <span>Sommelier Selection</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="philosophy-image-wrapper"
                        >
                            <div className="image-border-decoration"></div>
                            <img
                                src={signatureDish}
                                alt="Signature Interior"
                                className="signature-img"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Dish Details Modal */}
            <AnimatePresence>
                {selectedDish && (
                    <motion.div
                        className="dish-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedDish(null)}
                    >
                        <motion.div
                            className="dish-modal-content"
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={() => setSelectedDish(null)}>×</button>
                            
                            <div className="modal-image-wrapper">
                                <img src={selectedDish.image} alt={selectedDish.name} />
                                <div className="modal-price-badge">{selectedDish.price}</div>
                            </div>
                            
                            <div className="modal-text-content">
                                <h3>{selectedDish.name}</h3>
                                <div className="modal-divider"></div>
                                <p className="modal-desc">{selectedDish.desc}</p>
                                
                                <div className="modal-actions">
                                    <button 
                                        className="btn btn-outline-gold modal-btn"
                                        onClick={() => {
                                            alert(`Room service requested for ${selectedDish.name}. Added to your bill.`);
                                            setSelectedDish(null);
                                        }}
                                    >
                                        <Utensils size={18} /> Room Service
                                    </button>
                                    <a 
                                        href="#reserve" 
                                        className="btn btn-primary modal-btn"
                                        onClick={() => setSelectedDish(null)}
                                    >
                                        Reserve Table
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                /* ─── BASE ─── */
                .restaurant-page {
                    background-color: var(--bg-main);
                    color: var(--text-main);
                }

                .text-gold { color: #d4af37; }
                .italic-font { font-style: italic; }

                /* ─── HERO ─── */
                .restaurant-hero {
                    position: relative;
                    min-height: 85vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    overflow: hidden;
                }

                .hero-bg-overlay {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    filter: brightness(0.4);
                    z-index: 1;
                }

                .hero-content-inner {
                    position: relative;
                    z-index: 2;
                    max-width: 900px;
                    padding-top: var(--nav-height);
                }

                .stars-wrapper {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                    opacity: 0.8;
                }

                .hero-title {
                    font-size: clamp(2.5rem, 8vw, 5rem);
                    margin-bottom: 1.5rem;
                    letter-spacing: 0.05em;
                    color: #fff;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }

                .hero-subtitle {
                    font-size: clamp(1rem, 2vw, 1.25rem);
                    color: #e2e8f0;
                    max-width: 700px;
                    margin: 0 auto 1rem;
                    font-weight: 300;
                    letter-spacing: 0.05em;
                }

                .hero-hours-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(10px);
                    padding: 0.5rem 1.25rem;
                    border-radius: 50px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 2.5rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #fff;
                }

                .reserve-btn {
                    padding: 1rem 3rem;
                    font-size: 1.1rem;
                    border-radius: 50px;
                }

                /* ─── PHILOSOPHY ─── */
                .philosophy-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 5rem;
                    align-items: center;
                }

                .tagline {
                    color: #d4af37;
                    font-size: 0.85rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    margin-bottom: 1rem;
                    font-family: 'Inter', sans-serif;
                }

                .sub-title {
                    font-size: clamp(1.5rem, 4vw, 2.5rem);
                    line-height: 1.2;
                    margin-bottom: 2rem;
                }

                .description {
                    color: var(--text-muted);
                    font-size: 1.1rem;
                    margin-bottom: 2.5rem;
                }

                .amenities-flex {
                    display: flex;
                    gap: 3rem;
                }

                .amenity-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-weight: 600;
                }

                .amenity-icon {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #d4af37;
                }

                .philosophy-image-wrapper {
                    position: relative;
                }

                .image-border-decoration {
                    position: absolute;
                    inset: -1rem;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 20px;
                    transform: translate(1.5rem, -1.5rem);
                }

                .signature-img {
                    width: 100%;
                    aspect-ratio: 4/5;
                    object-fit: cover;
                    border-radius: 20px;
                    position: relative;
                    z-index: 2;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                }

                .signature-badge {
                    position: absolute;
                    bottom: -2rem;
                    left: -2rem;
                    background: rgba(30, 41, 59, 0.8);
                    backdrop-filter: blur(15px);
                    padding: 1.75rem;
                    border-radius: 15px;
                    border: 1px solid rgba(255,255,255,0.1);
                    z-index: 3;
                    max-width: 220px;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
                }

                .badge-tag { color: #d4af37; font-size: 0.75rem; font-style: italic; margin-bottom: 0.5rem; }
                .badge-name { font-weight: 700; line-height: 1.3; }

                /* ─── MENU ─── */
                .bg-card-alt { background-color: #0b1120; }
                
                .menu-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2.5rem;
                    margin-top: 4rem;
                }

                .menu-card {
                    background: rgba(255,255,255,0.03);
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.05);
                    transition: var(--transition-normal);
                }

                .menu-card:hover { 
                    border-color: rgba(212, 175, 55, 0.3);
                    background: rgba(255,255,255,0.05);
                }

                .featured-card {
                    position: relative;
                    transform: translateY(-20px);
                    border-color: rgba(212, 175, 55, 0.2);
                }

                .featured-tag {
                    position: absolute;
                    top: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #d4af37;
                    color: #000;
                    font-size: 0.7rem;
                    font-weight: 800;
                    padding: 0.4rem 1.2rem;
                    border-radius: 50px;
                    text-transform: uppercase;
                }

                .course-type {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .course-divider {
                    width: 3rem;
                    height: 3px;
                    background: rgba(212, 175, 55, 0.4);
                    margin-bottom: 2rem;
                }

                .dish-list { list-style: none; display: flex; flex-direction: column; gap: 2rem; }
                .dish-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem; }
                .dish-header h5 { font-size: 1.1rem; color: #fff; }
                .price { color: #d4af37; font-weight: 800; }
                .dish-item p { font-size: 0.85rem; color: var(--text-dim); }

                /* ─── INFO BOX ─── */
                .section-small { padding: 4rem 0; }
                .border-top { border-top: 1px solid rgba(255,255,255,0.05); }

                .info-glass-box {
                    background: rgba(255,255,255,0.02);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 30px;
                    padding: 3rem;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }

                .info-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 1rem;
                }

                .info-item h4 { font-size: 1.25rem; font-family: 'Inter', sans-serif; }
                .info-item p { font-size: 0.9rem; color: var(--text-muted); }

                .border-sides {
                    border-left: 1px solid rgba(255,255,255,0.1);
                    border-right: 1px solid rgba(255,255,255,0.1);
                }

                /* ─── PREMIUM MENU STYLES ─── */
                .menu-categories-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 6rem;
                    margin-top: 4rem;
                }

                .menu-section-block {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .premium-category-label {
                    font-size: 2rem;
                    color: var(--primary);
                    font-family: 'Algerian', serif;
                    letter-spacing: 0.1em;
                    border-bottom: 2px solid rgba(212, 175, 55, 0.2);
                    padding-bottom: 1rem;
                    margin-bottom: 1rem;
                    display: inline-block;
                }

                .menu-image-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 3rem;
                }

                .dish-card-luxury {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }

                .dish-card-luxury.clickable {
                    cursor: pointer;
                }

                .dish-card-luxury:hover {
                    transform: translateY(-15px);
                    border-color: rgba(212, 175, 55, 0.4);
                    background: rgba(255, 255, 255, 0.04);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                }

                .dish-image-container {
                    position: relative;
                    height: 260px;
                    overflow: hidden;
                }

                .dish-visual {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }

                .dish-card-luxury:hover .dish-visual {
                    transform: scale(1.15);
                }

                .premium-price-badge {
                    position: absolute;
                    top: 1.25rem;
                    right: 1.25rem;
                    background: #d4af37;
                    color: #000;
                    padding: 0.5rem 1.2rem;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 1rem;
                    letter-spacing: 0.05em;
                }

                .dish-content-luxury {
                    padding: 1.5rem 2rem;
                }

                .dish-content-luxury h5 {
                    font-size: 1.4rem;
                    margin-bottom: 0.5rem;
                    font-family: 'Algerian', serif;
                    color: #fff;
                    letter-spacing: 0.05em;
                    line-height: 1.3;
                }

                .view-details-prompt {
                    font-size: 0.85rem;
                    color: rgba(212, 175, 55, 0.7);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 600;
                    transition: color 0.3s;
                }

                .dish-card-luxury:hover .view-details-prompt {
                    color: #d4af37;
                }

                /* ─── MODAL STYLES ─── */
                .dish-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .dish-modal-content {
                    background: #0f172a;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 20px;
                    width: 100%;
                    max-width: 600px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                }

                .modal-close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.5);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.3s ease;
                }

                .modal-close-btn:hover {
                    background: #d4af37;
                    color: black;
                    border-color: #d4af37;
                    transform: rotate(90deg);
                }

                .modal-image-wrapper {
                    position: relative;
                    height: 350px;
                    width: 100%;
                }

                .modal-image-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .modal-price-badge {
                    position: absolute;
                    bottom: -1rem;
                    right: 2rem;
                    background: #d4af37;
                    color: #000;
                    padding: 0.75rem 2rem;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 1.25rem;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }

                .modal-text-content {
                    padding: 3rem 2rem 2rem;
                    text-align: center;
                }

                .modal-text-content h3 {
                    font-family: 'Algerian', serif;
                    font-size: 2rem;
                    color: #fff;
                    margin-bottom: 1rem;
                }

                .modal-divider {
                    width: 50px;
                    height: 3px;
                    background: #d4af37;
                    margin: 0 auto 1.5rem;
                }

                .modal-desc {
                    color: #a0aec0;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .modal-actions {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                }

                .modal-btn {
                    padding: 0.8rem 2rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .modal-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
                }

                .btn-outline-gold {
                    background: transparent;
                    border: 2px solid #d4af37;
                    color: #d4af37;
                }

                .btn-outline-gold:hover {
                    background: rgba(212, 175, 55, 0.1);
                }

                @media (max-width: 768px) {
                    .menu-image-grid { grid-template-columns: 1fr; }
                    .dish-image-container { height: 220px; }
                    .premium-category-label { font-size: 1.75rem; }
                    
                    .modal-image-wrapper { height: 250px; }
                    .modal-actions { flex-direction: column; gap: 1rem; }
                    .modal-text-content h3 { font-size: 1.5rem; }
                    .dish-content-luxury { padding: 1.25rem; }
                }

                /* ─── NEW SINGLE PAGE STYLES ─── */
                .section-subtitle-text {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin-top: -1rem;
                    margin-bottom: 3rem;
                }

                .full-menu-container {
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }

                .category-label {
                    font-size: 1.8rem;
                    color: var(--primary);
                    font-family: 'Garamond', serif;
                    margin-bottom: 2rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                    display: inline-block;
                }

                .dish-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .dish-item-premium {
                    background: rgba(255, 255, 255, 0.02);
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: transform 0.3s;
                }

                .dish-item-premium:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.04);
                }

                .dish-title-price {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 0.5rem;
                }

                .dish-title-price h5 {
                    font-size: 1.1rem;
                    color: #fff;
                    font-weight: 600;
                }

                .dish-description {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    line-height: 1.4;
                }

                .reserve-grid-compact {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .contact-mini-info {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .c-info-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: #fff;
                    font-size: 0.9rem;
                }

                .reserve-form-box {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .luxury-mini-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-split {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 1rem;
                }

                .luxury-input {
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1rem;
                    color: #fff;
                    border-radius: 8px;
                    outline: none;
                    width: 100%;
                }

                .luxury-input:focus {
                    border-color: var(--primary);
                }

                @media (max-width: 1024px) {
                    .reserve-grid-compact { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
                    .contact-mini-info { align-items: center; }
                }

                /* ─── CATEGORY TABS ─── */
                .category-selector-wrapper {
                    margin-top: -30px;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
                    margin-bottom: 2rem;
                }

                .category-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    background: var(--bg-card);
                    padding: 0.5rem;
                    border-radius: 60px;
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(10px);
                    box-shadow: var(--shadow-xl);
                    gap: 0.5rem;
                }

                .category-tab {
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    border: none;
                    background: transparent;
                    color: var(--text-dim);
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: var(--transition-normal);
                    font-family: 'Algerian', serif;
                    letter-spacing: 0.05em;
                }

                .category-tab.active {
                    background: var(--primary);
                    color: #000;
                    box-shadow: var(--shadow-md);
                }

                @media (max-width: 768px) {
                    .category-tabs { border-radius: 20px; padding: 1rem; }
                    .category-tab { padding: 0.6rem 1.2rem; font-size: 0.9rem; width: 100%; }
                }

                /* ─── RESPONSIVE ─── */
                @media (max-width: 1024px) {
                    .philosophy-grid { gap: 3rem; }
                    .menu-grid { grid-template-columns: 1fr 1fr; }
                    .featured-card { transform: none; }
                }

                @media (max-width: 768px) {
                    .philosophy-grid { grid-template-columns: 1fr; text-align: center; gap: 4rem; }
                    .amenities-flex { justify-content: center; }
                    .image-border-decoration { display: none; }
                    .signature-badge { position: relative; bottom: 0; left: 0; margin: 1.5rem auto 0; max-width: 100%; }
                    .menu-grid { grid-template-columns: 1fr; }
                    .info-glass-box { grid-template-columns: 1fr; padding: 2rem; }
                    .border-sides { border: none; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 2rem 0; }
                }
            `}</style>
        </div>
    );
};

export default Restaurant;
