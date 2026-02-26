'use client'
import React, { useState, useRef, useEffect } from 'react'
import CalendarDropdown, { type DateRange } from './CalendarDropdown'
import { Calendar, Search } from 'lucide-react'
import ApprovedPatientCard from './ApprovedPatientCard'

const ApprovedCasesSection = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: '2024-01-06',
        endDate: '2024-01-13',
        display: 'Jan 6, 2024 – Jan 13, 2024'
    })
    const [searchQuery, setSearchQuery] = useState('')
    const calendarButtonRef = useRef<HTMLButtonElement>(null)
    const calendarDropdownRef = useRef<HTMLDivElement>(null)

    const handleDateSelect = (range: DateRange) => {
        setDateRange(range)
        setIsCalendarOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isCalendarOpen &&
                calendarButtonRef.current &&
                !calendarButtonRef.current.contains(event.target as Node) &&
                calendarDropdownRef.current &&
                !calendarDropdownRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isCalendarOpen])

    return (
        <div className='flex flex-col gap-10'>
            <div className="flex flex-col gap-4">
                <h2 className='text-2xl font-semibold text-gray-900'>Approved Cases</h2>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
                    <p className="text-gray-600 max-w-2xl">
                        Treatment plans that have been approved and activated for patients
                    </p>
                    <div className="flex flex-col w-full md:w-max md:flex-row gap-2 md:items-center items-start">
                        {/* Search Input */}
                        <div className="flex items-center gap-2 border border-gray-300 md:w-[364px] w-full h-[44px] rounded-full px-4 hover:border-gray-400 transition-colors">
                            <Search size={20} className="text-gray-500" />
                            <input
                                type="search"
                                placeholder='Search by patient ID or concern...'
                                className='border-none h-full w-full focus:outline-none bg-transparent text-gray-700 placeholder-gray-500 text-sm'
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Calendar Dropdown */}
                        <div className="relative">
                            <button
                                ref={calendarButtonRef}
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                                className="flex items-center gap-2 border border-gray-300 w-full md:w-max h-[44px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                            >
                                <Calendar size={20} className="text-gray-700" />
                                <span className='text-sm font-normal text-gray-700 w-max'>{dateRange.display}</span>
                            </button>

                            <div ref={calendarDropdownRef}>
                                <CalendarDropdown
                                    isOpen={isCalendarOpen}
                                    onClose={() => setIsCalendarOpen(false)}
                                    onDateSelect={handleDateSelect}
                                    selectedStartDate={dateRange.startDate}
                                    selectedEndDate={dateRange.endDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <ApprovedPatientCard
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    )
}

export default ApprovedCasesSection