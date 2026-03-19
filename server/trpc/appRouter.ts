import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { doctorsSeed, patientsSeed } from "@/lib/mock-data"
import { mapDoctorInputToRecord } from "@/lib/data-mappers"
import type { DoctorRecord } from "@/lib/data-mappers"

const t = initTRPC.create()

// Simple in-memory store so add/remove mutations work during runtime.
// Note: this resets when the server restarts.
let doctors: DoctorRecord[] = [...doctorsSeed]

const addDoctorInputSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  specialty: z.string().min(1, "Specialty is required"),
  license: z.string().min(1, "License is required"),
  experience: z.union([z.string(), z.number()]).optional(),
})

export const appRouter = t.router({
  patients: t.router({
    list: t.procedure.query(() => {
      return patientsSeed
    }),
  }),
  doctors: t.router({
    list: t.procedure.query(() => {
      return doctors
    }),
    add: t.procedure.input(addDoctorInputSchema).mutation(({ input }) => {
      const next = mapDoctorInputToRecord(input, doctors)
      doctors = [...doctors, next]
      return next
    }),
    remove: t.procedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
      doctors = doctors.filter((d) => d.id !== input.id)
      return { ok: true }
    }),
  }),
})

export type AppRouter = typeof appRouter

