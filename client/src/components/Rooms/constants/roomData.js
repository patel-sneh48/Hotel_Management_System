// Shared Room Category Data
// Centralized pricing and details for the hotel's static room categories

import singleClaHome from '../../../assets/photo/single cla/home.jpeg';
import singleCla2 from '../../../assets/photo/single cla/2.jpeg';
import singleCla3 from '../../../assets/photo/single cla/3.jpeg';
import singleClaBed from '../../../assets/photo/single cla/bed.jpeg';

import doubleClaHome from '../../../assets/photo/double cla/home.jpeg';
import doubleCla4 from '../../../assets/photo/double cla/4.jpeg';
import doubleCla5 from '../../../assets/photo/double cla/5.jpeg';
import doubleCla6 from '../../../assets/photo/double cla/6.jpeg';

import singlePreHome from '../../../assets/photo/single pre/home.jpeg';
import singlePre1 from '../../../assets/photo/single pre/WhatsApp Image 2026-02-09 at 1.18.26 PM.jpeg';
import singlePre2 from '../../../assets/photo/single pre/WhatsApp Image 2026-02-09 at 1.18.26 PM (1).jpeg';
import singlePre3 from '../../../assets/photo/single pre/WhatsApp Image 2026-02-09 at 1.18.26 PM (2).jpeg';

import doublePreHome from '../../../assets/photo/double pre/home.jpeg';
import doublePre1 from '../../../assets/photo/double pre/WhatsApp Image 2026-02-09 at 1.18.27 PM (1).jpeg';
import doublePre2 from '../../../assets/photo/double pre/WhatsApp Image 2026-02-09 at 1.18.27 PM (2).jpeg';
import doublePre3 from '../../../assets/photo/double pre/WhatsApp Image 2026-02-09 at 1.18.28 PM.jpeg';

