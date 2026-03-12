import { useState, useEffect } from 'react';
import { roomService } from '../services/api';

export const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const data = await roomService.getAllRooms();
                setRooms(data);
            } catch (err) {
                console.error('Error fetching rooms:', err);
                setError(err.message || 'Failed to fetch rooms');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    return { rooms, loading, error };
};

export const useRoom = (id) => {
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchRoom = async () => {
            try {
                setLoading(true);
                const data = await roomService.getRoomById(id);
                setRoom(data);
            } catch (err) {
                console.error(`Error fetching room ${id}:`, err);
                setError(err.message || 'Failed to fetch room details');
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id]);

    return { room, loading, error };
};
