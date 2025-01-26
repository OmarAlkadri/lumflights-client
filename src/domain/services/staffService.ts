import { StaffsRepository } from '../../infrastructure/repositories/StaffsRepository';
import { ReservationData as Reservation } from "@/domain/entities/reservation";

export class StaffService {
    async getAllStaff(): Promise<Reservation[]> {
        try {
            return await StaffsRepository.getAllStaff();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