export const ROOM_CATEGORIES = {
    'single-cla': {
        _id: 'static-single-classic',
        slug: 'single-cla',
        title: 'Classic Single Bedroom',
        subtitle: 'Timeless Comfort for the Solo Traveler',
        price: 15000, // Consistent Price
        description: 'Step into understated luxury with our Single Classic Room — a handcrafted retreat designed for the discerning solo traveler. The room is anchored by a plush queen-size bed dressed in 400-thread-count Egyptian cotton linens, ensuring a restorative night\'s sleep.',
        images: [singleClaHome, singleCla2, singleCla3, singleClaBed],
        imageDescriptions: [
            'The sun-drenched main suite — warm ambient lighting, neutral tones, and a welcoming classic aesthetic set the scene from the moment you arrive',
            'A carefully styled living corner with plush seating, layered textures, and natural light that makes the room feel open and airy',
            'The dedicated work and relaxation zone — an ergonomic desk, soft reading lamp, and calming décor perfect for focused productivity or a quiet evening in',
            'The centrepiece queen-size bed dressed in crisp Egyptian cotton linens, stacked with premium pillows for the ultimate night\'s rest'
        ],
        features: ['300 sq ft', '1 Adult', 'Queen Bed', 'City View'],
        amenities: ['1 King Bed', 'Free WiFi', 'City View', 'Air Conditioning', 'Flat-Screen TV', 'Mini Bar', 'Room Service', 'Daily Housekeeping', 'In-Room Safe', 'Hair Dryer', 'Rain Shower', 'Premium Toiletries', 'Tea & Coffee Station', 'Blackout Curtains']
    },
    'double-cla': {
        _id: 'static-double-classic',
        slug: 'double-cla',
        title: 'Classic Double Bedroom',
        subtitle: 'Spacious Elegance for Couples & Families',
        price: 28000, // Consistent Price
        description: 'Our Double Classic Room is a masterclass in spacious, timeless hospitality — a haven designed for couples seeking romance, families longing for comfort, or travellers who simply refuse to compromise on space.',
        images: [doubleClaHome, doubleCla4, doubleCla5, doubleCla6],
        imageDescriptions: [
            'The welcoming main suite — rich wood accents, warm amber lighting, and a generous layout that immediately puts you at ease',
            'Elegant interior design in full detail — from the handpicked furnishings to the softly lit alcoves, every corner is crafted for comfort',
            'The relaxed sitting area with plush sofa seating — a perfect spot for a leisurely breakfast, evening read, or a quiet family moment',
            'A further look at the classic interior styling — neutral tones, layered textures, and curated décor elements that make the space feel truly like a home away from home'
        ],
        features: ['500 sq ft', 'Up to 3 Guests', 'King or Twin Queen', 'Garden View', 'Sitting Area'],
        amenities: ['2 Queen Beds', 'Mini Bar', 'Garden View', 'HD Smart TV', 'Free WiFi', 'Air Conditioning', 'Room Service', 'Daily Housekeeping', 'Extra Pillows & Blankets', 'In-Room Safe', 'Iron & Board', 'Complimentary Breakfast', 'Walk-in Shower', 'Deep-Soak Bathtub', 'Premium Toiletries', 'Plush Bathrobe & Slippers']
    },
    'single-pre': {
        _id: 'static-single-premium',
        slug: 'single-pre',
        title: 'Premium Single Bedroom',
        subtitle: 'Elevated Luxury for the Discerning Guest',
        price: 35000, // Consistent Price
        description: 'An ultra-luxurious sanctuary for the discerning solo traveler, offering unparalleled comfort, panoramic city views, and exclusive personalized services in a sophisticated setting.',
        images: [singlePreHome, singlePre1, singlePre2, singlePre3],
        imageDescriptions: [
            'Stunning premium room with contemporary design and panoramic views',
            'Elegant living space with modern furnishings and ambient lighting',
            'Luxurious bathroom with marble finishes and premium fixtures',
            'Relaxation corner with premium seating and scenic balcony access'
        ],
        features: ['400 sq ft', '1 Adult', 'King Bed', 'Panoramic View', 'Balcony'],
        amenities: ['1 King Bed', 'City View', 'Private Balcony', 'Butler Service', 'High-Speed WiFi', 'Climate Control', '55" Smart TV', 'Nespresso Machine', 'Rain Shower', 'Premium Toiletries', 'Bathrobe & Slippers', 'Turn-Down Service']
    },
    'double-pre': {
        _id: 'static-double-premium',
        slug: 'double-pre',
        title: 'Premium Double Bedroom',
        subtitle: 'The Ultimate Luxury Experience',
        price: 55000, // Consistent Price
        description: 'Experience the height of sophistication in our spacious double suites, featuring designer furnishings, expansive living areas, and state-of-the-art amenities for a truly elite stay.',
        images: [doublePreHome, doublePre1, doublePre2, doublePre3],
        imageDescriptions: [
            'The grand suite entrance — soaring ceilings, designer accents, and panoramic views that redefine what a hotel room can be',
            'The sun-filled master bedroom featuring an oversized king-size bed, layered premium linens, and bespoke mood lighting for total relaxation',
            'The private living parlour — plush designer seating, curated art pieces, and ambient lighting create a space as beautiful as it is comfortable',
            'A twilight view from the suite\'s private vantage point — the city lights stretch to the horizon, yours to enjoy from the comfort of your own retreat'
        ],
        features: ['650 sq ft', 'Up to 4 Guests', 'King Bed + Sofa Bed', 'Panoramic View', 'Private Jacuzzi'],
        amenities: ['2 King Beds', 'Ocean View', 'Living Area', 'Jacuzzi Bath', 'Premium WiFi', 'Smart Climate Control', '65" Smart TV', 'Nespresso & Tea Station', 'Rainfall Shower', 'Freestanding Soaking Tub', 'Dual Marble Vanities', 'Molton Brown Toiletries', 'Personal Concierge', 'Club Lounge Access', 'Turn-Down Service', 'Complimentary Breakfast']
    }
};

export const getRoomsByCategory = (category) => {
    if (category === 'classic') {
        return [ROOM_CATEGORIES['single-cla'], ROOM_CATEGORIES['double-cla']];
    }
    if (category === 'premium') {
        return [ROOM_CATEGORIES['single-pre'], ROOM_CATEGORIES['double-pre']];
    }
    return [];
};
