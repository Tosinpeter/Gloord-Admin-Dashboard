'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ChevronLeft, ChevronRight, EllipsisVertical, ListFilter, Plus, Search, X } from 'lucide-react'
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
import AccessGate from '@/components/AccessGate'
import { useAccessibleModal } from '@/lib/useAccessibleModal'

interface Doctor {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialty: string;
    approved: number;
    pending: number;
    rejected: number;
    totalCases: number;
    lastActive: string;
    experience: number;
    license: string;
    status: 'active' | 'inactive';
    image: string;
}

interface Filter {
    value: string;
    label: string;
}

interface AddDoctorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (doctorData: Partial<Doctor>) => void;
}

type AddDoctorErrors = {
    name?: string
    email?: string
    phone?: string
    specialty?: string
    license?: string
    experience?: string
}

const AddDoctorModal = ({ isOpen, onClose, onAdd }: AddDoctorModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        license: '',
        experience: '',
    })
    const [errors, setErrors] = useState<AddDoctorErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { dialogRef } = useAccessibleModal({ isOpen, onClose })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: undefined }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isSubmitting) return

        const nextErrors: AddDoctorErrors = {}
        if (!formData.name.trim()) nextErrors.name = 'Full name is required.'
        if (!formData.email.trim()) nextErrors.email = 'Email address is required.'
        else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address.'
        if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.'
        if (!formData.specialty.trim()) nextErrors.specialty = 'Specialty is required.'
        if (!formData.license.trim()) nextErrors.license = 'License number is required.'
        if (formData.experience && Number(formData.experience) < 0) {
            nextErrors.experience = 'Years of experience cannot be negative.'
        }

        setErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) {
            console.error('Add doctor form validation failed', nextErrors)
            return
        }

        setIsSubmitting(true)
        onAdd({ ...formData, experience: Number(formData.experience) || 0 } as unknown as Partial<Doctor>)
        setFormData({ name: '', email: '', phone: '', specialty: '', license: '', experience: '' })
        setIsSubmitting(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-[#0000003D] backdrop-blur-[16px]" onClick={onClose} aria-hidden="true" />
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Add new doctor" tabIndex={-1} className="relative bg-white rounded-2xl shadow-xl w-[95%] max-w-[407px] max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col p-4 gap-1">
                    <div className="bg-white flex justify-between items-center">
                        <h3 className="text-base font-bold">Add New Doctor</h3>
                        <button
                            onClick={onClose}
                            aria-label="Close add doctor modal"
                            className="bg-[#EDEBE3] rounded-full size-8 flex items-center justify-center transition-colors hover:bg-[#E0DED6]"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <p className="text-sm font-normal text-[#717182]">Enter the details of the new doctor to add them to the system.</p>
                </div>
                <form onSubmit={handleSubmit} className="px-4 pb-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Dr. Full Name" className="w-full h-10 bg-[#EDEBE3] px-4 rounded-lg border-none focus:outline-none" />
                            {errors.name && <p className="text-xs text-[#B91C1C]">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="doctor@example.com" className="w-full h-10 bg-[#EDEBE3] px-4 rounded-lg border-none focus:outline-none" />
                            {errors.email && <p className="text-xs text-[#B91C1C]">{errors.email}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className="w-full h-10 bg-[#EDEBE3] px-4 rounded-lg border-none focus:outline-none" />
                            {errors.phone && <p className="text-xs text-[#B91C1C]">{errors.phone}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="specialty" className="text-sm font-medium">Specialty</label>
                            <input type="text" id="specialty" name="specialty" value={formData.specialty} onChange={handleChange} required placeholder="e.g. Dermatology" className="w-full h-10 bg-[#EDEBE3] px-4 rounded-lg border-none focus:outline-none" />
                            {errors.specialty && <p className="text-xs text-[#B91C1C]">{errors.specialty}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="license" className="text-sm font-medium">License Number</label>
                            <input type="text" id="license" name="license" value={formData.license} onChange={handleChange} required placeholder="License number" className="w-full h-10 bg-[#EDEBE3] px-4 rounded-lg border-none focus:outline-none" />
                            {errors.license && <p className="text-xs text-[#B91C1C]">{errors.license}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="experience" className="text-sm font-medium">Years of Experience</label>
                            <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. 10" className="w-full h-10 bg-[#EDEBE3] px-4 rounded-lg border-none focus:outline-none" />
                            {errors.experience && <p className="text-xs text-[#B91C1C]">{errors.experience}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2.5 text-base font-normal text-white bg-[#000] rounded-full transition-colors hover:bg-[#000]/80">Cancel</button>
                        <button disabled={isSubmitting} type="submit" className="px-4 py-2.5 text-base font-normal text-white bg-pry rounded-full transition-colors hover:bg-pry/80 disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? 'Adding...' : 'Add Doctor'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ROWS_PER_PAGE = 8
const DOCTORS_CACHE_KEY = 'admin_doctors_cache_v1'

const doctorsData: Doctor[] = [
    { id: 'D003', name: 'Sarah Johnson', email: 'sarah.johnson@clinic.com', phone: '+1 (555) 201-3344', specialty: 'Dermatology', approved: 42, pending: 5, rejected: 3, totalCases: 50, lastActive: 'Jan 24, 2026', experience: 12, license: 'MD-29384', status: 'active', image: '/images/patientimage.png' },
    { id: 'D004', name: 'Michael Chen', email: 'michael.chen@clinic.com', phone: '+1 (555) 302-7781', specialty: 'Cosmetic Dermatology', approved: 38, pending: 7, rejected: 2, totalCases: 47, lastActive: 'Feb 15, 2026', experience: 8, license: 'MD-44102', status: 'active', image: '/images/patientimage.png' },
    { id: 'D005', name: 'Emily Rodriguez', email: 'emily.rodriguez@clinic.com', phone: '+1 (555) 410-9953', specialty: 'Pediatric Dermatology', approved: 25, pending: 4, rejected: 3, totalCases: 32, lastActive: 'Mar 02, 2026', experience: 6, license: 'MD-55210', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'D006', name: 'James Wilson', email: 'james.wilson@clinic.com', phone: '+1 (555) 519-6620', specialty: 'Dermatopathology', approved: 55, pending: 3, rejected: 3, totalCases: 61, lastActive: 'Dec 18, 2025', experience: 18, license: 'MD-11093', status: 'active', image: '/images/patientimage.png' },
    { id: 'D007', name: 'Maria Garcia', email: 'maria.garcia@clinic.com', phone: '+1 (555) 607-2218', specialty: 'Dermatology', approved: 20, pending: 8, rejected: 1, totalCases: 29, lastActive: 'Mar 10, 2026', experience: 4, license: 'MD-67344', status: 'active', image: '/images/patientimage.png' },
    { id: 'D008', name: 'Robert Smith', email: 'robert.smith@clinic.com', phone: '+1 (555) 715-8890', specialty: 'Mohs Surgery', approved: 44, pending: 2, rejected: 6, totalCases: 52, lastActive: 'Feb 28, 2026', experience: 15, license: 'MD-22019', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'D009', name: 'Jennifer Lee', email: 'jennifer.lee@clinic.com', phone: '+1 (555) 812-1147', specialty: 'Dermatology', approved: 30, pending: 3, rejected: 2, totalCases: 35, lastActive: 'Jan 05, 2026', experience: 9, license: 'MD-39401', status: 'active', image: '/images/patientimage.png' },
    { id: 'D010', name: 'David Brown', email: 'david.brown@clinic.com', phone: '+1 (555) 923-5504', specialty: 'Cosmetic Dermatology', approved: 34, pending: 4, rejected: 3, totalCases: 41, lastActive: 'Nov 12, 2025', experience: 11, license: 'MD-48837', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'D011', name: 'Lisa Anderson', email: 'lisa.anderson@clinic.com', phone: '+1 (555) 104-6692', specialty: 'Dermatology', approved: 22, pending: 3, rejected: 2, totalCases: 27, lastActive: 'Mar 18, 2026', experience: 5, license: 'MD-71560', status: 'active', image: '/images/patientimage.png' },
    { id: 'D012', name: 'Thomas Martinez', email: 'thomas.martinez@clinic.com', phone: '+1 (555) 218-3340', specialty: 'Immunodermatology', approved: 28, pending: 6, rejected: 4, totalCases: 38, lastActive: 'Feb 03, 2026', experience: 10, license: 'MD-82915', status: 'active', image: '/images/patientimage.png' },
    { id: 'D013', name: 'Patricia Taylor', email: 'patricia.taylor@clinic.com', phone: '+1 (555) 329-1178', specialty: 'Dermatopathology', approved: 49, pending: 2, rejected: 6, totalCases: 57, lastActive: 'Oct 30, 2025', experience: 20, license: 'MD-10287', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'D014', name: 'Kevin White', email: 'kevin.white@clinic.com', phone: '+1 (555) 437-8826', specialty: 'Dermatology', approved: 28, pending: 4, rejected: 1, totalCases: 33, lastActive: 'Mar 22, 2026', experience: 7, license: 'MD-93641', status: 'active', image: '/images/patientimage.png' },
    { id: 'D015', name: 'Nancy Moore', email: 'nancy.moore@clinic.com', phone: '+1 (555) 546-2204', specialty: 'Pediatric Dermatology', approved: 40, pending: 5, rejected: 4, totalCases: 49, lastActive: 'Dec 05, 2025', experience: 14, license: 'MD-05728', status: 'active', image: '/images/patientimage.png' },
    { id: 'D016', name: 'Daniel Jackson', email: 'daniel.jackson@clinic.com', phone: '+1 (555) 654-9961', specialty: 'Mohs Surgery', approved: 36, pending: 3, rejected: 5, totalCases: 44, lastActive: 'Jan 19, 2026', experience: 13, license: 'MD-16470', status: 'inactive', image: '/images/patientimage.png' },
    { id: 'D017', name: 'Michelle Thompson', email: 'michelle.thompson@clinic.com', phone: '+1 (555) 763-7739', specialty: 'Cosmetic Dermatology', approved: 26, pending: 3, rejected: 2, totalCases: 31, lastActive: 'Feb 21, 2026', experience: 6, license: 'MD-58193', status: 'active', image: '/images/patientimage.png' },
]

const Page = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [doctors, setDoctors] = useState<Doctor[]>(doctorsData)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [isOffline, setIsOffline] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [actionError, setActionError] = useState<string | null>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const filters: Filter[] = [
        { value: 'all', label: 'All Doctors' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ]

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter)
        setIsFilterOpen(false)
        setCurrentPage(1)
    }

    const handleAddDoctor = (doctorData: Partial<Doctor>) => {
        if (isReadOnly) {
            const message = 'You are offline with cached data. Reconnect to add doctors.'
            setActionError(message)
            console.error(message)
            return
        }

        const lastId = doctors[doctors.length - 1]?.id || 'D002'
        const newId = `D${String(parseInt(lastId.substring(1)) + 1).padStart(3, '0')}`
        const newDoctor: Doctor = {
            id: newId,
            name: (doctorData.name as string) || 'New Doctor',
            email: (doctorData.email as string) || '',
            phone: (doctorData.phone as string) || '',
            specialty: (doctorData.specialty as string) || 'Dermatology',
            approved: 0, pending: 0, rejected: 0, totalCases: 0,
            lastActive: 'Just now',
            experience: Number(doctorData.experience) || 0,
            license: (doctorData.license as string) || '',
            status: 'active',
            image: '/images/patientimage.png',
        }
        setDoctors(prev => {
            const updated = [...prev, newDoctor]
            writeCachedJson(DOCTORS_CACHE_KEY, updated)
            return updated
        })
        setActionError(null)
        setIsAddDoctorModalOpen(false)
    }

    const handleDeleteDoctor = (id: string) => {
        if (isReadOnly) {
            const message = 'You are offline with cached data. Reconnect to delete doctors.'
            setActionError(message)
            console.error(message)
            return
        }
        const shouldDelete = window.confirm('Are you sure you want to remove this doctor? This action cannot be undone.')
        if (!shouldDelete) return

        setDoctors(prev => {
            const updated = prev.filter(d => d.id !== id)
            writeCachedJson(DOCTORS_CACHE_KEY, updated)
            return updated
        })
        setActionError(null)
        setOpenMenuId(null)
    }

    const filteredDoctors = doctors.filter(doctor => {
        const matchesFilter = selectedFilter === 'all' || doctor.status === selectedFilter
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const totalPages = Math.ceil(filteredDoctors.length / ROWS_PER_PAGE)
    const paginatedDoctors = filteredDoctors.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE,
    )

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages)
    }, [totalPages, currentPage])

    useEffect(() => {
        const cachedDoctors = readCachedJson<Doctor[]>(DOCTORS_CACHE_KEY)
        if (cachedDoctors?.length) {
            setDoctors(cachedDoctors)
        } else {
            writeCachedJson(DOCTORS_CACHE_KEY, doctorsData)
        }

        const syncConnectivity = () => {
            const offline = !window.navigator.onLine
            setIsOffline(offline)
            setIsReadOnly(offline && !!readCachedJson<Doctor[]>(DOCTORS_CACHE_KEY)?.length)
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
        writeCachedJson(DOCTORS_CACHE_KEY, doctors)
    }, [doctors])

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

    const activeCount = doctors.filter(d => d.status === 'active').length
    const inactiveCount = doctors.filter(d => d.status === 'inactive').length

    return (
        <AccessGate pathname="/admin/doctors" allowedRole="admin">
            <div>
                <div className="container mx-auto mb-20">
                    <AdminHeader />

                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h2 className='text-2xl font-semibold text-gray-900'>Doctor Management</h2>
                        <p className='text-sm text-gray-500'>
                            {doctors.length} doctors &middot; {activeCount} active &middot; {inactiveCount} inactive
                        </p>
                        {isReadOnly && (
                            <p className='text-sm text-[#9A3412]'>
                                Offline mode: cached doctor data is read-only until connection is restored.
                            </p>
                        )}
                        {isOffline && !isReadOnly && (
                            <p className='text-sm text-[#9A3412]'>
                                You are offline. Actions that require network may fail.
                            </p>
                        )}
                        {actionError && (
                            <p role="alert" className='text-sm text-[#B91C1C]'>
                                {actionError}
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
                                    placeholder='Search by name, ID, or specialty...'
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
                        <button
                            disabled={isReadOnly}
                            onClick={() => setIsAddDoctorModalOpen(true)}
                            className="flex bg-pry text-white h-[42px] rounded-full border border-pry items-center gap-2 px-5 text-sm font-medium hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Plus size={16} />
                            Add Doctor
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border border-[#EDEBE3] rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#FAFAF8] hover:bg-[#FAFAF8]">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Doctor</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Specialty</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider">Cases</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Approved</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Pending</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Rejected</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Active</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="pr-6 w-10"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedDoctors.map((doctor) => (
                                    <TableRow key={doctor.id} className="hover:bg-[#FAFAF8] group">
                                        <TableCell className="pl-6">
                                            <Link href={`/admin/doctors/${doctor.id}`} className="flex items-center gap-3">
                                                <div className="size-9 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                                    <Image src={doctor.image} width={36} height={36} alt={doctor.name} className='size-9 object-cover rounded-full' />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className='font-medium text-sm text-gray-900 group-hover:text-pry transition-colors'>Dr. {doctor.name}</span>
                                                    <span className='text-xs text-gray-400'>{doctor.id}</span>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-gray-600">{doctor.specialty}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-sm font-medium text-gray-900">{doctor.totalCases}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden md:table-cell">
                                            <span className="text-sm text-[#17B26A]">{doctor.approved}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden md:table-cell">
                                            <span className="text-sm text-[#F79009]">{doctor.pending}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden lg:table-cell">
                                            <span className="text-sm text-[#F04438]">{doctor.rejected}</span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-sm text-gray-500">{doctor.lastActive}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${
                                                doctor.status === 'active'
                                                    ? 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]'
                                                    : 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]'
                                            }`}>
                                                <span className={`size-1.5 rounded-full mr-1.5 ${doctor.status === 'active' ? 'bg-[#17B26A]' : 'bg-[#F04438]'}`} />
                                                {doctor.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="pr-6">
                                            <div className="relative" ref={openMenuId === doctor.id ? menuRef : undefined}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setOpenMenuId(openMenuId === doctor.id ? null : doctor.id) }}
                                                    className="size-8 flex items-center justify-center rounded-lg hover:bg-[#EDEBE3] transition-colors"
                                                >
                                                    <EllipsisVertical size={16} className='text-gray-400' />
                                                </button>
                                                {openMenuId === doctor.id && (
                                                    <div className="absolute right-0 top-full mt-1 w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                                        <div className="p-1.5">
                                                            <Link
                                                                href={`/admin/doctors/${doctor.id}`}
                                                                className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                                                            >
                                                                View Details
                                                            </Link>
                                                            <button
                                                                disabled={isReadOnly}
                                                                type="button"
                                                                onClick={() => handleDeleteDoctor(doctor.id)}
                                                                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                Remove Doctor
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredDoctors.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-base font-medium">No doctors found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-[#EDEBE3]">
                                <p className="text-sm text-gray-500">
                                    Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filteredDoctors.length)} of {filteredDoctors.length}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
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
                                                page === currentPage
                                                    ? 'bg-pry text-white'
                                                    : 'hover:bg-gray-50 text-gray-600'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
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

                <AddDoctorModal
                    isOpen={isAddDoctorModalOpen}
                    onClose={() => setIsAddDoctorModalOpen(false)}
                    onAdd={handleAddDoctor}
                />
            </div>
        </AccessGate>
    )
}

export default Page
