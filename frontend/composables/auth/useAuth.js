import { useAuthUser } from './useAuthUser'
import { useUserStore } from '~/stores/user'

export const useAuth = () => {
    const authUser = useAuthUser()
    const userStore = useUserStore()


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns 
     */


    const logout = async () => {
        const data = await $fetch('/api/auth/logout/', {
            method: 'POST',
        })

        console.log('data //> ', data)

        store.$reset()
    }

    const me = async () => {
        if (!authUser.value) {

            try {
                const data = await $fetch('/api/auth/me/', {
                    headers: useRequestHeaders(['cookie']),
                })
                console.log('data //> ', data)

                setUser(data)
            }
            catch (error) {
                setCookie(null)
            }
        }

        return authUser
    }

    return {
        login,
        logout,
        me,
    }
}