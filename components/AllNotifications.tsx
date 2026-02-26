'use client'
import { Bell, Check, CircleAlert, CircleCheckBig, FileText, TimerIcon, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

type IconType = 'Bell' | 'CircleAlert' | 'CircleCheckBig' | 'FileText' | 'Users';

const iconMap: Record<IconType, React.ElementType> = {
    Bell,
    CircleAlert,
    CircleCheckBig,
    FileText,
    Users,
};

interface Badge {
    text: string;
    bgColor: string;
    textColor: string;
    borderColor?: string;
}

interface Notification {
    id: number;
    icon: string;
    iconColor: string;
    bgColor: string;
    title: string;
    badges: Badge[];
    message: string;
    timestamp: string;
    showActions: boolean;
    showButton: boolean;
    buttonText?: string;
    caseId?: string;
}

const initialNotifications: Notification[] = [
    {
        id: 1,
        icon: "CircleAlert",
        iconColor: "text-pry",
        bgColor: "bg-[#CF604A0D]",
        title: "Urgent Case Assigned",
        badges: [
            { text: "New", bgColor: "bg-pry", textColor: "text-white" },
            { text: "Urgent", bgColor: "bg-white", textColor: "text-pry", borderColor: "border-[#FFA2A2]" }
        ],
        message: "High-priority case C010 for Kevin Zhang requires immediate review. Patient has severe eczema flare-ups.",
        timestamp: "2 hours ago",
        showActions: true,
        showButton: true,
        buttonText: "View Case",
        caseId: "C010",
    },
    {
        id: 2,
        icon: "FileText",
        iconColor: "text-pry",
        bgColor: "bg-[#CF604A0D]",
        title: "New Case Assigned",
        badges: [
            { text: "New", bgColor: "bg-pry", textColor: "text-white" }
        ],
        message: "Case C001 for Sarah Miller has been assigned to you. AI confidence: 92%",
        timestamp: "5 hours ago",
        showActions: true,
        showButton: true,
        buttonText: "View Case",
        caseId: "C001",
    },
    {
        id: 3,
        icon: "CircleCheckBig",
        iconColor: "text-[#17B26A]",
        bgColor: "bg-[#ffffff]",
        title: "Treatment Plan Approved",
        badges: [],
        message: "The dashboard will undergo scheduled maintenance on Feb 5, 2026 from 2:00 AM to 4:00 AM EST.",
        timestamp: "1 day ago",
        showActions: false,
        showButton: false,
    },
    {
        id: 4,
        icon: "Bell",
        iconColor: "",
        bgColor: "bg-[#ffffff]",
        title: "Treatment Plan Approved",
        badges: [],
        message: "Your treatment plan for Case C003 (Emily Thompson) has been successfully approved and activated.",
        timestamp: "1 day ago",
        showActions: false,
        showButton: false,
    },
    {
        id: 5,
        icon: "FileText",
        iconColor: "text-pry",
        bgColor: "bg-[#ffffff]",
        title: "New Case Assigned",
        badges: [],
        message: "Case C008 for Robert Lee has been assigned to you. Concern: Oily skin with enlarged pores and blackheads.",
        timestamp: "2 days ago",
        showActions: false,
        showButton: false,
    },
    {
        id: 6,
        icon: "Users",
        iconColor: "text-[#7B988A]",
        bgColor: "bg-[#ffffff]",
        title: "Treatment Plan Approved",
        badges: [],
        message: "Dr. Amanda White has joined the team. Specialty: Cosmetic Dermatology.",
        timestamp: "3 days ago",
        showActions: false,
        showButton: false,
    }
];

const AllNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
    const pathname = usePathname()
    const basePath = pathname.startsWith('/admin') ? '/admin' : '/doctor'

    const handleDelete = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    const handleMarkRead = (id: number) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id
                    ? { ...n, showActions: false, badges: [], bgColor: 'bg-[#ffffff]' }
                    : n
            )
        )
    }

    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-3">
                <Bell size={40} strokeWidth={1.5} />
                <p className="text-base font-medium">No notifications</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3 w-full py-8'>
            {notifications.map((notification) => {
                const IconComponent = iconMap[notification.icon as IconType];

                return (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-2 md:gap-4 w-full p-4 md:p-6 ${notification.bgColor} border border-[#EDEBE3] rounded-[14px] transition-all duration-200`}
                    >
                        {IconComponent && <IconComponent size={20} className={notification.iconColor} />}
                        <div className="w-full flex-1 flex flex-col gap-2">
                            <div className="w-full flex-1 flex items-start md:items-center justify-between gap-4">
                                <div className="flex gap-2">
                                    <h3 className='text-base font-medium'>{notification.title}</h3>
                                    {notification.badges.length > 0 && (
                                        <div className="flex gap-1">
                                            {notification.badges.map((badge, index) => (
                                                <span
                                                    key={index}
                                                    className={`${badge.textColor} ${badge.bgColor} rounded-full h-[22px] flex items-center justify-center px-2 w-max font-medium text-xs leading-[100%] border ${badge.borderColor || 'border-pry'}`}
                                                >
                                                    {badge.text}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {notification.showActions && (
                                    <div className="text-[#20201E99] flex gap-4 md:gap-6 w-max">
                                        <button
                                            type="button"
                                            onClick={() => handleMarkRead(notification.id)}
                                            className="hover:text-[#17B26A] transition-colors"
                                            title="Mark as read"
                                        >
                                            <Check size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(notification.id)}
                                            className="hover:text-red-500 transition-colors"
                                            title="Delete notification"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className='font-medium text-sm'>{notification.message}</p>
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <TimerIcon size={16} />
                                    <span className='text-xs font-normal'>{notification.timestamp}</span>
                                </div>
                                {notification.showButton && (
                                    <Link
                                        href={`${basePath}/case-review`}
                                        className='text-white bg-pry rounded-full py-2 px-4 w-max font-medium text-xs leading-[100%] border border-[#FFA2A2] hover:opacity-90 transition-opacity'
                                    >
                                        {notification.buttonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default AllNotifications
