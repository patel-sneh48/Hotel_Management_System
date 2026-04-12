import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { Coffee, Utensils, Wine, Star, Clock, MapPin, Phone, Mail, ShoppingBasket } from 'lucide-react';

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
                { name: "Seared Scallops with Lemon Butter", price: "₹2800", desc: "Pan-seared to perfection, finished with brown butter and citrus. A sublime opening act with a velvety finish.", ingredients: ["Diver Scallops", "Brown Butter", "Lemon Zest", "Micro Herbs", "Sea Salt"], image: signatureScallops },
                { name: "Tuna Tartare with Avocado & Citrus Dressing", price: "₹3200", desc: "Fresh Ahi tuna, silky avocado mousse, pop of wasabi pearls and a bright citrus dressing.", ingredients: ["Ahi Tuna", "Avocado Mousse", "Wasabi Pearls", "Citrus Dressing", "Sesame Oil"], image: signatureTuna },
                { name: "Burrata with Heirloom Tomatoes & Basil Oil", price: "₹2600", desc: "Creamy Italian burrata on a bed of heirloom tomatoes, finished with balsamic reduction and vibrant basil oil.", ingredients: ["Burrata", "Heirloom Tomatoes", "Basil Oil", "Balsamic Reduction", "Focaccia"], image: signatureBurrata }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Wagyu Beef Tenderloin with Truffle Sauce", price: "₹6800", desc: "A5 Wagyu seared to rosy perfection, resting in a velvety black truffle sauce with crispy potato pavé and charred asparagus.", ingredients: ["A5 Wagyu", "Black Truffle", "Potato Pavé", "Asparagus", "Demi-Glace"], image: signatureWagyu },
                { name: "Herb-Crusted Rack of Lamb with Red Wine Jus", price: "₹5200", desc: "Frenched rack of lamb encrusted with rosemary and breadcrumbs, served with silky mint pea purée and roasted heritage carrots.", ingredients: ["Rack of Lamb", "Rosemary", "Mint Pea Purée", "Red Wine Jus", "Heritage Carrots"], image: signatureLamb },
                { name: "Chilean Sea Bass with Champagne Cream", price: "₹5800", desc: "Buttery sea bass fillet on a langoustine leek fondant, draped in a champagne-saffron cream sauce.", ingredients: ["Chilean Sea Bass", "Champagne", "Saffron", "Leek Fondant", "Langoustine Bisque"], image: signatureSeaBass }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Valrhona Chocolate Fondant", price: "₹1800", desc: "Warm molten Valrhona chocolate center dusted with Fleur de Sel, accompanied by hand-churned vanilla bean gelato.", ingredients: ["Valrhona 72% Chocolate", "Fleur de Sel", "Vanilla Gelato", "Cocoa Powder", "Salted Caramel"], image: signatureFondant },
                { name: "Vanilla Bean Crème Brûlée", price: "₹1600", desc: "Silky Madagascar vanilla custard beneath a perfectly caramelized sugar crust, garnished with fresh seasonal berries.", ingredients: ["Madagascar Vanilla", "Cream", "Egg Yolk", "Demerara Sugar", "Fresh Berries"], image: signatureBrulee },
                { name: "Raspberry Mille-Feuille", price: "₹2200", desc: "Crispy layers of caramelized puff pastry filled with vanilla diplomat cream and crowned with fresh raspberries.", ingredients: ["Puff Pastry", "Vanilla Diplomat Cream", "Fresh Raspberries", "Raspberry Coulis", "Icing Sugar"], image: signatureMilleFeuille }
            ]
        }
    ],
    indian: [
        {
            type: "Starters",
            dishes: [
                { name: "Galouti Kebab with Saffron Paratha", price: "₹2600", desc: "Impossibly tender Lucknowi lamb patties infused with over 100 spices, served on saffron-laced paratha with mint chutney.", ingredients: ["Minced Lamb", "Saffron", "Raw Papaya", "Kewra Water", "Mint Chutney"], image: indianGalouti },
                { name: "Murgh Malai Kebab", price: "₹2400", desc: "Succulent chicken skewers marinated in triple cream, processed cheese and aromatic garlic, char-grilled in a tandoor.", ingredients: ["Chicken Breast", "Triple Cream", "Processed Cheese", "Garlic", "Green Chili"], image: indianMurghMalai },
                { name: "Tandoori Broccoli with Mint Chutney", price: "₹2000", desc: "Large broccoli florets wrapped in a smoky hung curd marinade, char-grilled in a traditional tandoor until perfectly blistered.", ingredients: ["Broccoli", "Hung Curd", "Carom Seeds", "Chaat Masala", "Lemon"], image: indianBroccoli }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Murgh Makhani (Butter Chicken)", price: "₹3800", desc: "Smoky tandoor chicken in a rich, velvety tomato-fenugreek gravy finished with artisanal cultured butter and cream.", ingredients: ["Chicken", "Tomato Gravy", "Fenugreek", "Artisanal Butter", "Cream"], image: indianButterChicken },
                { name: "Rogan Josh – Kashmiri Lamb Curry", price: "₹4200", desc: "Slow-braised Kashmiri lamb in a deeply aromatic sauce of dried Kashmiri chilies, whole spices and saffron-laced yogurt.", ingredients: ["Kashmiri Lamb", "Kashmiri Chili", "Saffron Yogurt", "Whole Spices", "Fried Onion"], image: indianRoganJosh },
                { name: "Paneer Lababdar", price: "₹3200", desc: "Pillowy cottage cheese cubes bathed in a creamy, slow-cooked tomato and caramelized onion masala with a hint of cardamom.", ingredients: ["Paneer", "Tomato Onion Masala", "Cardamom", "Cashew Paste", "Fresh Cream"], image: indianPaneer }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Shahi Tukda with Rabri", price: "₹1800", desc: "Royal Mughal bread pudding — crispy ghee-fried bread soaked in condensed milk, crowned with saffron rabri, silver leaf and crushed nut soil.", ingredients: ["Brioche", "Rabri", "Saffron", "Silver Leaf", "Pistachio Soil"], image: indianShahiTukda },
                { name: "Rasmalai Pistachio Cream", price: "₹1600", desc: "Feather-light cottage cheese discs poached in saffron milk, dusted with pistachio powder and rose petal dust.", ingredients: ["Chhena", "Saffron Milk", "Pistachio Dust", "Rose Water", "Cardamom"], image: indianRasmalai },
                { name: "Kulfi Falooda", price: "₹1500", desc: "Creamy traditional malai kulfi on a bed of basil seeds and rose-syrup vermicelli, a timeless Indian street dessert elevated.", ingredients: ["Malai Kulfi", "Rose Syrup", "Vermicelli", "Basil Seeds", "Rabri"], image: indianKulfi }
            ]
        }
    ],
    asian: [
        {
            type: "Starters",
            dishes: [
                { name: "Chicken Satay with Peanut Sauce", price: "₹2200", desc: "Marinated coconut-lemongrass chicken skewers grilled over charcoal, served with rich peanut dipping sauce and cucumber relish.", ingredients: ["Chicken Thigh", "Lemongrass", "Coconut Milk", "Peanut Sauce", "Cucumber Relish"], image: asianSatay },
                { name: "Crispy Prawn Tempura", price: "₹2800", desc: "Jumbo tiger prawns in an impossibly light, airy batter, twice-fried for maximum crunch, served with classic tentsuyu dipping sauce.", ingredients: ["Tiger Prawns", "Tempura Batter", "Tentsuyu Sauce", "Daikon Radish", "Ginger"], image: asianTempura },
                { name: "Vegetable Crystal Dim Sum", price: "₹2000", desc: "Hand-pleated translucent rice dumplings filled with a fragrant medley of shiitake mushrooms, water chestnuts and bamboo shoots.", ingredients: ["Rice Flour", "Shiitake Mushroom", "Water Chestnut", "Bamboo Shoots", "Sesame Oil"], image: asianDimSum }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Thai Green Curry Chicken", price: "₹3600", desc: "Aromatic house-made green curry paste simmered in coconut milk with free-range chicken, pea aubergine and fresh kaffir lime leaves.", ingredients: ["Green Curry Paste", "Coconut Milk", "Free-Range Chicken", "Kaffir Lime", "Pea Aubergine"], image: asianGreenCurry },
                { name: "Black Pepper Beef Stir Fry", price: "₹4400", desc: "Wok-charred beef tenderloin tossed in a bold, fragrant black pepper and oyster sauce with crispy garlic and spring onion.", ingredients: ["Beef Tenderloin", "Black Pepper Sauce", "Oyster Sauce", "Garlic", "Spring Onion"], image: asianBeef },
                { name: "Teriyaki Glazed Salmon", price: "₹4200", desc: "Norwegian Atlantic salmon lacquered with a house-made mirin-soy teriyaki glaze, served with steamed bok choy and jasmine rice.", ingredients: ["Norwegian Salmon", "Mirin", "Soy Sauce", "Sake", "Bok Choy"], image: asianSalmon }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Mango Sticky Rice", price: "₹1800", desc: "Glutinous sticky rice cooked in sweet coconut milk, paired with ripe Alphonso mango slices and a drizzle of gold-flecked coconut cream.", ingredients: ["Glutinous Rice", "Coconut Milk", "Alphonso Mango", "Palm Sugar", "Gold Leaf"], image: asianMango },
                { name: "Matcha Cheesecake", price: "₹1600", desc: "Velvety Japanese ceremonial-grade matcha baked cheesecake on a toasted black sesame crust, dusted with matcha snow.", ingredients: ["Ceremonial Matcha", "Cream Cheese", "Black Sesame Crust", "White Chocolate", "Matcha Snow"], image: asianMatcha },
                { name: "Mochi Ice Cream Trio", price: "₹1800", desc: "Three hand-made glutinous rice mochi filled with premium ice cream in vanilla bean, dark chocolate and strawberry yuzu flavours.", ingredients: ["Glutinous Rice", "Vanilla Bean", "Dark Chocolate", "Strawberry Yuzu", "Cornstarch"], image: asianMochi }
            ]
        }
    ],
    mediterranean: [
        {
            type: "Starters",
            dishes: [
                { name: "Burrata with Cherry Tomatoes & Olive Oil", price: "₹2600", desc: "Hand-pulled Pugliese burrata on a bed of roasted and raw cherry tomatoes, finished with Sicilian basil oil, balsamic pearls and warm focaccia.", ingredients: ["Burrata", "Cherry Tomatoes", "Basil Oil", "Balsamic Pearls", "Focaccia"], image: medBurrata },
                { name: "Beef Carpaccio with Parmesan Shavings", price: "₹2800", desc: "Paper-thin wagyu beef, dressed with truffle aioli, peppery arugula, shaved 24-month Parmigiano and a drizzle of cold-pressed extra virgin olive oil.", ingredients: ["Wagyu Beef", "Truffle Aioli", "Arugula", "Parmigiano Reggiano", "Extra Virgin Olive Oil"], image: medCarpaccio },
                { name: "Classic Bruschetta with Tomato & Basil", price: "₹2200", desc: "Toasted sourdough rubbed with garlic, piled high with vine-ripened heirloom tomatoes, fresh basil and a splash of aged balsamic.", ingredients: ["Sourdough", "Heirloom Tomatoes", "Garlic", "Fresh Basil", "Aged Balsamic"], image: medBruschetta }
            ]
        },
        {
            type: "Main Course",
            dishes: [
                { name: "Lobster Ravioli with Cream Sauce", price: "₹4800", desc: "Hand-pulled egg-yolk pasta parcels filled with Atlantic lobster and ricotta, bathed in a rich bisque reduction with fresh tarragon.", ingredients: ["Atlantic Lobster", "Egg Pasta", "Ricotta", "Lobster Bisque", "Tarragon"], image: medRavioli },
                { name: "Truffle Mushroom Risotto", price: "₹3800", desc: "Slow-stirred Carnaroli rice with wild porcini and cremini mushrooms, finished with white truffle oil, aged parmesan and a truffle carpaccio.", ingredients: ["Carnaroli Rice", "Porcini Mushrooms", "White Truffle Oil", "Parmigiano", "Truffle Carpaccio"], image: medRisotto },
                { name: "Grilled Mediterranean Sea Bass", price: "₹5200", desc: "Whole spigola filleted and herb-baked, served over roasted seasonal vegetables with a bright lemon-caper emulsion.", ingredients: ["Mediterranean Sea Bass", "Herbs", "Roasted Vegetables", "Lemon Emulsion", "Capers"], image: medSeaBass }
            ]
        },
        {
            type: "Desserts",
            dishes: [
                { name: "Classic Tiramisu", price: "₹1800", desc: "Savoiardi ladyfingers soaked in double espresso and dark rum, layered with silky Venetian mascarpone and dusted with Valrhona cocoa.", ingredients: ["Mascarpone", "Savoiardi", "Double Espresso", "Dark Rum", "Valrhona Cocoa"], image: medTiramisu },
                { name: "Vanilla Panna Cotta with Berry Compote", price: "₹1600", desc: "Silky vanilla bean panna cotta, set to a perfect trembling wobble, served with warm raspberry and blackberry compote and fresh mint.", ingredients: ["Cream", "Vanilla Bean", "Gelatin", "Raspberry Compote", "Fresh Mint"], image: medPannaCotta },
                { name: "Cannoli with Ricotta Cream", price: "₹1400", desc: "Freshly fried Sicilian pastry shells filled to order with sweet sheeps-milk ricotta cream, dark chocolate chips and candied orange peel.", ingredients: ["Ricotta", "Pastry Shell", "Dark Chocolate", "Candied Orange", "Pistachio Dust"], image: medCannoli }
            ]
        }
    ]
};

