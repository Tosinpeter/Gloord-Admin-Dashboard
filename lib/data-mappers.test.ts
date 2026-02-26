import { describe, expect, it } from "vitest"
import { getNextDoctorId, mapDoctorInputToRecord, type DoctorRecord } from "./data-mappers"

const doctors: DoctorRecord[] = [
  {
    id: "D003",
    name: "Sarah Johnson",
    email: "sarah@clinic.com",
    phone: "+1",
    specialty: "Dermatology",
    approved: 1,
    pending: 0,
    rejected: 0,
    totalCases: 1,
    lastActive: "now",
    experience: 2,
    license: "MD-1",
    status: "active",
    image: "/images/patientimage.png",
  },
]

describe("data mappers", () => {
  it("generates next doctor id", () => {
    expect(getNextDoctorId(doctors)).toBe("D004")
    expect(getNextDoctorId([])).toBe("D003")
  })

  it("maps new doctor input to normalized record", () => {
    const mapped = mapDoctorInputToRecord(
      {
        name: "Dr Test",
        email: "test@clinic.com",
        phone: "1234",
        specialty: "Dermatology",
        experience: "7",
        license: "MD-9",
      },
      doctors,
    )

    expect(mapped.id).toBe("D004")
    expect(mapped.name).toBe("Dr Test")
    expect(mapped.experience).toBe(7)
    expect(mapped.status).toBe("active")
    expect(mapped.totalCases).toBe(0)
  })
})
