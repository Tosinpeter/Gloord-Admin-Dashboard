'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ArrowLeft, Calendar, CheckCircle2, Clock, FileText, Heart, Mail, MapPin, Phone, User, XCircle } from 'lucide-react'
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
    address: string;
    dateOfBirth: string;
    bloodType: string;
    allergies: string;
    registeredDate: string;
}

interface CaseRecord {
    id: string;
    doctor: string;
    condition: string;
    status: 'approved' | 'pending' | 'rejected';
    date: string;
    confidence: number;
    treatment: string;
}

const patientsMap: Record<string, Patient> = {
    'P-45123': { id: 'P-45123', name: 'Sarah Johnson', email: 'sarah.j@mail.com', phone: '+1 (555) 123-4567', age: 28, gender: 'Female', concern: 'Eczema', totalCases: 3, approved: 2, pending: 1, rejected: 0, lastVisit: 'Jan 24, 2026', status: 'active', image: '/images/patientimage.png', address: '123 Main St, New York, NY 10001', dateOfBirth: 'Mar 15, 1997', bloodType: 'A+', allergies: 'Penicillin', registeredDate: 'Sep 2024' },
    'P-45124': { id: 'P-45124', name: 'Michael Chen', email: 'michael.c@mail.com', phone: '+1 (555) 234-5678', age: 45, gender: 'Male', concern: 'Psoriasis', totalCases: 7, approved: 5, pending: 1, rejected: 1, lastVisit: 'Feb 15, 2026', status: 'active', image: '/images/patientimage.png', address: '456 Oak Ave, Los Angeles, CA 90012', dateOfBirth: 'Jul 22, 1980', bloodType: 'O+', allergies: 'None', registeredDate: 'Jan 2024' },
    'P-45125': { id: 'P-45125', name: 'Emily Rodriguez', email: 'emily.r@mail.com', phone: '+1 (555) 345-6789', age: 32, gender: 'Female', concern: 'Acne scarring', totalCases: 2, approved: 1, pending: 0, rejected: 1, lastVisit: 'Mar 02, 2026', status: 'inactive', image: '/images/patientimage.png', address: '789 Pine Rd, Chicago, IL 60601', dateOfBirth: 'Nov 03, 1993', bloodType: 'B-', allergies: 'Sulfa drugs', registeredDate: 'Jun 2025' },
    'P-45126': { id: 'P-45126', name: 'James Wilson', email: 'james.w@mail.com', phone: '+1 (555) 456-7890', age: 61, gender: 'Male', concern: 'Skin cancer screening', totalCases: 12, approved: 9, pending: 2, rejected: 1, lastVisit: 'Dec 18, 2025', status: 'active', image: '/images/patientimage.png', address: '321 Elm Blvd, Houston, TX 77001', dateOfBirth: 'Feb 28, 1964', bloodType: 'AB+', allergies: 'Latex', registeredDate: 'Mar 2023' },
    'P-45127': { id: 'P-45127', name: 'Maria Garcia', email: 'maria.g@mail.com', phone: '+1 (555) 567-8901', age: 29, gender: 'Female', concern: 'Rosacea', totalCases: 1, approved: 1, pending: 0, rejected: 0, lastVisit: 'Mar 10, 2026', status: 'active', image: '/images/patientimage.png', address: '654 Maple Ln, Miami, FL 33101', dateOfBirth: 'Aug 09, 1996', bloodType: 'O-', allergies: 'None', registeredDate: 'Feb 2026' },
    'P-45128': { id: 'P-45128', name: 'Robert Smith', email: 'robert.s@mail.com', phone: '+1 (555) 678-9012', age: 52, gender: 'Male', concern: 'Dermatitis', totalCases: 5, approved: 3, pending: 1, rejected: 1, lastVisit: 'Feb 28, 2026', status: 'inactive', image: '/images/patientimage.png', address: '987 Cedar Dr, Philadelphia, PA 19101', dateOfBirth: 'Jan 17, 1973', bloodType: 'A-', allergies: 'Ibuprofen', registeredDate: 'Aug 2024' },
    'P-45129': { id: 'P-45129', name: 'Jennifer Lee', email: 'jennifer.l@mail.com', phone: '+1 (555) 789-0123', age: 35, gender: 'Female', concern: 'Hyperpigmentation', totalCases: 4, approved: 3, pending: 1, rejected: 0, lastVisit: 'Jan 05, 2026', status: 'active', image: '/images/patientimage.png', address: '147 Birch St, San Francisco, CA 94101', dateOfBirth: 'May 30, 1990', bloodType: 'B+', allergies: 'None', registeredDate: 'Nov 2024' },
    'P-45130': { id: 'P-45130', name: 'David Brown', email: 'david.b@mail.com', phone: '+1 (555) 890-1234', age: 41, gender: 'Male', concern: 'Melanoma follow-up', totalCases: 8, approved: 6, pending: 1, rejected: 1, lastVisit: 'Nov 12, 2025', status: 'inactive', image: '/images/patientimage.png', address: '258 Spruce Ave, Boston, MA 02101', dateOfBirth: 'Dec 11, 1984', bloodType: 'AB-', allergies: 'Aspirin', registeredDate: 'Apr 2023' },
    'P-45131': { id: 'P-45131', name: 'Lisa Anderson', email: 'lisa.a@mail.com', phone: '+1 (555) 901-2345', age: 27, gender: 'Female', concern: 'Acne vulgaris', totalCases: 2, approved: 1, pending: 1, rejected: 0, lastVisit: 'Mar 18, 2026', status: 'active', image: '/images/patientimage.png', address: '369 Willow Way, Seattle, WA 98101', dateOfBirth: 'Apr 05, 1998', bloodType: 'O+', allergies: 'None', registeredDate: 'Jan 2026' },
    'P-45132': { id: 'P-45132', name: 'Thomas Martinez', email: 'thomas.m@mail.com', phone: '+1 (555) 012-3456', age: 38, gender: 'Male', concern: 'Contact dermatitis', totalCases: 6, approved: 4, pending: 1, rejected: 1, lastVisit: 'Feb 03, 2026', status: 'active', image: '/images/patientimage.png', address: '480 Ash Ct, Denver, CO 80201', dateOfBirth: 'Jun 19, 1987', bloodType: 'A+', allergies: 'Nickel', registeredDate: 'Jul 2024' },
    'P-45133': { id: 'P-45133', name: 'Patricia Taylor', email: 'patricia.t@mail.com', phone: '+1 (555) 112-4567', age: 57, gender: 'Female', concern: 'Skin tags', totalCases: 15, approved: 11, pending: 2, rejected: 2, lastVisit: 'Oct 30, 2025', status: 'inactive', image: '/images/patientimage.png', address: '591 Poplar Rd, Dallas, TX 75201', dateOfBirth: 'Sep 08, 1968', bloodType: 'B+', allergies: 'Codeine', registeredDate: 'Feb 2023' },
    'P-45134': { id: 'P-45134', name: 'Kevin White', email: 'kevin.w@mail.com', phone: '+1 (555) 223-5678', age: 33, gender: 'Male', concern: 'Fungal infection', totalCases: 3, approved: 2, pending: 1, rejected: 0, lastVisit: 'Mar 22, 2026', status: 'active', image: '/images/patientimage.png', address: '702 Hazel Blvd, Atlanta, GA 30301', dateOfBirth: 'Oct 25, 1992', bloodType: 'O+', allergies: 'None', registeredDate: 'Dec 2025' },
    'P-45135': { id: 'P-45135', name: 'Nancy Moore', email: 'nancy.m@mail.com', phone: '+1 (555) 334-6789', age: 49, gender: 'Female', concern: 'Melasma', totalCases: 9, approved: 7, pending: 1, rejected: 1, lastVisit: 'Dec 05, 2025', status: 'active', image: '/images/patientimage.png', address: '813 Ivy Ln, Phoenix, AZ 85001', dateOfBirth: 'Feb 14, 1976', bloodType: 'A-', allergies: 'Erythromycin', registeredDate: 'May 2023' },
    'P-45136': { id: 'P-45136', name: 'Daniel Jackson', email: 'daniel.j@mail.com', phone: '+1 (555) 445-7890', age: 44, gender: 'Male', concern: 'Vitiligo', totalCases: 11, approved: 8, pending: 2, rejected: 1, lastVisit: 'Jan 19, 2026', status: 'inactive', image: '/images/patientimage.png', address: '924 Fern Dr, San Diego, CA 92101', dateOfBirth: 'Jul 31, 1981', bloodType: 'AB+', allergies: 'None', registeredDate: 'Oct 2023' },
    'P-45137': { id: 'P-45137', name: 'Michelle Thompson', email: 'michelle.t@mail.com', phone: '+1 (555) 556-8901', age: 31, gender: 'Female', concern: 'Sun damage', totalCases: 4, approved: 3, pending: 1, rejected: 0, lastVisit: 'Feb 21, 2026', status: 'active', image: '/images/patientimage.png', address: '135 Rose Blvd, Portland, OR 97201', dateOfBirth: 'Dec 03, 1994', bloodType: 'B-', allergies: 'None', registeredDate: 'Aug 2025' },
}

