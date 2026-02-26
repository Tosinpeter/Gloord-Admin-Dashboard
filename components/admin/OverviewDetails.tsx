'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ActivityOverview from './ActivityOverview';
import { useTranslations } from 'next-intl';
import DoctorOverview from './DoctorOverview';

const OverviewDetails = () => {
    const t = useTranslations('admin.tabs')
    return (
        <div className='py-8'>
            <div className="flex justify-between items-center">
                <Tabs defaultValue="overview" className="w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center mb-6">
                        <TabsList className="bg-sec ml-0 rounded-full flex justify-start">
                            <TabsTrigger className='data-[state=active]:bg-tet' value="overview">{t('overview')}</TabsTrigger>
                            <TabsTrigger className='data-[state=active]:bg-tet' value="doctors">{t('doctors')}</TabsTrigger>
                            <TabsTrigger className='data-[state=active]:bg-tet' value="patients">{t('patients')}</TabsTrigger>
                            <TabsTrigger className='data-[state=active]:bg-tet' value="allcases">{t('allCases')}</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="overview">
                        <ActivityOverview />
                    </TabsContent>
                    <TabsContent value="doctors">
                        <DoctorOverview />
                    </TabsContent>
                    <TabsContent value="patients">
                        <ActivityOverview />
                    </TabsContent>
                    <TabsContent value="allcases">
                        <DoctorOverview />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default OverviewDetails