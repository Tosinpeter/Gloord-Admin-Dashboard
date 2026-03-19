"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import loginimage from '@/public/images/loginimage.png'
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { AppRole } from "@/lib/rbac";

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export default function Home() {
  const t = useTranslations("login");
  const [showPassword, setShowPassword] = useState({
    doctor: false,
    admin: false
  });
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isSubmittingRole, setIsSubmittingRole] = useState<AppRole | null>(null);
  const router = useRouter();

  const loginSchema = z.object({
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().trim().min(6, "Password must be at least 6 characters."),
  })

  const doctorForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: "onSubmit",
  })

  const adminForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: "onSubmit",
  })

  // Define hero slides with their content
  const heroSlides = [
    {
      id: 0,
      title: t("heroTitle1"),
      body: t("heroBody1")
    },
    {
      id: 1,
      title: t("heroTitle2"),
      body: t("heroBody2")
    },
    {
      id: 2,
      title: t("heroTitle3"),
      body: t("heroBody3")
    },
    {
      id: 3,
      title: t("heroTitle4"),
      body: t("heroBody4")
    },
    {
      id: 4,
      title: t("heroTitle5"),
      body: t("heroBody5")
    }
  ];

  // Define the type for the role parameter
  const togglePasswordVisibility = (role: 'doctor' | 'admin') => {
    setShowPassword(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  const onDoctorSubmit = doctorForm.handleSubmit((values) => {
    if (isSubmittingRole) return
    void values
    setIsSubmittingRole('doctor')
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `APP_ROLE=doctor; Path=/; SameSite=Lax`;
    router.push('/doctor/overview');
  })

  const onAdminSubmit = adminForm.handleSubmit((values) => {
    if (isSubmittingRole) return
    void values
    setIsSubmittingRole('admin')
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `APP_ROLE=admin; Path=/; SameSite=Lax`;
    router.push('/admin/overview');
  })

  const goToPreviousHero = () => {
    setCurrentHeroIndex((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const goToNextHero = () => {
    setCurrentHeroIndex((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const goToHero = (index: number) => {
    setCurrentHeroIndex(index);
  };

  return (
    <div className="bg-sec h-screen w-full">
      <div className="flex items-center gap-0 h-full w-full p-6">
        <div className="h-full md:w-[720px] w-full flex items-center justify-center">
          <div className="bg-white rounded-xl md:w-[440px] w-full p-6 flex flex-col gap-2">
            {/* <div className="flex justify-end">
              <LocaleSwitcher />
            </div> */}
            <div className="size-8 rounded-full bg-pry mx-auto"></div>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-3xl font-bold">{t("welcomeBack")}</h2>
              <p className="text-base font-normal">{t("subtitle")}</p>
            </div>
            <div className="mt-3">
              <Tabs defaultValue="doctor" className="w-full">
                <TabsList className="bg-sec rounded-full mb-6">
                  <TabsTrigger value="doctor">{t("doctor")}</TabsTrigger>
                  <TabsTrigger value="admin">{t("adminOwner")}</TabsTrigger>
                </TabsList>
                <TabsContent value="doctor">
                  <form onSubmit={onDoctorSubmit} className="flex flex-col gap-4">
                    <label htmlFor="doctor-email" className="flex flex-col gap-3">
                      <span className="font-normal text-base">{t("email")}</span>
                      <input
                        type="email"
                        id="doctor-email"
                        {...doctorForm.register("email")}
                        placeholder={t("emailPlaceholder")}
                        className="px-5 placeholder-form-muted placeholder:font-normal h-[48px] w-full bg-sec border-none rounded-md focus:outline-none"
                        aria-invalid={!!doctorForm.formState.errors.email}
                      />
                      {doctorForm.formState.errors.email && (
                        <span className="text-sm text-error-text">{doctorForm.formState.errors.email.message}</span>
                      )}
                    </label>
                    <label htmlFor="doctor-password" className="flex flex-col gap-3">
                      <span className="font-normal text-base">{t("password")}</span>
                      <div className="flex items-center gap-2 px-5 h-12 w-full bg-sec rounded-md">
                        <input
                          type={showPassword.doctor ? "text" : "password"}
                          id="doctor-password"
                          {...doctorForm.register("password")}
                          placeholder="********"
                          className="bg-transparent w-full h-full placeholder-form-muted placeholder:font-normal border-none focus:outline-none"
                          aria-invalid={!!doctorForm.formState.errors.password}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('doctor')}
                          className="w-12 flex items-center justify-center bg-transparent text-form-muted focus:outline-none"
                        >
                          {showPassword.doctor ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                      </div>
                    </label>
                    {doctorForm.formState.errors.password && (
                      <p className="text-sm text-error-text">{doctorForm.formState.errors.password.message}</p>
                    )}
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmittingRole === "doctor"}
                        className="bg-pry text-white rounded-full w-full h-[54px] font-normal text-base border-none focus:outline-none hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmittingRole === "doctor" ? "Signing in..." : t("signIn")}
                      </button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="admin">
                  <form onSubmit={onAdminSubmit} className="flex flex-col gap-4">
                    <label htmlFor="admin-email" className="flex flex-col gap-3">
                      <span className="font-normal text-base">{t("email")}</span>
                      <input
                        type="email"
                        id="admin-email"
                        {...adminForm.register("email")}
                        placeholder={t("emailPlaceholder")}
                        className="px-5 placeholder-form-muted placeholder:font-normal h-[48px] w-full bg-sec border-none rounded-md focus:outline-none"
                        aria-invalid={!!adminForm.formState.errors.email}
                      />
                      {adminForm.formState.errors.email && (
                        <span className="text-sm text-error-text">{adminForm.formState.errors.email.message}</span>
                      )}
                    </label>
                    <label htmlFor="admin-password" className="flex flex-col gap-3">
                      <span className="font-normal text-base">{t("password")}</span>
                      <div className="flex items-center gap-2 px-5 h-12 w-full bg-sec rounded-md">
                        <input
                          type={showPassword.admin ? "text" : "password"}
                          id="admin-password"
                          {...adminForm.register("password")}
                          placeholder="********"
                          className="bg-transparent w-full h-full placeholder-form-muted placeholder:font-normal border-none focus:outline-none"
                          aria-invalid={!!adminForm.formState.errors.password}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('admin')}
                          className="w-12 flex items-center justify-center bg-transparent text-form-muted focus:outline-none"
                        >
                          {showPassword.admin ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                      </div>
                    </label>
                    {adminForm.formState.errors.password && (
                      <p className="text-sm text-error-text">{adminForm.formState.errors.password.message}</p>
                    )}
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmittingRole === "admin"}
                        className="bg-pry text-white rounded-full w-full h-[54px] font-normal text-base border-none focus:outline-none hover:bg-opacity-90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmittingRole === "admin" ? "Signing in..." : t("signIn")}
                      </button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="h-full md:w-[720px] w-full hidden md:block">
          <div className="h-full md:w-[696px] bg-black/20 w-full rounded-2xl border relative">
            <Image src={loginimage} width={696} height={1000} className='w-[696px] h-full object-top rounded-2xl object-cover' alt='image' />
            <div className="absolute rounded-b-2xl bottom-0 left-0 w-full bg-hero-overlay backdrop-blur-[10] p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-2 md:w-[440px] w-full">
                {/* Dynamic content based on current slide */}
                <h4 className="text-[38px] text-white font-medium leading-[120%]">
                  {heroSlides[currentHeroIndex].title}
                </h4>
                <p className="text-base font-normal text-white">
                  {heroSlides[currentHeroIndex].body}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPreviousHero}
                    className="size-14 flex items-center justify-center rounded-full border border-white/50 text-white cursor-pointer hover:bg-white/10 transition-colors"
                    aria-label="Previous slide"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextHero}
                    className="size-14 flex items-center justify-center rounded-full border border-white/50 text-white cursor-pointer hover:bg-white/10 transition-colors"
                    aria-label="Next slide"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {heroSlides.map((slide) => {
                    const isActive = slide.id === currentHeroIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToHero(slide.id)}
                        className="focus:outline-none"
                        aria-label={`Go to slide ${slide.id + 1}`}
                      >
                        <div
                          className={
                            isActive
                              ? "w-10 h-2.5 bg-white rounded-full transition-all duration-300"
                              : "size-2.5 bg-muted-gray rounded-full hover:bg-white/50 transition-all duration-300"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}