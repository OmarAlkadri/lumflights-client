"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ERoles } from "@/contexts/AuthContext";
import { NavBarAdmin } from "../common/navBarAdmin";
import { Footer } from "../common/footer";

const DashboardLayout = ({ children, role }: { children: React.ReactNode; role: ERoles }) => {
    const { user, logout, hasRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        } else if (!hasRole(role)) {
            const fallbackRoute =
                user.ERoles?.includes(ERoles.Admin) ? "/dashboard/admin" : "/dashboard/staff";
            router.push(fallbackRoute);
        }
    }, [user, role, hasRole, router]);

    if (!user || !hasRole(role)) {
        return null; // أو يمكنك عرض مؤشر تحميل
    }

    return (
        <div className="home-layout h-full flex flex-col ">
            <header className="block w-full mx-auto bg-white bg-opacity-60 sticky top-0 shadow backdrop-blur-lg backdrop-saturate-150 z-[99]">
                <NavBarAdmin />
            </header>
            <main className='w-full flex flex-1 items-start justify-center relative mt-8'>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
