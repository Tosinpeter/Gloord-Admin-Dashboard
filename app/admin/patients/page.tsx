'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ChevronLeft, ChevronRight, EllipsisVertical, ListFilter, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import Link from 'next/link'
import { readCachedJson, writeCachedJson } from '@/lib/cache'

interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    concern: string;
    totalCases: number;
    approved: number;
    pending: number;
    rejected: number;
    lastVisit: string;
    status: 'active' | 'inactive';
    image: string;
}

interface Filter {
    value: string;
    label: string;
}

const ROWS_PER_PAGE = 8
const PATIENTS_CACHE_KEY = 'admin_patients_cache_v1'

const patientsData: Patient[] = [
    { id: 'P-45123', name: 'Sarah Johnson', email: 'sarah.j@mail.com', phone: '+1 (555) 123-4567', age: 28, gender: 'Female', concern: 'Eczema', totalCases: 3, approved: 2, pending: 1, rejected: 0, lastVisit: 'Jan 24, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45124', name: 'Michael Chen', email: 'michael.c@mail.com', phone: '+1 (555) 234-5678', age: 45, gender: 'Male', concern: 'Psoriasis', totalCases: 7, approved: 5, pending: 1, rejected: 1, lastVisit: 'Feb 15, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45125', name: 'Emily Rodriguez', email: 'emily.r@mail.com', phone: '+1 (555) 345-6789', age: 32, gender: 'Female', concern: 'Acne scarring', totalCases: 2, approved: 1, pending: 0, rejected: 1, lastVisit: 'Mar 02, 2026', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'P-45126', name: 'James Wilson', email: 'james.w@mail.com', phone: '+1 (555) 456-7890', age: 61, gender: 'Male', concern: 'Skin cancer screening', totalCases: 12, approved: 9, pending: 2, rejected: 1, lastVisit: 'Dec 18, 2025', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45127', name: 'Maria Garcia', email: 'maria.g@mail.com', phone: '+1 (555) 567-8901', age: 29, gender: 'Female', concern: 'Rosacea', totalCases: 1, approved: 1, pending: 0, rejected: 0, lastVisit: 'Mar 10, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45128', name: 'Robert Smith', email: 'robert.s@mail.com', phone: '+1 (555) 678-9012', age: 52, gender: 'Male', concern: 'Dermatitis', totalCases: 5, approved: 3, pending: 1, rejected: 1, lastVisit: 'Feb 28, 2026', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'P-45129', name: 'Jennifer Lee', email: 'jennifer.l@mail.com', phone: '+1 (555) 789-0123', age: 35, gender: 'Female', concern: 'Hyperpigmentation', totalCases: 4, approved: 3, pending: 1, rejected: 0, lastVisit: 'Jan 05, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45130', name: 'David Brown', email: 'david.b@mail.com', phone: '+1 (555) 890-1234', age: 41, gender: 'Male', concern: 'Melanoma follow-up', totalCases: 8, approved: 6, pending: 1, rejected: 1, lastVisit: 'Nov 12, 2025', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'P-45131', name: 'Lisa Anderson', email: 'lisa.a@mail.com', phone: '+1 (555) 901-2345', age: 27, gender: 'Female', concern: 'Acne vulgaris', totalCases: 2, approved: 1, pending: 1, rejected: 0, lastVisit: 'Mar 18, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45132', name: 'Thomas Martinez', email: 'thomas.m@mail.com', phone: '+1 (555) 012-3456', age: 38, gender: 'Male', concern: 'Contact dermatitis', totalCases: 6, approved: 4, pending: 1, rejected: 1, lastVisit: 'Feb 03, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45133', name: 'Patricia Taylor', email: 'patricia.t@mail.com', phone: '+1 (555) 112-4567', age: 57, gender: 'Female', concern: 'Skin tags', totalCases: 15, approved: 11, pending: 2, rejected: 2, lastVisit: 'Oct 30, 2025', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'P-45134', name: 'Kevin White', email: 'kevin.w@mail.com', phone: '+1 (555) 223-5678', age: 33, gender: 'Male', concern: 'Fungal infection', totalCases: 3, approved: 2, pending: 1, rejected: 0, lastVisit: 'Mar 22, 2026', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45135', name: 'Nancy Moore', email: 'nancy.m@mail.com', phone: '+1 (555) 334-6789', age: 49, gender: 'Female', concern: 'Melasma', totalCases: 9, approved: 7, pending: 1, rejected: 1, lastVisit: 'Dec 05, 2025', status: 'active', image: '/images/patientimage.png' },
    { id: 'P-45136', name: 'Daniel Jackson', email: 'daniel.j@mail.com', phone: '+1 (555) 445-7890', age: 44, gender: 'Male', concern: 'Vitiligo', totalCases: 11, approved: 8, pending: 2, rejected: 1, lastVisit: 'Jan 19, 2026', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'P-45137', name: 'Michelle Thompson', email: 'michelle.t@mail.com', phone: '+1 (555) 556-8901', age: 31, gender: 'Female', concern: 'Sun damage', totalCases: 4, approved: 3, pending: 1, rejected: 0, lastVisit: 'Feb 21, 2026', status: 'active', image: '/images/patientimage.png' },
]

