'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import profileimage from '@/public/images/profileimage.png'
import Image from 'next/image';

const Header = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navItems = [
        {
            href: '/doctor/overview',
            label: 'Overview',
            icon: (isActive: boolean) => (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8" className={isActive ? 'stroke-white' : 'stroke-[#20201E]'}>
                        <path d="M6.66667 14.1663H13.3333M9.18141 2.30297L3.52949 6.6989C3.15168 6.99275 2.96278 7.13968 2.82669 7.32368C2.70614 7.48667 2.61633 7.67029 2.56169 7.86551C2.5 8.0859 2.5 8.32521 2.5 8.80384V14.833C2.5 15.7664 2.5 16.2331 2.68166 16.5896C2.84144 16.9032 3.09641 17.1582 3.41002 17.318C3.76654 17.4996 4.23325 17.4996 5.16667 17.4996H14.8333C15.7668 17.4996 16.2335 17.4996 16.59 17.318C16.9036 17.1582 17.1586 16.9032 17.3183 16.5896C17.5 16.2331 17.5 15.7664 17.5 14.833V8.80384C17.5 8.32521 17.5 8.0859 17.4383 7.86551C17.3837 7.67029 17.2939 7.48667 17.1733 7.32368C17.0372 7.13968 16.8483 6.99275 16.4705 6.69891L10.8186 2.30297C10.5258 2.07526 10.3794 1.9614 10.2178 1.91763C10.0752 1.87902 9.92484 1.87902 9.78221 1.91763C9.62057 1.9614 9.47418 2.07526 9.18141 2.30297Z" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
            ),
        },
        {
            href: '/doctor/pending',
            label: 'Pending Approvals',
            icon: (isActive: boolean) => (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                        <path d="M16.5893 14.0586C16.3008 13.844 15.893 13.9039 15.6783 14.1924C15.5597 14.3518 15.4345 14.5061 15.3029 14.6549C15.0648 14.9243 15.0901 15.3358 15.3595 15.5739C15.4783 15.6793 15.6316 15.7374 15.7904 15.7372C15.9705 15.7372 16.1498 15.6629 16.2784 15.5174C16.4342 15.3411 16.5826 15.1583 16.723 14.9695C16.9376 14.6811 16.8778 14.2732 16.5893 14.0586ZM17.6781 11.0054C17.327 10.9289 16.9799 11.1518 16.9035 11.5031C16.8612 11.697 16.8108 11.889 16.7522 12.0786C16.6461 12.4222 16.8385 12.7867 17.182 12.8928C17.2461 12.9126 17.3108 12.922 17.3745 12.922C17.6525 12.922 17.9099 12.7425 17.9963 12.463C18.0657 12.238 18.1256 12.0101 18.1758 11.78C18.2522 11.4287 18.0294 11.0819 17.6781 11.0054ZM13.4556 16.1437C13.2821 16.2405 13.1047 16.3299 12.9237 16.4117C12.596 16.5597 12.4503 16.9453 12.5983 17.273C12.707 17.5137 12.944 17.6562 13.192 17.6562C13.2816 17.6562 13.3726 17.6376 13.4596 17.5984C13.6742 17.5014 13.8847 17.3953 14.0903 17.2805C14.4043 17.1053 14.5167 16.7087 14.3414 16.3947C14.1662 16.0808 13.7695 15.9684 13.4556 16.1437ZM9.3495 4.79167V9.73034L6.96216 12.1176C6.70793 12.3719 6.70793 12.7841 6.96216 13.0383C7.02255 13.0989 7.09431 13.1469 7.17332 13.1796C7.25233 13.2124 7.33702 13.2292 7.42254 13.229C7.50806 13.2291 7.59275 13.2123 7.67176 13.1796C7.75077 13.1469 7.82253 13.0989 7.88293 13.0383L10.4609 10.4604C10.583 10.3383 10.6516 10.1727 10.6516 10V4.79167C10.6516 4.4321 10.3601 4.14062 10.0005 4.14062C9.64097 4.14062 9.3495 4.4321 9.3495 4.79167Z" className={isActive ? 'fill-white' : 'fill-[#20201E]'} />
                        <path d="M17.6826 3.06771C17.323 3.06771 17.0316 3.35918 17.0316 3.71875V5.52656C15.5162 3.15 12.8698 1.66797 10.0003 1.66797C7.77441 1.66797 5.68174 2.5348 4.10775 4.10872C2.53382 5.68271 1.66699 7.77539 1.66699 10.0013C1.66699 12.2272 2.53382 14.3199 4.10775 15.8939C5.68174 17.4678 7.77441 18.3346 10.0003 18.3346C10.0058 18.3346 10.0111 18.334 10.0166 18.3338C10.0221 18.334 10.0274 18.3346 10.0329 18.3346C10.2675 18.3346 10.5045 18.3247 10.7372 18.3053C11.0955 18.2753 11.3617 17.9605 11.3317 17.6022C11.3016 17.2439 10.9873 16.9776 10.6285 17.0077C10.4318 17.0242 10.2314 17.0326 10.0329 17.0326C10.0274 17.0326 10.0221 17.0332 10.0166 17.0334C10.0111 17.0332 10.0058 17.0326 10.0003 17.0326C6.12327 17.0326 2.96908 13.8784 2.96908 10.0013C2.96908 6.12425 6.12327 2.97005 10.0003 2.97005C12.499 2.97005 14.7971 4.30186 16.0529 6.42057H14.2628C13.9032 6.42057 13.6118 6.71204 13.6118 7.07161C13.6118 7.43118 13.9032 7.72266 14.2628 7.72266H16.2503C16.6326 7.7231 17.0075 7.61772 17.3336 7.4182C17.3537 7.40675 17.3732 7.39423 17.392 7.3807C17.9586 7.00794 18.3337 6.36676 18.3337 5.63932V3.71875C18.3337 3.35918 18.0422 3.06771 17.6826 3.06771Z" className={isActive ? 'fill-white' : 'fill-[#20201E]'} />
                    </g>
                </svg>
            ),
        },
        {
            href: '/doctor/approved',
            label: 'Approved Cases',
            icon: (isActive: boolean) => (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                        <path d="M9.96792 18C9.02089 18 8.07387 17.8543 7.19969 17.4901C5.59703 16.9073 4.21291 15.8146 3.26588 14.3576C2.31886 12.9006 1.88177 11.1523 2.02746 9.47676C2.17316 7.7284 2.82879 6.12574 3.92152 4.81447C5.01424 3.5032 6.54405 2.55617 8.21956 2.19193C9.89507 1.82769 11.6434 1.97339 13.2461 2.70187C13.6103 2.84757 13.756 3.28465 13.6103 3.6489C13.4646 4.01314 13.0275 4.15883 12.6633 4.01314C11.352 3.43035 9.89507 3.28466 8.5838 3.57605C7.12684 3.86744 5.88842 4.66877 5.01424 5.76149C4.06721 6.85422 3.55727 8.16549 3.48443 9.62245C3.41158 11.0066 3.77582 12.4635 4.5043 13.6291C5.23278 14.7947 6.39836 15.7417 7.70962 16.1788C9.02089 16.6887 10.4779 16.6887 11.862 16.3245C13.1732 15.9602 14.4117 15.0861 15.2858 13.9933C16.16 12.9006 16.5971 11.4437 16.5971 10.0595V9.40391C16.5971 8.96682 16.8885 8.67542 17.3256 8.67542C17.7627 8.67542 18.0541 8.96682 18.0541 9.40391V9.98669C18.0541 11.7351 17.4713 13.4106 16.4514 14.7947C15.4315 16.1788 13.9746 17.1987 12.2991 17.7086C11.4977 17.8543 10.7692 18 9.96792 18ZM9.96792 12.1721C9.74937 12.1721 9.60368 12.0993 9.45798 11.9536L7.27253 9.76815C6.98114 9.47676 6.98114 9.03967 7.27253 8.74827C7.56393 8.45688 8.00102 8.45688 8.29241 8.74827L9.96792 10.4238L16.7428 3.6489C17.0342 3.3575 17.4713 3.3575 17.7627 3.6489C18.0541 3.94029 18.0541 4.37738 17.7627 4.66877L10.4779 11.9536C10.3322 12.0993 10.1865 12.1721 9.96792 12.1721Z" className={isActive ? 'fill-white' : 'fill-[#20201E]'} />
                    </g>
                </svg>
            ),
        },
        {
            href: '/doctor/rejected',
            label: 'Rejected Cases',
            icon: (isActive: boolean) => (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                        <path d="M10 1.25C5.1875 1.25 1.25 5.1875 1.25 10C1.25 14.8125 5.1875 18.75 10 18.75C14.8125 18.75 18.75 14.8125 18.75 10C18.75 5.1875 14.8125 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z" className={isActive ? 'fill-white' : 'fill-[#20201E]'} />
                        <path d="M13.5625 6.4375C13.3125 6.1875 12.9375 6.1875 12.6875 6.4375L10 9.125L7.375 6.5C7.125 6.25 6.75 6.25 6.5 6.5C6.25 6.75 6.25 7.125 6.5 7.375L9.125 10L6.5 12.625C6.25 12.875 6.25 13.25 6.5 13.5C6.75 13.75 7.125 13.75 7.375 13.5L10 10.875L12.625 13.5C12.875 13.75 13.25 13.75 13.5 13.5C13.75 13.25 13.75 12.875 13.5 12.625L10.875 10L13.5 7.375C13.75 7.125 13.75 6.6875 13.5625 6.4375Z" className={isActive ? 'fill-white' : 'fill-[#20201E]'} />
                    </g>
                </svg>
            ),
        },
    ];

    const isActive = (href: string) => {
        return pathname === href;
    };

    return (
        <>
            <div className='w-full py-6 relative'>
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 border border-sec rounded-lg"
                        >
                            {isMobileMenuOpen ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="#20201E" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21M3 6H21M3 18H21" stroke="#20201E" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                        <div className="flex items-center gap-2">
                            <h3 className='font-bold text-[38px] tracking-[-1%]'>Gloord</h3>
                            <div className="size-6 rounded-full bg-pry mx-auto"></div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2 flex-wrap">
                        {navItems.map((item, index) => {
                            const active = isActive(item.href);
                            const className = `border border-sec rounded-full py-2.5 px-4 w-max flex items-center gap-2 transition-colors ${active
                                ? 'bg-pry text-white fill-white strokeWhite'
                                : 'bg-white hover:bg-gray-50'
                                }`;

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={className}
                                >
                                    {item.icon(active)}
                                    <span className='text-sm font-normal '>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Link href={'/doctor/notification'} className="size-12 flex items-center justify-center rounded-full border border-sec bg-white hover:bg-gray-50 transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.8">
                                        <path d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z" stroke="#20201E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z" stroke="#20201E" strokeWidth="1.5" />
                                        <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19" stroke="#20201E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </Link>
                            <Link href={'/doctor/settings'} className="size-12 flex items-center justify-center rounded-full border border-sec bg-white hover:bg-gray-50 transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z" stroke="#20201E" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z" stroke="#20201E" strokeWidth="1.5" />
                                </svg>
                            </Link>
                        </div>

                        {/* Profile Section with Dropdown */}
                        <div className="hidden lg:block relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                <div className="size-12 flex items-center justify-center rounded-full border border-sec bg-sec">
                                    <Image src={profileimage} width={48} height={48} className='size-[48px] rounded-full object-contain' alt='image' />
                                </div>
                                <div className="flex flex-1 flex-col gap-1 text-left">
                                    <h4 className='text-base font-medium leading-[100%]'>Dr. Sarah Johnson</h4>
                                    <p className='capitalize text-xs font-normal tracking-[0px]'>Doctor</p>
                                </div>
                                {/* <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg> */}
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <>
                                    {/* Backdrop for closing dropdown when clicking outside */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                    />

                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                        <Link
                                            href="/doctor/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Profile
                                            </div>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                // Add your logout logic here
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 12L14 8M14 8L10 4M14 8H6M12 12.5V13.5C12 14.6046 11.1046 15.5 10 15.5H3.5C2.39543 15.5 1.5 14.6046 1.5 13.5V2.5C1.5 1.39543 2.39543 0.5 3.5 0.5H10C11.1046 0.5 12 1.39543 12 2.5V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                Logout
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Sliding Menu */}
                    <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
                        <div className="p-6">
                            {/* Close button inside menu */}
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18M6 6L18 18" stroke="#20201E" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Profile Section in Mobile Menu */}
                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                                <div className="size-14 flex items-center justify-center rounded-full border border-sec bg-sec">
                                    <Image src={profileimage} width={56} height={56} className='size-14 rounded-full object-contain' alt='image' />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className='text-base font-medium'>Dr. Sarah Johnson</h4>
                                    <p className='capitalize text-sm text-gray-600'>Doctor</p>
                                </div>
                            </div>

                            {/* Mobile Navigation Items */}
                            <div className="flex flex-col gap-2">
                                {navItems.map((item, index) => {
                                    const active = isActive(item.href);
                                    const className = `w-full py-3 px-4 rounded-xl flex items-center gap-3 transition-colors ${active
                                        ? 'bg-pry text-white'
                                        : 'hover:bg-gray-50 text-gray-700'
                                        }`;

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={className}
                                        >
                                            {item.icon(active)}
                                            <span className='text-sm font-medium'>{item.label}</span>
                                            {active && (
                                                <span className="ml-auto">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Mobile Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={'/doctor/notification'}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-gray-50 text-gray-700"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8">
                                                <path d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z" stroke="#20201E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z" stroke="#20201E" strokeWidth="1.5" />
                                                <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19" stroke="#20201E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                        <span className='text-sm font-medium'>Notifications</span>
                                    </Link>
                                    <Link
                                        href={'/doctor/settings'}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-gray-50 text-gray-700"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z" stroke="#20201E" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z" stroke="#20201E" strokeWidth="1.5" />
                                        </svg>
                                        <span className='text-sm font-medium'>Settings</span>
                                    </Link>
                                    <Link
                                        href="/doctor/settings"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-gray-50 text-gray-700"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.5 17.5C2.5 14.7386 4.73858 12.5 7.5 12.5H12.5C15.2614 12.5 17.5 14.7386 17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className='text-sm font-medium'>Profile</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            // Add your logout logic here
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left py-3 px-4 rounded-xl flex items-center gap-3 hover:bg-gray-50 text-red-600"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 15L16.25 10M16.25 10L12.5 5M16.25 10H7.5M15 15.625V16.875C15 17.9105 14.1605 18.75 13.125 18.75H4.375C3.33947 18.75 2.5 17.9105 2.5 16.875V3.125C2.5 2.08947 3.33947 1.25 4.375 1.25H13.125C14.1605 1.25 15 2.08947 15 3.125V4.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span className='text-sm font-medium'>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Header