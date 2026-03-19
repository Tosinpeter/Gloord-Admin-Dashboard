import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-sec p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-14 w-full rounded-xl bg-white p-4 flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-5 w-40" />
          <div className="flex-1" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

