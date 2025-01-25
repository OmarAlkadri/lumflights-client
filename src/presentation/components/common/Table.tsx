"use client";
import React, { useState, useMemo, useCallback, JSX } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type PaginationControls = {
    currentPage: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
};

type TableProps<T extends { id: string | number }> = {
    data: T[];
    visibleColumns?: string[];
    dateColumns: string[];
    enableFilterBar: boolean;

    enableAppBar?: JSX.Element;


    enableCheckbox: boolean;
    enableActions: boolean;
    ActionsData?: (props: { item: T }) => JSX.Element;
    paginationControls?: PaginationControls;
};
export const Table = <T extends { id: string | number }>({
    data,
    visibleColumns,
    dateColumns,
    enableFilterBar,
    enableCheckbox,
    enableActions,
    enableAppBar,
    ActionsData,
    paginationControls,
}: TableProps<T>) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        new Date(new Date().setDate(new Date().getDate() - 10)),
        new Date(),
    ]);
    const [startDate, endDate] = dateRange;
    const [error, setError] = useState<string | undefined>("");

    const handleDateChange = (update: [Date | null, Date | null]): void => {
        setDateRange(update);
        if (startDate && endDate) {
            setError("");
        } else {
            setError(undefined);
        }
    };

    const handleSubmit = (): void => {
        if (!startDate || !endDate) {
            setError("Please select both a start and end date.");
            return;
        }
        setError(undefined);
    };

    const [internalCurrentPage, setInternalCurrentPage] = useState(1);
    const [internalRowsPerPage, setInternalRowsPerPage] = useState(5);

    const currentPage = paginationControls?.currentPage ?? internalCurrentPage;
    const rowsPerPage = paginationControls?.rowsPerPage ?? internalRowsPerPage;

    const handlePageChange = paginationControls?.onPageChange ?? setInternalCurrentPage;
    const handleRowsPerPageChange = paginationControls?.onRowsPerPageChange ?? setInternalRowsPerPage;

    const totalItems = paginationControls?.totalItems ?? data.length;
    const totalPages = useMemo(() => Math.ceil(totalItems / rowsPerPage), [totalItems, rowsPerPage]);

    const currentRows = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }, [currentPage, rowsPerPage, data]);

    const Pagination = () => {
        const generatePageNumbers = () => {
            const visiblePages = 4;
            const pages: (number | string)[] = [];

            pages.push(1);
            if (currentPage > visiblePages + 1) pages.push("...");
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let page = startPage; page <= endPage; page++) {
                pages.push(page);
            }
            if (currentPage < totalPages - visiblePages) pages.push("...");
            if (totalPages > 1) pages.push(totalPages);

            return pages;
        };

        return (
            <div className="flex gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                    Previous
                </button>
                {generatePageNumbers().map((page, idx) =>
                    typeof page === "number" ? (
                        <button
                            key={idx}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={idx} className="px-3 py-1 text-gray-500">
                            {page}
                        </span>
                    )
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <div className="min-w-32 max-w-7xl max-h-[700px] min-h-32 h-auto relative overflow-x-auto">
            <div className="shadow-md sm:rounded-lg">

                {enableAppBar && <div className="mb-4">{enableAppBar}</div>}

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {enableCheckbox && (
                                <td className="w-4 p-4">
                                    <input type="checkbox" className="w-4 h-4" />
                                </td>
                            )}
                            {visibleColumns?.map((col) => (
                                <th key={col} className="px-6 py-3">
                                    {col.replace(/([A-Z])/g, " $1").toUpperCase()}
                                </th>
                            ))}
                            {enableActions && <th className="px-6 py-3">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item) => (
                            <tr key={item.id}>
                                {enableCheckbox && (
                                    <td className="w-4 p-4">
                                        <input type="checkbox" />
                                    </td>
                                )}

                                {visibleColumns?.map((col) => (
                                    <td key={col} className="px-6 py-4">
                                        {(() => {
                                            const value = item[col as keyof T];

                                            if (dateColumns.includes(col) && typeof value === "string") {
                                                const date = new Date(value);
                                                if (!isNaN(date.getTime())) {
                                                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                                                    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
                                                    return `${formattedDate} ${formattedTime}`;
                                                }
                                            }
                                            return String(value ?? "");
                                        })()}
                                    </td>
                                ))}

                                {enableActions && ActionsData && (
                                    <td className="px-6 py-4">{ActionsData({ item })}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {enableFilterBar && (
                    <div className="flex items-center justify-between p-4 text-gray-700">

                        <div className="flex items-center gap-4">
                            <label className="text-sm">
                                Rows per page:
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                                    className="ml-2"
                                >
                                    {[5, 10, 15].map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {`Item ${Math.min((currentPage - 1) * rowsPerPage + 1, totalItems)} To ${Math.min(
                                    currentPage * rowsPerPage,
                                    totalItems
                                )} of ${totalItems}`}
                            </p>
                        </div>
                        <Pagination />
                    </div>
                )}
            </div>
        </div>
    );
};
