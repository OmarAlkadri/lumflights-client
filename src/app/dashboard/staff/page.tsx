// src/app/dashboard/staff/page.tsx
"use client";
import { JSX, useEffect, useState } from 'react';
import HomeLayout from '@/presentation/components/layouts/HomeLayout';

import Dialog from '@/presentation/components/common/Dialog';
import { Table } from '@/presentation/components/common/Table';
import { getAllPaginatedReservations, getReservations } from '@/application/usecases/getReservations';
import { Reservation } from '@/domain/entities/reservation';
import DashboardLayout from '@/presentation/components/layouts/DashboardLayout';
import Loader from '@/presentation/components/common/Loader';
import { ERoles } from '@/contexts/AuthContext';

const AdminDashboardPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffec() => {
    const fetchReservations = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await getReservations();
            console.log(data[0])
            setReservations(data);
            setLoading(false);
        } catch (error: unknown) {
            console.error("An error occurred while fetching reservations:", error);
        }
    };

    fetchReservations();
}, []);


const [openDialog, setOpenDialog] = useState<boolean>(false);
const [dialogData, setDialogData] = useState<Reservation | undefined>(undefined);

const openTaskDialog = (item: Reservation): void => {
    setDialogData(item);
    setOpenDialog(true);
};
const closeTaskDialog = (): void => {
    setOpenDialog(false);
};
const staffVisibleColumns = [
    "flightNumber",
    "customerNames",
    "date",
    "reservationDate",
    "seatsBooked",
    "status",
];
const dateColumns = ["date", "createdAt", "updatedAt", "reservationDate"];

return (
    <DashboardLayout role={"staff" as ERoles}>
        {openDialog && (
            <Dialog
                position={{
                    content: 'center',
                    items: 'start',
                }}
                templete={
                    <Table
                        data={reservations}
                        enableFilterBar={false}
                        enableActions={false}
                        ActionsData={undefined}
                        enableCheckbox={false}
                        dateColumns={dateColumns}
                    />
                }
                onClose={closeTaskDialog}
                width={'md'}
                height={'xl'}
            />
        )}

        <Loader loaded={!loading} onlySpinner={false}>
            <div>

                <Table
                    data={reservations}
                    enableFilterBar={true}
                    enableActions={true}
                    visibleColumns={staffVisibleColumns}
                    ActionsData={({ item }: { item: Reservation; }) => (
                        <div className="px-6 py-4">
                            <a
                                onClick={() => openTaskDialog(item)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Edit
                            </a>
                        </div>
                    )}
                    enableCheckbox={true} dateColumns={dateColumns} />

                {/*
                    <Table
                        data={reservations}
                        visibleColumns={["flightNumber", "guestName"]}
                        enableFilterBar={true}
                        enableActions={true}
                        ActionsData={({ item }) => <button>Edit</button>}
                        paginationControls={{
                            currentPage: currentPage,
                            rowsPerPage: rowsPerPage,
                            totalItems: totalRecords,
                            onPageChange: (page) => setCurrentPage(page),
                            onRowsPerPageChange: (rows) => setRowsPerPage(rows),
                        }}
                        enableCheckbox={true}
                    />*/}

            </div>
        </Loader>

    </DashboardLayout>
);
};

export default AdminDashboardPage;