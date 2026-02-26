'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const data = [
    { name: 'Dr. Johnson', approved: 140, rejected: 2 },
    { name: 'Dr. Chen', approved: 190, rejected: 3 },
    { name: 'Dr. Rodriguez', approved: 165, rejected: 4 },
    { name: 'Dr. Wilson', approved: 120, rejected: 6 },
    { name: 'Dr. Anderson', approved: 85, rejected: 1 },
]

export default function DoctorPerformanceComparison() {
    return (
        <div className="w-full bg-white">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Doctor Performance Comparison
                </h3>
            </div>

            <div className="h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#F1E8DC"
                        />

                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                        />

                        <YAxis
                            domain={[0, 200]}
                            ticks={[0, 50, 100, 150, 200]}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            axisLine={{ stroke: '#E5E7EB' }}
                            tickLine={false}
                        />

                        <Tooltip
                            itemStyle={{ color: '#111827', fontSize: 13 }}
                            labelStyle={{ color: '#374151', fontSize: 12 }}
                        />

                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            iconSize={8}
                        />

                        {/* Approved */}
                        <Bar
                            dataKey="approved"
                            name="Approved"
                            fill="#18B26A"
                            radius={[0, 0, 0, 0]}
                        />

                        {/* Rejected */}
                        <Bar
                            dataKey="rejected"
                            name="Rejected"
                            fill="#EF4444"
                            radius={[0, 0, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
