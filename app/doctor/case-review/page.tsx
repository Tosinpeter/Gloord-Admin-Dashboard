'use client'
import Header from '@/components/Header'
import Image from 'next/image'
import front from '@/public/images/front.png'
import left from '@/public/images/left.png'
import right from '@/public/images/right.png'
import profileimage from '@/public/images/profileimage.png'
import React, { useState, useEffect } from 'react'
import Questionnaire from '@/components/Questionnaire'
import { CircleCheckBig, CircleX, X } from 'lucide-react'
import RecommendedTreatmentPlan from '@/components/RecommendedTreatmentPlan'
import SkinAnalysisSummary from '@/components/SkinAnalysisSummary'
import DoctorNotes from '@/components/DoctorNotes'
import AccessGate from '@/components/AccessGate'
import { useAccessibleModal } from '@/lib/useAccessibleModal'

interface ApproveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ApproveModal = ({ isOpen, onClose, onConfirm }: ApproveModalProps) => {
    const { dialogRef } = useAccessibleModal({ isOpen, onClose })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred backdrop */}
            <div
                className="fixed inset-0 bg-[#0000003D] backdrop-blur-[16px]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal content */}
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Approve treatment plan" tabIndex={-1} className="relative bg-white rounded-lg shadow-xl w-[95%] max-w-[504px] p-5">
                <div className="flex justify-between gap-20 mb-4">
                    <div className="w-full flex-1 flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">Approve Treatment Plan</h3>
                        <p className='text-sm font-normal'>
                            The AI recommended treatment plan will be activated for the patient.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close approve modal"
                        className="bg-[#EDEBE3] rounded-full size-8 flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>


                <div className="flex justify-end gap-2 bg-white mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-base font-normal text-[#F04438] bg-[#FEE4E2] rounded-full transition-colors hover:bg-[#FECDCA]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 text-base font-normal text-white bg-[#17B26A] rounded-full transition-colors hover:bg-[#129955]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}


interface RejectEntirePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
// Reject Entire Plan Modal Component
const RejectEntirePlanModal = ({ isOpen, onClose, onConfirm }: RejectEntirePlanModalProps) => {
    const { dialogRef } = useAccessibleModal({ isOpen, onClose })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred backdrop */}
            <div
                className="fixed inset-0 bg-[#0000003D] backdrop-blur-[16px]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal content */}
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Reject treatment plan" tabIndex={-1} className="relative bg-white rounded-lg shadow-xl w-[95%] max-w-[504px] p-5">
                <div className="flex justify-between gap-20 mb-4">
                    <div className="w-full flex-1 flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">Reject Entire Plan</h3>
                        <p className='text-sm font-normal'>
                            The AI recommended treatment plan will be rejected for the patient.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close reject modal"
                        className="bg-[#EDEBE3] rounded-full size-8 flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>


                <div className="flex justify-end gap-2 bg-white mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-base font-normal text-[#F04438] bg-[#FEE4E2] rounded-full transition-colors hover:bg-[#FECDCA]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 text-base font-normal text-white bg-[#F04438] rounded-full transition-colors hover:bg-[#B42318]"
                    >
                        Confirm Reject
                    </button>
                </div>
            </div>
        </div>
    )
}

