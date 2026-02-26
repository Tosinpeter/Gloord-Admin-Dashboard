'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const data = [
    { month: 'Jul', total: 45, approved: 38, rejected: 6 },
    { month: 'Aug', total: 52, approved: 45, rejected: 6 },
    { month: 'Sep', total: 68, approved: 60, rejected: 7 },
    { month: 'Oct', total: 74, approved: 65, rejected: 8 },
    { month: 'Nov', total: 82, approved: 73, rejected: 8 },
    { month: 'Dec', total: 92, approved: 80, rejected: 10 },
    { month: 'Jan', total: 100, approved: 86, rejected: 11 },
]

export default function MonthlyCasesTrend() {
    return (
        <div className="w-full bg-white shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Monthly Cases Trend
            </h3>

            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5EEF8"
                        />

                        <XAxis
                            dataKey="month"
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            axisLine={{ stroke: '#CBD5E1' }}
                            tickLine={false}
                        />

                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            axisLine={{ stroke: '#CBD5E1' }}
                            tickLine={false}
                        />

                        <Tooltip />

                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{
                                paddingTop: 16,
                            }}
                        />

                        {/* Total Cases */}
                        <Line
                            type="monotone"
                            dataKey="total"
                            name="Total Cases"
                            stroke="#0D9488"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
                            activeDot={{ r: 6 }}
                        />

                        {/* Approved */}
                        <Line
                            type="monotone"
                            dataKey="approved"
                            name="Approved"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
                            activeDot={{ r: 6 }}
                        />

                        {/* Rejected */}
                        <Line
                            type="monotone"
                            dataKey="rejected"
                            name="Rejected"
                            stroke="#EF4444"
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
