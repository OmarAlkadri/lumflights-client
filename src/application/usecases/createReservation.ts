import { ReservationService } from '@/domain/services/ReservationService';
import { Reservation } from '@/domain/entities/reservation';

export const createReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
    const reservationService = new ReservationService();
    return await reservationService.addReservation(reservation);
};
