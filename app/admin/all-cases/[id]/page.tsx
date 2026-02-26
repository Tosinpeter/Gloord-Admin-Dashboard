'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ArrowLeft, Brain, Calendar, CheckCircle2, Clock, FileText, Stethoscope, User, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CaseDetail {
    caseId: string;
    patientName: string;
    patientId: string;
    patientAge: number;
    patientGender: string;
    doctorName: string;
    doctorId: string;
    doctorSpecialty: string;
    concern: string;
    description: string;
    confidence: number;
    submitted: string;
    lastUpdated: string;
    status: 'pending' | 'approved' | 'rejected';
    image: string;
    aiFindings: string[];
    recommendedTreatment: string[];
    timeline: { date: string; event: string; by: string }[];
}

const casesMap: Record<string, CaseDetail> = {
    C001: {
        caseId: 'C001', patientName: 'Sarah Johnson', patientId: 'P-45123', patientAge: 28, patientGender: 'Female',
        doctorName: 'Dr. Sarah Johnson', doctorId: 'D003', doctorSpecialty: 'Dermatology',
        concern: 'Acne and hyperpigmentation on cheeks and forehead',
        description: 'Patient presents with moderate inflammatory acne on bilateral cheeks and forehead, accompanied by post-inflammatory hyperpigmentation. Onset approximately 6 months ago with gradual worsening.',
        confidence: 92, submitted: 'Jan 24, 2026', lastUpdated: 'Jan 26, 2026', status: 'approved', image: '/images/patientimage.png',
        aiFindings: ['Moderate inflammatory acne (Grade II-III)', 'Post-inflammatory hyperpigmentation on bilateral cheeks', 'No signs of nodular or cystic lesions', 'Mild comedonal acne on forehead', 'Skin type: Fitzpatrick Type III'],
        recommendedTreatment: ['Topical retinoid (Adapalene 0.1%) nightly', 'Benzoyl peroxide 5% wash daily', 'Azelaic acid 15% for hyperpigmentation', 'Broad-spectrum SPF 50+ sunscreen daily', 'Follow-up in 8 weeks'],
        timeline: [
            { date: 'Jan 24, 2026', event: 'Case submitted', by: 'Patient' },
            { date: 'Jan 24, 2026', event: 'AI analysis completed (92% confidence)', by: 'System' },
            { date: 'Jan 25, 2026', event: 'Assigned to Dr. Sarah Johnson', by: 'System' },
            { date: 'Jan 26, 2026', event: 'Treatment plan approved', by: 'Dr. Sarah Johnson' },
        ],
    },
    C002: {
        caseId: 'C002', patientName: 'Michael Chen', patientId: 'P-45124', patientAge: 45, patientGender: 'Male',
        doctorName: 'Dr. Michael Chen', doctorId: 'D004', doctorSpecialty: 'Cosmetic Dermatology',
        concern: 'Plaque psoriasis on elbows and knees',
        description: 'Patient with chronic plaque psoriasis presenting with well-demarcated, erythematous plaques with silvery-white scales on bilateral elbows and knees. History of psoriasis for 8 years with intermittent flares.',
        confidence: 94, submitted: 'Feb 15, 2026', lastUpdated: 'Feb 18, 2026', status: 'approved', image: '/images/patientimage.png',
        aiFindings: ['Chronic plaque psoriasis (moderate severity)', 'PASI score estimated: 8.5', 'Bilateral involvement of extensor surfaces', 'No nail involvement detected', 'No signs of psoriatic arthritis on skin exam'],
        recommendedTreatment: ['Topical corticosteroid (Betamethasone 0.05%) twice daily', 'Calcipotriene ointment for maintenance', 'Coal tar shampoo for scalp involvement', 'Consider phototherapy if inadequate response', 'Follow-up in 6 weeks'],
        timeline: [
            { date: 'Feb 15, 2026', event: 'Case submitted', by: 'Patient' },
            { date: 'Feb 15, 2026', event: 'AI analysis completed (94% confidence)', by: 'System' },
            { date: 'Feb 16, 2026', event: 'Assigned to Dr. Michael Chen', by: 'System' },
            { date: 'Feb 18, 2026', event: 'Treatment plan approved', by: 'Dr. Michael Chen' },
        ],
    },
    C003: {
        caseId: 'C003', patientName: 'Emily Rodriguez', patientId: 'P-45125', patientAge: 32, patientGender: 'Female',
        doctorName: 'Dr. Emily Rodriguez', doctorId: 'D005', doctorSpecialty: 'Pediatric Dermatology',
        concern: 'Severe cystic acne scarring',
        description: 'Patient seeking treatment for extensive acne scarring including ice-pick, boxcar, and rolling scars primarily on bilateral cheeks. Previous history of severe nodular acne treated with isotretinoin 2 years ago.',
        confidence: 78, submitted: 'Mar 02, 2026', lastUpdated: 'Mar 02, 2026', status: 'pending', image: '/images/patientimage.png',
        aiFindings: ['Multiple ice-pick scars (20+ bilateral)', 'Boxcar scars on lower cheeks', 'Rolling scars on jawline', 'No active acne lesions', 'Post-isotretinoin skin appears well-healed'],
        recommendedTreatment: ['Fractional CO2 laser therapy (series of 3-5 sessions)', 'TCA CROSS for ice-pick scars', 'Microneedling with PRP for rolling scars', 'Topical silicone gel for scar maturation', 'Follow-up in 4 weeks for treatment planning'],
        timeline: [
            { date: 'Mar 02, 2026', event: 'Case submitted', by: 'Patient' },
            { date: 'Mar 02, 2026', event: 'AI analysis completed (78% confidence)', by: 'System' },
        ],
    },
    C004: {
        caseId: 'C004', patientName: 'James Wilson', patientId: 'P-45126', patientAge: 61, patientGender: 'Male',
        doctorName: 'Dr. James Wilson', doctorId: 'D006', doctorSpecialty: 'Dermatopathology',
        concern: 'Suspicious mole on upper back',
        description: 'Patient presents with an asymmetric, irregularly bordered pigmented lesion on the upper back. The mole has changed in size and color over the past 3 months per patient report. Family history of melanoma (father).',
        confidence: 97, submitted: 'Dec 18, 2025', lastUpdated: 'Dec 22, 2025', status: 'rejected', image: '/images/patientimage.png',
        aiFindings: ['Asymmetric pigmented lesion, 8mm diameter', 'Irregular borders with notching', 'Color variegation: brown, dark brown, black areas', 'ABCDE criteria: 4/5 positive', 'High suspicion for dysplastic nevus or melanoma'],
        recommendedTreatment: ['Urgent excisional biopsy recommended', 'Full-thickness excision with 2mm margins', 'Dermatopathology review of specimen', 'Full body skin exam', 'Sentinel lymph node biopsy if melanoma confirmed'],
        timeline: [
            { date: 'Dec 18, 2025', event: 'Case submitted', by: 'Patient' },
            { date: 'Dec 18, 2025', event: 'AI analysis completed (97% confidence)', by: 'System' },
            { date: 'Dec 19, 2025', event: 'Flagged as urgent', by: 'System' },
            { date: 'Dec 20, 2025', event: 'Assigned to Dr. James Wilson', by: 'System' },
            { date: 'Dec 22, 2025', event: 'Plan rejected – in-person biopsy required first', by: 'Dr. James Wilson' },
        ],
    },
    C005: {
        caseId: 'C005', patientName: 'Maria Garcia', patientId: 'P-45127', patientAge: 29, patientGender: 'Female',
        doctorName: 'Dr. Maria Garcia', doctorId: 'D007', doctorSpecialty: 'Dermatology',
        concern: 'Rosacea with persistent redness',
        description: 'Patient presents with erythematotelangiectatic rosacea with persistent centrofacial redness, visible telangiectasias, and occasional papules. Triggers include sun exposure, spicy food, and stress.',
        confidence: 89, submitted: 'Mar 10, 2026', lastUpdated: 'Mar 13, 2026', status: 'approved', image: '/images/patientimage.png',
        aiFindings: ['Erythematotelangiectatic rosacea (subtype I)', 'Centrofacial erythema with telangiectasias', 'Mild papulopustular component', 'No phymatous changes', 'Skin barrier appears compromised'],
        recommendedTreatment: ['Topical brimonidine 0.33% gel for erythema', 'Topical metronidazole 0.75% cream twice daily', 'Gentle cleanser and moisturizer regimen', 'Mineral sunscreen SPF 50+', 'Avoid identified triggers'],
        timeline: [
            { date: 'Mar 10, 2026', event: 'Case submitted', by: 'Patient' },
            { date: 'Mar 10, 2026', event: 'AI analysis completed (89% confidence)', by: 'System' },
            { date: 'Mar 11, 2026', event: 'Assigned to Dr. Maria Garcia', by: 'System' },
            { date: 'Mar 13, 2026', event: 'Treatment plan approved', by: 'Dr. Maria Garcia' },
        ],
    },
}

