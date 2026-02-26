import React from 'react'
import one from '@/public/images/one.png'
import two from '@/public/images/two.png'
import three from '@/public/images/three.png'
import four from '@/public/images/four.png'
import Image from 'next/image'

const data = [
    {
        id: 1,
        name: "Pending Approval",
        number: 12,
        image: one
    },
    {
        id: 2,
        name: "Approved Today",
        number: 10,
        image: two
    },
    {
        id: 3,
        name: "Total Cases",
        number: 20,
        image: three
    },
    {
        id: 4,
        name: "Rejected",
        number: 6,
        image: four
    },
]
const OverviewCard = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
            {data.map((datum) =>
                <div key={datum.id} className="border border-sec rounded-xl bg-white flex items-center">
                    <div className="flex flex-col gap-3 w-full pl-4 md:pl-6">
                        <h3 className='font-bold text-2xl md:text-[40px] leading-[100%]'>{datum.number}</h3>
                        <p className='font-normal text-sm md:text-base'>{datum.name}</p>
                    </div>
                    <div className="w-[116px] rounded-r-xl">
                        <Image src={datum.image} width={116} height={116} className='size-[116px] object-contain' alt='image' />
                    </div>
                </div>
            )}

        </div>
    )
}

export default OverviewCard
