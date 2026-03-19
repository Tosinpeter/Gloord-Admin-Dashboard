'use client'
import Header from '@/components/Header'
import { Switch } from '@/components/ui/switch'
import { EyeOff, Save, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import profileimage from '@/public/images/profileimage.png'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const SettingsPage = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)
    const [isSavingProfile, setIsSavingProfile] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const profileSchema = z.object({
        fullName: z.string().trim().min(1, 'Full name is required.'),
        email: z.string().trim().email('Enter a valid email address.'),
        phone: z.string().trim().min(1, 'Phone number is required.'),
        specialty: z.string().trim().min(1, 'Specialty is required.'),
        bio: z.string().optional(),
    })

    const securitySchema = z
        .object({
            currentPassword: z.string().trim().min(1, 'Current password is required.'),
            newPassword: z.string().trim().min(1, 'New password is required.'),
        })
        .refine((data) => data.newPassword.length >= 8, {
            message: 'New password must be at least 8 characters.',
            path: ['newPassword'],
        })
        .refine((data) => data.newPassword !== data.currentPassword, {
            message: 'New password must be different from current password.',
            path: ['newPassword'],
        })

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1 (555) 123-4567',
            specialty: 'Dermatology',
            bio: 'Board-certified dermatologist with 10+ years of experience in medical and cosmetic dermatology.',
        },
        mode: 'onSubmit',
    })

    const securityForm = useForm<z.infer<typeof securitySchema>>({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        },
        mode: 'onSubmit',
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!ACCEPTED_TYPES.includes(file.type)) {
            setFileError('Please select a JPG, PNG, or GIF file.')
            console.error('Invalid profile image type selected')
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            setFileError('File size must be under 2 MB.')
            console.error('Profile image exceeds file-size limit')
            return
        }

        const url = URL.createObjectURL(file)
        setFileError(null)
        setAvatarPreview(url)
    }

    const handleRemovePhoto = () => {
        const confirmed = window.confirm('Remove your profile photo?')
        if (!confirmed) return
        setAvatarPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleProfileSubmit = profileForm.handleSubmit(() => {
        if (isSavingProfile) return
        setIsSavingProfile(true)
        setTimeout(() => setIsSavingProfile(false), 500)
    })

    const handleSecuritySubmit = securityForm.handleSubmit((values) => {
        if (isChangingPassword) return
        void values
        setIsChangingPassword(true)
        setTimeout(() => setIsChangingPassword(false), 500)
    })

    return (
        <div>
            <div className="container mx-auto">
                <Header />
                <div className="flex flex-col gap-10 mb-10">
                    <div className="flex flex-col gap-2">
                        <h2 className='text-2xl font-semibold text-gray-900'>Settings</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    <div className="max-w-[1062px] w-full mx-auto flex flex-col gap-8">
                        <div className="bg-sec border border-sec rounded-xl p-4 md:p-8 flex flex-col gap-3 md:gap-5">
                            <div className="flex gap-4 md:gap-6 items-center">
                                <div className="size-20 bg-white rounded-full overflow-hidden">
                                    <Image
                                        src={avatarPreview || profileimage}
                                        width={80}
                                        height={80}
                                        className='size-20 rounded-full object-cover'
                                        alt='Profile photo'
                                        unoptimized={!!avatarPreview}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.gif"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-white rounded-full flex items-center gap-2 py-2 px-3 w-max hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <Upload size={18} />
                                            <span className="w-max text-sm">Upload Photo</span>
                                        </button>
                                        {avatarPreview && (
                                            <button
                                                type="button"
                                                onClick={handleRemovePhoto}
                                                className="bg-white rounded-full flex items-center gap-2 py-2 px-3 w-max hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                                <span className="w-max text-sm">Remove</span>
                                            </button>
                                        )}
                                    </div>
                                    <p className='text-xs font-normal'>JPG, PNG or GIF. Max size 2MB.</p>
                                    {fileError && <p className='text-xs text-error-text'>{fileError}</p>}
                                </div>
                            </div>
                            <form onSubmit={handleProfileSubmit} className='flex flex-col gap-3 md:gap-5'>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    <label htmlFor="fullName" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Full Name</span>
                                        <input
                                            type="text"
                                            id="fullName"
                                            {...profileForm.register('fullName')}
                                            aria-invalid={!!profileForm.formState.errors.fullName}
                                            className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4'
                                        />
                                        {profileForm.formState.errors.fullName && (
                                            <span className='text-xs text-error-text'>{profileForm.formState.errors.fullName.message}</span>
                                        )}
                                    </label>
                                    <label htmlFor="email" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Email</span>
                                        <input
                                            type="email"
                                            id="email"
                                            {...profileForm.register('email')}
                                            aria-invalid={!!profileForm.formState.errors.email}
                                            className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4'
                                        />
                                        {profileForm.formState.errors.email && (
                                            <span className='text-xs text-error-text'>{profileForm.formState.errors.email.message}</span>
                                        )}
                                    </label>
                                    <label htmlFor="phone" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Phone number</span>
                                        <input
                                            type="text"
                                            id="phone"
                                            {...profileForm.register('phone')}
                                            aria-invalid={!!profileForm.formState.errors.phone}
                                            className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4'
                                        />
                                        {profileForm.formState.errors.phone && (
                                            <span className='text-xs text-error-text'>{profileForm.formState.errors.phone.message}</span>
                                        )}
                                    </label>
                                    <label htmlFor="specialty" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Specialty</span>
                                        <input
                                            type="text"
                                            id="specialty"
                                            {...profileForm.register('specialty')}
                                            aria-invalid={!!profileForm.formState.errors.specialty}
                                            className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4'
                                        />
                                        {profileForm.formState.errors.specialty && (
                                            <span className='text-xs text-error-text'>{profileForm.formState.errors.specialty.message}</span>
                                        )}
                                    </label>
                                    <div className="col-span-1 md:col-span-2">
                                        <label htmlFor="bio" className="flex flex-col gap-2 md:gap-3">
                                            <span className="">Bio</span>
                                            <textarea
                                                id="bio"
                                                {...profileForm.register('bio')}
                                                className='text-base bg-white border-none focus:outline-none rounded-lg h-[124px] w-full p-4 resize-none'
                                            />
                                        </label>
                                    </div>
                                </div>
                                <button disabled={isSavingProfile} className="bg-pry text-sm text-white rounded-full w-max ml-auto h-10 font-normal border-none focus:outline-none flex items-center justify-center gap-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Save size={20} />
                                    <span className='w-max'>{isSavingProfile ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col gap-3 md:gap-5">
                            <div className="flex flex-col gap-2">
                                <h2 className='text-2xl font-semibold text-gray-900'>Notification Preferences</h2>
                                <p className="text-gray-600 max-w-2xl">
                                    Manage how you receive notifications and alerts
                                </p>
                            </div>
                            <div className="bg-sec border border-sec rounded-xl p-4 md:p-8 flex flex-col gap-2 md:gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-3 p-4 bg-white rounded-lg">
                                        <div className="flex flex-col gap-2">
                                            <h4 className='text-base font-medium'>Email Notifications</h4>
                                            <p className='text-sm font-normal'>Receive email notifications for important updates</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                        <div className="flex flex-col gap-2">
                                            <h4 className='text-base font-medium'>Push Notifications</h4>
                                            <p className='text-sm font-normal'>Receive push notifications on your device</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                        <div className="flex flex-col gap-2">
                                            <h4 className='text-base font-medium'>New Case Alerts</h4>
                                            <p className='text-sm font-normal'>Get notified when new cases are assigned to you</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                        <div className="flex flex-col gap-2">
                                            <h4 className='text-base font-medium'>Weekly Reports</h4>
                                            <p className='text-sm font-normal'>Receive weekly summary of your activity</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                                <button className="bg-pry text-sm text-white rounded-full w-max ml-auto h-10 font-normal border-none focus:outline-none flex items-center justify-center gap-2 px-4">
                                    <Save size={20} />
                                    <span className='w-max'>Save Preference</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 md:gap-5">
                            <div className="flex flex-col gap-2">
                                <h2 className='text-2xl font-semibold text-gray-900'>Security</h2>
                                <p className="text-gray-600 max-w-2xl">
                                    Manage your password and security settings
                                </p>
                            </div>
                            <div className="bg-sec border border-sec rounded-xl p-4 md:p-8 flex flex-col gap-3 md:gap-5">
                                <form onSubmit={handleSecuritySubmit} className='flex flex-col gap-3 md:gap-5'>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <label htmlFor="currentPassword" className="flex flex-col gap-2 md:gap-3">
                                            <span className="font-normal text-base">Current Password</span>
                                            <div className="flex items-center gap-2 px-4 h-[44px] w-full bg-white rounded-md">
                                                <input
                                                    type="password"
                                                    id="currentPassword"
                                                    placeholder="********"
                                                    {...securityForm.register('currentPassword')}
                                                    aria-invalid={!!securityForm.formState.errors.currentPassword}
                                                    className="bg-transparent w-full h-full placeholder-form-muted placeholder:font-normal border-none focus:outline-none"
                                                />
                                                <div className="w-12 flex items-center justify-center bg-transparent text-form-muted">
                                                    <EyeOff />
                                                </div>
                                            </div>
                                            {securityForm.formState.errors.currentPassword && (
                                                <span className='text-xs text-error-text'>
                                                    {securityForm.formState.errors.currentPassword.message}
                                                </span>
                                            )}
                                        </label>
                                        <label htmlFor="newPassword" className="flex flex-col gap-2 md:gap-3">
                                            <span className="font-normal text-base">New Password</span>
                                            <div className="flex items-center gap-2 px-4 h-[44px] w-full bg-white rounded-md">
                                                <input
                                                    type="password"
                                                    id="newPassword"
                                                    placeholder="********"
                                                    {...securityForm.register('newPassword')}
                                                    aria-invalid={!!securityForm.formState.errors.newPassword}
                                                    className="bg-transparent w-full h-full placeholder-form-muted placeholder:font-normal border-none focus:outline-none"
                                                />
                                                <div className="w-12 flex items-center justify-center bg-transparent text-form-muted">
                                                    <EyeOff />
                                                </div>
                                            </div>
                                            {securityForm.formState.errors.newPassword && (
                                                <span className='text-xs text-error-text'>
                                                    {securityForm.formState.errors.newPassword.message}
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <button disabled={isChangingPassword} className="bg-pry text-sm text-white rounded-full w-max ml-auto h-10 font-normal border-none focus:outline-none flex items-center justify-center gap-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <span className='w-max'>{isChangingPassword ? 'Updating...' : 'Change Password'}</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SettingsPage
