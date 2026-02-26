import Header from '@/components/Header'
import PendingApprovalSection from '@/components/PendingApprovalSection'
import React from 'react'

const PendingPage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <PendingApprovalSection />
            </div>
        </div>
    )
}

export default PendingPage
