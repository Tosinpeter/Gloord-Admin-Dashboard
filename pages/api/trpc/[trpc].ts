import { createNextApiHandler } from "@trpc/server/adapters/next"
import { appRouter } from "@/lib/trpc/router"

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
