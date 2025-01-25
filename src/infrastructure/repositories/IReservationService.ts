import { Reservation } from '@/domain/entities/reservation';
import apiClient from '../../utils/apiClient';

export const ReservationRepository = {
  async getReservations(): Promise<Reservation[]> {
    try {
      const response = await apiClient.get('/reservations/aggregated');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createReservation(reservation: Omit<Reservation, 'id'>): Promise<Reservation> {
    const response = await apiClient.post('/reservations', reservation);
    return response.data;
  },

  async getPaginatedReservations(page: number, limit: number): Promise<{ data: Reservation[]; total: number }> {
    try {
      const response = await apiClient.get(`/reservations`, {
        params: {
          page,
          limit,
        },
      });
      return {
        data: response.data.data,
        total: response.data.total,
      };
    } catch (error) {
      throw error;
    }
  },

  async getReservationsByDateRange(
    page: number,
    limit: number,
    startDate?: Date | null,
    endDate?: Date | null,
  ): Promise<{ data: Reservation[]; total: number }> {
    try {
      const response = await apiClient.get(`/reservations`, {
        params: {
          startDate,
          endDate,
          page,
          limit,
        },
      });
      return {
        data: response.data.data,
        total: response.data.total,
      };
    } catch (error) {
      throw error;
    }
  },
};
