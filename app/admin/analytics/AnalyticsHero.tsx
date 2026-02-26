import { ArrowUp, ArrowDown } from 'lucide-react'
import React from 'react'

const data = [
    {
        id: 1,
        name: "Total Cases (This Month)",
        number: '98',
        bg: '#F0FDFA',
        rate: '+7.4%',
        image: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3337 28V25.3333C21.3337 23.9188 20.7718 22.5623 19.7716 21.5621C18.7714 20.5619 17.4148 20 16.0003 20H8.00033C6.58584 20 5.22928 20.5619 4.22909 21.5621C3.2289 22.5623 2.66699 23.9188 2.66699 25.3333V28" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0003 14.6667C14.9458 14.6667 17.3337 12.2789 17.3337 9.33333C17.3337 6.38781 14.9458 4 12.0003 4C9.05481 4 6.66699 6.38781 6.66699 9.33333C6.66699 12.2789 9.05481 14.6667 12.0003 14.6667Z" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.333 27.9985V25.3319C29.3321 24.1502 28.9388 23.0022 28.2148 22.0683C27.4908 21.1344 26.4772 20.4673 25.333 20.1719" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.333 4.17188C22.4802 4.46561 23.4971 5.13281 24.2232 6.06829C24.9493 7.00377 25.3435 8.15431 25.3435 9.33854C25.3435 10.5228 24.9493 11.6733 24.2232 12.6088C23.4971 13.5443 22.4802 14.2115 21.333 14.5052" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 2,
        name: "Approval Rate",
        number: '87.8%',
        bg: '#F0FDFA',
        rate: '+2.1%',
        image: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3337 28V25.3333C21.3337 23.9188 20.7718 22.5623 19.7716 21.5621C18.7714 20.5619 17.4148 20 16.0003 20H8.00033C6.58584 20 5.22928 20.5619 4.22909 21.5621C3.2289 22.5623 2.66699 23.9188 2.66699 25.3333V28" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0003 14.6667C14.9458 14.6667 17.3337 12.2789 17.3337 9.33333C17.3337 6.38781 14.9458 4 12.0003 4C9.05481 4 6.66699 6.38781 6.66699 9.33333C6.66699 12.2789 9.05481 14.6667 12.0003 14.6667Z" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.333 27.9985V25.3319C29.3321 24.1502 28.9388 23.0022 28.2148 22.0683C27.4908 21.1344 26.4772 20.4673 25.333 20.1719" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.333 4.17188C22.4802 4.46561 23.4971 5.13281 24.2232 6.06829C24.9493 7.00377 25.3435 8.15431 25.3435 9.33854C25.3435 10.5228 24.9493 11.6733 24.2232 12.6088C23.4971 13.5443 22.4802 14.2115 21.333 14.5052" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 3,
        name: "Avg Review Time",
        number: '8.2 hrs',
        bg: '#F0FDFA',
        rate: '+12%',
        image: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3337 28V25.3333C21.3337 23.9188 20.7718 22.5623 19.7716 21.5621C18.7714 20.5619 17.4148 20 16.0003 20H8.00033C6.58584 20 5.22928 20.5619 4.22909 21.5621C3.2289 22.5623 2.66699 23.9188 2.66699 25.3333V28" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0003 14.6667C14.9458 14.6667 17.3337 12.2789 17.3337 9.33333C17.3337 6.38781 14.9458 4 12.0003 4C9.05481 4 6.66699 6.38781 6.66699 9.33333C6.66699 12.2789 9.05481 14.6667 12.0003 14.6667Z" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.333 27.9985V25.3319C29.3321 24.1502 28.9388 23.0022 28.2148 22.0683C27.4908 21.1344 26.4772 20.4673 25.333 20.1719" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.333 4.17188C22.4802 4.46561 23.4971 5.13281 24.2232 6.06829C24.9493 7.00377 25.3435 8.15431 25.3435 9.33854C25.3435 10.5228 24.9493 11.6733 24.2232 12.6088C23.4971 13.5443 22.4802 14.2115 21.333 14.5052" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 4,
        name: "Rejection Rate",
        number: '12.2%',
        bg: '#F0FDFA',
        rate: '-1.8%',
        image: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3337 28V25.3333C21.3337 23.9188 20.7718 22.5623 19.7716 21.5621C18.7714 20.5619 17.4148 20 16.0003 20H8.00033C6.58584 20 5.22928 20.5619 4.22909 21.5621C3.2289 22.5623 2.66699 23.9188 2.66699 25.3333V28" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.0003 14.6667C14.9458 14.6667 17.3337 12.2789 17.3337 9.33333C17.3337 6.38781 14.9458 4 12.0003 4C9.05481 4 6.66699 6.38781 6.66699 9.33333C6.66699 12.2789 9.05481 14.6667 12.0003 14.6667Z" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M29.333 27.9985V25.3319C29.3321 24.1502 28.9388 23.0022 28.2148 22.0683C27.4908 21.1344 26.4772 20.4673 25.333 20.1719" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.333 4.17188C22.4802 4.46561 23.4971 5.13281 24.2232 6.06829C24.9493 7.00377 25.3435 8.15431 25.3435 9.33854C25.3435 10.5228 24.9493 11.6733 24.2232 12.6088C23.4971 13.5443 22.4802 14.2115 21.333 14.5052" stroke="#009689" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
]

const AnalyticsHero = () => {
    // Function to determine if rate is positive or negative
    const isPositiveRate = (rate: string) => {
        return rate.startsWith('+');
    }

    // Function to get rate value without the sign
    const getRateValue = (rate: string) => {
        return rate.replace('+', '+').replace('-', '-');
    }

    return (
        <div className='bg-[#F6F0EE] rounded-xl p-5 flex flex-col gap-6'>
            <div className="flex flex-col gap-2">
                <h3 className='text-[28px] font-medium'>Analytics Overview</h3>
                <p className='text-sm font-normal'>System performance and insights</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4'>
                {data.map((datum) => {
                    const isPositive = isPositiveRate(datum.rate);
                    const rateValue = getRateValue(datum.rate);

                    return (
                        <div key={datum.id} className="relative border border-sec py-6 px-5 rounded-xl bg-white flex gap-3 items-center">
                            <div className={`size-16 flex items-center justify-center rounded-full`} style={{ backgroundColor: datum.bg }}>
                                {datum.image}
                            </div>
                            <div className="w-full flex-1 flex flex-col gap-3">
                                <h3 className='font-bold text-2xl md:text-[32px]'>{datum.number}</h3>
                                <p className='font-normal text-sm md:text-base'>{datum.name}</p>
                            </div>
                            <div className={`border absolute right-3.5 top-3.5 flex items-center justify-center gap-1 h-6 px-2.5 w-max rounded-full ${isPositive
                                ? 'border-[#ABEFC6] bg-[#ECFDF3]'
                                : 'border-[#FECACA] bg-[#FEF2F2]'
                                }`}>
                                {isPositive ? (
                                    <ArrowUp size={12} className='text-[#17B26A]' />
                                ) : (
                                    <ArrowDown size={12} className='text-[#F04438]' />
                                )}
                                <span className={`text-sm font-medium ${isPositive ? 'text-[#067647]' : 'text-[#B42318]'
                                    }`}>
                                    {rateValue}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default AnalyticsHero