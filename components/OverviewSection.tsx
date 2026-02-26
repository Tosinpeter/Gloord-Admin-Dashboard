import React from 'react'
import OverviewCard from './OverviewCard'

const OverviewSection = () => {
    return (
        <div className='bg-[url(/images/overviewhero.png)] bg-cover bg-no-repeat backdrop-blur-[12] rounded-xl p-5 flex flex-col gap-6'>
            <div className="flex flex-col gap-2">
                <h3 className='text-[28px] font-medium'>Overview</h3>
                <p className='text-sm font-normal'>Review and manage patient treatment plans</p>
            </div>
            <OverviewCard />
        </div>
    )
}

export default OverviewSection
