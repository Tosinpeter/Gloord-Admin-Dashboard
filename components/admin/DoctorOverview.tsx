import React from 'react'
import TopDoctors from './TopDoctors'
import DoctorActivity from './DoctorActivity'

const DoctorOverview = () => {
    return (
        <div className='flex flex-col md:flex-row !gap-6'>
            <div className='max-w-[845px] w-full'>
                <DoctorActivity />
            </div>
            <div className='flex-1 w-full'>
                <TopDoctors />
            </div>
        </div>
    )
}

export default DoctorOverview
