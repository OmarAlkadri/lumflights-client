"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/presentation/components/layouts/DashboardLayout";
import Dialog from "@/presentation/components/common/Dialog";
import { Table } from "@/presentation/components/common/Table";
import { getAllPaginatedReservations, getReservationsByDateRange } from "@/application/usecases/getReservations";
import Loader from "@/presentation/components/common/Loader";
import { ERoles } from "@/contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReservationsPage from "@/presentation/components/common/ReservationsPage";
import { ReservationData as Reservation } from "@/domain/entities/reservation";

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

    const staffVisibleColumns = [
        "flightNumber",
        "date",
        "reservationDate",
        "seatsBooked",
        "status",
    ];

    const dateColumns = ["date", "createdAt", "updatedAt", "reservationDate"];

    const enableAppBarContent = (
        <div className="flex flex-row w-full items-center h-16 px-8 pt-2 justify-between  bg-gray-100 rounded-lg shadow-md">

            <div>

                <div className="flex flex-row w-full items-center justify-between ">

                    <DatePicker
                        className={`w-full h-full bg-gray-100 border rounded-md px-3 py-2 text-gray-700 focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateChange}
                        placeholderText="Select a date range"
                        isClearable={true}
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 w-32 text-white px-3 py-2 ml-6 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>


        </div>
    );
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogData, setDialogData] = useState<Reservation | undefined>(undefined);

    const openTaskDialog = (item: Reservation): void => {
        setDialogData(item);
        setOpenDialog(true);
    };
    const closeTaskDialog = (): void => {
        setOpenDialog(false);
    };
    return (
        <DashboardLayout role={"staff" as ERoles}>
            {openDialog && (
                <Dialog
                    position={{
                        content: 'center',
                        items: 'start',
                    }}
                    templete={<ReservationsPage data={dialogData} />}
                    onClose={closeTaskDialog}
                    width={'md'}
                    height={'xl'}
                />
            )}
            <Loader loaded={!loading} onlySpinner={false}>

                <div className="">

                    <Table
                        data={reservations}
                        enableFilterBar={true}
                        enableActions={true}
                        visibleColumns={staffVisibleColumns}
                        dateColumns={dateColumns}
                        enableAppBar={enableAppBarContent}
                        ActionsData={({ item }: { item: Reservation }) => (
                            <div className="px-6 py-4">
                                <button
                                    className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    onClick={() => { openTaskDialog(item) }}
                                >
                                    Edit
                                </button>
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
