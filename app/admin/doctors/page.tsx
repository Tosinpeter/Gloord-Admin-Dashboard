'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ChevronLeft, ChevronRight, EllipsisVertical, ListFilter, Plus, Search, X } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from "next-intl"
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
import { useAccessibleModal } from '@/lib/useAccessibleModal'
import { trpc } from '@/lib/trpc'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAdminStore } from '@/lib/admin-store'
import type { ColumnDef } from '@tanstack/react-table'
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

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

const AddDoctorModal = ({ isOpen, onClose, onAdd }: AddDoctorModalProps) => {
    const t = useTranslations("admin.doctors")
    const { dialogRef } = useAccessibleModal({ isOpen, onClose })
    const schema = useMemo(
        () =>
            z.object({
                name: z.string().trim().min(1, t("modal.validation.fullNameRequired")),
                email: z.string().trim().min(1, t("modal.validation.emailRequired")).email(t("modal.validation.emailInvalid")),
                phone: z.string().trim().min(1, t("modal.validation.phoneRequired")),
                specialty: z.string().trim().min(1, t("modal.validation.specialtyRequired")),
                license: z.string().trim().min(1, t("modal.validation.licenseRequired")),
                experience: z
                    .string()
                    .optional()
                    .refine(
                        (val) => {
                            if (!val) return true
                            return Number(val) >= 0
                        },
                        { message: t("modal.validation.experienceNegative") },
                    ),
            }),
        [t],
    )

    type AddDoctorFormValues = z.infer<typeof schema>

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddDoctorFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            specialty: "",
            license: "",
            experience: "",
        },
    })

    const onFormSubmit = (values: AddDoctorFormValues) => {
        onAdd({
            ...values,
            experience: Number(values.experience) || 0,
        } as unknown as Partial<Doctor>)
        reset()
    }

    if (!isOpen) return null

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-overlay backdrop-blur-[16px]" onClick={onClose} aria-hidden="true" />
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t("modal.title")} tabIndex={-1} className="relative bg-white rounded-2xl shadow-xl w-[95%] max-w-[407px] max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col p-4 gap-1">
                    <div className="bg-white flex justify-between items-center">
                        <h3 className="text-base font-bold">{t("modal.title")}</h3>
                        <button
                            onClick={onClose}
                            aria-label={t("modal.closeAriaLabel")}
                            className="bg-sec rounded-full size-8 flex items-center justify-center transition-colors hover:bg-sec-hover"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <p className="text-sm font-normal text-muted-text">{t("modal.description")}</p>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)} className="px-4 pb-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium">{t("modal.fields.fullName")}</label>
                            <input type="text" id="name" {...register("name")} required placeholder={t("modal.placeholders.fullName")} className="w-full h-10 bg-sec px-4 rounded-lg border-none focus:outline-none" />
                            {errors.name?.message && <p className="text-xs text-error-text">{errors.name.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium">{t("modal.fields.emailAddress")}</label>
                            <input type="email" id="email" {...register("email")} required placeholder={t("modal.placeholders.email")} className="w-full h-10 bg-sec px-4 rounded-lg border-none focus:outline-none" />
                            {errors.email?.message && <p className="text-xs text-error-text">{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone" className="text-sm font-medium">{t("modal.fields.phoneNumber")}</label>
                            <input type="tel" id="phone" {...register("phone")} required placeholder={t("modal.placeholders.phone")} className="w-full h-10 bg-sec px-4 rounded-lg border-none focus:outline-none" />
                            {errors.phone?.message && <p className="text-xs text-error-text">{errors.phone.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="specialty" className="text-sm font-medium">{t("modal.fields.specialty")}</label>
                            <input type="text" id="specialty" {...register("specialty")} required placeholder={t("modal.placeholders.specialty")} className="w-full h-10 bg-sec px-4 rounded-lg border-none focus:outline-none" />
                            {errors.specialty?.message && <p className="text-xs text-error-text">{errors.specialty.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="license" className="text-sm font-medium">{t("modal.fields.licenseNumber")}</label>
                            <input type="text" id="license" {...register("license")} required placeholder={t("modal.placeholders.license")} className="w-full h-10 bg-sec px-4 rounded-lg border-none focus:outline-none" />
                            {errors.license?.message && <p className="text-xs text-error-text">{errors.license.message}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="experience" className="text-sm font-medium">{t("modal.fields.yearsOfExperience")}</label>
                            <input type="number" id="experience" {...register("experience")} placeholder={t("modal.placeholders.experience")} className="w-full h-10 bg-sec px-4 rounded-lg border-none focus:outline-none" />
                            {errors.experience?.message && <p className="text-xs text-error-text">{errors.experience.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2.5 text-base font-normal text-white bg-ink rounded-full transition-colors hover:bg-ink/80">{t("modal.buttons.cancel")}</button>
                        <button disabled={isSubmitting} type="submit" className="px-4 py-2.5 text-base font-normal text-white bg-pry rounded-full transition-colors hover:bg-pry/80 disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? t("modal.buttons.adding") : t("modal.buttons.addDoctor")}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ROWS_PER_PAGE = 8

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
    const t = useTranslations("admin.doctors")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false)
    const {
        data: doctors = doctorsData,
        refetch: refetchDoctors,
    } = trpc.doctors.list.useQuery(undefined, { initialData: doctorsData })
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [isOffline, setIsOffline] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(false)
    const [actionError, setActionError] = useState<string | null>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const {
        doctorsSearch,
        doctorsStatus,
        doctorsPagination,
        doctorsSorting,
        setDoctorsSearch,
        setDoctorsStatus,
        setDoctorsPagination,
        setDoctorsSorting,
    } = useAdminStore()

    const filters: Filter[] = [
        { value: 'all', label: t("filters.allDoctors") },
        { value: 'active', label: t("filters.active") },
        { value: 'inactive', label: t("filters.inactive") },
    ]

    const handleFilterSelect = (filter: string) => {
        setDoctorsStatus(filter as "all" | "active" | "inactive")
        setIsFilterOpen(false)
        setDoctorsPagination({ pageIndex: 0, pageSize: doctorsPagination.pageSize })
    }

    const addDoctorMutation = trpc.doctors.add.useMutation({
        onSuccess: async () => {
            setActionError(null)
            setIsAddDoctorModalOpen(false)
            await refetchDoctors()
        },
        onError: (err) => {
            console.error(err)
            setActionError("Failed to add doctor.")
        },
    })

    const removeDoctorMutation = trpc.doctors.remove.useMutation({
        onSuccess: async () => {
            setActionError(null)
            setOpenMenuId(null)
            await refetchDoctors()
        },
        onError: (err) => {
            console.error(err)
            setActionError("Failed to remove doctor.")
        },
    })

    const handleAddDoctor = (doctorData: Partial<Doctor>) => {
        if (isReadOnly) {
            const message = t("offline.cachedReconnectAddDoctors")
            setActionError(message)
            console.error(message)
            return
        }
        addDoctorMutation.mutate({
            name: String(doctorData.name ?? ""),
            email: String(doctorData.email ?? ""),
            phone: String(doctorData.phone ?? ""),
            specialty: String(doctorData.specialty ?? ""),
            license: String(doctorData.license ?? ""),
            experience: doctorData.experience ?? 0,
        })
    }

    const handleDeleteDoctor = (id: string) => {
        if (isReadOnly) {
            const message = t("offline.cachedReconnectDeleteDoctors")
            setActionError(message)
            console.error(message)
            return
        }
        const shouldDelete = window.confirm(t("confirmations.removeDoctor"))
        if (!shouldDelete) return
        removeDoctorMutation.mutate({ id })
    }

    const columns = useMemo<ColumnDef<Doctor>[]>(
        () => [
            {
                accessorKey: "name",
                header: t("table.doctor"),
                enableSorting: true,
            },
            {
                accessorKey: "specialty",
                header: t("table.specialty"),
                enableSorting: true,
            },
            {
                accessorKey: "totalCases",
                header: t("table.cases"),
                enableSorting: true,
            },
            {
                accessorKey: "approved",
                header: t("table.approved"),
                enableSorting: true,
            },
            {
                accessorKey: "pending",
                header: t("table.pending"),
                enableSorting: true,
            },
            {
                accessorKey: "rejected",
                header: t("table.rejected"),
                enableSorting: true,
            },
            {
                accessorKey: "lastActive",
                header: t("table.lastActive"),
                enableSorting: true,
            },
            {
                accessorKey: "status",
                header: t("table.status"),
                enableSorting: true,
                cell: ({ row }) => {
                    const status = row.original.status
                    return (
                        <span
                            className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${
                                status === "active"
                                    ? "text-success bg-success-bg border-success-border"
                                    : "text-error-text-alt bg-error-bg-alt border-error-soft-border"
                            }`}
                        >
                            <span
                                className={`size-1.5 rounded-full mr-1.5 ${
                                    status === "active" ? "bg-success-accent" : "bg-error-accent"
                                }`}
                            />
                            {status === "active" ? t("status.active") : t("status.inactive")}
                        </span>
                    )
                },
            },
        ],
        [t],
    )

    const table = useReactTable<Doctor>({
        data: doctors as Doctor[],
        columns,
        getRowId: (row) => row.id,
        state: {
            sorting: doctorsSorting,
            globalFilter: doctorsSearch,
            pagination: doctorsPagination,
        },
        onSortingChange: setDoctorsSorting,
        onGlobalFilterChange: setDoctorsSearch,
        onPaginationChange: setDoctorsPagination,
        globalFilterFn: (row, _columnId, filterValue) => {
            const q = String(filterValue ?? "").toLowerCase().trim()
            const statusOk = doctorsStatus === "all" || row.original.status === doctorsStatus
            if (!q) return statusOk
            if (!statusOk) return false
            return (
                row.original.name.toLowerCase().includes(q) ||
                row.original.id.toLowerCase().includes(q) ||
                row.original.specialty.toLowerCase().includes(q)
            )
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const filteredCount = table.getFilteredRowModel().rows.length
    const totalPages = table.getPageCount()
    const effectiveCurrentPage = table.getState().pagination.pageIndex + 1
    const paginatedDoctors = table.getRowModel().rows.map((r) => r.original)

    useEffect(() => {
        const syncConnectivity = () => {
            const offline = !window.navigator.onLine
            setIsOffline(offline)
            setIsReadOnly(offline)
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
                        <h2 className='text-2xl font-semibold text-gray-900'>{t("title")}</h2>
                        <p className='text-sm text-gray-500'>
                            {t("summary", {
                                total: doctors.length,
                                activeCount,
                                inactiveCount,
                            })}
                        </p>
                        {isReadOnly && (
                            <p className='text-sm text-warning-text-offline'>
                                {t("offline.readOnlyMode")}
                            </p>
                        )}
                        {isOffline && !isReadOnly && (
                            <p className='text-sm text-warning-text-offline'>
                                {t("offline.offlineActionsMayFail")}
                            </p>
                        )}
                        {actionError && (
                            <p role="alert" className='text-sm text-error-text'>
                                {actionError}
                            </p>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-start md:items-center">
                            <div className="flex items-center gap-2 border border-sec bg-white w-[280px] h-[42px] rounded-full px-4">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="search"
                                    placeholder={t("searchPlaceholder")}
                                    className='border-none h-full w-full focus:outline-none bg-transparent text-sm'
                                    value={doctorsSearch}
                                    onChange={(e) => {
                                        setDoctorsSearch(e.target.value)
                                        setDoctorsPagination((prev) => ({ ...prev, pageIndex: 0 }))
                                    }}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    ref={filterButtonRef}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 border border-sec bg-white w-max h-[42px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                                >
                                    <ListFilter size={18} />
                                    <span className='text-sm font-normal w-max'>
                                        {filters.find(f => f.value === doctorsStatus)?.label || t("filters.filterFallback")}
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
                                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${doctorsStatus === filter.value ? 'bg-sec font-medium' : 'hover:bg-gray-50'}`}
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
                            {t("modal.buttons.addDoctor")}
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border border-sec rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-surface-variant hover:bg-surface-variant">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.doctor")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.specialty")}</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.cases")}</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">{t("table.approved")}</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">{t("table.pending")}</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">{t("table.rejected")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">{t("table.lastActive")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.status")}</TableHead>
                                    <TableHead className="pr-6 w-10"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedDoctors.map((doctor) => (
                                    <TableRow key={doctor.id} className="hover:bg-surface-variant group">
                                        <TableCell className="pl-6">
                                            <Link href={`/admin/doctors/${doctor.id}`} className="flex items-center gap-3">
                                                <div className="size-9 rounded-full overflow-hidden bg-sec shrink-0">
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
                                            <span className="text-sm text-success-accent">{doctor.approved}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden md:table-cell">
                                            <span className="text-sm text-warning-dot">{doctor.pending}</span>
                                        </TableCell>
                                        <TableCell className="text-center hidden lg:table-cell">
                                            <span className="text-sm text-error-accent">{doctor.rejected}</span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <span className="text-sm text-gray-500">{doctor.lastActive}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${
                                                doctor.status === 'active'
                                                    ? 'text-success bg-success-bg border-success-border'
                                                    : 'text-error-text-alt bg-error-bg-alt border-error-soft-border'
                                            }`}>
                                                <span className={`size-1.5 rounded-full mr-1.5 ${doctor.status === 'active' ? 'bg-success-accent' : 'bg-error-accent'}`} />
                                                    {doctor.status === 'active' ? t("status.active") : t("status.inactive")}
                                            </span>
                                        </TableCell>
                                        <TableCell className="pr-6">
                                            <div className="relative" ref={openMenuId === doctor.id ? menuRef : undefined}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setOpenMenuId(openMenuId === doctor.id ? null : doctor.id) }}
                                                    className="size-8 flex items-center justify-center rounded-lg hover:bg-sec transition-colors"
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
                                                                {t("actions.viewDetails")}
                                                            </Link>
                                                            <button
                                                                disabled={isReadOnly}
                                                                type="button"
                                                                onClick={() => handleDeleteDoctor(doctor.id)}
                                                                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {t("actions.removeDoctor")}
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

                        {filteredCount === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-base font-medium">{t("empty.noDoctorsFound")}</p>
                                <p className="text-sm mt-1">{t("empty.tryAdjustSearchOrFilter")}</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-sec">
                                <p className="text-sm text-gray-500">
                                    {t("pagination.showing", {
                                        start: (effectiveCurrentPage - 1) * ROWS_PER_PAGE + 1,
                                        end: Math.min(effectiveCurrentPage * ROWS_PER_PAGE, filteredCount),
                                        total: filteredCount,
                                    })}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => table.previousPage()}
                                        disabled={effectiveCurrentPage === 1}
                                        className="size-8 flex items-center justify-center rounded-lg border border-sec hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => table.setPageIndex(page - 1)}
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
                                        onClick={() => table.nextPage()}
                                        disabled={effectiveCurrentPage === totalPages}
                                        className="size-8 flex items-center justify-center rounded-lg border border-sec hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
