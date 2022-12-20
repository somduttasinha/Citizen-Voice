import { useAuthUser } from './useAuthUser'

export const useAuth = () => {
    const authUser = useAuthUser()

    const setUser = (user) => {
        authUser.value = user
    }

    const setCookie = (cookie) => {
        cookie.value = cookie
    }

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns 
     */
    const login = async (
        email,
        password,
    ) => {
        const data = await $fetch('/api/auth/login/', {
            method: 'POST',
            body: {
                email,
                password,
            },
        })

        console.log('data //> ', data, data.user)

        setUser(data)

        return authUser
    }

    const logout = async () => {
        const data = await $fetch('/api/auth/logout/', {
            method: 'POST',
        })

        setUser(data)
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