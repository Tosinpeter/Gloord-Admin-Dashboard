'use client'

type PeakHour = {
    label: string
    value: number
}

const data: PeakHour[] = [
    { label: 'Age 18-25', value: 28 },
    { label: 'Age 26-35', value: 38 },
    { label: 'Age 36-50', value: 24 },
    { label: 'Age 50+', value: 10 },
]

export default function PatientDemographic() {
    return (
        <div className="w-full bg-white">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
                Patient demographics
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
