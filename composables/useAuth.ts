import { createAuthClient } from 'better-auth/vue'

const authClient = createAuthClient()

export const useAuth = () => {
  const session = authClient.useSession(useFetch)

  const signIn = async (email: string, password: string) => {
    return authClient.signIn.email({ email, password })
  }

  const signUp = async (name: string, email: string, password: string) => {
    return authClient.signUp.email({ name, email, password })
  }

  const signOut = async () => {
    return authClient.signOut()
  }

  return {
    session,
    signIn,
    signUp,
    signOut,
  }
}

// Server-side session fetch — uses useRequestHeaders to forward cookies during SSR.
export const useServerSession = async () => {
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}
  const { data } = await useFetch('/api/auth/get-session', {
    headers: headers as Record<string, string>,
  })
  return data
}
