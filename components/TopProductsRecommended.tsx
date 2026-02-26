'use client'

type Product = {
    name: string
    count: number
}

const products: Product[] = [
    { name: 'Niacinamide Serum', count: 234 },
    { name: 'Retinol Treatment', count: 198 },
    { name: 'SPF 50 Sunscreen', count: 187 },
    { name: 'Hyaluronic Acid', count: 156 },
    { name: 'Vitamin C Serum', count: 143 },
]

export default function TopProductsRecommended() {
    return (
        <div className="w-full bg-white">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Top Products Recommended
            </h3>

            <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                    <li
                        key={product.name}
                        className="flex items-center justify-between py-3 text-sm"
                    >
                        <span className="text-gray-700">
                            {product.name}
                        </span>
                        <span className="font-semibold text-gray-900">
                            {product.count}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
