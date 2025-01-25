"use client"; // تأكد من إضافة هذا التوجيه

import { useAuth, IUser, ERoles } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';
import Link from 'next/link';

const LoginPage = () => {
    const { login, user } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login({ email, password });

            // Redirect based on user role
            if (user?.ERoles?.includes('admin' as ERoles)) {
                router.push('/dashboard/admin');
            } else if (user?.ERoles?.includes('staff' as ERoles)) {
                router.push('/dashboard/staff');
            } else {
                console.error('No matching role for redirection.');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className='w-full h-full justify-center'>
            <section className="bg-gray-50 dark:bg-gray-900 h-full">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-w-[500px]">
                    <a id="logo-v3" className="flex items-center mt-6 mb-6 text-2xl font-semibold text-gray-900" />
                    <div className="w-full bg-white rounded-lg shadow">
                        <div className="p-6 space-y-4">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input
                                        onChange={(event) => setEmail(event.target.value)}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input
                                        onChange={(event) => setPassword(event.target.value)}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    />
                                </div>
                                <div className='flex flex-col w-full gap-y-4'>
                                    <button
                                        type="button"
                                        onClick={handleLogin}
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Sign in
                                    </button>

                                    <Link
                                        href={'register'}
                                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
