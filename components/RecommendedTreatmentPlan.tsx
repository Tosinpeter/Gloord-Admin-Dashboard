'use client'
import { CircleX, X, PenLine } from 'lucide-react'
import React, { useState } from 'react'
import { useAccessibleModal } from '@/lib/useAccessibleModal'

// Define the Plan type
interface Plan {
    id: number;
    treatment: string;
    plan: string;
}

const alternativeProducts = [
    // ... (your alternative products array remains the same)
    {
        id: 1,
        name: "Hydrating Cleanser with Ceramides",
        intensity: "Gentle",
        intensityColor: "text-[#016630] bg-[#DCFCE7]",
        description: "Gentle, non-foaming cleanser that maintains skin barrier",
        ingredients: ["Ceramides", "Hyaluronic Acid"],
        usage: "Morning & Evening",
        skinTypes: ["Dry", "Sensitive", "Normal"],
        bestFor: ["Dry skin", "Sensitive skin"]
    },
    {
        id: 2,
        name: "Hydrating Cleanser with Ceramides",
        intensity: "Moderate",
        intensityColor: "text-[#DC6803] bg-[#FEF0C7]",
        description: "Deep cleansing formula that unclogs pores",
        ingredients: ["Salicylic Acid 2%"],
        usage: "Evening only",
        skinTypes: ["Oily", "Combination", "Acne-prone"],
        bestFor: ["Acne", "Blackheads"]
    },
    {
        id: 3,
        name: "Hydrating Cleanser with Ceramides",
        intensity: "Gentle",
        intensityColor: "text-[#016630] bg-[#DCFCE7]",
        description: "Gentle, non-foaming cleanser that maintains skin barrier",
        ingredients: ["Ceramides", "Hyaluronic Acid"],
        usage: "Morning & Evening",
        skinTypes: ["Dry", "Sensitive", "Normal"],
        bestFor: ["Dry skin", "Sensitive skin"]
    },
    {
        id: 4,
        name: "Hydrating Cleanser with Ceramides",
        intensity: "Gentle",
        intensityColor: "text-[#016630] bg-[#DCFCE7]",
        description: "Gentle, non-foaming cleanser that maintains skin barrier",
        ingredients: ["Ceramides", "Hyaluronic Acid"],
        usage: "Morning & Evening",
        skinTypes: ["Dry", "Sensitive", "Normal"],
        bestFor: ["Dry skin", "Sensitive skin"]
    }
]

interface ReplaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan: Plan | null;
}

