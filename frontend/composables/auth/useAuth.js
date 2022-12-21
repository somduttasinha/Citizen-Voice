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
        // What we need:
        // Create cookies with the HttpOnly attribute and the `Secure` attribute
        // `HttpOnly` is the one which controls whether the cookie is made available to JavaScript.
        // The `Secure` attribute is for guaranteeing the cookie is only served over HTTPS connections, avoiding MITM attacks.
        // Also the `SameSite` attribute controls whether 3rd party sites have access to it so it is still helpful against a CSRF attack leaking the cookie.
        const data = await $fetch('/api/auth/login/', {
            method: 'POST',
            body: {
                email,
                password,
            },
            withCredentials: true
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