const Page = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [patients, setPatients] = useState<Patient[]>(patientsData)
    const [isOffline, setIsOffline] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const filters: Filter[] = [
        { value: 'all', label: 'All Patients' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ]

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter)
        setIsFilterOpen(false)
        setCurrentPage(1)
    }

    const filteredPatients = patients.filter(patient => {
        const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter
        const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.concern.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const totalPages = Math.ceil(filteredPatients.length / ROWS_PER_PAGE)
    const effectiveCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
    const paginatedPatients = filteredPatients.slice(
        (effectiveCurrentPage - 1) * ROWS_PER_PAGE,
        effectiveCurrentPage * ROWS_PER_PAGE,
    )

    useEffect(() => {
        const cachedPatients = readCachedJson<Patient[]>(PATIENTS_CACHE_KEY)
        if (cachedPatients?.length) {
            setTimeout(() => {
                setPatients(cachedPatients)
            }, 0)
        } else {
            writeCachedJson(PATIENTS_CACHE_KEY, patientsData)
        }

        const syncConnectivity = () => {
            const offline = !window.navigator.onLine
            setIsOffline(offline)
            setIsReadOnly(offline && !!readCachedJson<Patient[]>(PATIENTS_CACHE_KEY)?.length)
        }

        syncConnectivity()
        window.addEventListener('online', syncConnectivity)
        window.addEventListener('offline', syncConnectivity)

        return () => {
            window.removeEventListener('online', syncConnectivity)
            window.removeEventListener('offline', syncConnectivity)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isFilterOpen &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node) &&
                filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)
            ) setIsFilterOpen(false)

            if (openMenuId && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isFilterOpen, openMenuId])

    const activeCount = patients.filter(p => p.status === 'active').length
    const inactiveCount = patients.filter(p => p.status === 'inactive').length

    return (
        <div>
            <div className="container mx-auto mb-20">
                <AdminHeader />

                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h2 className='text-2xl font-semibold text-gray-900'>Patient Management</h2>
                        <p className='text-sm text-gray-500'>
                            {patients.length} patients &middot; {activeCount} active &middot; {inactiveCount} inactive
                        </p>
                        {isReadOnly && (
                            <p className='text-sm text-[#9A3412]'>
                                Offline mode: cached patient data is read-only until connection is restored.
                            </p>
                        )}
                        {isOffline && !isReadOnly && (
                            <p className='text-sm text-[#9A3412]'>
                                You are offline. Actions that require network may fail.
                            </p>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-start md:items-center">
                            <div className="flex items-center gap-2 border border-[#EDEBE3] bg-white w-[280px] h-[42px] rounded-full px-4">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="search"
                                    placeholder='Search by name, ID, or concern...'
                                    className='border-none h-full w-full focus:outline-none bg-transparent text-sm'
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    ref={filterButtonRef}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 border border-[#EDEBE3] bg-white w-max h-[42px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                                >
                                    <ListFilter size={18} />
                                    <span className='text-sm font-normal w-max'>
                                        {filters.find(f => f.value === selectedFilter)?.label || 'Filter'}
                                    </span>
                                </button>
                                <div ref={filterDropdownRef}>
                                    {isFilterOpen && (
                                        <div className="absolute left-0 mt-2 w-[170px] bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                                            <div className="p-1.5">
                                                {filters.map((filter) => (
                                                    <button
                                                        key={filter.value}
                                                        onClick={() => handleFilterSelect(filter.value)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedFilter === filter.value ? 'bg-[#EDEBE3] font-medium' : 'hover:bg-gray-50'}`}
                                                    >
                                                        {filter.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-[#EDEBE3] rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#FAFAF8] hover:bg-[#FAFAF8]">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Patient</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Concern</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider">Age</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider">Cases</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Approved</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Pending</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Visit</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="pr-6 w-10"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedPatients.map((patient) => (
                                    <TableRow key={patient.id} className="hover:bg-[#FAFAF8] group">
                                        <TableCell className="pl-6">
                                            <Link href={`/admin/patients/${patient.id}`} className="flex items-center gap-3">
                                                <div className="size-9 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                                    <Image src={patient.image} width={36} height={36} alt={patient.name} className='size-9 object-cover rounded-full' />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className='font-medium text-sm text-gray-900 group-hover:text-pry transition-colors'>{patient.name}</span>
                                                    <span className='text-xs text-gray-400'>{patient.id}</span>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <span className="text-sm text-gray-600">{patient.concern}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-sm text-gray-700">{patient.age}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-sm font-medium text-gray-900">{patient.totalCases}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden md:table-cell">
                                            <span className="text-sm text-[#17B26A]">{patient.approved}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden lg:table-cell">
                                            <span className="text-sm text-[#F79009]">{patient.pending}</span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-sm text-gray-500">{patient.lastVisit}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${
                                                patient.status === 'active'
                                                    ? 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]'
                                                    : 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]'
                                            }`}>
                                                <span className={`size-1.5 rounded-full mr-1.5 ${patient.status === 'active' ? 'bg-[#17B26A]' : 'bg-[#F04438]'}`} />
                                                {patient.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="pr-6">
                                            <div className="relative" ref={openMenuId === patient.id ? menuRef : undefined}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setOpenMenuId(openMenuId === patient.id ? null : patient.id) }}
                                                    className="size-8 flex items-center justify-center rounded-lg hover:bg-[#EDEBE3] transition-colors"
                                                >
                                                    <EllipsisVertical size={16} className='text-gray-400' />
                                                </button>
                                                {openMenuId === patient.id && (
                                                    <div className="absolute right-0 top-full mt-1 w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                                        <div className="p-1.5">
                                                            <Link
                                                                href={`/admin/patients/${patient.id}`}
                                                                className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                                                            >
                                                                View Details
                                                            </Link>
                                                            <Link
                                                                href="/admin/case-review"
                                                                className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                                                            >
                                                                View Cases
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredPatients.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-base font-medium">No patients found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-[#EDEBE3]">
                                <p className="text-sm text-gray-500">
                                    Showing {(effectiveCurrentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(effectiveCurrentPage * ROWS_PER_PAGE, filteredPatients.length)} of {filteredPatients.length}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(Math.max(1, effectiveCurrentPage - 1))}
                                        disabled={effectiveCurrentPage === 1}
                                        className="size-8 flex items-center justify-center rounded-lg border border-[#EDEBE3] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            className={`size-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                                page === effectiveCurrentPage
                                                    ? 'bg-pry text-white'
                                                    : 'hover:bg-gray-50 text-gray-600'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(Math.min(totalPages, effectiveCurrentPage + 1))}
                                        disabled={effectiveCurrentPage === totalPages}
                                        className="size-8 flex items-center justify-center rounded-lg border border-[#EDEBE3] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
