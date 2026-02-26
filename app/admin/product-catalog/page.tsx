'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ChevronLeft, ChevronRight, EllipsisVertical, ListFilter, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ProductHero from './ProductHero'
import AccessGate from '@/components/AccessGate'
import { useAccessibleModal } from '@/lib/useAccessibleModal'

interface Product {
    id: string;
    name: string;
    category: string;
    skinTypes: string;
    usage: string;
    strength: 'Gentle' | 'Moderate' | 'Strong';
    description: string;
    ingredients: string[];
}

interface Filter {
    value: string;
    label: string;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Product>) => void;
    product?: Product | null;
    title: string;
    submitLabel: string;
}

type ProductFormData = Omit<Partial<Product>, 'strength'> & {
    name: string;
    category: string;
    description: string;
    usage: string;
    skinTypes: string;
    strength: Product['strength'] | '';
}

const ProductModal = ({ isOpen, onClose, onSubmit, product, title, submitLabel }: ProductModalProps) => {
    const getInitialFormData = (): ProductFormData => (
        product
            ? {
                name: product.name,
                category: product.category,
                strength: product.strength,
                description: product.description,
                usage: product.usage,
                skinTypes: product.skinTypes,
            }
            : { name: '', category: '', strength: '', description: '', usage: '', skinTypes: 'All Skin Types' }
    )

    const [formData, setFormData] = useState<ProductFormData>(getInitialFormData)

    const { dialogRef } = useAccessibleModal({ isOpen, onClose })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { strength, ...rest } = formData
        const submitData: Partial<Product> = {
            ...rest,
            ...(strength ? { strength } : {}),
        }

        onSubmit(product ? { ...submitData, id: product.id } : submitData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-[#0000003D] backdrop-blur-[16px]" onClick={onClose} aria-hidden="true" />
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className="relative bg-white rounded-2xl shadow-xl w-[95%] max-w-[504px] max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col p-5 gap-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <button onClick={onClose} aria-label="Close product modal" className="bg-[#EDEBE3] rounded-full size-8 flex items-center justify-center hover:bg-[#E0DED6] transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500">Fill in all required information.</p>
                </div>
                <form onSubmit={handleSubmit} className="px-5 pb-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" className="w-full h-11 bg-[#EDEBE3] px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="category" className="text-sm font-medium">Category</label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} required className="w-full h-11 bg-[#EDEBE3] px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry">
                                    <option value="">Select</option>
                                    <option value="Cleanser">Cleanser</option>
                                    <option value="Serum">Serum</option>
                                    <option value="Moisturizer">Moisturizer</option>
                                    <option value="Toner">Toner</option>
                                    <option value="Exfoliator">Exfoliator</option>
                                    <option value="Sunscreen">Sunscreen</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="strength" className="text-sm font-medium">Strength</label>
                                <select id="strength" name="strength" value={formData.strength} onChange={handleChange} required className="w-full h-11 bg-[#EDEBE3] px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry">
                                    <option value="">Select</option>
                                    <option value="Gentle">Gentle</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Strong">Strong</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="h-20 w-full px-4 py-3 rounded-lg text-sm bg-[#EDEBE3] resize-none focus:outline-none focus:ring-1 focus:ring-pry" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="usage" className="text-sm font-medium">Usage Instructions</label>
                            <input type="text" id="usage" name="usage" value={formData.usage} onChange={handleChange} required placeholder="e.g. Morning & Evening" className="w-full h-11 bg-[#EDEBE3] px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-5">
                        <button type="button" onClick={onClose} className="px-5 h-10 text-sm font-medium text-white bg-black rounded-full hover:bg-black/80 transition-colors">Cancel</button>
                        <button type="submit" className="px-5 h-10 text-sm font-medium text-white bg-pry rounded-full hover:opacity-90 transition-opacity">{submitLabel}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ROWS_PER_PAGE = 8

const strengthConfig: Record<string, { color: string; dot: string }> = {
    Gentle: { color: 'text-[#016630] bg-[#DCFCE7] border-[#B9F8CF]', dot: 'bg-[#17B26A]' },
    Moderate: { color: 'text-[#93370D] bg-[#FEF3C6] border-[#FEE685]', dot: 'bg-[#F79009]' },
    Strong: { color: 'text-[#9B1C1C] bg-[#FEE2E2] border-[#FECACA]', dot: 'bg-[#F04438]' },
}

const categoryColors: Record<string, string> = {
    Cleanser: 'text-[#1447E6] bg-[#EFF6FF] border-[#8EC5FF]',
    Serum: 'text-[#7C3AED] bg-[#F5F3FF] border-[#C4B5FD]',
    Moisturizer: 'text-[#059669] bg-[#ECFDF5] border-[#A7F3D0]',
    Toner: 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]',
    Exfoliator: 'text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]',
    Sunscreen: 'text-[#0891B2] bg-[#ECFEFF] border-[#A5F3FC]',
}

const initialProducts: Product[] = [
    { id: 'P001', name: 'Gentle Cleanser', category: 'Cleanser', usage: 'Morning & Evening', skinTypes: 'All Skin Types', strength: 'Gentle', description: 'Gentle, non-foaming cleanser that maintains skin barrier', ingredients: ['Ceramides', 'Hyaluronic Acid', 'Glycerin'] },
    { id: 'P002', name: 'Hydrating Cleanser', category: 'Cleanser', usage: 'Morning & Evening', skinTypes: 'Dry, Sensitive', strength: 'Gentle', description: 'Hydrating formula for dry and sensitive skin', ingredients: ['Squalane', 'Aloe Vera', 'Vitamin E'] },
    { id: 'P003', name: 'Vitamin C Serum', category: 'Serum', usage: 'Morning', skinTypes: 'All Skin Types', strength: 'Moderate', description: 'Brightening serum with 15% L-ascorbic acid', ingredients: ['L-Ascorbic Acid', 'Vitamin E', 'Ferulic Acid'] },
    { id: 'P004', name: 'Foaming Cleanser', category: 'Cleanser', usage: 'Morning & Evening', skinTypes: 'Oily, Combination', strength: 'Moderate', description: 'Deep cleansing foam for oily skin types', ingredients: ['Salicylic Acid', 'Tea Tree Oil', 'Niacinamide'] },
    { id: 'P005', name: 'Hyaluronic Acid Serum', category: 'Serum', usage: 'Morning & Evening', skinTypes: 'All Skin Types', strength: 'Gentle', description: 'Multi-weight hyaluronic acid for deep hydration', ingredients: ['Hyaluronic Acid', 'Panthenol', 'Ceramides'] },
    { id: 'P006', name: 'AHA/BHA Exfoliant', category: 'Exfoliator', usage: '2-3x per week', skinTypes: 'Normal, Oily', strength: 'Strong', description: 'Chemical exfoliant with glycolic and salicylic acid', ingredients: ['Glycolic Acid', 'Salicylic Acid', 'Lactic Acid'] },
    { id: 'P007', name: 'Rich Cream Moisturizer', category: 'Moisturizer', usage: 'Morning & Evening', skinTypes: 'Dry, Normal', strength: 'Gentle', description: 'Rich cream with ceramides for dry skin', ingredients: ['Ceramides', 'Shea Butter', 'Squalane'] },
    { id: 'P008', name: 'Niacinamide Serum', category: 'Serum', usage: 'Morning & Evening', skinTypes: 'All Skin Types', strength: 'Moderate', description: 'Pore-refining serum with 10% niacinamide', ingredients: ['Niacinamide', 'Zinc PCA', 'Panthenol'] },
    { id: 'P009', name: 'Gel Moisturizer', category: 'Moisturizer', usage: 'Morning & Evening', skinTypes: 'Oily, Combination', strength: 'Gentle', description: 'Lightweight gel moisturizer for oily skin', ingredients: ['Hyaluronic Acid', 'Aloe Vera', 'Green Tea'] },
    { id: 'P010', name: 'Retinol Serum', category: 'Serum', usage: 'Evening only', skinTypes: 'Normal, Oily', strength: 'Strong', description: 'Anti-aging serum with encapsulated retinol', ingredients: ['Retinol', 'Squalane', 'Vitamin E'] },
    { id: 'P011', name: 'Oil Cleanser', category: 'Cleanser', usage: 'Evening', skinTypes: 'All Skin Types', strength: 'Gentle', description: 'First-step oil cleanser for makeup removal', ingredients: ['Jojoba Oil', 'Grape Seed Oil', 'Vitamin E'] },
    { id: 'P012', name: 'Peptide Serum', category: 'Serum', usage: 'Morning & Evening', skinTypes: 'All Skin Types', strength: 'Gentle', description: 'Firming serum with multi-peptide complex', ingredients: ['Matrixyl', 'Argireline', 'Copper Peptides'] },
    { id: 'P013', name: 'SPF 50 Sunscreen', category: 'Sunscreen', usage: 'Morning', skinTypes: 'All Skin Types', strength: 'Gentle', description: 'Broad-spectrum mineral sunscreen', ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide'] },
    { id: 'P014', name: 'Glycolic Toner', category: 'Toner', usage: 'Evening', skinTypes: 'Normal, Oily', strength: 'Moderate', description: '7% glycolic acid toner for glow', ingredients: ['Glycolic Acid', 'Aloe Vera', 'Ginseng'] },
    { id: 'P015', name: 'Azelaic Acid Serum', category: 'Serum', usage: 'Morning & Evening', skinTypes: 'All Skin Types', strength: 'Moderate', description: 'Targets redness, acne, and hyperpigmentation', ingredients: ['Azelaic Acid', 'Niacinamide', 'Salicylic Acid'] },
]

const Page = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const filters: Filter[] = [
        { value: 'all', label: 'All Products' },
        { value: 'Gentle', label: 'Gentle' },
        { value: 'Moderate', label: 'Moderate' },
        { value: 'Strong', label: 'Strong' },
    ]

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter)
        setIsFilterOpen(false)
        setCurrentPage(1)
    }

    const handleAddProduct = (data: Partial<Product>) => {
        const lastNum = Math.max(...products.map(p => parseInt(p.id.substring(1))))
        const newProduct: Product = {
            id: `P${String(lastNum + 1).padStart(3, '0')}`,
            name: data.name || '',
            category: data.category || 'Cleanser',
            usage: data.usage || '',
            skinTypes: data.skinTypes || 'All Skin Types',
            strength: (data.strength as Product['strength']) || 'Gentle',
            description: data.description || '',
            ingredients: [],
        }
        setProducts(prev => [...prev, newProduct])
        setModalMode(null)
    }

    const handleEditProduct = (data: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === data.id ? { ...p, ...data } : p))
        setModalMode(null)
        setEditingProduct(null)
    }

    const handleDeleteProduct = (id: string) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this product? This action cannot be undone.')
        if (!shouldDelete) return
        setProducts(prev => prev.filter(p => p.id !== id))
        setOpenMenuId(null)
    }

    const filteredProducts = products.filter(product => {
        const matchesFilter = selectedFilter === 'all' || product.strength === selectedFilter
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesFilter && matchesSearch
    })

    const totalPages = Math.ceil(filteredProducts.length / ROWS_PER_PAGE)
    const effectiveCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
    const paginatedProducts = filteredProducts.slice(
        (effectiveCurrentPage - 1) * ROWS_PER_PAGE,
        effectiveCurrentPage * ROWS_PER_PAGE,
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isFilterOpen &&
                filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node) &&
                filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)
            ) setIsFilterOpen(false)

            if (openMenuId && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isFilterOpen, openMenuId])

    const categories = [...new Set(products.map(p => p.category))]

    return (
        <AccessGate pathname="/admin/product-catalog" allowedRole="admin">
            <div>
                <div className="container mx-auto mb-20">
                    <AdminHeader />
                    <ProductHero />

                <div className="flex flex-col gap-6 mt-8">
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h2 className='text-2xl font-semibold text-gray-900'>All Products</h2>
                        <p className='text-sm text-gray-500'>
                            {products.length} products &middot; {categories.length} categories
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-start md:items-center">
                            <div className="flex items-center gap-2 border border-[#EDEBE3] bg-white w-[280px] h-[42px] rounded-full px-4">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="search"
                                    placeholder='Search by name, category, or ingredient...'
                                    className='border-none h-full w-full focus:outline-none bg-transparent text-sm'
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    ref={filterButtonRef}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 border border-[#EDEBE3] bg-white w-max h-[42px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                                >
                                    <ListFilter size={18} />
                                    <span className='text-sm font-normal w-max'>
                                        {filters.find(f => f.value === selectedFilter)?.label || 'Filter'}
                                    </span>
                                </button>
                                <div ref={filterDropdownRef}>
                                    {isFilterOpen && (
                                        <div className="absolute left-0 mt-2 w-[170px] bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                                            <div className="p-1.5">
                                                {filters.map((filter) => (
                                                    <button
                                                        key={filter.value}
                                                        onClick={() => handleFilterSelect(filter.value)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedFilter === filter.value ? 'bg-[#EDEBE3] font-medium' : 'hover:bg-gray-50'}`}
                                                    >
                                                        {filter.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => { setEditingProduct(null); setModalMode('add') }}
                            className="flex bg-pry text-white h-[42px] rounded-full border border-pry items-center gap-2 px-5 text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            <Plus size={16} />
                            Add Product
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border border-[#EDEBE3] rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#FAFAF8] hover:bg-[#FAFAF8]">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">Product</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Category</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Key Ingredients</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">Strength</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Skin Types</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">Usage</TableHead>
                                    <TableHead className="pr-6 w-10"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedProducts.map((product) => {
                                    const sc = strengthConfig[product.strength]
                                    const cc = categoryColors[product.category] || categoryColors.Cleanser
                                    return (
                                        <TableRow key={product.id} className="hover:bg-[#FAFAF8] group">
                                            <TableCell className="pl-6">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-medium text-sm text-gray-900">{product.name}</span>
                                                    <span className="text-xs text-gray-400 line-clamp-1">{product.description}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${cc}`}>
                                                    {product.category}
                                                </span>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="flex flex-wrap gap-1 max-w-[280px]">
                                                    {product.ingredients.map((ing, i) => (
                                                        <span key={i} className="inline-flex items-center h-6 px-2.5 rounded-full text-xs bg-[#F5F5F0] text-gray-600">
                                                            {ing}
                                                        </span>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center h-7 px-3 rounded-full text-xs font-medium border ${sc.color}`}>
                                                    <span className={`size-1.5 rounded-full mr-1.5 ${sc.dot}`} />
                                                    {product.strength}
                                                </span>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <span className="text-sm text-gray-600">{product.skinTypes}</span>
                                            </TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <span className="text-sm text-gray-500">{product.usage}</span>
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <div className="relative" ref={openMenuId === product.id ? menuRef : undefined}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                                                        className="size-8 flex items-center justify-center rounded-lg hover:bg-[#EDEBE3] transition-colors"
                                                    >
                                                        <EllipsisVertical size={16} className='text-gray-400' />
                                                    </button>
                                                    {openMenuId === product.id && (
                                                        <div className="absolute right-0 top-full mt-1 w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                                                            <div className="p-1.5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => { setEditingProduct(product); setModalMode('edit'); setOpenMenuId(null) }}
                                                                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                                >
                                                                    <Pencil size={14} className="text-gray-400" />
                                                                    Edit Product
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteProduct(product.id)}
                                                                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                                                                >
                                                                    <Trash2 size={14} />
                                                                    Delete Product
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-base font-medium">No products found</p>
                                <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-[#EDEBE3]">
                                <p className="text-sm text-gray-500">
                                    Showing {(effectiveCurrentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(effectiveCurrentPage * ROWS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button type="button" onClick={() => setCurrentPage(Math.max(1, effectiveCurrentPage - 1))} disabled={effectiveCurrentPage === 1} className="size-8 flex items-center justify-center rounded-lg border border-[#EDEBE3] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                        <ChevronLeft size={16} />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`size-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === effectiveCurrentPage ? 'bg-pry text-white' : 'hover:bg-gray-50 text-gray-600'}`}>
                                            {page}
                                        </button>
                                    ))}
                                    <button type="button" onClick={() => setCurrentPage(Math.min(totalPages, effectiveCurrentPage + 1))} disabled={effectiveCurrentPage === totalPages} className="size-8 flex items-center justify-center rounded-lg border border-[#EDEBE3] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

                {modalMode === 'add' && (
                    <ProductModal
                        isOpen
                        onClose={() => setModalMode(null)}
                        onSubmit={handleAddProduct}
                        title="Add New Product"
                        submitLabel="Add Product"
                    />
                )}
                {modalMode === 'edit' && (
                    <ProductModal
                        isOpen
                        onClose={() => { setModalMode(null); setEditingProduct(null) }}
                        onSubmit={handleEditProduct}
                        product={editingProduct}
                        title="Edit Product"
                        submitLabel="Save Changes"
                    />
                )}
            </div>
        </AccessGate>
    )
}

export default Page
