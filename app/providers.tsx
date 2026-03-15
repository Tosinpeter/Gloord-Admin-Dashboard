"use client"

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { httpBatchLink } from "@trpc/client"
import { trpc } from "@/lib/trpc"
import superjson from "superjson"

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
    const [trpcClient] = useState(
        () =>
            trpc.createClient({
                links: [
                    httpBatchLink({
                        url: "/api/trpc",
                        transformer: superjson,
                    }),
                ],
            }),
    )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </trpc.Provider>
    )
}
