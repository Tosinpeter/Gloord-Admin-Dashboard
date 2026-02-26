'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Calendar, ListFilter, Search } from 'lucide-react'
import PatientDetailsCard from './PatientDetailsCard'
import CalendarDropdown, { type DateRange } from './CalendarDropdown'

// Define filter type
interface Filter {
    value: string;
    label: string;
}

// Define patient type to match the structure in PatientDetailsCard
interface Patient {
    id: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    statusClass: string;
    skinConcern: string;
    image: any; // You can use StaticImageData type here
}

const DetailsSection = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: '2024-01-06',
        endDate: '2024-01-13',
        display: 'Jan 6, 2024 – Jan 13, 2024'
    })
    const [selectedFilter, setSelectedFilter] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string>('pending')

    // Typed refs
    const calendarButtonRef = useRef<HTMLButtonElement>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const calendarDropdownRef = useRef<HTMLDivElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)

    const filters: Filter[] = [
        { value: 'all', label: 'All Status' },
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' }
    ]

    const handleDateSelect = (range: DateRange) => {
        setDateRange(range)
    }

    // Typed filter handler
    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter)
        setIsFilterOpen(false)
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check for calendar dropdown
            if (isCalendarOpen &&
                calendarButtonRef.current &&
                !calendarButtonRef.current.contains(event.target as Node) &&
                calendarDropdownRef.current &&
                !calendarDropdownRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false)
            }

            // Check for filter dropdown
            if (isFilterOpen &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target as Node) &&
                filterDropdownRef.current &&
                !filterDropdownRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isCalendarOpen, isFilterOpen])

    return (
        <div className='py-8'>
            <div className="flex justify-between items-center">
                <Tabs defaultValue="pending" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center mb-6">
                        <TabsList className="bg-sec ml-0 rounded-full flex justify-start">
                            <TabsTrigger className='data-[state=active]:bg-tet' value="pending">Pending</TabsTrigger>
                            <TabsTrigger className='data-[state=active]:bg-tet' value="approved">Approved</TabsTrigger>
                            <TabsTrigger className='data-[state=active]:bg-tet' value="rejected">Rejected</TabsTrigger>
                        </TabsList>

                        <div className="flex flex-wrap gap-2 md:items-center items-start">
                            {/* Search Input */}
                            <div className="flex items-center gap-2 border border-sec w-[248px] h-[44px] rounded-full px-4">
                                <Search size={20} />
                                <input
                                    type="search"
                                    placeholder='Search for patients'
                                    className='border-none h-full w-full focus:outline-none bg-transparent'
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Calendar Dropdown */}
                            <div className="relative">
                                <button
                                    ref={calendarButtonRef}
                                    onClick={() => {
                                        setIsCalendarOpen(!isCalendarOpen)
                                        setIsFilterOpen(false)
                                    }}
                                    className="flex items-center gap-2 border border-sec w-max h-[44px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                                >
                                    <Calendar size={20} />
                                    <span className='text-sm font-normal w-max'>{dateRange.display}</span>
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

                            {/* Filter Dropdown */}
                            <div className="relative">
                                <button
                                    ref={filterButtonRef}
                                    onClick={() => {
                                        setIsFilterOpen(!isFilterOpen)
                                        setIsCalendarOpen(false) // Close calendar if open
                                    }}
                                    className="flex items-center gap-2 border border-sec w-max h-[44px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                                >
                                    <ListFilter size={20} />
                                    <span className='text-sm font-normal w-max'>Filter</span>
                                </button>

                                <div ref={filterDropdownRef}>
                                    {isFilterOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden p-2">
                                            <div className="flex flex-col gap-1.5">
                                                {filters.map((filter: Filter) => (
                                                    <button
                                                        key={filter.value}
                                                        onClick={() => handleFilterSelect(filter.value)}
                                                        className={`w-full text-left px-3 py-[7px] hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between ${selectedFilter === filter.value ? 'bg-sec text-tet' : 'text-gray-700'
                                                            }`}
                                                    >
                                                        <span className="text-sm">{filter.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <TabsContent value="pending">
                        <PatientDetailsCard
                            searchQuery={searchQuery}
                            selectedFilter={selectedFilter}
                            dateRange={dateRange}
                            activeTab={activeTab}
                        />
                    </TabsContent>
                    <TabsContent value="approved">
                        <PatientDetailsCard
                            searchQuery={searchQuery}
                            selectedFilter={selectedFilter}
                            dateRange={dateRange}
                            activeTab={activeTab}
                        />
                    </TabsContent>
                    <TabsContent value="rejected">
                        <PatientDetailsCard
                            searchQuery={searchQuery}
                            selectedFilter={selectedFilter}
                            dateRange={dateRange}
                            activeTab={activeTab}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default DetailsSection