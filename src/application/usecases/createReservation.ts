import { ReservationService } from '@/domain/services/ReservationService';
import { ReservationData as Reservation } from "@/domain/entities/reservation";

export const createReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
    const reservationService = new ReservationService();
    return await reservationService.addReservation(reservation);
};
