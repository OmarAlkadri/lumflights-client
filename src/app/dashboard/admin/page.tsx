"use client";
import { JSX, useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/presentation/components/layouts/DashboardLayout";
import Dialog from "@/presentation/components/common/Dialog";
import { Table } from "@/presentation/components/common/Table";
import { getAllPaginatedReservations, getReservationsByDateRange } from "@/application/usecases/getReservations";
import { Reservation } from "@/domain/entities/reservation";
import Loader from "@/presentation/components/common/Loader";
import { ERoles } from "@/contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminDashboardPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [error, setError] = useState<string | undefined>("");
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    const handleDateChange = (update: [Date | null, Date | null]): void => {
        setDateRange(update);
        setError("");

        if (!update[0] && !update[1]) {
            fetchReservations();
        }
    };

    const handleSubmit = (): void => {
        if (!startDate || !endDate) {
            setError("Please select both a start and end date.");
            return;
        }
        setError(undefined);
        fetchReservations();
    };

    const fetchReservations = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = startDate && endDate
                ? await getReservationsByDateRange(currentPage, rowsPerPage, startDate, endDate)
                : await getAllPaginatedReservations(currentPage, rowsPerPage);

            const { data, total } = response;

            setReservations(data);
            setTotalRecords(total);
            setLoading(false);
        } catch (error) {
            console.error("An error occurred while fetching reservations:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [currentPage, rowsPerPage]);

    const adminVisibleColumns = useMemo(
        () => [
            "flightNumber",
            "customerNames",
            "customerEmails",
            "date",
            "reservationDate",
            "seatsBooked",
            "status",
        ],
        []
    );

    const dateColumns = ["date", "createdAt", "updatedAt", "reservationDate"];

    const enableAppBarContent = (
        <div className="flex flex-row w-full items-center px-8 pt-2 justify-between  bg-gray-100 rounded-lg shadow-md">

            <label className="inline-flex items-center cursor-pointer mb-4">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
            </label>
            <div>

                <div className="flex flex-row w-full items-center gap-x-4">

                    <DatePicker
                        className={`w-full h-full bg-gray-100 border rounded-md px-3 py-2 text-gray-700 focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                            }`}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateChange}
                        placeholderText="Select a date range"
                        isClearable={true}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>


        </div>
    );

    return (
        <DashboardLayout role={"admin" as ERoles}>
            <Loader loaded={!loading} onlySpinner={false}>
                <div className="">
                    <Table
                        data={reservations}
                        enableFilterBar={true}
                        enableActions={true}
                        visibleColumns={adminVisibleColumns}
                        dateColumns={dateColumns}
                        enableAppBar={enableAppBarContent}
                        ActionsData={({ item }: { item: Reservation }) => (
                            <div className="px-6 py-4">
                                <a
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    onClick={() => console.log("Edit", item)}
                                >
                                    Edit
                                </a>
                            </div>
                        )}
                        enableCheckbox={true}
                        paginationControls={{
                            currentPage,
                            rowsPerPage,
                            totalItems: totalRecords,
                            onPageChange: setCurrentPage,
                            onRowsPerPageChange: setRowsPerPage,
                        }}
                    />
                </div>
            </Loader>
        </DashboardLayout>
    );
};

export default AdminDashboardPage;
