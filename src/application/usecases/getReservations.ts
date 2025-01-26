import { ReservationService } from '@/domain/services/ReservationService';
import { ReservationData as Reservation } from "@/domain/entities/reservation";

export const getReservations = async (): Promise<Reservation[]> => {
    const reservationService = new ReservationService();
    return await reservationService.getAllReservations();
};

export const getAllPaginatedReservations = async (
    page: number,
    limit: number
): Promise<{ data: Reservation[]; total: number }> => {
    const reservationService = new ReservationService();
    return await reservationService.getAllPaginatedReservations(page, limit);
};

export const getReservationsByDateRange = async (
    page: number,
    limit: number,
    startDate?: Date | null,
    endDate?: Date | null,
): Promise<{ data: Reservation[]; total: number }> => {
    const reservationService = new ReservationService();
    return await reservationService.getReservationsByDateRange(page, limit, startDate, endDate);
};
