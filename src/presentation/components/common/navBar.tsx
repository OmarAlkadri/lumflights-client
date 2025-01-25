import { useEffect, useState } from "react";
import lumin_ai_app_logo from '../../../assets/lumin_ai_app_logo.jpg';
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [languages, setLanguages] = useState<{ name: string; key: string }[]>([]);
    const [dark, setDark] = useState<boolean>(false);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") || "en";
        const savedMode = localStorage.getItem("mode") === "true";

        setDark(!savedMode);
        document.body.classList.toggle("dark", !savedMode);
    })


    const darkModeHandler = (): void => {
        setDark((prev: any) => {
            const newDarkMode = !prev;
            localStorage.setItem("mode", newDarkMode.toString());
            document.body.classList.toggle("dark", newDarkMode);
            return newDarkMode;
        });
    };

    return (

        <div className="gap-y-2">

            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <a href="#" className="cursor-pointer">
                    <Image src={lumin_ai_app_logo} className="h-16 w-16 me-3" alt={'footer.logoAlt'} />
                </a>


                <div className="block">
                    <ul className="flex gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 flex-row lg:items-center lg:gap-6">
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">

                            <Link
                                href="/"
                                className="hover:underline text-sm sm:text-base transition duration-200"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                            <Link
                                href="auth/login"
                                className="hover:underline text-sm sm:text-base transition duration-200"
                            >
                                LogIn
                            </Link>
                        </li>
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">

                            <Link
                                href="about"
                                className="hover:underline text-sm sm:text-base transition duration-200"
                            >
                                About
                            </Link>
                        </li>
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">

                            <Link
                                href="dashboard/admin"
                                className="hover:underline text-sm sm:text-base transition duration-200"
                            >
                                Admin
                            </Link>
                        </li>
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                            <Link
                                href="dashboard/staff"
                                className="hover:underline text-sm sm:text-base transition duration-200"
                            >
                                Staff
                            </Link>
                        </li>
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                            <div className="flex items-center">Light</div>
                            < div className='flex'>
                                <div className="relative">
                                    <label className="flex w-full items-center justify-center cursor-pointer">
                                        <input id="switch-2" type="checkbox" className="peer sr-only" checked={dark} readOnly />
                                        <div onClick={darkModeHandler} className="peer h-4 w-11 rounded-full border bg-slate-200
                                    after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border
                                    after:border-gray-300 after:bg-white after:transition-all after:content-[''] 
                                    peer-checked:bg-white peer-checked:after:translate-x-full 
                                    peer-focus:ring-green-300"></div>
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center">Dark</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};
