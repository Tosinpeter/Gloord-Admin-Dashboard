import AdminHeader from '@/components/admin/AdminHeader'
import React from 'react'
import AnalyticsHero from './AnalyticsHero'
import MonthlyCasesTrend from '@/components/MonthlyCasesTrend'
import SkinConcernsDistribution from '@/components/SkinConcernsDistribution'
import DoctorPerformanceComparison from '@/components/DoctorPerformanceComparison'
import PeakHours from '@/components/PeakHours'
import TopProductsRecommended from '@/components/TopProductsRecommended'
import PatientDemographic from '@/components/PatientDemographic'

const page = () => {
    return (
        <div>
            <div className="container mx-auto mb-20">
                <AdminHeader />

                <AnalyticsHero />
                <div className="flex flex-col gap-6">
                    <div className="mt-6 flex flex-col md:flex-row gap-6">
                        <div className="max-w-[737px] w-full py-5 px-4 border border-[#EDEBE3] rounded-xl">
                            <MonthlyCasesTrend />
                        </div>
                        <div className="flex-1 w-full py-5 px-4 border border-[#EDEBE3] rounded-xl">
                            <SkinConcernsDistribution />
                        </div>
                    </div>
                    <div className="w-full py-5 px-4 border border-[#EDEBE3] rounded-xl">
                        <DoctorPerformanceComparison />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="w-full py-5 px-4 border border-[#EDEBE3] rounded-xl">
                            <PeakHours />
                        </div>
                        <div className="w-full py-5 px-4 border border-[#EDEBE3] rounded-xl">
                            <TopProductsRecommended />
                        </div>
                        <div className="w-full py-5 px-4 border border-[#EDEBE3] rounded-xl">
                            <PatientDemographic />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
