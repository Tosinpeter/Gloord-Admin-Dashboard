'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, Clock, FileText, Mail, MapPin, Phone, Shield, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
    bio: string;
    location: string;
    joinedDate: string;
}

interface RecentCase {
    id: string;
    patient: string;
    condition: string;
    status: 'approved' | 'pending' | 'rejected';
    date: string;
    confidence: number;
}

const doctorsMap: Record<string, Doctor> = {
    D003: { id: 'D003', name: 'Sarah Johnson', email: 'sarah.johnson@clinic.com', phone: '+1 (555) 201-3344', specialty: 'Dermatology', approved: 42, pending: 5, rejected: 3, totalCases: 50, lastActive: 'Jan 24, 2026', experience: 12, license: 'MD-29384', status: 'active', image: '/images/patientimage.png', bio: 'Board-certified dermatologist specializing in medical and cosmetic dermatology with extensive experience in skin cancer screening and treatment.', location: 'New York, NY', joinedDate: 'Mar 2014' },
    D004: { id: 'D004', name: 'Michael Chen', email: 'michael.chen@clinic.com', phone: '+1 (555) 302-7781', specialty: 'Cosmetic Dermatology', approved: 38, pending: 7, rejected: 2, totalCases: 47, lastActive: 'Feb 15, 2026', experience: 8, license: 'MD-44102', status: 'active', image: '/images/patientimage.png', bio: 'Expert in cosmetic dermatology including injectables, laser treatments, and advanced skin rejuvenation procedures.', location: 'Los Angeles, CA', joinedDate: 'Jun 2018' },
    D005: { id: 'D005', name: 'Emily Rodriguez', email: 'emily.rodriguez@clinic.com', phone: '+1 (555) 410-9953', specialty: 'Pediatric Dermatology', approved: 25, pending: 4, rejected: 3, totalCases: 32, lastActive: 'Mar 02, 2026', experience: 6, license: 'MD-55210', status: 'inactive', image: '/images/patientimage.png', bio: 'Specialized in pediatric skin conditions including eczema, birthmarks, and genetic skin disorders in children.', location: 'Chicago, IL', joinedDate: 'Sep 2020' },
    D006: { id: 'D006', name: 'James Wilson', email: 'james.wilson@clinic.com', phone: '+1 (555) 519-6620', specialty: 'Dermatopathology', approved: 55, pending: 3, rejected: 3, totalCases: 61, lastActive: 'Dec 18, 2025', experience: 18, license: 'MD-11093', status: 'active', image: '/images/patientimage.png', bio: 'Senior dermatopathologist with deep expertise in diagnosing complex skin diseases through tissue biopsy analysis.', location: 'Houston, TX', joinedDate: 'Jan 2008' },
    D007: { id: 'D007', name: 'Maria Garcia', email: 'maria.garcia@clinic.com', phone: '+1 (555) 607-2218', specialty: 'Dermatology', approved: 20, pending: 8, rejected: 1, totalCases: 29, lastActive: 'Mar 10, 2026', experience: 4, license: 'MD-67344', status: 'active', image: '/images/patientimage.png', bio: 'General dermatologist passionate about preventive skin care and patient education on sun protection.', location: 'Miami, FL', joinedDate: 'Feb 2022' },
    D008: { id: 'D008', name: 'Robert Smith', email: 'robert.smith@clinic.com', phone: '+1 (555) 715-8890', specialty: 'Mohs Surgery', approved: 44, pending: 2, rejected: 6, totalCases: 52, lastActive: 'Feb 28, 2026', experience: 15, license: 'MD-22019', status: 'inactive', image: '/images/patientimage.png', bio: 'Fellowship-trained Mohs surgeon specializing in the treatment of skin cancer with tissue-sparing techniques.', location: 'Philadelphia, PA', joinedDate: 'Jul 2011' },
    D009: { id: 'D009', name: 'Jennifer Lee', email: 'jennifer.lee@clinic.com', phone: '+1 (555) 812-1147', specialty: 'Dermatology', approved: 30, pending: 3, rejected: 2, totalCases: 35, lastActive: 'Jan 05, 2026', experience: 9, license: 'MD-39401', status: 'active', image: '/images/patientimage.png', bio: 'Experienced dermatologist focusing on acne, rosacea, and inflammatory skin conditions.', location: 'San Francisco, CA', joinedDate: 'Nov 2017' },
    D010: { id: 'D010', name: 'David Brown', email: 'david.brown@clinic.com', phone: '+1 (555) 923-5504', specialty: 'Cosmetic Dermatology', approved: 34, pending: 4, rejected: 3, totalCases: 41, lastActive: 'Nov 12, 2025', experience: 11, license: 'MD-48837', status: 'inactive', image: '/images/patientimage.png', bio: 'Cosmetic dermatology expert with a focus on anti-aging treatments, chemical peels, and non-invasive body contouring.', location: 'Boston, MA', joinedDate: 'Apr 2015' },
    D011: { id: 'D011', name: 'Lisa Anderson', email: 'lisa.anderson@clinic.com', phone: '+1 (555) 104-6692', specialty: 'Dermatology', approved: 22, pending: 3, rejected: 2, totalCases: 27, lastActive: 'Mar 18, 2026', experience: 5, license: 'MD-71560', status: 'active', image: '/images/patientimage.png', bio: 'General dermatologist with a growing practice in skin allergy testing and contact dermatitis management.', location: 'Seattle, WA', joinedDate: 'Aug 2021' },
    D012: { id: 'D012', name: 'Thomas Martinez', email: 'thomas.martinez@clinic.com', phone: '+1 (555) 218-3340', specialty: 'Immunodermatology', approved: 28, pending: 6, rejected: 4, totalCases: 38, lastActive: 'Feb 03, 2026', experience: 10, license: 'MD-82915', status: 'active', image: '/images/patientimage.png', bio: 'Immunodermatology specialist treating autoimmune skin conditions such as psoriasis, lupus, and pemphigus.', location: 'Denver, CO', joinedDate: 'May 2016' },
    D013: { id: 'D013', name: 'Patricia Taylor', email: 'patricia.taylor@clinic.com', phone: '+1 (555) 329-1178', specialty: 'Dermatopathology', approved: 49, pending: 2, rejected: 6, totalCases: 57, lastActive: 'Oct 30, 2025', experience: 20, license: 'MD-10287', status: 'inactive', image: '/images/patientimage.png', bio: 'Veteran dermatopathologist and researcher with published works on melanoma diagnostics and rare skin disorders.', location: 'Dallas, TX', joinedDate: 'Oct 2006' },
    D014: { id: 'D014', name: 'Kevin White', email: 'kevin.white@clinic.com', phone: '+1 (555) 437-8826', specialty: 'Dermatology', approved: 28, pending: 4, rejected: 1, totalCases: 33, lastActive: 'Mar 22, 2026', experience: 7, license: 'MD-93641', status: 'active', image: '/images/patientimage.png', bio: 'Dermatologist focusing on skin of color and conditions unique to diverse patient populations.', location: 'Atlanta, GA', joinedDate: 'Jan 2019' },
    D015: { id: 'D015', name: 'Nancy Moore', email: 'nancy.moore@clinic.com', phone: '+1 (555) 546-2204', specialty: 'Pediatric Dermatology', approved: 40, pending: 5, rejected: 4, totalCases: 49, lastActive: 'Dec 05, 2025', experience: 14, license: 'MD-05728', status: 'active', image: '/images/patientimage.png', bio: 'Pediatric dermatologist with expertise in neonatal skin conditions and childhood eczema management.', location: 'Phoenix, AZ', joinedDate: 'Mar 2012' },
    D016: { id: 'D016', name: 'Daniel Jackson', email: 'daniel.jackson@clinic.com', phone: '+1 (555) 654-9961', specialty: 'Mohs Surgery', approved: 36, pending: 3, rejected: 5, totalCases: 44, lastActive: 'Jan 19, 2026', experience: 13, license: 'MD-16470', status: 'inactive', image: '/images/patientimage.png', bio: 'Mohs surgeon with extensive experience in complex facial reconstructions post skin cancer removal.', location: 'San Diego, CA', joinedDate: 'Aug 2013' },
    D017: { id: 'D017', name: 'Michelle Thompson', email: 'michelle.thompson@clinic.com', phone: '+1 (555) 763-7739', specialty: 'Cosmetic Dermatology', approved: 26, pending: 3, rejected: 2, totalCases: 31, lastActive: 'Feb 21, 2026', experience: 6, license: 'MD-58193', status: 'active', image: '/images/patientimage.png', bio: 'Cosmetic dermatologist specializing in microneedling, PRP therapy, and personalized skincare protocols.', location: 'Portland, OR', joinedDate: 'Dec 2020' },
}

