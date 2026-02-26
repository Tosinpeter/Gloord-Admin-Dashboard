'use client'

type PeakHour = {
    label: string
    value: number
}

const data: PeakHour[] = [
    { label: '9 AM - 12 PM', value: 42 },
    { label: '1 PM - 4 PM', value: 35 },
    { label: '5 PM - 8 PM', value: 23 },
]

export default function PeakHours() {
    return (
        <div className="w-full bg-white">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Peak Hours
            </h3>

            <div className="space-y-5">
                {data.map((item) => (
                    <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
                            <span>{item.label}</span>
                            <span className="font-medium text-gray-900">
                                {item.value}%
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-3 w-full rounded-full bg-slate-100">
                            <div
                                className="h-3 rounded-full bg-[#D2644D]"
                                style={{ width: `${item.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
