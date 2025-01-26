import { ReservationData as Reservation } from "@/domain/entities/reservation";
import apiClient from '../../utils/apiClient';

export const StaffsRepository = {
  async getAllStaff(): Promise<Reservation[]> {
    try {
      const response = await apiClient.get('/users/allStaff');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