const recentCasesMap: Record<string, RecentCase[]> = {
    D003: [
        { id: 'C041', patient: 'Alice Warren', condition: 'Eczema flare-up', status: 'approved', date: 'Jan 22, 2026', confidence: 94 },
        { id: 'C038', patient: 'Brian Foster', condition: 'Psoriasis', status: 'approved', date: 'Jan 18, 2026', confidence: 91 },
        { id: 'C035', patient: 'Chloe Park', condition: 'Acne vulgaris', status: 'pending', date: 'Jan 15, 2026', confidence: 88 },
        { id: 'C029', patient: 'Derek Hughes', condition: 'Contact dermatitis', status: 'rejected', date: 'Jan 10, 2026', confidence: 72 },
        { id: 'C024', patient: 'Eva Mitchell', condition: 'Rosacea', status: 'approved', date: 'Jan 05, 2026', confidence: 96 },
    ],
    D004: [
        { id: 'C045', patient: 'Fiona Blake', condition: 'Hyperpigmentation', status: 'approved', date: 'Feb 14, 2026', confidence: 93 },
        { id: 'C042', patient: 'George Kim', condition: 'Fine lines', status: 'pending', date: 'Feb 10, 2026', confidence: 89 },
        { id: 'C039', patient: 'Hannah Lee', condition: 'Acne scarring', status: 'approved', date: 'Feb 06, 2026', confidence: 91 },
        { id: 'C033', patient: 'Ian Ross', condition: 'Melasma', status: 'pending', date: 'Feb 01, 2026', confidence: 85 },
    ],
}

