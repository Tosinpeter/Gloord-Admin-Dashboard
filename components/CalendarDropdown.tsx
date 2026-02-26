'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface DateRange {
    startDate: string;
    endDate: string;
    display: string;
}

interface CalendarDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onDateSelect: (range: DateRange) => void;
    selectedStartDate: string;
    selectedEndDate: string;
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function toDateString(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
}

function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const CalendarDropdown = ({
    isOpen,
    onClose,
    onDateSelect,
    selectedStartDate,
    selectedEndDate,
}: CalendarDropdownProps) => {
    const [rangeStart, setRangeStart] = useState<Date | null>(
        selectedStartDate ? new Date(selectedStartDate) : null
    )
    const [rangeEnd, setRangeEnd] = useState<Date | null>(
        selectedEndDate ? new Date(selectedEndDate) : null
    )
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = useState<Date>(
        new Date(selectedStartDate || new Date())
    )
    const dropdownRef = useRef<HTMLDivElement>(null)

    const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    const getDaysInMonth = (date: Date): (Date | null)[] => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()

        const firstDayOfWeek = firstDay.getDay()
        const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

        const days: (Date | null)[] = []

        for (let i = 0; i < startDay; i++) {
            days.push(null)
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i))
        }

        return days
    }

    const commitRange = (start: Date, end: Date) => {
        let s = start
        let e = end
        if (s > e) { [s, e] = [e, s] }

        const display = isSameDay(s, e)
            ? formatDate(s)
            : `${formatDate(s)} – ${formatDate(e)}`

        onDateSelect({
            startDate: toDateString(s),
            endDate: toDateString(e),
            display,
        })
    }

    const handleDayClick = (day: Date | null) => {
        if (!day) return

        if (!rangeStart || rangeEnd) {
            setRangeStart(day)
            setRangeEnd(null)
        } else {
            let start = rangeStart
            let end = day
            if (start > end) { [start, end] = [end, start] }
            setRangeStart(start)
            setRangeEnd(end)
            commitRange(start, end)
        }
    }

    const applyQuickRange = (start: Date, end: Date) => {
        const s = stripTime(start)
        const e = stripTime(end)
        setRangeStart(s)
        setRangeEnd(e)
        setCurrentMonth(new Date(s.getFullYear(), s.getMonth(), 1))
        commitRange(s, e)
    }

    const goToPreviousMonth = (): void => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }

    const goToNextMonth = (): void => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    const isToday = (date: Date): boolean => {
        return isSameDay(date, new Date())
    }

    const isInRange = (date: Date): boolean => {
        if (!rangeStart) return false
        const end = rangeEnd || hoveredDate
        if (!end) return false

        const d = stripTime(date).getTime()
        const s = stripTime(rangeStart).getTime()
        const e = stripTime(end).getTime()

        const lo = Math.min(s, e)
        const hi = Math.max(s, e)
        return d >= lo && d <= hi
    }

    const isRangeEdge = (date: Date): boolean => {
        if (!rangeStart) return false
        if (isSameDay(date, rangeStart)) return true
        const end = rangeEnd || hoveredDate
        if (end && isSameDay(date, end)) return true
        return false
    }

    const quickSelects = [
        {
            label: 'Today',
            action: () => {
                const t = new Date()
                applyQuickRange(t, t)
            }
        },
        {
            label: 'Last 7 Days',
            action: () => {
                const end = new Date()
                const start = new Date()
                start.setDate(start.getDate() - 6)
                applyQuickRange(start, end)
            }
        },
        {
            label: 'Last 30 Days',
            action: () => {
                const end = new Date()
                const start = new Date()
                start.setDate(start.getDate() - 29)
                applyQuickRange(start, end)
            }
        },
        {
            label: 'This Month',
            action: () => {
                const now = new Date()
                const start = new Date(now.getFullYear(), now.getMonth(), 1)
                applyQuickRange(start, now)
            }
        },
        {
            label: 'Last Month',
            action: () => {
                const now = new Date()
                const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
                const end = new Date(now.getFullYear(), now.getMonth(), 0)
                applyQuickRange(start, end)
            }
        },
    ]

    if (!isOpen) return null

    const days = getDaysInMonth(currentMonth)
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 md:right-0 left-0 md:left-auto mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden w-[300px] md:w-[325px]"
        >
            <div className="p-4">
                <div className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-gray-100">
                    {quickSelects.map((q) => (
                        <button
                            key={q.label}
                            type="button"
                            onClick={q.action}
                            className="px-2.5 py-1 text-xs font-medium rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            {q.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between px-1 py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700">
                        {monthName}
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={goToPreviousMonth}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mt-3 mb-2">
                    {weekdays.map((day: string) => (
                        <div key={day} className="text-center text-xs font-normal text-tet uppercase py-1">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-0">
                    {days.map((day: Date | null, index: number) => {
                        if (!day) {
                            return <div key={`empty-${index}`} className="h-9" />
                        }

                        const today = isToday(day)
                        const inRange = isInRange(day)
                        const edge = isRangeEdge(day)

                        return (
                            <button
                                key={day.getTime()}
                                type="button"
                                onClick={() => handleDayClick(day)}
                                onMouseEnter={() => {
                                    if (rangeStart && !rangeEnd) setHoveredDate(day)
                                }}
                                onMouseLeave={() => setHoveredDate(null)}
                                className={`
                                    h-9 flex items-center justify-center text-sm rounded-full
                                    transition-all duration-150
                                    ${edge
                                        ? 'bg-pry text-white font-medium'
                                        : inRange
                                            ? 'bg-pry/10 text-pry'
                                            : today
                                                ? 'text-pry font-semibold hover:bg-gray-100'
                                                : 'text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {day.getDate()}
                            </button>
                        )
                    })}
                </div>

                {rangeStart && !rangeEnd && (
                    <p className="text-xs text-gray-400 text-center mt-2">Click another date to complete the range</p>
                )}
            </div>
        </div>
    )
}

export default CalendarDropdown
