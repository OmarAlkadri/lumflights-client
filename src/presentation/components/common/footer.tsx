import React from 'react';
import Image from 'next/image';
import luminLogo from '../../../assets/light-logo.svg';

export const Footer = () => {
    const profile = {
        name: '',
        copyright: 'Lumin AI 2025 © All right reserved',
        slogan: 'Spark your work with Lumin ✨',
    };

    const sections = {
        about: [
            { href: "https://www.lumin-ai.app/", label: 'Our Story' },
            { href: "https://www.lumin-ai.app/#features", label: 'Contact Us' }
        ],
        follow: [
            { href: "https://github.com/themesberg/flowbite", label: 'Follow on GitHub' },
            { href: "https://www.lumin-ai.app/#features", label: 'Follow on website' },
            { href: "https://www.lumin-ai.app/", label: 'Follow on LinkedIn' },
        ]
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <a href="#" className="flex items-center">
                        <Image src={luminLogo} className="h-32 w-32 me-3" alt="Lumin logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{profile.name}</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">About Us</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {sections.about.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <a href={item.href} className="hover:underline">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            {sections.follow.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <a target="_blank" href={item.href} className="hover:underline" rel="noreferrer">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-sky-800 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">{profile.copyright}</span>
                <div className="flex mt-4 sm:justify-center sm:mt-0">

                </div>
            </div>
        </div>
    );
};
