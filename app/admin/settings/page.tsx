'use client'
import { Switch } from '@/components/ui/switch'
import { EyeOff, Save, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import profileimage from '@/public/images/profileimage.png'
import React, { useRef, useState } from 'react'
import AdminHeader from '@/components/admin/AdminHeader'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const SettingsPage = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)
    const [profileErrors, setProfileErrors] = useState<Record<string, string>>({})
    const [securityErrors, setSecurityErrors] = useState<Record<string, string>>({})
    const [isSavingProfile, setIsSavingProfile] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

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

    const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSavingProfile) return
        const form = new FormData(e.currentTarget)
        const fullName = String(form.get('fullName') ?? '').trim()
        const email = String(form.get('email') ?? '').trim()
        const phone = String(form.get('phone') ?? '').trim()
        const specialty = String(form.get('specialty') ?? '').trim()
        const errors: Record<string, string> = {}

        if (!fullName) errors.fullName = 'Full name is required.'
        if (!email) errors.email = 'Email is required.'
        else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address.'
        if (!phone) errors.phone = 'Phone number is required.'
        if (!specialty) errors.specialty = 'Specialty is required.'

        setProfileErrors(errors)
        if (Object.keys(errors).length > 0) {
            console.error('Profile form validation failed', errors)
            return
        }

        setIsSavingProfile(true)
        setTimeout(() => setIsSavingProfile(false), 500)
    }

    const handleSecuritySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isChangingPassword) return
        const form = new FormData(e.currentTarget)
        const currentPassword = String(form.get('currentPassword') ?? '').trim()
        const newPassword = String(form.get('newPassword') ?? '').trim()
        const errors: Record<string, string> = {}

        if (!currentPassword) errors.currentPassword = 'Current password is required.'
        if (!newPassword) errors.newPassword = 'New password is required.'
        else if (newPassword.length < 8) errors.newPassword = 'New password must be at least 8 characters.'
        else if (newPassword === currentPassword) errors.newPassword = 'New password must be different from current password.'

        setSecurityErrors(errors)
        if (Object.keys(errors).length > 0) {
            console.error('Security form validation failed', errors)
            return
        }

        setIsChangingPassword(true)
        setTimeout(() => setIsChangingPassword(false), 500)
    }

    return (
        <div>
            <div className="container mx-auto">
                <AdminHeader />
                <div className="flex flex-col gap-10 mb-10">
                    <div className="flex flex-col gap-2">
                        <h2 className='text-2xl font-semibold text-gray-900'>Settings</h2>
                        <p className="text-gray-600 max-w-2xl">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    <div className="max-w-[1062px] w-full mx-auto flex flex-col gap-8">
                        <div className="bg-[#EDEBE3] border border-[#EDEBE3] rounded-xl p-4 md:p-8 flex flex-col gap-3 md:gap-5">
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
                                    {fileError && <p className='text-xs text-[#B91C1C]'>{fileError}</p>}
                                </div>
                            </div>
                            <form onSubmit={handleProfileSubmit} className='flex flex-col gap-3 md:gap-5'>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    <label htmlFor="fullName" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Full Name</span>
                                        <input required type="text" name="fullName" id="fullName" defaultValue='Dr. Sarah Johnson' className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4' />
                                        {profileErrors.fullName && <span className='text-xs text-[#B91C1C]'>{profileErrors.fullName}</span>}
                                    </label>
                                    <label htmlFor="email" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Email</span>
                                        <input required type="email" name="email" id="email" defaultValue='sarah.johnson@example.com' className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4' />
                                        {profileErrors.email && <span className='text-xs text-[#B91C1C]'>{profileErrors.email}</span>}
                                    </label>
                                    <label htmlFor="phone" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Phone number</span>
                                        <input required type="text" name="phone" id="phone" defaultValue='+1 (555) 123-4567' className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4' />
                                        {profileErrors.phone && <span className='text-xs text-[#B91C1C]'>{profileErrors.phone}</span>}
                                    </label>
                                    <label htmlFor="specialty" className="flex flex-col gap-2 md:gap-3">
                                        <span className="">Specialty</span>
                                        <input required type="text" name="specialty" id="specialty" defaultValue='Dermatology' className='text-base bg-white border-none focus:outline-none rounded-lg h-[44px] w-full px-4' />
                                        {profileErrors.specialty && <span className='text-xs text-[#B91C1C]'>{profileErrors.specialty}</span>}
                                    </label>
                                    <div className="col-span-1 md:col-span-2">
                                        <label htmlFor="bio" className="flex flex-col gap-2 md:gap-3">
                                            <span className="">Bio</span>
                                            <textarea name="bio" id="bio" defaultValue='Board-certified dermatologist with 10+ years of experience in medical and cosmetic dermatology.' className='text-base bg-white border-none focus:outline-none rounded-lg h-[124px] w-full p-4 resize-none' />
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
                            <div className="bg-[#EDEBE3] border border-[#EDEBE3] rounded-xl p-4 md:p-8 flex flex-col gap-2 md:gap-5">
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
                            <div className="bg-[#EDEBE3] border border-[#EDEBE3] rounded-xl p-4 md:p-8 flex flex-col gap-3 md:gap-5">
                                <form onSubmit={handleSecuritySubmit} className='flex flex-col gap-3 md:gap-5'>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <label htmlFor="currentPassword" className="flex flex-col gap-2 md:gap-3">
                                            <span className="font-normal text-base">Current Password</span>
                                            <div className="flex items-center gap-2 px-4 h-[44px] w-full bg-white rounded-md">
                                                <input required type="password" name="currentPassword" id="currentPassword" placeholder="********" className="bg-transparent w-full h-full placeholder:text-[#344054] placeholder:font-normal border-none focus:outline-none" />
                                                <div className="w-12 flex items-center justify-center bg-transparent text-[#344054]">
                                                    <EyeOff />
                                                </div>
                                            </div>
                                            {securityErrors.currentPassword && <span className='text-xs text-[#B91C1C]'>{securityErrors.currentPassword}</span>}
                                        </label>
                                        <label htmlFor="newPassword" className="flex flex-col gap-2 md:gap-3">
                                            <span className="font-normal text-base">New Password</span>
                                            <div className="flex items-center gap-2 px-4 h-[44px] w-full bg-white rounded-md">
                                                <input required type="password" name="newPassword" id="newPassword" placeholder="********" className="bg-transparent w-full h-full placeholder:text-[#344054] placeholder:font-normal border-none focus:outline-none" />
                                                <div className="w-12 flex items-center justify-center bg-transparent text-[#344054]">
                                                    <EyeOff />
                                                </div>
                                            </div>
                                            {securityErrors.newPassword && <span className='text-xs text-[#B91C1C]'>{securityErrors.newPassword}</span>}
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
