import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const RoomCard = ({ room }) => {
    return (
        <div className="room-card animate-fade-in">
            <div className="room-card-image-box">
                <img src={room.imageUrl} alt={room.title} className="room-card-image" />
                <div className="room-card-overlay">
                    <span className="room-card-price">${room.price}<span>/night</span></span>
                </div>
            </div>

            <div className="room-card-info">
                <h3 className="room-card-title">{room.title}</h3>

                <div className="room-card-meta">
                    <div className="meta-item">
                        <User size={16} />
                        <span>Up to {room.maxGuests} Guests</span>
                    </div>
                </div>

                <p className="room-card-description">{room.description}</p>

                <div className="room-card-footer">
                    <Link to={`/rooms/${room._id}`} className="btn btn-outline btn-full">
                        View Details
                    </Link>
                </div>
            </div>

            <style>{`
                .room-card {
                    background: var(--bg-card);
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid var(--glass-border);
                    transition: var(--transition-normal);
                    display: flex;
                    flex-direction: column;
                }

                .room-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--primary);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
                }

                .room-card-image-box {
                    position: relative;
                    height: 240px;
                    overflow: hidden;
                }

                .room-card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: var(--transition-slow);
                }

                .room-card:hover .room-card-image {
                    transform: scale(1.1);
                }

                .room-card-overlay {
                    position: absolute;
                    bottom: 1rem;
                    right: 1rem;
                    background: var(--primary);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    box-shadow: var(--shadow-md);
                    z-index: 2;
                }

                .room-card-price {
                    font-weight: 700;
                    color: #000;
                }

                .room-card-price span {
                    font-size: 0.8rem;
                    opacity: 0.8;
                    font-weight: 400;
                }

                .room-card-info {
                    padding: 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .room-card-title {
                    margin-bottom: 0.75rem;
                    font-size: 1.5rem;
                    color: var(--text-main);
                }

                .room-card-meta {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                }

                .room-card-description {
                    color: var(--text-dim);
                    font-size: 0.95rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .room-card-footer {
                    margin-top: auto;
                }

                .btn-full {
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default RoomCard;