const casesMap: Record<string, CaseRecord[]> = {
    'P-45123': [
        { id: 'C001', doctor: 'Dr. Sarah Johnson', condition: 'Eczema flare-up', status: 'approved', date: 'Jan 24, 2026', confidence: 92, treatment: 'Topical corticosteroids' },
        { id: 'C012', doctor: 'Dr. Jennifer Lee', condition: 'Dry skin patches', status: 'approved', date: 'Dec 10, 2025', confidence: 95, treatment: 'Emollients and moisturizers' },
        { id: 'C028', doctor: 'Dr. Sarah Johnson', condition: 'Atopic dermatitis', status: 'pending', date: 'Jan 20, 2026', confidence: 88, treatment: 'Dupilumab injection' },
    ],
    'P-45124': [
        { id: 'C003', doctor: 'Dr. Michael Chen', condition: 'Plaque psoriasis', status: 'approved', date: 'Feb 15, 2026', confidence: 94, treatment: 'Biologic therapy' },
        { id: 'C009', doctor: 'Dr. Thomas Martinez', condition: 'Scalp psoriasis', status: 'approved', date: 'Jan 28, 2026', confidence: 91, treatment: 'Topical calcineurin inhibitors' },
        { id: 'C015', doctor: 'Dr. Michael Chen', condition: 'Nail psoriasis', status: 'rejected', date: 'Dec 05, 2025', confidence: 72, treatment: 'Oral retinoids' },
        { id: 'C021', doctor: 'Dr. James Wilson', condition: 'Joint inflammation', status: 'approved', date: 'Nov 18, 2025', confidence: 89, treatment: 'Methotrexate' },
        { id: 'C033', doctor: 'Dr. Thomas Martinez', condition: 'Guttate psoriasis', status: 'pending', date: 'Feb 10, 2026', confidence: 86, treatment: 'Phototherapy' },
    ],
    'P-45126': [
        { id: 'C002', doctor: 'Dr. James Wilson', condition: 'Suspicious mole', status: 'approved', date: 'Dec 18, 2025', confidence: 97, treatment: 'Excisional biopsy' },
        { id: 'C007', doctor: 'Dr. Patricia Taylor', condition: 'Basal cell carcinoma', status: 'approved', date: 'Nov 22, 2025', confidence: 96, treatment: 'Mohs surgery' },
        { id: 'C014', doctor: 'Dr. James Wilson', condition: 'Actinic keratosis', status: 'approved', date: 'Oct 15, 2025', confidence: 93, treatment: 'Cryotherapy' },
        { id: 'C019', doctor: 'Dr. Robert Smith', condition: 'Squamous cell carcinoma', status: 'pending', date: 'Dec 10, 2025', confidence: 91, treatment: 'Surgical excision' },
        { id: 'C025', doctor: 'Dr. James Wilson', condition: 'Melanoma follow-up', status: 'approved', date: 'Sep 28, 2025', confidence: 98, treatment: 'Sentinel lymph node biopsy' },
    ],
}

