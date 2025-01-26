import { ReservationData } from '@/domain/entities/reservation';
import { StaffService } from '@/domain/services/staffService';

export const getAllStaff = async (): Promise<ReservationData[]> => {
    const staffService = new StaffService();
    return await staffService.getAllStaff();
};
