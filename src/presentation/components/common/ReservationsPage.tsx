import React, { useState, useEffect } from "react";
import apiClient from "@/utils/apiClient";
import Loader from "@/presentation/components/common/Loader";
import ReservationList from "./ReservationLis";
import { Comment, ReservationData, ReservationDetails, } from "@/domain/entities/reservation";


interface ReservationsPageProps {
    data: ReservationData | undefined;
}

const ReservationsPage: React.FC<ReservationsPageProps> = ({ data }) => {
    const [reservations, setReservations] = useState<ReservationDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                const response = await apiClient.post<ReservationData>(`reservations/suggestion/${data?.id}`);
                const details = getReservationDetails(response.data);
                setReservations([{
                    comments: details.comments,
                    formattedSuggestions: details.formattedSuggestions,
                    tourismDetails: details.tourismDetails,
                }]);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setLoading(false);
            }
        };

        if (data?.id) {
            fetchReservations();
        }
    }, [data?.id]);

    const getReservationDetails = (reservationData: ReservationData): ReservationDetails => {
        const suggestions = reservationData.suggestion.split('\n\n').map((section: string, index: number) => ({
            id: index + 1,
            text: section.trim(),
        }));

        const tourismDetails = reservationData.tourism.map((item: string, index: number) => ({
            id: index + 1,
            detail: item,
        }));

        const comments = {
            oneStar: reservationData.comments.oneStar || [],
            twoStars: reservationData.comments.twoStars || [],
            threeStars: reservationData.comments.threeStars.map((comment: Comment) => ({
                ...comment,
                timestamp: new Date().toISOString(),
            })),
            fourStars: reservationData.comments.fourStars || [],
            fiveStars: reservationData.comments.fiveStars || [],
        };

        return {
            formattedSuggestions: suggestions,
            tourismDetails,
            comments,
        };
    };

    return (
        <Loader loaded={!loading} onlySpinner={false}>
            <div className="w-full px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-center items-start gap-8 flex">
                        <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                            <h1 className="font-manrope text-gray-400 text-4xl font-bold leading-10 relative left-0">Reservations</h1>
                            <hr className="w-28 h-1 bg-black border-0 rounded dark:bg-gray-700" />
                        </div>
                        <div className="flex lg:flex-row w-full flex-col">
                            <div className="reservations px-4 md:px-5 lg:px-5 mx-auto h-full w-full max-w-[600px]">
                                <div className="relative right-4">Reservations Suggestions</div>
                                <ol className="relative top-4 border-s border-gray-200 border-dashed dark:border-gray-700">
                                    {reservations.length > 0 ? (
                                        <ReservationList reservations={reservations} />
                                    ) : (
                                        <li className="text-gray-500 italic">No reservations available.</li>
                                    )}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Loader>
    );
};

export default ReservationsPage;