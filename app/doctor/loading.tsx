import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-sec p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-72 rounded-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white p-5 space-y-3">
                <Skeleton className="h-5 w-52 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-11/12 rounded-md" />
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-white p-5 space-y-3">
              <Skeleton className="h-6 w-60 rounded-md" />
              <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
            <div className="rounded-xl bg-white p-5 space-y-3">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

