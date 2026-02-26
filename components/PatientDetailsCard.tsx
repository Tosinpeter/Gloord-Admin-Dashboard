import { Calendar, CircleAlert } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import patientimage from '@/public/images/patientimage.png'
import Link from 'next/link'

// Define props interface
interface PatientDetailsCardProps {
    searchQuery?: string;
    selectedFilter?: string;
    dateRange?: {
        startDate: string;
        endDate: string;
        display: string;
    };
    activeTab?: string;
}

interface Patient {
    id: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    statusClass: string;
    skinConcern: string;
    image: any;
}

const PatientDetailsCard = ({
    searchQuery = '',
    selectedFilter = 'all',
    dateRange,
    activeTab = 'pending'
}: PatientDetailsCardProps) => {
    // All patients data
    const allPatients: Patient[] = [
        {
            id: "P-45123",
            date: "Jan 24, 2026",
            status: "Approved",
            statusClass: "bg-[#DCFCE7] border-[#B9F8CF] text-[#016630]",
            skinConcern: "Acne and hyperpigmentation on cheeks and forehead",
            image: patientimage
        },
        {
            id: "P-67890",
            date: "Jan 25, 2026",
            status: "Approved",
            statusClass: "bg-[#DCFCE7] border-[#B9F8CF] text-[#016630]",
            skinConcern: "Rosacea with redness and visible blood vessels",
            image: patientimage
        },
        {
            id: "P-54321",
            date: "Jan 26, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Eczema flare-up on arms and neck",
            image: patientimage
        },
        {
            id: "P-98765",
            date: "Jan 27, 2026",
            status: "Rejected",
            statusClass: "bg-[#FFE2E2] border-[#FFC9C9] text-[#9F0712]",
            skinConcern: "Psoriasis patches on elbows and knees",
            image: patientimage
        },
        {
            id: "P-11223",
            date: "Jan 28, 2026",
            status: "Pending",
            statusClass: "bg-[#FEF3C6] border-[#FEE685] text-pry",
            skinConcern: "Melasma on forehead and upper lip",
            image: patientimage
        },
        {
            id: "P-44556",
            date: "Jan 29, 2026",
            status: "Approved",
            statusClass: "bg-[#DCFCE7] border-[#B9F8CF] text-[#016630]",
            skinConcern: "Contact dermatitis from new skincare product",
            image: patientimage
        }
    ]

    // Filter patients based on search query, selected filter, active tab, and date
    const filteredPatients = allPatients.filter(patient => {
        // First filter by active tab (Pending, Approved, Rejected)
        const matchesTab = patient.status.toLowerCase() === activeTab.toLowerCase()

        // Then apply search filter if there's a search query
        const matchesSearch = searchQuery === '' ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.skinConcern.toLowerCase().includes(searchQuery.toLowerCase())

        // Apply status filter if selected (and if it's not 'all')
        const matchesFilter = selectedFilter === 'all' ||
            patient.status.toLowerCase() === selectedFilter.toLowerCase()

        // Apply date filter if selected date exists (you can customize this logic)
        // This is a simple example - you might want to implement actual date comparison
        const matchesDate = !dateRange || true

        // Return true only if all conditions match
        return matchesTab && matchesSearch && matchesFilter && matchesDate
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                    <div key={`${patient.id}-${index}`} className='border border-sec rounded-2xl bg-white p-6 flex flex-col gap-4 md:gap-6'>
                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <div className="size-14 rounded-full">
                                    <Image src={patient.image} width={56} height={56} className='size-[56px] rounded-full object-contain' alt='image' />
                                </div>
                                <div className="w-full flex-1 flex flex-col gap-1">
                                    <h4 className='text-2xl font-medium leading-[100%]'>Patient ID: {patient.id}</h4>
                                    <div className="flex items-center gap-2 text-xl font-normal">
                                        <Calendar size={20} />
                                        <span>{patient.date}</span>
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
                                <p className='text-lg font-normal md:leading-[100%]'>{patient.skinConcern}</p>
                            </div>
                        </div>

                        <Link href='/doctor/case-review' className="mt-2">
                            <button className="bg-pry text-white rounded-full w-full h-[52px] font-normal text-base border-none focus:outline-none">
                                Review Case
                            </button>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="col-span-2 text-center py-12 text-gray-500">
                    No patients found matching your criteria.
                </div>
            )}
        </div>
    )
}

export default PatientDetailsCard