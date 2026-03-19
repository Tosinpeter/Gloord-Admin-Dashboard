import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-sec p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-64 rounded-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-white p-5 space-y-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-6 w-40 rounded-full" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