const defaultCases: RecentCase[] = [
    { id: 'C050', patient: 'Laura Bennett', condition: 'Dermatitis', status: 'approved', date: 'Mar 01, 2026', confidence: 92 },
    { id: 'C048', patient: 'Mark Rivera', condition: 'Psoriasis', status: 'pending', date: 'Feb 25, 2026', confidence: 87 },
    { id: 'C044', patient: 'Nina Scott', condition: 'Eczema', status: 'approved', date: 'Feb 20, 2026', confidence: 95 },
    { id: 'C040', patient: 'Oscar Patel', condition: 'Skin rash', status: 'rejected', date: 'Feb 15, 2026', confidence: 68 },
]

const statusConfig = {
    approved: { label: 'Approved', color: 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]' },
    pending: { label: 'Pending', color: 'text-[#93370D] bg-[#FEF3C6] border-[#FEE685]' },
    rejected: { label: 'Rejected', color: 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]' },
}

const Page = () => {
    const params = useParams()
    const doctorId = params.id as string
    const doctor = doctorsMap[doctorId]

    if (!doctor) {
        return (
            <div>
                <div className="container mx-auto mb-20">
                    <AdminHeader />
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-lg text-gray-500">Doctor not found</p>
                        <Link href="/admin/doctors" className="text-pry hover:underline text-sm">Back to Doctors</Link>
                    </div>
                </div>
            </div>
        )
    }

    const cases = recentCasesMap[doctorId] || defaultCases
    const approvalRate = doctor.totalCases > 0 ? Math.round((doctor.approved / doctor.totalCases) * 100) : 0

    const stats = [
        { label: 'Total Cases', value: doctor.totalCases, icon: FileText, color: 'text-gray-700', bg: 'bg-[#F5F5F0]' },
        { label: 'Approved', value: doctor.approved, icon: CheckCircle2, color: 'text-[#17B26A]', bg: 'bg-[#ECFDF3]' },
        { label: 'Pending', value: doctor.pending, icon: Clock, color: 'text-[#F79009]', bg: 'bg-[#FFFAEB]' },
        { label: 'Rejected', value: doctor.rejected, icon: XCircle, color: 'text-[#F04438]', bg: 'bg-[#FEF3F2]' },
    ]

    return (
        <div>
            <div className="container mx-auto mb-20">
                <AdminHeader />

                <Link href="/admin/doctors" className="mb-6 w-fit flex items-center text-sm gap-2 rounded-full py-2 px-4 bg-[#EDEBE3] hover:bg-[#E0DED6] transition-colors">
                    <ArrowLeft size={16} />
                    Back to Doctors
                </Link>

                {/* Profile Header */}
                <div className="border border-[#EDEBE3] rounded-2xl p-6 md:p-8 mt-4">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div className="flex gap-5 items-center">
                            <div className="size-20 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                <Image src={doctor.image} width={80} height={80} alt={doctor.name} className="size-20 object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-semibold text-gray-900">Dr. {doctor.name}</h1>
                                    <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium border ${
                                        doctor.status === 'active'
                                            ? 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]'
                                            : 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]'
                                    }`}>
                                        <span className={`size-1.5 rounded-full mr-1.5 ${doctor.status === 'active' ? 'bg-[#17B26A]' : 'bg-[#F04438]'}`} />
                                        {doctor.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">{doctor.specialty} &middot; {doctor.experience} years experience</p>
                                <p className="text-sm text-gray-400">{doctor.id} &middot; License: {doctor.license}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="text-right">
                                <p className="text-3xl font-bold text-pry">{approvalRate}%</p>
                                <p className="text-xs text-gray-400">Approval Rate</p>
                            </div>
                        </div>
                    </div>
                    {doctor.bio && (
                        <p className="text-sm text-gray-600 mt-5 leading-relaxed max-w-3xl">{doctor.bio}</p>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 flex flex-col gap-3`}>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</span>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Contact Info */}
                    <div className="border border-[#EDEBE3] rounded-2xl p-6 flex flex-col gap-5 lg:col-span-1">
                        <h3 className="text-base font-semibold text-gray-900">Contact Information</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Mail size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Email</span>
                                    <span className="text-sm text-gray-700">{doctor.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Phone size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Phone</span>
                                    <span className="text-sm text-gray-700">{doctor.phone}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <MapPin size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Location</span>
                                    <span className="text-sm text-gray-700">{doctor.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Briefcase size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Experience</span>
                                    <span className="text-sm text-gray-700">{doctor.experience} years</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Shield size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">License</span>
                                    <span className="text-sm text-gray-700">{doctor.license}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Calendar size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Joined</span>
                                    <span className="text-sm text-gray-700">{doctor.joinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Cases */}
                    <div className="border border-[#EDEBE3] rounded-2xl overflow-hidden lg:col-span-2">
                        <div className="px-6 py-5 border-b border-[#EDEBE3]">
                            <h3 className="text-base font-semibold text-gray-900">Recent Cases</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Latest patient cases assigned to this doctor</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#FAFAF8] hover:bg-[#FAFAF8]">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Case</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Patient</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Condition</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">AI Conf.</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="pr-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cases.map((c) => {
                                    const sc = statusConfig[c.status]
                                    return (
                                        <TableRow key={c.id} className="hover:bg-[#FAFAF8]">
                                            <TableCell className="pl-6">
                                                <Link href="/admin/case-review" className="text-sm font-medium text-pry hover:underline">{c.id}</Link>
                                            </TableCell>
                                            <TableCell><span className="text-sm text-gray-700">{c.patient}</span></TableCell>
                                            <TableCell className="hidden md:table-cell"><span className="text-sm text-gray-500">{c.condition}</span></TableCell>
                                            <TableCell className="text-center hidden md:table-cell">
                                                <span className={`text-sm font-medium ${c.confidence >= 90 ? 'text-[#17B26A]' : c.confidence >= 80 ? 'text-[#F79009]' : 'text-[#F04438]'}`}>
                                                    {c.confidence}%
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium border ${sc.color}`}>
                                                    {sc.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="pr-6"><span className="text-sm text-gray-500">{c.date}</span></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
