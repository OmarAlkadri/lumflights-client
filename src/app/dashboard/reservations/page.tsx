"use client";
import React from "react";
import { useForm } from "react-hook-form";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";

interface RegisterFormData {
    flightCompaniName: string;
    flightNumber: string;
    date: string;
    reservationDate: string;
    customerName: string;
    customerEmail: string;
    seatsBooked: string;
    fromWhereLocation: string;
    flightId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phone: string;
    registrationNumber: string;
    password: string;
}

const Reservations = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>();
    const router = useRouter();
    const onSubmit = async (data: RegisterFormData) => {
        const reservation = {
            flightId: data.flightId,
            fromWhereLocation: data.fromWhereLocation,
            flightCompaniName: data.flightCompaniName,
            flightNumber: data.flightNumber,
            date: data.date,
            reservationDate: data.reservationDate,
            customers: [
                {
                    name: data.customerName,
                    email: data.customerEmail,
                },
            ],
            seatsBooked: data.seatsBooked,
            status: "pending",
        };

        try {
            await apiClient.post('reservations/add', reservation);
            reset();
            router.push("/");

        } catch (error) {
            console.error("Error submitting reservation:", error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <form
                className="max-w-md mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 h-11 mt-10">Reservation Form</h1>
                <div className="flex flex-row gap-x-8">

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("flightId", { required: "Flight ID is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="flightId"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Flight ID
                        </label>
                        {errors.flightId && (
                            <span className="text-red-500 text-sm">    {typeof errors.flightId.message === "string" ? errors.flightId.message : ""}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("fromWhereLocation", {
                                required: "From location is required",
                            })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="fromWhereLocation"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            From Location
                        </label>
                        {errors.fromWhereLocation && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.fromWhereLocation.message === "string" ? errors.fromWhereLocation.message : ""}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-x-8">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("flightCompaniName", { required: "Company name is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="flightCompaniName"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Company Name
                        </label>
                        {errors.flightCompaniName && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.flightCompaniName.message === "string" ? errors.flightCompaniName.message : ""}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-x-8">

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("flightNumber", { required: "Flight number is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="flightNumber"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Flight Number
                        </label>
                        {errors.flightNumber && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.flightNumber.message === "string" ? errors.flightNumber.message : ""}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="date"
                            {...register("date", { required: "Date is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Flight Date
                        </label>
                        {errors.date && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.date.message === "string" ? errors.date.message : ""}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-x-8">

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="date"
                            {...register("reservationDate", {
                                required: "Reservation date is required",
                            })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="reservationDate"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Reservation Date
                        </label>
                        {errors.reservationDate && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.reservationDate.message === "string" ? errors.reservationDate.message : ""}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            {...register("seatsBooked", { required: "Seats booked is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="seatsBooked"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Seats Booked
                        </label>
                        {errors.seatsBooked && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.seatsBooked.message === "string" ? errors.seatsBooked.message : ""}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex flex-row gap-x-8">

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            {...register("customerName", { required: "Customer name is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="customerName"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Customer Name
                        </label>
                        {errors.customerName && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.customerName.message === "string" ? errors.customerName.message : ""}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            {...register("customerEmail", { required: "Customer email is required" })}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="customerEmail"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Customer Email
                        </label>
                        {errors.customerEmail && (
                            <span className="text-red-500 text-sm">
                                {typeof errors.customerEmail.message === "string" ? errors.customerEmail.message : ""}
                            </span>
                        )}

                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                    Submit Reservation
                </button>
            </form>
        </div>
    );
};

export default Reservations;