const Page = () => {
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
    const [isRejectEntireModalOpen, setIsRejectEntireModalOpen] = useState(false)

    const handleApproveClick = () => {
        setIsApproveModalOpen(true)
    }

    const handleRejectEntireClick = () => {
        setIsRejectEntireModalOpen(true)
    }

    const closeApproveModal = () => {
        setIsApproveModalOpen(false)
    }

    const closeRejectEntireModal = () => {
        setIsRejectEntireModalOpen(false)
    }

    const handleApproveConfirm = () => {
        // Handle successful approval
        console.log('Plan approved successfully')
        // You can add additional logic here like refreshing data, showing toast, etc.
    }

    const handleRejectConfirm = () => {
        // Handle successful rejection
        console.log('Plan rejected successfully')
        // You can add additional logic here like refreshing data, showing toast, etc.
    }

    return (
        <AccessGate pathname="/doctor/case-review" allowedRole="doctor">
            <div>
                <div className="container mx-auto mb-20">
                    <Header />

                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between w-full">
                    <div className="flex flex-col gap-4">
                        <h2 className='text-2xl font-semibold text-gray-900'>Case Review: <span>C001</span></h2>
                        <p className="text-gray-600 max-w-2xl">
                            Patient ID: <span>P-45123 • Submitted Jan 24,2026</span>
                        </p>
                    </div>
                    <span className='w-max h-fit py-3 px-4 font-normal text-base border rounded-full bg-[#FEF3C6] border-[#FEE685] text-pry'>
                        Pending Approvals
                    </span>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <h3 className='text-lg font-medium'>Patient Information</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="max-w-[519px] w-full flex flex-col gap-4">
                            <div className="border border-[#0000001A] bg-white rounded-lg p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-5">
                                    <div className="size-12 flex items-center justify-center rounded-full border border-sec bg-sec">
                                        <Image src={profileimage} width={48} height={48} className='size-[48px] rounded-full object-contain' alt='image' />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className='capitalize text-xs font-normal tracking-[0px]'>Patient ID</p>
                                        <h4 className='text-base font-medium leading-[100%]'>P-45123</h4>
                                    </div>
                                </div>
                                <div className="bg-sec h-[1px] w-full"></div>
                                <div className="flex flex-col gap-1">
                                    <p className='capitalize text-xs font-normal tracking-[0px]'>Age</p>
                                    <h4 className='text-base font-medium leading-[100%]'>28 years</h4>
                                </div>
                            </div>
                            <div className="border border-[#0000001A] bg-white rounded-lg p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-6">
                                    <h3 className='text-lg font-medium'>Patient Images</h3>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-3">
                                            <h4 className='font-normal text-sm'>Front View</h4>
                                            <Image src={front} width={468} height={468} className='md:size-[468px] w-full rounded-[10px] object-contain' alt='image' />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h4 className='font-normal text-sm'>Left Profile</h4>
                                            <Image src={left} width={468} height={468} className='md:size-[468px] w-full rounded-[10px] object-contain' alt='image' />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h4 className='font-normal text-sm'>Right Profile</h4>
                                            <Image src={right} width={468} height={468} className='md:size-[468px] w-full rounded-[10px] object-contain' alt='image' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex-1 flex flex-col gap-6">
                            <div className="border border-[#0000001A] bg-white rounded-lg p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <h3 className='text-lg font-medium'>Questionnaire Answers</h3>
                                    <Questionnaire />
                                </div>
                            </div>
                            <div className="border border-[#0000001A] bg-white rounded-lg p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-4">
                                    <h3 className='text-lg font-medium'>AI Skin Analysis Summary</h3>
                                    <SkinAnalysisSummary />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className='text-lg font-medium'>AI Recommended Treatment Plan</h3>
                                <div className="border border-[#0000001A] bg-white rounded-lg p-6 flex flex-col gap-4">
                                    <div className="flex flex-col gap-6">
                                        <RecommendedTreatmentPlan />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h3 className='text-lg font-medium'>Doctor Notes</h3>
                                <div className="border border-[#0000001A] bg-white rounded-lg p-6 flex flex-col gap-4">
                                    <div className="flex flex-col gap-6">
                                        <DoctorNotes />
                                    </div>
                                </div>
                            </div>

                            <form action="">
                                <textarea name="" id="" className='resize-none w-full h-[120px] rounded-lg border border-sec focus:outline-none text-sm font-normal tracking-[-0.15px] py-3 px-4' placeholder='Add any additional notes or instructions for the patient...'></textarea>
                            </form>

                            <div className="grid grid-cols-2 gap-2.5 mt-2">
                                <button
                                    onClick={handleApproveClick}
                                    className="bg-[#17B26A] text-white text-base font-normal flex items-center justify-center gap-2 rounded-full h-[54px] w-full focus:outline-none hover:bg-[#129955] transition-colors"
                                >
                                    <CircleCheckBig size={18} />
                                    Approve Plan
                                </button>
                                <button
                                    onClick={handleRejectEntireClick}
                                    className="bg-[#F04438] text-white text-base font-normal flex items-center justify-center gap-2 rounded-full h-[54px] w-full focus:outline-none hover:bg-[#d33a2f] transition-colors"
                                >
                                    <CircleX size={18} />
                                    Reject Entire Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Approve Modal */}
                <ApproveModal
                    isOpen={isApproveModalOpen}
                    onClose={closeApproveModal}
                    onConfirm={handleApproveConfirm}
                />

            {/* Reject Entire Plan Modal */}
                <RejectEntirePlanModal
                    isOpen={isRejectEntireModalOpen}
                    onClose={closeRejectEntireModal}
                    onConfirm={handleRejectConfirm}
                />
            </div>
        </AccessGate>
    )
}

export default Page