export interface DoctorRecord {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  approved: number
  pending: number
  rejected: number
  totalCases: number
  lastActive: string
  experience: number
  license: string
  status: "active" | "inactive"
  image: string
}

export interface NewDoctorInput {
  name?: string
  email?: string
  phone?: string
  specialty?: string
  experience?: number | string
  license?: string
}

export function getNextDoctorId(currentDoctors: DoctorRecord[]): string {
  const fallback = "D002"
  const lastId = currentDoctors[currentDoctors.length - 1]?.id ?? fallback
  const nextNumber = Number.parseInt(lastId.slice(1), 10) + 1
  return `D${String(nextNumber).padStart(3, "0")}`
}

export function mapDoctorInputToRecord(
  input: NewDoctorInput,
  currentDoctors: DoctorRecord[],
): DoctorRecord {
  return {
    id: getNextDoctorId(currentDoctors),
    name: input.name ?? "New Doctor",
    email: input.email ?? "",
    phone: input.phone ?? "",
    specialty: input.specialty ?? "Dermatology",
    approved: 0,
    pending: 0,
    rejected: 0,
    totalCases: 0,
    lastActive: "Just now",
    experience: Number(input.experience) || 0,
    license: input.license ?? "",
    status: "active",
    image: "/images/patientimage.png",
  }
}
