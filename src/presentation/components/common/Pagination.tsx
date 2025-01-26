import React from "react";

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    rowsPerPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const generatePageNumbers = () => {
        const pages = [];

        if (currentPage > 1) {
            pages.push(currentPage - 1);
        }

        pages.push(currentPage);

        if (currentPage < totalPages) {
            pages.push(currentPage + 1);
        }

        if (currentPage > 2) {
            pages.unshift("...");
        }
        if (currentPage < totalPages - 1) {
            pages.push("...");
        }

        if (!pages.includes(1)) {
            pages.unshift(1);
        }

        if (!pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
                Previous
            </button>
            {generatePageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    disabled={typeof page !== "number"}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};
