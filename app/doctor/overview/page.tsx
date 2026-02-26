import DetailsSection from '@/components/DetailsSection'
import Header from '@/components/Header'
import OverviewSection from '@/components/OverviewSection'
import React from 'react'

const OverviewPage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <OverviewSection />
                <DetailsSection />
            </div>
        </div>
    )
}

export default OverviewPage