const Restaurant = () => {
    const { user } = useAuth();
    const { addToBasket, totalItems } = useBasket();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = React.useState('signature');
    const [selectedDish, setSelectedDish] = React.useState(null);
    const [showAuthPrompt, setShowAuthPrompt] = React.useState(false);
    const [pendingAction, setPendingAction] = React.useState(null); // 'basket' | 'room' | 'reserve'
    const [loadingReserve, setLoadingReserve] = React.useState(false);
    const [flyingDish, setFlyingDish] = React.useState(null);
    const [activeBooking, setActiveBooking] = React.useState(null);

    // Reservation States
    const [reserveDate, setReserveDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [reserveGuests, setReserveGuests] = React.useState('2 People');
    const [reserveTime, setReserveTime] = React.useState('7:00 PM');
    const [showReserveConfirm, setShowReserveConfirm] = React.useState(false);
    const [bookedTable, setBookedTable] = React.useState('');

    const menuRef = React.useRef(null);

    // Guard: if user is not logged in, show auth prompt; otherwise run the action
    const handleAuthAction = (actionType, dish) => {
        if (!user) {
            setPendingAction(actionType);
            setShowAuthPrompt(true);
        } else {
            if (actionType === 'basket') {
                setFlyingDish({
                    image: dish.image,
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                });
                addToBasket(dish);
                setSelectedDish(null);

                // Reset flying dish after animation
                setTimeout(() => setFlyingDish(null), 1000);
            } else if (actionType === 'room') {
                if (activeBooking) {
                    navigate('/room-service-order', { state: { dish: selectedDish, activeBooking } });
                } else {
                    alert("🛎️ Room service is only available for guests with an active booking. Please book a room first.");
                }
            }
        }
    };

    const handleReserveSubmit = async (e) => {
        if (e) e.preventDefault();
        
        if (!user) {
            setPendingAction('reserve');
            setShowAuthPrompt(true);
            return;
        }

        setLoadingReserve(true);
        try {
            const tableNum = Math.floor(Math.random() * 20) + 1;
            const tableStr = `Table ${tableNum}`;
            
            const token = localStorage.getItem('token');
            console.log("🚀 Reservation Payload:", {
                guestName: user.name,
                email: user.email,
                date: reserveDate,
                time: reserveTime,
                guests: reserveGuests,
                tableNumber: tableStr
            });

            const response = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    guestName: user.name,
                    email: user.email,
                    date: reserveDate,
                    time: reserveTime,
                    guests: reserveGuests,
                    tableNumber: tableStr
                })
            });

            const data = await response.json();
            if (data.success) {
                setBookedTable(tableStr);
                setShowReserveConfirm(true);
            } else {
                alert(data.message || "Failed to book table. Please try again.");
            }
        } catch (error) {
            console.error("Reservation error:", error);
            alert("An error occurred. Please check your connection.");
        } finally {
            setLoadingReserve(false);
        }
    };

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

    // Scroll to top on mount and fetch user bookings
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchActiveBooking = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await fetch('http://localhost:5000/api/bookings/my-bookings', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.success && data.bookings.length > 0) {
                        // For simplicity, take the first/latest booking
                        setActiveBooking(data.bookings[0]);
                    }
                } catch (err) {
                    console.error('Error fetching bookings:', err);
                }
            }
        };

        fetchActiveBooking();
    }, [user]);

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
                        <p className="section-subtitle-text">Meticulously curated flavors for a refined palate</p>
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
                            <form className="luxury-mini-form" onSubmit={handleReserveSubmit}>
                                <div className="form-split">
                                    <input
                                        type="date"
                                        className="luxury-input"
                                        value={reserveDate}
                                        onChange={(e) => setReserveDate(e.target.value)}
                                    />
                                    <select
                                        className="luxury-input"
                                        value={reserveGuests}
                                        onChange={(e) => setReserveGuests(e.target.value)}
                                    >
                                        <option>1 Person</option>
                                        <option>2 People</option>
                                        <option>3 People</option>
                                        <option>4 People</option>
                                        <option>5 People</option>
                                        <option>6+ People</option>
                                    </select>
                                </div>
                                <select
                                    className="luxury-input"
                                    value={reserveTime}
                                    onChange={(e) => setReserveTime(e.target.value)}
                                >
                                    <option>7:00 AM</option>
                                    <option>8:00 AM</option>
                                    <option>9:00 AM</option>
                                    <option>10:00 AM</option>
                                    <option>11:00 AM</option>
                                    <option>12:00 PM</option>
                                    <option>1:00 PM</option>
                                    <option>2:00 PM</option>
                                    <option>3:00 PM</option>
                                    <option>4:00 PM</option>
                                    <option>5:00 PM</option>
                                    <option>6:00 PM</option>
                                    <option>7:00 PM</option>
                                    <option>8:00 PM</option>
                                    <option>9:00 PM</option>
                                    <option>10:00 PM</option>
                                    <option>11:00 PM</option>
                                </select>
                                <button type="submit" className="btn btn-primary w-100">Confirm Availability</button>
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

            <Footer email="dining@luxestay.com" />

            {/* Dish Details Modal — Split Panel */}
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
                            initial={{ y: 60, opacity: 0, scale: 0.93 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 30, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* ── Close Button ── */}
                            <button className="modal-close-btn" onClick={() => setSelectedDish(null)}>×</button>

                            <div className="modal-split-body">
                                {/* ── LEFT: Image + Price ── */}
                                <div className="modal-left-panel">
                                    <img src={selectedDish.image} alt={selectedDish.name} className="modal-dish-img" />
                                    <div className="modal-price-chip">{selectedDish.price}</div>
                                    <div className="modal-left-glow" />
                                </div>

                                {/* ── RIGHT: Info ── */}
                                <div className="modal-right-panel">
                                    <div className="modal-right-inner">
                                        <p className="modal-cuisine-tag">Chef's Selection</p>
                                        <h3 className="modal-dish-name">{selectedDish.name}</h3>
                                        <div className="modal-gold-bar" />

                                        <p className="modal-desc-text">{selectedDish.desc}</p>

                                        {selectedDish.ingredients && selectedDish.ingredients.length > 0 && (
                                            <div className="modal-ingredients-block">
                                                <p className="modal-ingredients-label">Key Ingredients</p>
                                                <div className="modal-ingredients-tags">
                                                    {selectedDish.ingredients.map((ing, i) => (
                                                        <span key={i} className="ingredient-tag">{ing}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* ── Bottom Actions ── */}
                                    <div className="modal-actions-row">
                                        <button
                                            className="modal-action-btn modal-action-basket"
                                            onClick={() => handleAuthAction('basket', selectedDish)}
                                        >
                                            <span className="modal-btn-icon">🛒</span>
                                            Add to Basket
                                        </button>
                                        <button
                                            className="modal-action-btn modal-action-room"
                                            onClick={() => handleAuthAction('room', selectedDish)}
                                        >
                                            <span className="modal-btn-icon"><Utensils size={16} /></span>
                                            Room Service
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



            {/* ─── Auth Prompt Modal ─── */}
            <AnimatePresence>
                {showAuthPrompt && (
                    <motion.div
                        className="auth-prompt-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAuthPrompt(false)}
                    >
                        <motion.div
                            className="auth-prompt-box"
                            initial={{ scale: 0.88, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="auth-prompt-close" onClick={() => setShowAuthPrompt(false)}>×</button>

                            <div className="auth-prompt-icon">
                                {pendingAction === 'basket' ? '🛒' : '🛎️'}
                            </div>

                            <h3 className="auth-prompt-title">
                                {pendingAction === 'basket' ? 'Add to Basket' : 'Room Service'}
                            </h3>
                            <div className="auth-prompt-gold-bar" />

                            <p className="auth-prompt-msg">
                                Please <strong>log in</strong> or <strong>create an account</strong> to
                                {pendingAction === 'basket' ? ' add items to your basket.' : 
                                 pendingAction === 'reserve' ? ' make a table reservation.' : ' request room service.'}
                            </p>

                            <div className="auth-prompt-actions">
                                <button
                                    className="auth-btn auth-btn-primary"
                                    onClick={() => { setShowAuthPrompt(false); navigate('/login'); }}
                                >
                                    Login
                                </button>
                                <button
                                    className="auth-btn auth-btn-outline"
                                    onClick={() => { setShowAuthPrompt(false); navigate('/register'); }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Table Reservation Confirmation Modal ─── */}
            <AnimatePresence>
                {showReserveConfirm && (
                    <motion.div
                        className="auth-prompt-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowReserveConfirm(false)}
                    >
                        <motion.div
                            className="auth-prompt-box"
                            initial={{ scale: 0.88, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="auth-prompt-close" onClick={() => setShowReserveConfirm(false)}>×</button>

                            <div className="auth-prompt-icon">🍽️</div>

                            <h3 className="auth-prompt-title">Table Reserved!</h3>
                            <div className="auth-prompt-gold-bar" />

                            <div className="confirm-details text-center">
                                <p className="text-gold font-bold" style={{ color: '#d4af37', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{bookedTable}</p>
                                <div className="card-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />

                                <div className="reservation-summary" style={{ padding: '0 1rem', textAlign: 'left' }}>
                                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Date:</span>
                                        <span style={{ color: '#fff', fontWeight: '600' }}>{reserveDate}</span>
                                    </div>
                                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Time:</span>
                                        <span style={{ color: '#fff', fontWeight: '600' }}>{reserveTime}</span>
                                    </div>
                                    <div className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>Party:</span>
                                        <span style={{ color: '#fff', fontWeight: '600' }}>{reserveGuests}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="auth-prompt-actions" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <button
                                    className="auth-btn auth-btn-primary"
                                    onClick={() => setShowReserveConfirm(false)}
                                    style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}
                                >
                                    Great, See You Then!
                                </button>
                                <button
                                    className="auth-btn auth-btn-outline"
                                    onClick={() => {
                                        setShowReserveConfirm(false);
                                        navigate('/my-reservations');
                                    }}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}
                                >
                                    View My Reservations
                                </button>
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

                .section-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .section-title {
                    font-size: clamp(2.2rem, 5vw, 4rem);
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                }

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

                /* ─── MODAL STYLES (Split Panel) ─── */
                .dish-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.88);
                    backdrop-filter: blur(12px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .dish-modal-content {
                    background: #0d1526;
                    border: 1px solid rgba(212, 175, 55, 0.25);
                    border-radius: 24px;
                    width: 100%;
                    max-width: 880px;
                    max-height: 90vh;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,175,55,0.08);
                    display: flex;
                    flex-direction: column;
                }

                /* ── Close ── */
                .modal-close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.6);
                    border: 1px solid rgba(255,255,255,0.15);
                    color: white;
                    font-size: 1.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 20;
                    transition: all 0.3s ease;
                    line-height: 1;
                }
                .modal-close-btn:hover {
                    background: #d4af37;
                    color: #000;
                    border-color: #d4af37;
                    transform: rotate(90deg);
                }

                /* ── Split Body ── */
                .modal-split-body {
                    display: grid;
                    grid-template-columns: 420px 1fr;
                    min-height: 520px;
                    max-height: 88vh;
                }

                /* ── Left Panel ── */
                .modal-left-panel {
                    position: relative;
                    overflow: hidden;
                    border-radius: 24px 0 0 24px;
                }
                .modal-dish-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.6s ease;
                }
                .dish-modal-content:hover .modal-dish-img {
                    transform: scale(1.04);
                }
                .modal-left-glow {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to right, transparent 60%, #0d1526 100%);
                    pointer-events: none;
                }
                .modal-price-chip {
                    position: absolute;
                    bottom: 1.5rem;
                    left: 1.5rem;
                    background: #d4af37;
                    color: #000;
                    font-weight: 900;
                    font-size: 1.4rem;
                    padding: 0.5rem 1.5rem;
                    border-radius: 50px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                    letter-spacing: 0.03em;
                    z-index: 5;
                }

                /* ── Right Panel ── */
                .modal-right-panel {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 2.5rem 2rem 2rem;
                    overflow-y: auto;
                }
                .modal-right-inner {
                    flex: 1;
                }
                .modal-cuisine-tag {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.25em;
                    color: #d4af37;
                    margin-bottom: 0.75rem;
                    opacity: 0.85;
                }
                .modal-dish-name {
                    font-family: 'Algerian', serif;
                    font-size: clamp(1.3rem, 2.5vw, 1.9rem);
                    color: #fff;
                    line-height: 1.25;
                    margin-bottom: 1rem;
                }
                .modal-gold-bar {
                    width: 48px;
                    height: 3px;
                    background: linear-gradient(to right, #d4af37, rgba(212,175,55,0.2));
                    border-radius: 2px;
                    margin-bottom: 1.25rem;
                }
                .modal-desc-text {
                    color: #94a3b8;
                    font-size: 0.97rem;
                    line-height: 1.75;
                    margin-bottom: 1.75rem;
                }

                /* ── Ingredients ── */
                .modal-ingredients-block {
                    margin-bottom: 1.5rem;
                }
                .modal-ingredients-label {
                    font-size: 0.72rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 0.75rem;
                }
                .modal-ingredients-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .ingredient-tag {
                    background: rgba(212, 175, 55, 0.08);
                    border: 1px solid rgba(212, 175, 55, 0.22);
                    color: #d4af37;
                    font-size: 0.78rem;
                    font-weight: 600;
                    padding: 0.3rem 0.85rem;
                    border-radius: 50px;
                    letter-spacing: 0.04em;
                    transition: background 0.2s;
                }
                .ingredient-tag:hover {
                    background: rgba(212, 175, 55, 0.18);
                }

                /* ── Action Buttons ── */
                .modal-actions-row {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    margin-top: 1rem;
                }
                .modal-action-btn {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.85rem 1.25rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    border: 2px solid transparent;
                    letter-spacing: 0.03em;
                }
                .modal-btn-icon {
                    display: flex;
                    align-items: center;
                    font-size: 1rem;
                }
                .modal-action-basket {
                    background: #d4af37;
                    color: #000;
                    border-color: #d4af37;
                }
                .modal-action-basket:hover {
                    background: #e8c84a;
                    border-color: #e8c84a;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212,175,55,0.35);
                }
                .modal-action-room {
                    background: transparent;
                    color: #d4af37;
                    border-color: rgba(212,175,55,0.4);
                }
                .modal-action-room:hover {
                    background: rgba(212,175,55,0.1);
                    border-color: #d4af37;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212,175,55,0.15);
                }

                @media (max-width: 768px) {
                    .menu-image-grid { grid-template-columns: 1fr; }
                    .dish-image-container { height: 220px; }
                    .premium-category-label { font-size: 1.75rem; }
                    .modal-split-body {
                        grid-template-columns: 1fr;
                        grid-template-rows: 260px auto;
                    }
                    .modal-left-panel { border-radius: 24px 24px 0 0; }
                    .modal-left-glow { background: linear-gradient(to bottom, transparent 50%, #0d1526 100%); }
                    .modal-right-panel { padding: 1.5rem 1.5rem 1.5rem; }
                    .modal-actions-row { flex-direction: column; }
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

                /* ─── AUTH PROMPT MODAL ─── */
                .auth-prompt-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.82);
                    backdrop-filter: blur(14px);
                    z-index: 1100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                }

                .auth-prompt-box {
                    background: linear-gradient(145deg, #0d1526, #111e35);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 24px;
                    padding: 3rem 2.5rem 2.5rem;
                    max-width: 420px;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.06);
                }

                .auth-prompt-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.12);
                    color: #fff;
                    font-size: 1.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s;
                    line-height: 1;
                }
                .auth-prompt-close:hover {
                    background: #d4af37;
                    color: #000;
                    border-color: #d4af37;
                    transform: rotate(90deg);
                }

                .auth-prompt-icon {
                    font-size: 2.8rem;
                    margin-bottom: 1.25rem;
                    line-height: 1;
                }

                .auth-prompt-title {
                    font-family: 'Algerian', serif;
                    font-size: 1.8rem;
                    color: #fff;
                    margin-bottom: 0.75rem;
                    letter-spacing: 0.04em;
                }

                .auth-prompt-gold-bar {
                    width: 44px;
                    height: 3px;
                    background: linear-gradient(to right, #d4af37, rgba(212,175,55,0.15));
                    border-radius: 2px;
                    margin: 0 auto 1.5rem;
                }

                .auth-prompt-msg {
                    color: #94a3b8;
                    font-size: 0.97rem;
                    line-height: 1.7;
                    margin-bottom: 2rem;
                }
                .auth-prompt-msg strong {
                    color: #d4af37;
                    font-weight: 700;
                }

                .auth-prompt-actions {
                    display: flex;
                    gap: 1rem;
                }

                .auth-btn {
                    flex: 1;
                    padding: 0.85rem 1rem;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    letter-spacing: 0.04em;
                }

                .auth-btn-primary {
                    background: #d4af37;
                    color: #000;
                    border: 2px solid #d4af37;
                }
                .auth-btn-primary:hover {
                    background: #e8c84a;
                    border-color: #e8c84a;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212,175,55,0.35);
                }

                .auth-btn-outline {
                    background: transparent;
                    color: #d4af37;
                    border: 2px solid rgba(212,175,55,0.4);
                }
                .auth-btn-outline:hover {
                    background: rgba(212,175,55,0.1);
                    border-color: #d4af37;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212,175,55,0.12);
                }

                @media (max-width: 480px) {
                    .auth-prompt-box { padding: 2.5rem 1.75rem 2rem; }
                    .auth-prompt-actions { flex-direction: column; }
                }

                .floating-basket-fab {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: var(--primary);
                    color: #000;
                    padding: 0.8rem 1.5rem;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    cursor: pointer;
                    z-index: 1000;
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
                    border: 1px solid rgba(0,0,0,0.1);
                    font-family: 'Poppins', sans-serif;
                }

                .fab-icon-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .fab-badge {
                    position: absolute;
                    top: -8px;
                    right: -10px;
                    background: #fff;
                    color: #000;
                    font-size: 0.7rem;
                    font-weight: 800;
                    min-width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }

                .fab-label {
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .flying-dish-ghost {
                    position: fixed;
                    width: 100px;
                    height: 100px;
                    z-index: 9999;
                    pointer-events: none;
                }

                .flying-dish-ghost img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                    border: 2px solid var(--primary);
                }

                @media (max-width: 768px) {
                    .floating-basket-fab {
                        bottom: 1.5rem;
                        right: 1.5rem;
                        padding: 0.8rem;
                    }
                    .fab-label { display: none; }
                }
            `}</style>

            {/* ─── Floating Basket FAB ─── */}
            <AnimatePresence>
                {totalItems > 0 && (
                    <motion.div
                        className="floating-basket-fab"
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 50 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/my-basket')}
                    >
                        <div className="fab-icon-wrapper">
                            <ShoppingBasket size={24} />
                            <span className="fab-badge">{totalItems}</span>
                        </div>
                        <span className="fab-label">My Basket</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Flying Dish Animation ─── */}
            <AnimatePresence>
                {flyingDish && (
                    <motion.div
                        className="flying-dish-ghost"
                        initial={{
                            x: flyingDish.x - 50,
                            y: flyingDish.y - 50,
                            scale: 1,
                            opacity: 1
                        }}
                        animate={{
                            x: window.innerWidth - 100,
                            y: window.innerHeight - 100,
                            scale: 0.1,
                            opacity: 0.5
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <img src={flyingDish.image} alt="flying" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Restaurant;
