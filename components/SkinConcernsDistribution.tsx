'use client'

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import type { PieLabelRenderProps } from 'recharts'
import { useTranslations } from 'next-intl'

const DATA_KEYS = [
    { key: 'acne', value: 28 },
    { key: 'hyperpigmentation', value: 21 },
    { key: 'agingWrinkles', value: 16 },
    { key: 'drySkin', value: 14 },
    { key: 'rosacea', value: 11 },
    { key: 'other', value: 11 },
] as const

const COLORS = [
    '#CF604A', // Acne
    '#CF604AB2', // Hyperpigmentation
    '#DD90809E', // Aging/Wrinkles
    '#EABAB082', // Dry Skin
    '#F4DCD76B', // Rosacea
    '#DD908033', // Other
]

const renderLabel = (props: PieLabelRenderProps) => {
    const cx = props.cx ?? 0
    const cy = props.cy ?? 0
    const midAngle = props.midAngle ?? 0
    const outerRadius = props.outerRadius ?? 0

    const displayName =
        typeof props.name === 'string' ? props.name : String(props.name ?? '')
    const displayValue =
        typeof props.value === 'number' ? props.value : Number(props.value ?? 0)

    const RADIAN = Math.PI / 180
    const radius = outerRadius + 18
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill="#20201E"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
            fontWeight={400}
        >
            {displayName} {displayValue}%
        </text>
    )
}

export default function SkinConcernsDistribution() {
    const t = useTranslations('charts')
    const tConcerns = useTranslations('charts.skinConcerns')

    const data = DATA_KEYS.map(({ key, value }) => ({
        name: tConcerns(key),
        value,
    }))

    return (
        <div className="w-full bg-white">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
                {t('skinConcernsDistribution')}
            </h3>

            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={110}
                            paddingAngle={1}
                            dataKey="value"
                            label={renderLabel}
                            labelLine={false}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value: number | undefined) =>
                                value !== undefined ? `${value}%` : '0%'
                            }
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}