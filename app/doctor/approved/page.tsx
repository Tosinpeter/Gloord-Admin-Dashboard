import ApprovedCasesSection from '@/components/ApprovedCasesSection'
import Header from '@/components/Header'
import React from 'react'

const ApprovedPage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <ApprovedCasesSection />
            </div>
        </div>
    )
}

export default ApprovedPage