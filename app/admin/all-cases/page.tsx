'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ChevronLeft, ChevronRight, ListFilter, Search } from 'lucide-react'
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
import AccessGate from '@/components/AccessGate'

interface Case {
    id: string;
    caseId: string;
    patientName: string;
    patientId: string;
    doctorName: string;
    doctorId: string;
    concern: string;
    confidence: number;
    submitted: string;
    status: 'pending' | 'approved' | 'rejected';
    image: string;
}

interface Filter {
    value: string;
    label: string;
}

const ROWS_PER_PAGE = 8

const casesData: Case[] = [
    { id: '1', caseId: 'C001', patientName: 'Sarah Johnson', patientId: 'P-45123', doctorName: 'Dr. Sarah Johnson', doctorId: 'D003', concern: 'Acne and hyperpigmentation on cheeks', confidence: 92, submitted: 'Jan 24, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '2', caseId: 'C002', patientName: 'Michael Chen', patientId: 'P-45124', doctorName: 'Dr. Michael Chen', doctorId: 'D004', concern: 'Plaque psoriasis on elbows and knees', confidence: 94, submitted: 'Feb 15, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '3', caseId: 'C003', patientName: 'Emily Rodriguez', patientId: 'P-45125', doctorName: 'Dr. Emily Rodriguez', doctorId: 'D005', concern: 'Severe cystic acne scarring', confidence: 78, submitted: 'Mar 02, 2026', status: 'pending', image: '/images/patientimage.png' },
    { id: '4', caseId: 'C004', patientName: 'James Wilson', patientId: 'P-45126', doctorName: 'Dr. James Wilson', doctorId: 'D006', concern: 'Suspicious mole on upper back', confidence: 97, submitted: 'Dec 18, 2025', status: 'rejected', image: '/images/patientimage.png' },
    { id: '5', caseId: 'C005', patientName: 'Maria Garcia', patientId: 'P-45127', doctorName: 'Dr. Maria Garcia', doctorId: 'D007', concern: 'Rosacea with persistent redness', confidence: 89, submitted: 'Mar 10, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '6', caseId: 'C006', patientName: 'Robert Smith', patientId: 'P-45128', doctorName: 'Dr. Robert Smith', doctorId: 'D008', concern: 'Contact dermatitis on hands', confidence: 85, submitted: 'Feb 28, 2026', status: 'pending', image: '/images/patientimage.png' },
    { id: '7', caseId: 'C007', patientName: 'Jennifer Lee', patientId: 'P-45129', doctorName: 'Dr. Jennifer Lee', doctorId: 'D009', concern: 'Melasma and dark spots', confidence: 91, submitted: 'Jan 05, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '8', caseId: 'C008', patientName: 'David Brown', patientId: 'P-45130', doctorName: 'Dr. James Wilson', doctorId: 'D006', concern: 'Melanoma post-surgery follow-up', confidence: 96, submitted: 'Nov 12, 2025', status: 'rejected', image: '/images/patientimage.png' },
    { id: '9', caseId: 'C009', patientName: 'Lisa Anderson', patientId: 'P-45131', doctorName: 'Dr. Lisa Anderson', doctorId: 'D011', concern: 'Chronic eczema on inner elbows', confidence: 88, submitted: 'Mar 18, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '10', caseId: 'C010', patientName: 'Thomas Martinez', patientId: 'P-45132', doctorName: 'Dr. Thomas Martinez', doctorId: 'D012', concern: 'Psoriatic arthritis skin symptoms', confidence: 82, submitted: 'Feb 03, 2026', status: 'pending', image: '/images/patientimage.png' },
    { id: '11', caseId: 'C011', patientName: 'Patricia Taylor', patientId: 'P-45133', doctorName: 'Dr. Patricia Taylor', doctorId: 'D013', concern: 'Multiple skin tags on neck', confidence: 93, submitted: 'Oct 30, 2025', status: 'rejected', image: '/images/patientimage.png' },
    { id: '12', caseId: 'C012', patientName: 'Kevin White', patientId: 'P-45134', doctorName: 'Dr. Kevin White', doctorId: 'D014', concern: 'Tinea versicolor on torso', confidence: 90, submitted: 'Mar 22, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '13', caseId: 'C013', patientName: 'Nancy Moore', patientId: 'P-45135', doctorName: 'Dr. Nancy Moore', doctorId: 'D015', concern: 'Perioral dermatitis flare-up', confidence: 87, submitted: 'Dec 05, 2025', status: 'pending', image: '/images/patientimage.png' },
    { id: '14', caseId: 'C014', patientName: 'Daniel Jackson', patientId: 'P-45136', doctorName: 'Dr. Daniel Jackson', doctorId: 'D016', concern: 'Progressive vitiligo patches', confidence: 76, submitted: 'Jan 19, 2026', status: 'approved', image: '/images/patientimage.png' },
    { id: '15', caseId: 'C015', patientName: 'Michelle Thompson', patientId: 'P-45137', doctorName: 'Dr. Michelle Thompson', doctorId: 'D017', concern: 'Sun damage and age spots on face', confidence: 95, submitted: 'Feb 21, 2026', status: 'rejected', image: '/images/patientimage.png' },
]

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
    approved: { label: 'Approved', color: 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]', dot: 'bg-[#17B26A]' },
    pending: { label: 'Pending', color: 'text-[#93370D] bg-[#FEF3C6] border-[#FEE685]', dot: 'bg-[#F79009]' },
    rejected: { label: 'Rejected', color: 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]', dot: 'bg-[#F04438]' },
}

const Page = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)

    const filters: Filter[] = [
        { value: 'all', label: 'All Cases' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
    ]

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter)
        setIsFilterOpen(false)
        setCurrentPage(1)
    }

    const filteredCases = casesData.filter(c => {
        const matchesFilter = selectedFilter === 'all' || c.status === selectedFilter
        const matchesSearch = c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.concern.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const totalPages = Math.ceil(filteredCases.length / ROWS_PER_PAGE)
    const effectiveCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
    const paginatedCases = filteredCases.slice(
        (effectiveCurrentPage - 1) * ROWS_PER_PAGE,
        effectiveCurrentPage * ROWS_PER_PAGE,
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isFilterOpen &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node) &&
                filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)
            ) setIsFilterOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isFilterOpen])

    const approvedCount = casesData.filter(c => c.status === 'approved').length
    const pendingCount = casesData.filter(c => c.status === 'pending').length
    const rejectedCount = casesData.filter(c => c.status === 'rejected').length

    return (
        <AccessGate pathname="/admin/all-cases" allowedRole="admin">
            <div>
                <div className="container mx-auto mb-20">
                    <AdminHeader />

                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h2 className='text-2xl font-semibold text-gray-900'>All Cases</h2>
                        <p className='text-sm text-gray-500'>
                            {casesData.length} cases &middot; {approvedCount} approved &middot; {pendingCount} pending &middot; {rejectedCount} rejected
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-start md:items-center">
                            <div className="flex items-center gap-2 border border-[#EDEBE3] bg-white w-[300px] h-[42px] rounded-full px-4">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="search"
                                    placeholder='Search by patient, case ID, or concern...'
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
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Case ID</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Patient</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Doctor</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Concern</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">AI Conf.</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Submitted</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="pr-6 w-[120px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedCases.map((c) => {
                                    const sc = statusConfig[c.status]
                                    return (
                                        <TableRow key={c.id} className="hover:bg-[#FAFAF8] group">
                                            <TableCell className="pl-6">
                                                <Link href={`/admin/all-cases/${c.caseId}`} className="text-sm font-medium text-pry hover:underline">{c.caseId}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/admin/patients/${c.patientId}`} className="flex items-center gap-3">
                                                    <div className="size-9 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                                        <Image src={c.image} width={36} height={36} alt={c.patientName} className='size-9 object-cover rounded-full' />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className='font-medium text-sm text-gray-900 group-hover:text-pry transition-colors'>{c.patientName}</span>
                                                        <span className='text-xs text-gray-400'>{c.patientId}</span>
                                                    </div>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <Link href={`/admin/doctors/${c.doctorId}`} className="flex flex-col hover:text-pry transition-colors">
                                                    <span className="text-sm text-gray-700">{c.doctorName}</span>
                                                    <span className="text-xs text-gray-400">{c.doctorId}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <span className="text-sm text-gray-600 line-clamp-1">{c.concern}</span>
                                            </TableCell>
                                            <TableCell className="text-center hidden md:table-cell">
                                                <span className={`text-sm font-medium ${c.confidence >= 90 ? 'text-[#17B26A]' : c.confidence >= 80 ? 'text-[#F79009]' : 'text-[#F04438]'}`}>
                                                    {c.confidence}%
                                                </span>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <span className="text-sm text-gray-500">{c.submitted}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${sc.color}`}>
                                                    <span className={`size-1.5 rounded-full mr-1.5 ${sc.dot}`} />
                                                    {sc.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <Link
                                                    href={`/admin/case-review`}
                                                    className="inline-flex items-center whitespace-nowrap h-8 px-4 rounded-full text-sm font-normal bg-[#EDEBE3] hover:bg-[#E0DED6] transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        {filteredCases.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-base font-medium">No cases found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-[#EDEBE3]">
                                <p className="text-sm text-gray-500">
                                    Showing {(effectiveCurrentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(effectiveCurrentPage * ROWS_PER_PAGE, filteredCases.length)} of {filteredCases.length}
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
        </AccessGate>
    )
}

export default Page
