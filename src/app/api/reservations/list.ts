import { ReservationData as Reservation } from "@/domain/entities/reservation";
import apiClient from "@/utils/apiClient";



export const getReservations = async (): Promise<Reservation[]> => {
    const response = await apiClient.get('/reservations');
    return response.data;
};

export const createReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
    const response = await apiClient.post('/reservations', reservation);
    return response.data;
};
