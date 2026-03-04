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
