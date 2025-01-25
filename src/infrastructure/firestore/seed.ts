import { getReservations } from "../../application/usecases/getReservations";

export function seedFirestore() {
    const reservations = getReservations();
    console.log("Seeding Firestore with reservations:", reservations);
}
