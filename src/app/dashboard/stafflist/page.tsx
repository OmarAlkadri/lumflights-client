"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/presentation/components/layouts/DashboardLayout";
import { Table } from "@/presentation/components/common/Table";
import { ReservationData as Reservation } from "@/domain/entities/reservation";
import Loader from "@/presentation/components/common/Loader";
import { ERoles } from "@/contexts/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import './index.css'
import { getAllStaff } from "@/application/usecases/staffUseCase";

const AdminDashboardPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const fetchReservations = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await getAllStaff();


            setReservations(response);
            setTotalRecords(response.length);
            setLoading(false);
        } catch (error) {
            console.error("An error occurred while fetching reservations:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [currentPage, rowsPerPage]);

    const adminVisibleColumns = [
        "email",
        "EUserType",
        "allERoles",
        "name",
        "createdAt",
    ];


    const dateColumns = ["date", "createdAt", "updatedAt", "reservationDate"];


    return (
        <DashboardLayout role={"admin" as ERoles}>
            <Loader loaded={!loading} onlySpinner={false}>

                <div className="max-w-[80%]">

                    <Table
                        data={reservations}
                        enableFilterBar={true}
                        enableActions={true}
                        visibleColumns={adminVisibleColumns}
                        dateColumns={dateColumns}
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
