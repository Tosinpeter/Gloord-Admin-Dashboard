import Image from 'next/image'
import React from 'react'

const DoctorActivity = () => {
    const activityData = [
        {
            id: 1,
            patientName: "John Davis",
            doctorName: "Dr. Michael Chen",
            date: "Jan 24, 2026",
            status: "Approved",
            statusColor: "text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 2,
            patientName: "Sarah Miller",
            doctorName: "Dr. Sarah Johnson",
            date: "Jan 24, 2026",
            status: "Pending",
            statusColor: "text-[#973C00] bg-[#FEF3C6] border-[#FEE685]",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 3,
            patientName: "Emily Thompson",
            doctorName: "Dr. Sarah Johnson",
            date: "Jan 24, 2026",
            status: "Pending",
            statusColor: "text-[#973C00] bg-[#FEF3C6] border-[#FEE685]",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 4,
            patientName: "Micheal Brown",
            doctorName: "Dr. Emily Rodriguez",
            date: "Jan 24, 2026",
            status: "Approved",
            statusColor: "text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 5,
            patientName: "Jessica Wilson",
            doctorName: "Dr. Micheal Chen",
            date: "Jan 24, 2026",
            status: "Pending",
            statusColor: "text-[#973C00] bg-[#FEF3C6] border-[#FEE685]",
            imageUrl: "/images/patientimage.png"
        },
    ];

    return (
        // <div className='max-w-[845px] w-full'>
        <div className="flex flex-col gap-6 p-6 border border-[#EDEBE3] rounded-2xl bg-white">
            <h3 className='text-2xl font-medium'>Recent Activity</h3>

            <div className="flex flex-col">
                {activityData.map((activity) => (
                    <div key={activity.id} className="border-t border-[#EDEBE3] py-4">
                        <div className="flex justify-between gap-3 items-center">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full">
                                    <Image
                                        src={activity.imageUrl}
                                        width={40}
                                        height={40}
                                        alt={activity.patientName}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                </div>
                                <div className="w-full flex-1 flex flex-col gap-2">
                                    <h4 className="text-bsse font-medium">{activity.patientName}</h4>
                                    <p className="text-xs font-normal">{activity.doctorName} • {activity.date}</p>
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 border rounded-full text-base font-normal ${activity.statusColor}`}>
                                {activity.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        // </div>
    )
}

export default DoctorActivity