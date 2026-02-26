import Image from 'next/image'
import React from 'react'

const TopDoctors = () => {
    const activityData = [
        {
            id: 1,
            patientName: "Sarah Miller",
            profession: "Dermatology",
            number: "156",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 2,
            patientName: "John Davis",
            profession: "Dermatology",
            number: "156",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 3,
            patientName: "Emily Thompson",
            profession: "Dermatology",
            number: "156",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 4,
            patientName: "Micheal Brown",
            profession: "Dermatology",
            number: "156",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 5,
            patientName: "Jessica Wilson",
            profession: "Dermatology",
            number: "156",
            imageUrl: "/images/patientimage.png"
        },
        {
            id: 6,
            patientName: "Jessica Wilson",
            profession: "Dermatology",
            number: "156",
            imageUrl: "/images/patientimage.png"
        },
    ];

    return (
        // <div className='flex-1 w-full'>
        <div className="flex flex-col gap-6 p-6 border border-[#EDEBE3] rounded-2xl bg-white">
            <h3 className='text-2xl font-medium'>Top Performing Doctors</h3>

            <div className="flex flex-col">
                {activityData.map((activity) => (
                    <div key={activity.id} className="border-t border-[#EDEBE3] py-3 w-full">
                        <div className="flex justify-between gap-3 items-center">
                            <div className="flex items-center gap-2">
                                <div className="size-10 rounded-full">
                                    <Image
                                        src={activity.imageUrl}
                                        width={40}
                                        height={40}
                                        alt={activity.patientName}
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                </div>
                                <div className="w-full flex-1 flex flex-col gap-1">
                                    <h4 className="text-bsse font-medium">{activity.patientName}</h4>
                                    <p className="text-xs font-normal">{activity.profession} • {activity.number}</p>
                                </div>
                            </div>
                            <div className=" flex flex-col items-end gap-1">
                                <h4 className="text-bsse font-medium">{activity.number}</h4>
                                <p className="text-xs font-normal">Total Cases</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        // </div>
    )
}

export default TopDoctors