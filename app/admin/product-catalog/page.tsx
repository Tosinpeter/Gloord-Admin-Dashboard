'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { ChevronLeft, ChevronRight, EllipsisVertical, ListFilter, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { useTranslations } from 'next-intl'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
    strength: Product['strength'];
}

const ProductModal = ({ isOpen, onClose, onSubmit, product, title, submitLabel }: ProductModalProps) => {
    const t = useTranslations("admin.productCatalog")
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
            : { name: '', category: '', strength: 'Gentle', description: '', usage: '', skinTypes: 'All Skin Types' }
    )

    const { dialogRef } = useAccessibleModal({ isOpen, onClose })

    const schema = useMemo(
        () =>
            z.object({
                name: z.string().trim().min(1, "Product name is required"),
                category: z.string().trim().min(1, "Category is required"),
                strength: z.enum(['Gentle', 'Moderate', 'Strong']),
                description: z.string().trim().min(1, "Description is required"),
                usage: z.string().trim().min(1, "Usage is required"),
                skinTypes: z.string().trim().min(1, "Skin types is required"),
            }),
        [],
    )

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: getInitialFormData(),
        mode: "onSubmit",
    })

    useEffect(() => {
        if (!isOpen) return
        reset(getInitialFormData())
    }, [isOpen, product, reset])

    const submit = (values: z.infer<typeof schema>) => {
        const { strength, ...rest } = values
        const submitData: Partial<Product> = { ...rest, strength: strength as Product["strength"] }
        onSubmit(product ? { ...submitData, id: product.id } : submitData)
    }

    if (!isOpen) return null

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-overlay backdrop-blur-[16px]" onClick={onClose} aria-hidden="true" />
            <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className="relative bg-white rounded-2xl shadow-xl w-[95%] max-w-[504px] max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col p-5 gap-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{title}</h3>
                        <button onClick={onClose} aria-label={t("modal.closeAriaLabel")} className="bg-sec rounded-full size-8 flex items-center justify-center hover:bg-sec-hover transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500">{t("modal.fillRequiredInfo")}</p>
                </div>
                <form onSubmit={handleSubmit(submit)} className="px-5 pb-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium">{t("modal.fields.productName")}</label>
                            <input
                                type="text"
                                id="name"
                                {...register("name")}
                                aria-invalid={!!errors.name}
                                placeholder={t("modal.placeholders.productName")}
                                className="w-full h-11 bg-sec px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry"
                            />
                            {errors.name && <p className="text-xs text-error-text mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="category" className="text-sm font-medium">{t("modal.fields.category")}</label>
                                <select
                                    id="category"
                                    {...register("category")}
                                    aria-invalid={!!errors.category}
                                    className="w-full h-11 bg-sec px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry"
                                >
                                    <option value="">{t("modal.placeholders.select")}</option>
                                    <option value="Cleanser">Cleanser</option>
                                    <option value="Serum">Serum</option>
                                    <option value="Moisturizer">Moisturizer</option>
                                    <option value="Toner">Toner</option>
                                    <option value="Exfoliator">Exfoliator</option>
                                    <option value="Sunscreen">Sunscreen</option>
                                </select>
                                {errors.category && <p className="text-xs text-error-text mt-1">{errors.category.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="strength" className="text-sm font-medium">{t("modal.fields.strength")}</label>
                                <select
                                    id="strength"
                                    {...register("strength")}
                                    aria-invalid={!!errors.strength}
                                    className="w-full h-11 bg-sec px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pry"
                                >
                                    <option value="Gentle">{t("filters.gentle")}</option>
                                    <option value="Moderate">{t("filters.moderate")}</option>
                                    <option value="Strong">{t("filters.strong")}</option>
                                </select>
                                {errors.strength && <p className="text-xs text-error-text mt-1">{errors.strength.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-sm font-medium">{t("modal.fields.description")}</label>
                            <textarea
                                id="description"
                                {...register("description")}
                                aria-invalid={!!errors.description}
                                className="h-20 w-full px-4 py-3 rounded-lg text-sm bg-sec resize-none focus:outline-none focus:ring-1 focus:ring-pry"
                            />
                            {errors.description && <p className="text-xs text-error-text mt-1">{errors.description.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="usage" className="text-sm font-medium">{t("modal.fields.usageInstructions")}</label>
                            <input
                                type="text"
                                id="usage"
                                {...register("usage")}
                                aria-invalid={!!errors.usage}
                                placeholder={t("modal.placeholders.usageInstructions")}
                                className="w-full h-11 bg-sec px-4 rounded-lg text-sm focus:outline-none focus:ring-1 focus:outline-none focus:ring-1 focus:ring-pry"
                            />
                            {errors.usage && <p className="text-xs text-error-text mt-1">{errors.usage.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-5">
                        <button type="button" onClick={onClose} className="px-5 h-10 text-sm font-medium text-white bg-black rounded-full hover:bg-black/80 transition-colors">{t("modal.buttons.cancel")}</button>
                        <input type="hidden" {...register("skinTypes")} />
                        <button type="submit" className="px-5 h-10 text-sm font-medium text-white bg-pry rounded-full hover:opacity-90 transition-opacity">{submitLabel}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ROWS_PER_PAGE = 8

const strengthConfig: Record<string, { color: string; dot: string }> = {
    Gentle: { color: 'text-success bg-success-bg border-success-border', dot: 'bg-success-accent' },
    Moderate: { color: 'text-warning-text-alt bg-warning-bg border-warning-border', dot: 'bg-warning-dot' },
    Strong: { color: 'text-error-text-alt bg-error-bg-alt border-error-soft-border', dot: 'bg-error-accent' },
}

const categoryColors: Record<string, string> = {
    Cleanser: 'text-product-cleanser-text bg-product-cleanser-bg border-product-cleanser-border',
    Serum: 'text-product-serum-text bg-product-serum-bg border-product-serum-border',
    Moisturizer: 'text-product-moisturizer-text bg-product-moisturizer-bg border-product-moisturizer-border',
    Toner: 'text-product-toner-text bg-product-toner-bg border-product-toner-border',
    Exfoliator: 'text-product-exfoliator-text bg-error-soft-bg border-error-soft-border',
    Sunscreen: 'text-product-sunscreen-text bg-product-sunscreen-bg border-product-sunscreen-border',
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
    const t = useTranslations("admin.productCatalog")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: ROWS_PER_PAGE })
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const filterDropdownRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const filters: Filter[] = [
        { value: 'all', label: t("filters.allProducts") },
        { value: 'Gentle', label: t("filters.gentle") },
        { value: 'Moderate', label: t("filters.moderate") },
        { value: 'Strong', label: t("filters.strong") },
    ]

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter)
        setIsFilterOpen(false)
        setPagination({ pageIndex: 0, pageSize: ROWS_PER_PAGE })
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
        const shouldDelete = window.confirm(t("confirmations.deleteProduct"))
        if (!shouldDelete) return
        setProducts(prev => prev.filter(p => p.id !== id))
        setOpenMenuId(null)
    }

    const columns = useMemo<ColumnDef<Product>[]>(
        () => [
            { accessorKey: "name", header: t("table.product"), enableSorting: true },
            { accessorKey: "category", header: t("table.category"), enableSorting: true },
            {
                accessorKey: "ingredients",
                header: t("table.keyIngredients"),
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-1 max-w-[280px]">
                        {row.original.ingredients.map((ing, i) => (
                            <span key={i} className="inline-flex items-center h-6 px-2.5 rounded-full text-xs bg-surface-muted text-gray-600">
                                {ing}
                            </span>
                        ))}
                    </div>
                ),
            },
            { accessorKey: "strength", header: t("table.strength"), enableSorting: true },
            { accessorKey: "skinTypes", header: t("table.skinTypes"), enableSorting: false },
            { accessorKey: "usage", header: t("table.usage"), enableSorting: false },
        ],
        [t],
    )

    const table = useReactTable<Product>({
        data: products,
        columns,
        getRowId: (row) => row.id,
        state: {
            sorting,
            globalFilter: searchQuery,
            pagination,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setSearchQuery,
        onPaginationChange: setPagination,
        globalFilterFn: (row, _columnId, filterValue) => {
            const q = String(filterValue ?? "").toLowerCase().trim()
            const filterOk = selectedFilter === "all" || row.original.strength === selectedFilter
            if (!q) return filterOk
            if (!filterOk) return false
            const p = row.original
            return (
                p.name.toLowerCase().includes(q) ||
                p.id.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.ingredients.some((i) => i.toLowerCase().includes(q))
            )
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const filteredCount = table.getFilteredRowModel().rows.length
    const totalPages = table.getPageCount()
    const effectiveCurrentPage = table.getState().pagination.pageIndex + 1
    const paginatedProducts = table.getRowModel().rows.map((r) => r.original)

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
                        <h2 className='text-2xl font-semibold text-gray-900'>{t("title")}</h2>
                        <p className='text-sm text-gray-500'>
                            {t("counts", { products: products.length, categories: categories.length })}
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-start md:items-center">
                            <div className="flex items-center gap-2 border border-sec bg-white w-[280px] h-[42px] rounded-full px-4">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="search"
                                    placeholder={t("searchPlaceholder")}
                                    className='border-none h-full w-full focus:outline-none bg-transparent text-sm'
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                                    }}
                                />
                            </div>
                            <div className="relative">
                                <button
                                    ref={filterButtonRef}
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 border border-sec bg-white w-max h-[42px] rounded-full px-4 hover:bg-gray-50 transition-colors"
                                >
                                    <ListFilter size={18} />
                                    <span className='text-sm font-normal w-max'>
                                        {filters.find(f => f.value === selectedFilter)?.label || t("filters.filterFallback")}
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
                                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedFilter === filter.value ? 'bg-sec font-medium' : 'hover:bg-gray-50'}`}
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
                            {t("modal.buttons.addProduct")}
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border border-sec rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-surface-variant hover:bg-surface-variant">
                                    <TableHead className="pl-6 font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.product")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.category")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">{t("table.keyIngredients")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider">{t("table.strength")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">{t("table.skinTypes")}</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-500 uppercase tracking-wider hidden lg:table-cell">{t("table.usage")}</TableHead>
                                    <TableHead className="pr-6 w-10"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedProducts.map((product) => {
                                    const sc = strengthConfig[product.strength]
                                    const cc = categoryColors[product.category] || categoryColors.Cleanser
                                    return (
                                        <TableRow key={product.id} className="hover:bg-surface-variant group">
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
                                                        <span key={i} className="inline-flex items-center h-6 px-2.5 rounded-full text-xs bg-surface-muted text-gray-600">
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
                                                        className="size-8 flex items-center justify-center rounded-lg hover:bg-sec transition-colors"
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
                                                                    {t("actions.editProduct")}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteProduct(product.id)}
                                                                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                                                                >
                                                                    <Trash2 size={14} />
                                                                    {t("actions.deleteProduct")}
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

                        {filteredCount === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-base font-medium">{t("empty.noProductsFound")}</p>
                                <p className="text-sm mt-1">{t("empty.tryAdjustSearchOrFilter")}</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-sec">
                                <p className="text-sm text-gray-500">
                                    {t("pagination.showing", {
                                        start: (effectiveCurrentPage - 1) * ROWS_PER_PAGE + 1,
                                        end: Math.min(effectiveCurrentPage * ROWS_PER_PAGE, filteredCount),
                                        total: filteredCount,
                                    })}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button type="button" onClick={() => table.previousPage()} disabled={effectiveCurrentPage === 1} className="size-8 flex items-center justify-center rounded-lg border border-sec hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                                        <ChevronLeft size={16} />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button key={page} type="button" onClick={() => table.setPageIndex(page - 1)} className={`size-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === effectiveCurrentPage ? 'bg-pry text-white' : 'hover:bg-gray-50 text-gray-600'}`}>
                                            {page}
                                        </button>
                                    ))}
                                    <button type="button" onClick={() => table.nextPage()} disabled={effectiveCurrentPage === totalPages} className="size-8 flex items-center justify-center rounded-lg border border-sec hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
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
                        title={t("modal.titles.add")}
                        submitLabel={t("modal.buttons.addProduct")}
                    />
                )}
                {modalMode === 'edit' && (
                    <ProductModal
                        isOpen
                        onClose={() => { setModalMode(null); setEditingProduct(null) }}
                        onSubmit={handleEditProduct}
                        product={editingProduct}
                        title={t("modal.titles.edit")}
                        submitLabel={t("modal.buttons.saveChanges")}
                    />
                )}
            </div>
        </AccessGate>
    )
}

export default Page
