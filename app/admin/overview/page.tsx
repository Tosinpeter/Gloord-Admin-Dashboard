import DashboardCard from '@/components/admin/DashboardCard'
import AdminHeader from '@/components/admin/AdminHeader'
import React from 'react'
import OverviewDetails from '@/components/admin/OverviewDetails'

const OverviewPage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <AdminHeader />
                <DashboardCard />
                <OverviewDetails />
            </div>
        </div>
    )
}

export default OverviewPage
