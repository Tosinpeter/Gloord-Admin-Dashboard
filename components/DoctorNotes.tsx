import { CircleCheckBig, CircleX } from 'lucide-react'
import React from 'react'

const DoctorNotes = () => {
    return (
        <div className='flex flex-col gap-3'>
            <div className="flex items-center gap-2.5">
                <div className="size-9 flex items-center justify-center rounded-full bg-[#CF604A]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_77_8430)">
                            <path d="M8.28083 12.9162C8.20644 12.6278 8.05612 12.3646 7.84552 12.154C7.63491 11.9434 7.37173 11.7931 7.08333 11.7187L1.97083 10.4004C1.88361 10.3756 1.80684 10.3231 1.75218 10.2508C1.69751 10.1784 1.66794 10.0902 1.66794 9.99956C1.66794 9.90889 1.69751 9.82069 1.75218 9.74835C1.80684 9.67601 1.88361 9.62348 1.97083 9.59872L7.08333 8.27956C7.37162 8.20523 7.63474 8.05503 7.84534 7.84459C8.05593 7.63414 8.20631 7.37113 8.28083 7.08289L9.59917 1.97039C9.62367 1.88282 9.67615 1.80567 9.7486 1.75072C9.82105 1.69576 9.90948 1.66602 10.0004 1.66602C10.0913 1.66602 10.1798 1.69576 10.2522 1.75072C10.3247 1.80567 10.3772 1.88282 10.4017 1.97039L11.7192 7.08289C11.7936 7.37128 11.9439 7.63447 12.1545 7.84507C12.3651 8.05567 12.6283 8.20599 12.9167 8.28039L18.0292 9.59789C18.1171 9.62214 18.1946 9.67456 18.2499 9.74712C18.3051 9.81968 18.335 9.90836 18.335 9.99956C18.335 10.0908 18.3051 10.1794 18.2499 10.252C18.1946 10.3245 18.1171 10.377 18.0292 10.4012L12.9167 11.7187C12.6283 11.7931 12.3651 11.9434 12.1545 12.154C11.9439 12.3646 11.7936 12.6278 11.7192 12.9162L10.4008 18.0287C10.3763 18.1163 10.3238 18.1934 10.2514 18.2484C10.179 18.3034 10.0905 18.3331 9.99958 18.3331C9.90865 18.3331 9.82022 18.3034 9.74777 18.2484C9.67532 18.1934 9.62284 18.1163 9.59833 18.0287L8.28083 12.9162Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.667 2.5V5.83333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.3333 4.16602H15" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.33301 14.166V15.8327" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.16667 15H2.5" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_77_8430">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="w-full flex-1 flex flex-col gap-1">
                    <h4 className='text-base font-medium'>AI-Generated Notes Recommendation</h4>
                    <p className='text-sm font-normal'>Review and use the AI-suggested treatment notes or write your own</p>
                </div>
            </div>
            <div className="border border-white bg-[#EDEBE3] font-normal text-sm rounded-xl p-4 flex flex-col gap-5">
                <span>Based on the patient&apos;s skin analysis, I recommend the following treatment approach:</span>
                <ol className='pl-4 list list-decimal'>
                    <li>
                        Start with the prescribed cleanser twice daily to maintain skin barrier function
                    </li>
                    <li>
                        Introduce the Niacinamide serum in the morning to address hyperpigmentation and acne
                    </li>
                    <li>
                        Begin Retinol treatment 2-3x per week, gradually increasing as tolerated
                    </li>
                    <li>
                        Emphasize strict daily SPF application to prevent further pigmentation
                    </li>
                    <li>
                        Monitor for any signs of irritation; adjust product frequency if needed
                    </li>
                </ol>
                <span>Expected timeline: Initial improvement in 4-6 weeks, significant results in 12-16 weeks. Schedule follow-up in 6 weeks to assess progress and tolerance.</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-2">
                <div className="bg-[#00A63E] text-white text-base font-normal flex items-center justify-center gap-2 rounded-full h-[40px] w-full border border-[#00A63E] focus:outline-none">
                    <CircleCheckBig size={18} />
                    Use AI Notes
                </div>
                <div className="bg-[#ffffff] text-base font-normal flex items-center justify-center gap-2 rounded-full h-[40px] w-full border border-[#0000001A] focus:outline-none">
                    <CircleX size={18} />
                    Write My Own
                </div>
            </div>
        </div>
    )
}

export default DoctorNotes