const defaultCase: CaseDetail = {
    caseId: '', patientName: 'Unknown Patient', patientId: '', patientAge: 0, patientGender: '',
    doctorName: 'Unassigned', doctorId: '', doctorSpecialty: '',
    concern: 'General consultation',
    description: 'Case details are being processed. Please check back later for the full analysis.',
    confidence: 85, submitted: 'Feb 20, 2026', lastUpdated: 'Feb 20, 2026', status: 'pending', image: '/images/patientimage.png',
    aiFindings: ['Analysis pending', 'Images under review'],
    recommendedTreatment: ['Awaiting doctor review'],
    timeline: [{ date: 'Feb 20, 2026', event: 'Case submitted', by: 'Patient' }],
}

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    approved: { label: 'Approved', color: 'text-[#016630]', bg: 'bg-[#DCFCE7] border-[#B9F8CF]', dot: 'bg-[#17B26A]' },
    pending: { label: 'Pending Review', color: 'text-[#93370D]', bg: 'bg-[#FEF3C6] border-[#FEE685]', dot: 'bg-[#F79009]' },
    rejected: { label: 'Rejected', color: 'text-[#9B1C1C]', bg: 'bg-[#FEE2E2] border-[#FECACA]', dot: 'bg-[#F04438]' },
}

const Page = () => {
    const params = useParams()
    const caseId = params.id as string
    const caseData = casesMap[caseId] || { ...defaultCase, caseId }

    if (!casesMap[caseId] && !caseId) {
        return (
            <div>
                <div className="container mx-auto mb-20">
                    <AdminHeader />
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <p className="text-lg text-gray-500">Case not found</p>
                        <Link href="/admin/all-cases" className="text-pry hover:underline text-sm">Back to All Cases</Link>
                    </div>
                </div>
            </div>
        )
    }

    const sc = statusConfig[caseData.status]

    return (
        <div>
            <div className="container mx-auto mb-20">
                <AdminHeader />

                <Link href="/admin/all-cases" className="mb-6 w-fit flex items-center text-sm gap-2 rounded-full py-2 px-4 bg-[#EDEBE3] hover:bg-[#E0DED6] transition-colors">
                    <ArrowLeft size={16} />
                    Back to All Cases
                </Link>

                {/* Case Header */}
                <div className="border border-[#EDEBE3] rounded-2xl p-6 md:p-8 mt-4">
                    <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-semibold text-gray-900">Case {caseData.caseId}</h1>
                                <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${sc.bg} ${sc.color}`}>
                                    <span className={`size-1.5 rounded-full mr-1.5 ${sc.dot}`} />
                                    {sc.label}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{caseData.concern}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                                <span>Submitted: {caseData.submitted}</span>
                                <span>&middot;</span>
                                <span>Last updated: {caseData.lastUpdated}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                            <div className="text-right">
                                <p className={`text-3xl font-bold ${caseData.confidence >= 90 ? 'text-[#17B26A]' : caseData.confidence >= 80 ? 'text-[#F79009]' : 'text-[#F04438]'}`}>
                                    {caseData.confidence}%
                                </p>
                                <p className="text-xs text-gray-400">AI Confidence</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-5 leading-relaxed">{caseData.description}</p>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {/* Patient Card */}
                    <div className="border border-[#EDEBE3] rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <User size={16} className="text-gray-500" />
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Patient</h3>
                        </div>
                        <Link href={`/admin/patients/${caseData.patientId}`} className="flex items-center gap-4 group">
                            <div className="size-12 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                <Image src={caseData.image} width={48} height={48} alt={caseData.patientName} className="size-12 object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-base font-medium text-gray-900 group-hover:text-pry transition-colors">{caseData.patientName}</span>
                                <span className="text-xs text-gray-400">{caseData.patientId} &middot; {caseData.patientGender} &middot; {caseData.patientAge} years</span>
                            </div>
                        </Link>
                    </div>

                    {/* Doctor Card */}
                    <div className="border border-[#EDEBE3] rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Stethoscope size={16} className="text-gray-500" />
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Assigned Doctor</h3>
                        </div>
                        <Link href={`/admin/doctors/${caseData.doctorId}`} className="flex items-center gap-4 group">
                            <div className="size-12 rounded-full overflow-hidden bg-[#EDEBE3] shrink-0">
                                <Image src={caseData.image} width={48} height={48} alt={caseData.doctorName} className="size-12 object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-base font-medium text-gray-900 group-hover:text-pry transition-colors">{caseData.doctorName}</span>
                                <span className="text-xs text-gray-400">{caseData.doctorId} &middot; {caseData.doctorSpecialty}</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Timeline */}
                    <div className="border border-[#EDEBE3] rounded-2xl p-6 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-5">
                            <Clock size={16} className="text-gray-500" />
                            <h3 className="text-base font-semibold text-gray-900">Timeline</h3>
                        </div>
                        <div className="flex flex-col gap-0">
                            {caseData.timeline.map((event, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`size-3 rounded-full mt-1.5 shrink-0 ${i === caseData.timeline.length - 1 ? 'bg-pry' : 'bg-[#EDEBE3]'}`} />
                                        {i < caseData.timeline.length - 1 && <div className="w-px flex-1 bg-[#EDEBE3] my-1" />}
                                    </div>
                                    <div className="pb-5">
                                        <p className="text-sm text-gray-700 font-medium">{event.event}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{event.date} &middot; {event.by}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Analysis + Treatment */}
                    <div className="flex flex-col gap-6 lg:col-span-2">
                        {/* AI Findings */}
                        <div className="border border-[#EDEBE3] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <Brain size={16} className="text-gray-500" />
                                <h3 className="text-base font-semibold text-gray-900">AI Skin Analysis Findings</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {caseData.aiFindings.map((finding, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="size-6 rounded-full bg-[#F5F5F0] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-xs font-medium text-gray-500">{i + 1}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{finding}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Treatment */}
                        <div className="border border-[#EDEBE3] rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <FileText size={16} className="text-gray-500" />
                                <h3 className="text-base font-semibold text-gray-900">Recommended Treatment Plan</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {caseData.recommendedTreatment.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                            caseData.status === 'approved' ? 'bg-[#ECFDF3]' : caseData.status === 'rejected' ? 'bg-[#FEF3F2]' : 'bg-[#FFFAEB]'
                                        }`}>
                                            {caseData.status === 'approved' ? (
                                                <CheckCircle2 size={14} className="text-[#17B26A]" />
                                            ) : caseData.status === 'rejected' ? (
                                                <XCircle size={14} className="text-[#F04438]" />
                                            ) : (
                                                <Clock size={14} className="text-[#F79009]" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons for pending cases */}
                {caseData.status === 'pending' && (
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <Link
                            href="/admin/case-review"
                            className="inline-flex items-center gap-2 h-12 px-6 rounded-full text-base font-medium bg-pry text-white hover:opacity-90 transition-opacity"
                        >
                            <Calendar size={16} />
                            Open in Case Review
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
