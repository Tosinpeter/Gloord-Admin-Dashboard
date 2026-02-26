import React from 'react'
import ActivityCard from './ActivityCard'
import TopDoctors from './TopDoctors'

const ActivityOverview = () => {
    return (
        <div className='flex flex-col md:flex-row !gap-6'>
            <div className='max-w-[845px] w-full'>
                <ActivityCard />
            </div>
            <div className='flex-1 w-full'>
                <TopDoctors />
            </div>
        </div>
    )
}

export default ActivityOverview
