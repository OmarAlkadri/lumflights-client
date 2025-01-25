import { Reservation } from "@/domain/entities/reservation";
import apiClient from "@/utils/apiClient";



// الدالة لجلب الحجوزات
export const getReservations = async (): Promise<Reservation[]> => {
    const response = await apiClient.ge'/reservations');
    return response.data;
};

// يمكن إضافة دالة لإنشاء الحجز هنا أيضاً
export const createReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation> => {
    const response = await apiClient.pos'/reservations', reservation);
    return response.data;
};
