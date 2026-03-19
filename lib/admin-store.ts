import { create } from "zustand"
import type { PaginationState, SortingState } from "@tanstack/react-table"

type StatusFilter = "all" | "active" | "inactive"

type AdminStore = {
  // Patients table state
  patientsSearch: string
  patientsStatus: StatusFilter
  patientsPagination: PaginationState
  patientsSorting: SortingState
  setPatientsSearch: (value: string) => void
  setPatientsStatus: (value: StatusFilter) => void
  setPatientsPagination: (value: PaginationState | ((prev: PaginationState) => PaginationState)) => void
  setPatientsSorting: (value: SortingState | ((prev: SortingState) => SortingState)) => void

  // Doctors table state
  doctorsSearch: string
  doctorsStatus: StatusFilter
  doctorsPagination: PaginationState
  doctorsSorting: SortingState
  setDoctorsSearch: (value: string) => void
  setDoctorsStatus: (value: StatusFilter) => void
  setDoctorsPagination: (value: PaginationState | ((prev: PaginationState) => PaginationState)) => void
  setDoctorsSorting: (value: SortingState | ((prev: SortingState) => SortingState)) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
  patientsSearch: "",
  patientsStatus: "all",
  patientsPagination: { pageIndex: 0, pageSize: 8 },
  patientsSorting: [],
  setPatientsSearch: (value) => set({ patientsSearch: value, patientsPagination: { pageIndex: 0, pageSize: 8 } }),
  setPatientsStatus: (value) => set({ patientsStatus: value, patientsPagination: { pageIndex: 0, pageSize: 8 } }),
  setPatientsPagination: (value) =>
    set((state) => ({
      patientsPagination: typeof value === "function" ? value(state.patientsPagination) : value,
    })),
  setPatientsSorting: (value) =>
    set((state) => ({
      patientsSorting: typeof value === "function" ? value(state.patientsSorting) : value,
    })),

  doctorsSearch: "",
  doctorsStatus: "all",
  doctorsPagination: { pageIndex: 0, pageSize: 8 },
  doctorsSorting: [],
  setDoctorsSearch: (value) => set({ doctorsSearch: value, doctorsPagination: { pageIndex: 0, pageSize: 8 } }),
  setDoctorsStatus: (value) => set({ doctorsStatus: value, doctorsPagination: { pageIndex: 0, pageSize: 8 } }),
  setDoctorsPagination: (value) =>
    set((state) => ({
      doctorsPagination: typeof value === "function" ? value(state.doctorsPagination) : value,
    })),
  setDoctorsSorting: (value) =>
    set((state) => ({
      doctorsSorting: typeof value === "function" ? value(state.doctorsSorting) : value,
    })),
}))

