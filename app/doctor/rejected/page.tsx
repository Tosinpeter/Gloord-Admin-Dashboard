import Header from '@/components/Header'
import RejectedCasesSection from '@/components/RejectedCasesSection'
import React from 'react'

const RejectedPage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <RejectedCasesSection />
            </div>
        </div>
    )
}

export default RejectedPage