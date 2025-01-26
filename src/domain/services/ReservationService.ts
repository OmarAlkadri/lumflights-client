import { ReservationRepository } from '../../infrastructure/repositories/IReservationService';
import { ReservationData as Reservation } from "@/domain/entities/reservation";

export class ReservationService {
    async getAllReservations(): Promise<Reservation[]> {
        try {
            return await ReservationRepository.getReservations();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addReservation(reservation: Omit<Reservation, 'id'>): Promise<Reservation> {
        return await ReservationRepository.createReservation(reservation);
    }

    async getAllPaginatedReservations(page: number, limit: number): Promise<{ data: Reservation[]; total: number }> {
        try {
            return await ReservationRepository.getPaginatedReservations(page, limit);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getReservationsByDateRange(
        page: number,
        limit: number,
        startDate?: Date | null,
        endDate?: Date | null,
    ): Promise<{ data: Reservation[]; total: number }> {
        try {
            return await ReservationRepository.getReservationsByDateRange(page, limit, startDate, endDate);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
