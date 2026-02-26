import { Calendar, CircleAlert } from 'lucide-react'
import React from 'react'
import patientimage from '@/public/images/patientimage.png'
import Image from 'next/image'
import Link from 'next/link'

// Define props interface
interface PendingPatientCardProps {
    searchQuery?: string;
}

interface Patient {
    id: string;
    date: string;
    status: "Pending";
    statusClass: string;
    skinConcern: string;
    image: any;
}

const PendingPatientCard = ({
    searchQuery = ''
}: PendingPatientCardProps) => {
    // All pending patients data with unique IDs and concerns
    const allPatients: Patient[] = [
        {
            id: "P-45123",
            date: "Jan 24, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Acne and hyperpigmentation on cheeks and forehead",
            image: patientimage
        },
        {
            id: "P-78901",
            date: "Jan 25, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Severe eczema on arms and neck with itching",
            image: patientimage
        },
        {
            id: "P-23456",
            date: "Jan 26, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Rosacea with redness and visible blood vessels",
            image: patientimage
        },
        {
            id: "P-67890",
            date: "Jan 27, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Psoriasis patches on elbows and knees",
            image: patientimage
        },
        {
            id: "P-34567",
            date: "Jan 28, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Melasma on forehead and upper lip",
            image: patientimage
        },
        {
            id: "P-89012",
            date: "Jan 29, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Contact dermatitis from new skincare product",
            image: patientimage
        },
        {
            id: "P-45678",
            date: "Jan 30, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Cystic acne on chin and jawline",
            image: patientimage
        },
        {
            id: "P-90123",
            date: "Feb 1, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Seborrheic dermatitis on scalp and face",
            image: patientimage
        },
        {
            id: "P-56789",
            date: "Feb 2, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Hives and allergic reaction to medication",
            image: patientimage
        }
    ]

    // Filter patients based on search query only
    const filteredPatients = allPatients.filter(patient => {
        // Search filter
        const matchesSearch = searchQuery === '' ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.skinConcern.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                    <div key={`${patient.id}-${index}`} className='border border-sec rounded-2xl bg-white p-6 flex flex-col gap-3 md:gap-6'>
                        <div className="flex justify-between">
                            <div className="flex gap-2 md:gap-4">
                                <div className="size-14 rounded-full">
                                    <Image src={patient.image} width={56} height={56} className='size-[56px] rounded-full object-contain' alt='image' />
                                </div>
                                <div className="w-full flex-1 flex flex-col gap-1">
                                    <h4 className='text-xl font-medium leading-[100%] tracking-[-0.64px]'>Patient ID: {patient.id}</h4>
                                    <div className="flex items-center gap-2 text-lg font-normal">
                                        <Calendar size={20} />
                                        <span className='tracking-[0]'>{patient.date}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={`w-max h-fit py-1.5 px-4 font-normal text-base border rounded-full ${patient.statusClass}`}>
                                {patient.status}
                            </span>
                        </div>

                        <div className="h-[1px] bg-sec w-full"></div>

                        <div className="flex gap-3">
                            <CircleAlert size={20} />
                            <div className="flex flex-col gap-3">
                                <h3 className='text-xl font-normal leading-[100%]'>Skin Concern:</h3>
                                <p className='text-base font-normal leading-[130%] h-[40px]'>{patient.skinConcern}</p>
                            </div>
                        </div>

                        <Link href='/doctor/case-review' className="mt-2">
                            <button className="bg-sec text-tet rounded-full w-full h-12 font-normal text-base border-none focus:outline-none hover:bg-sec/80 transition-colors">
                                Review Case
                            </button>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="col-span-3 text-center py-12 text-gray-500">
                    No pending patients found matching your search.
                </div>
            )}
        </div>
    )
}

export default PendingPatientCard