const defaultCases: CaseRecord[] = [
    { id: 'C050', doctor: 'Dr. Sarah Johnson', condition: 'Initial consultation', status: 'approved', date: 'Feb 20, 2026', confidence: 90, treatment: 'Topical treatment' },
    { id: 'C051', doctor: 'Dr. Jennifer Lee', condition: 'Follow-up', status: 'pending', date: 'Mar 01, 2026', confidence: 85, treatment: 'Ongoing evaluation' },
]

const statusConfig = {
    approved: { label: 'Approved', color: 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]' },
    pending: { label: 'Pending', color: 'text-[#93370D] bg-[#FEF3C6] border-[#FEE685]' },
    rejected: { label: 'Rejected', color: 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]' },
}

const Page = () => {
    const params = useParams()
    const patientId = params.id as string
    const patient = patientsMap[patientId]

    if (!patient) {
        return (
            <div>
                <div className="container mx-auto mb-20">
                    <AdminHeader />
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-lg text-gray-500">Patient not found</p>
                        <Link href="/admin/patients" className="text-pry hover:underline text-sm">Back to Patients</Link>
                    </div>
                </div>
            </div>
        )
    }

    const cases = casesMap[patientId] || defaultCases
    const approvalRate = patient.totalCases > 0 ? Math.round((patient.approved / patient.totalCases) * 100) : 0

    const stats = [
        { label: 'Total Cases', value: patient.totalCases, icon: FileText, color: 'text-gray-700', bg: 'bg-[#F5F5F0]' },
        { label: 'Approved', value: patient.approved, icon: CheckCircle2, color: 'text-[#17B26A]', bg: 'bg-[#ECFDF3]' },
        { label: 'Pending', value: patient.pending, icon: Clock, color: 'text-[#F79009]', bg: 'bg-[#FFFAEB]' },
        { label: 'Rejected', value: patient.rejected, icon: XCircle, color: 'text-[#F04438]', bg: 'bg-[#FEF3F2]' },
    ]

    return (
        <div>
            <div className="container mx-auto mb-20">
                <AdminHeader />

                <Link href="/admin/patients" className="mb-6 w-fit flex items-center text-sm gap-2 rounded-full py-2 px-4 bg-[#EDEBE3] hover:bg-[#E0DED6] transition-colors">
                    <ArrowLeft size={16} />
                    Back to Patients
                </Link>

                {/* Profile Header */}
                <div className="border border-[#EDEBE3] rounded-2xl p-6 md:p-8 mt-4">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                        <div className="flex gap-5 items-center">
                            <div className="size-20 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                <Image src={patient.image} width={80} height={80} alt={patient.name} className="size-20 object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-semibold text-gray-900">{patient.name}</h1>
                                    <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium border ${
                                        patient.status === 'active'
                                            ? 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]'
                                            : 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]'
                                    }`}>
                                        <span className={`size-1.5 rounded-full mr-1.5 ${patient.status === 'active' ? 'bg-[#17B26A]' : 'bg-[#F04438]'}`} />
                                        {patient.status === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">{patient.gender} &middot; {patient.age} years &middot; {patient.concern}</p>
                                <p className="text-sm text-gray-400">{patient.id} &middot; Registered: {patient.registeredDate}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="text-right">
                                <p className="text-3xl font-bold text-pry">{approvalRate}%</p>
                                <p className="text-xs text-gray-400">Approval Rate</p>
                            </div>
                        </div>
                    </div>
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
                    {/* Patient Info */}
                    <div className="border border-[#EDEBE3] rounded-2xl p-6 flex flex-col gap-5 lg:col-span-1">
                        <h3 className="text-base font-semibold text-gray-900">Patient Information</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Mail size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Email</span>
                                    <span className="text-sm text-gray-700">{patient.email}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Phone size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Phone</span>
                                    <span className="text-sm text-gray-700">{patient.phone}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <MapPin size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Address</span>
                                    <span className="text-sm text-gray-700">{patient.address}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Calendar size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Date of Birth</span>
                                    <span className="text-sm text-gray-700">{patient.dateOfBirth}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Heart size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Blood Type</span>
                                    <span className="text-sm text-gray-700">{patient.bloodType}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <User size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Allergies</span>
                                    <span className="text-sm text-gray-700">{patient.allergies}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0">
                                    <Clock size={16} className="text-gray-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400">Last Visit</span>
                                    <span className="text-sm text-gray-700">{patient.lastVisit}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case History */}
                    <div className="border border-[#EDEBE3] rounded-2xl overflow-hidden lg:col-span-2">
                        <div className="px-6 py-5 border-b border-[#EDEBE3]">
                            <h3 className="text-base font-semibold text-gray-900">Case History</h3>
                            <p className="text-xs text-gray-400 mt-0.5">All treatment cases for this patient</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#FAFAF8] hover:bg-[#FAFAF8]">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Case</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Doctor</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Condition</TableHead>
                                    <TableHead className="text-center font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">AI Conf.</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="pr-6 font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</TableHead>
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
                                            <TableCell><span className="text-sm text-gray-700">{c.doctor}</span></TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-600">{c.condition}</span>
                                                    <span className="text-xs text-gray-400">{c.treatment}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center hidden lg:table-cell">
                                                <span className={`text-sm font-medium ${c.confidence >= 90 ? 'text-[#17B26A]' : c.confidence >= 80 ? 'text-[#F79009]' : 'text-[#F04438]'}`}>
                                                    {c.confidence}%
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center h-6 px-2.5 rounded-full text-xs font-medium border ${sc.color}`}>
                                                    {sc.label}
                                                </span>
                                            </TableCell>
                                            <TableCell className="pr-6 hidden md:table-cell"><span className="text-sm text-gray-500">{c.date}</span></TableCell>
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