// Replace Modal Component
const ReplaceModal = ({ isOpen, onClose, selectedPlan }: ReplaceModalProps) => {
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
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Replace product modal" tabIndex={-1} className="relative bg-white rounded-xl shadow-xl w-full max-w-[942px] p-5 m-4 max-h-[95vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-full flex-1 flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">Replace Product</h3>
                        <p className='text-sm font-normal'>
                            Select an alternative product to replace {selectedPlan?.treatment || "Hydrating Cleanser with Ceramides"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close replace modal"
                        className="bg-[#EDEBE3] rounded-full size-8 flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="bg-[#F6F0EE] rounded-md flex items-center gap-2 p-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_77_8813)">
                                <path d="M10.0003 18.3346C14.6027 18.3346 18.3337 14.6037 18.3337 10.0013C18.3337 5.39893 14.6027 1.66797 10.0003 1.66797C5.39795 1.66797 1.66699 5.39893 1.66699 10.0013C1.66699 14.6037 5.39795 18.3346 10.0003 18.3346Z" stroke="#CF604A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 13.3333V10" stroke="#CF604A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 6.66797H10.0083" stroke="#CF604A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_77_8813">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className='leading-[100%]'>Showing {alternativeProducts.length} alternative cleanser products</span>
                    </div>

                    <div className="flex flex-col gap-3 overflow-x-scroll">
                        {alternativeProducts.map((product) => (
                            <div key={product.id} className="flex gap-4 p-5 border border-[#EDEBE3] rounded-xl hover:border-[#17B26A] hover:bg-[#F6FEF9] transition-all cursor-pointer group">
                                <div className="w-[150px] text-base font-normal">
                                    {product.name}
                                </div>
                                <div className={`w-[70px] h-fit rounded-full py-1 flex items-center justify-center px-[14px] font-normal text-xs ${product.intensityColor}`}>
                                    {product.intensity}
                                </div>
                                <div className="w-[155px] text-[13px] font-normal">
                                    {product.description}
                                </div>
                                <div className="flex flex-col gap-2">
                                    {product.ingredients.map((ingredient, index) => (
                                        <div key={index} className="w-max py-[7px] px-3 rounded-full bg-[#EDEBE3] font-normal text-xs">
                                            {ingredient}
                                        </div>
                                    ))}
                                </div>
                                <div className="w-[102px] text-[13px] font-normal">
                                    Usage: {product.usage}
                                </div>
                                <div className="w-[102px] text-[13px] font-normal">
                                    Skin Types: {product.skinTypes.join(", ")}
                                </div>
                                <div className="w-[102px] text-[13px] font-normal">
                                    Best for: {product.bestFor.join(", ")}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 bg-white">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-base font-normal text-[#F04438] bg-[#FEE4E2] rounded-full transition-colors hover:bg-[#FECDCA]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-base font-normal text-white bg-[#17B26A] rounded-full transition-colors hover:bg-[#129955]"
                        >
                            Confirm Replacement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface RejectModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPlan: Plan | null;
}

// Reject Modal Component
const RejectModal = ({ isOpen, onClose, selectedPlan }: RejectModalProps) => {
    const [rejectionReason, setRejectionReason] = useState('')
    const [otherReason, setOtherReason] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { dialogRef } = useAccessibleModal({ isOpen, onClose })

    const resetForm = () => {
        setRejectionReason('')
        setOtherReason('')
        setIsSubmitting(false)
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            console.log('Rejection reason:', {
                plan: selectedPlan,
                reason: rejectionReason,
                otherReason: rejectionReason === 'other' ? otherReason : null
            })
            handleClose()
        }, 500)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred backdrop */}
            <div
                className="fixed inset-0 bg-[#0000003D] backdrop-blur-[16px]"
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal content */}
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Reject product modal" tabIndex={-1} className="relative bg-white rounded-lg shadow-xl w-[95%] max-w-[504px] p-5">
                <div className="flex justify-between gap-20 mb-4">
                    <div className="w-full flex-1 flex flex-col gap-2">
                        <h3 className="text-2xl font-bold">Reject Product</h3>
                        <p className='text-sm font-normal'>
                            Please provide a reason for rejecting {selectedPlan?.treatment || "Hydrating Cleanser with Ceramides"}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        aria-label="Close reject modal"
                        className="bg-[#EDEBE3] rounded-full size-8 flex items-center justify-center transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="mb-6 flex flex-col gap-2">
                        <span className="text-xs font-medium text-[#0A0A0A]">
                            Rejection Reason
                        </span>
                        <input
                            type="text"
                            value={rejectionReason}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRejectionReason(e.target.value)}
                            placeholder={`e.g., Too strong for patient's sensitive skin, may cause irritation...`}
                            className='text-sm font-normal border border-[#EDEBE3] h-[44px] px-3 focus:outline-none rounded bg-[#EDEBE3]'
                        />
                    </label>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-[#20201E] rounded-full transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!rejectionReason || isSubmitting}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-[#F04438] rounded-full transition-colors disabled:opacity-90 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Confirm Rejection'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const RecommendedTreatmentPlan = () => {
    const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

    const plans: Plan[] = [
        {
            id: 1,
            treatment: "Hydrating Cleanser with Ceramides",
            plan: "Cleanser • Morning & Evening"
        },
        {
            id: 2,
            treatment: "Hydrating Cleanser with Ceramides",
            plan: "Cleanser • Morning & Evening"
        },
        {
            id: 3,
            treatment: "Hydrating Cleanser with Ceramides",
            plan: "Cleanser • Morning & Evening"
        },
        {
            id: 4,
            treatment: "Hydrating Cleanser with Ceramides",
            plan: "Cleanser • Morning & Evening"
        },
        {
            id: 5,
            treatment: "Hydrating Cleanser with Ceramides",
            plan: "Cleanser • Morning & Evening"
        },
    ]

    const handleReplaceClick = (plan: Plan) => {
        setSelectedPlan(plan)
        setIsReplaceModalOpen(true)
    }

    const handleRejectClick = (plan: Plan) => {
        setSelectedPlan(plan)
        setIsRejectModalOpen(true)
    }

    const closeReplaceModal = () => {
        setIsReplaceModalOpen(false)
        setSelectedPlan(null)
    }

    const closeRejectModal = () => {
        setIsRejectModalOpen(false)
        setSelectedPlan(null)
    }

    return (
        <>
            <div className="flex flex-col gap-5 lastchild ">
                {plans.map((plan) => (
                    <div key={plan.id} className="flex flex-col gap-5">
                        <div className="flex justify-between gap-2 items-center w-full">
                            <div className="w-full flex-1 flex flex-col gap-3">
                                <h4 className='font-medium text-base'>{plan.plan}</h4>
                                <p className="text-sm font-normal">{plan.treatment}</p>
                            </div>
                            <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                                <button
                                    onClick={() => handleReplaceClick(plan)}
                                    className="flex items-center gap-1 text-sm py-2 px-4 bg-transparent border border-sec rounded-full hover:bg-gray-50 transition-colors"
                                >
                                    <PenLine size={16} />
                                    <span>Replace</span>
                                </button>
                                <button
                                    onClick={() => handleRejectClick(plan)}
                                    className="text-[#E7000B] flex items-center gap-1 text-sm py-2 px-4 bg-transparent border border-sec rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <CircleX size={16} />
                                    <span>Reject</span>
                                </button>
                            </div>
                        </div>
                        {plan.id < plans.length && (
                            <div className="bg-sec h-[1px] w-full" />
                        )}
                    </div>
                ))}
            </div>

            {/* Replace Modal */}
            <ReplaceModal
                isOpen={isReplaceModalOpen}
                onClose={closeReplaceModal}
                selectedPlan={selectedPlan}
            />

            {/* Reject Modal */}
            <RejectModal
                isOpen={isRejectModalOpen}
                onClose={closeRejectModal}
                selectedPlan={selectedPlan}
            />
        </>
    )
}

export default RecommendedTreatmentPlan