import { Comments, Suggestion, TourismDetail } from "@/domain/entities/reservation";
import React from "react";

interface ReservationDetails {
    comments: Comments;
    formattedSuggestions: Suggestion[];
    tourismDetails: TourismDetail[];
}

interface Props {
    reservations: ReservationDetails[];
}

const ReservationList: React.FC<Props> = ({ reservations }) => {
    return (
        <ul>
            {reservations.map((reservation, index) => (
                <React.Fragment key={index}>
                    {reservation.formattedSuggestions.length > 0 && (
                        <li key={`${index}-suggestions`} className="mb-5 ms-6">
                            <span className="absolute -left-14 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                <svg className="w-11 h-11 r-8 object-contain rounded-full" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                    <rect width="512" height="512" fill="none" />
                                    <path fill="currentColor" fillRule="evenodd" d="M384 128v256H128V128zm-148.25 64h-24.932l-47.334 128h22.493l8.936-25.023h56.662L260.32 320h23.847zm88.344 0h-22.402v128h22.402zm-101 21.475l22.315 63.858h-44.274zM405.335 320H448v42.667h-42.667zm-256 85.333H192V448h-42.667zm85.333 0h42.666V448h-42.666zM149.333 64H192v42.667h-42.667zM320 405.333h42.667V448H320zM234.667 64h42.666v42.667h-42.666zM320 64h42.667v42.667H320zm85.333 170.667H448v42.666h-42.667zM64 320h42.667v42.667H64zm341.333-170.667H448V192h-42.667zM64 234.667h42.667v42.666H64zm0-85.334h42.667V192H64z" />
                                </svg>
                            </span>
                            <strong className="text-gray-500 dark:text-gray-100 ">Suggestions:</strong>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                                    {reservation.formattedSuggestions.map((item) => (
                                        <p key={item.id}>{item.text}</p>
                                    ))}
                                </div>
                            </div>
                        </li>
                    )}

                    {reservation.tourismDetails.length > 0 && (
                        <li key={`${index}-tourism-details`} className="mb-5 ms-6">
                            <strong className="text-gray-500 dark:text-gray-300">Tourism Details:</strong>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                                    {reservation.tourismDetails.map((item) => (
                                        <p key={item.id}>{item.detail}</p>
                                    ))}
                                </div>
                            </div>
                        </li>
                    )}

                    {Object.keys(reservation.comments).length > 0 && (
                        <li key={`${index}-comments`} className="mb-5 ms-6">
                            <strong className="text-gray-500 dark:text-gray-300">Comments:</strong>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                                    {Object.keys(reservation.comments).map((key) => (
                                        <div key={key}>
                                            <h4 className="text-gray-600 capitalize">{key}:</h4>
                                            {reservation.comments[key].length > 0 ? (
                                                reservation.comments[key].map((comment, i) => (
                                                    <p key={i}>{comment.text}</p>
                                                ))
                                            ) : (
                                                <p className="italic text-gray-400">
                                                    No comments available.
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default ReservationList;



