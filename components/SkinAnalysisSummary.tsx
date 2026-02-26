import React from 'react'



const SkinAnalysisSummary = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-normal">Detected Concerns</p>
                <div className="flex flex-wrap items-center gap-2">
                    <span className='text-[#0A0A0A] border border-sec rounded-full bg-white py-2 px-4 text-[13px] font-normal'>Moderate acne</span>
                    <span className='text-[#0A0A0A] border border-sec rounded-full bg-white py-2 px-4 text-[13px] font-normal'>Post-inflammatory hyperpigmentation</span>
                    <span className='text-[#0A0A0A] border border-sec rounded-full bg-white py-2 px-4 text-[13px] font-normal'>Uneven skin tone</span>
                </div>
            </div>
            <div className="bg-sec h-[1px] w-full"></div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-0">
                    <p className="text-sm font-normal">Skin Type</p>
                    <h4 className='font-medium text-base'>Combination</h4>
                </div>
                <div className="flex flex-col gap-0">
                    <p className="text-sm font-normal">Sensitivity Level</p>
                    <h4 className='font-medium text-base'>Low</h4>
                </div>
            </div>
            <div className="bg-sec h-[1px] w-full"></div>
            <div className="flex flex-col gap-0">
                <p className="text-sm font-normal">AI Recommendations</p>
                <h4 className='font-medium text-base'>Focus on gentle exfoliation, brightening ingredients, and consistent sun protection</h4>
            </div>
        </div>
    )
}

export default SkinAnalysisSummary
