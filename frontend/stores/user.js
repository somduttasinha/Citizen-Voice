import { defineStore } from 'pinia'
import { useGlobalStore } from './global'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userData: {
                token: null,
                isAuthenticated: false,
                pending: false,
                error: '',
                user: {
                    id: null,
                    email: '',
                    password: '',
                },
            },
            register: {
                errorMessage: '',
                succes: '',
            },
        }
    },
    getters: {
        isAuthenticated: (state) => state.userData.isAuthenticated
    },
    actions: {
        /**
         * See if user is logged-in
         */
        async loadUser() {
            this.userData.error = ''
            this.userData.pending = true
            const token = this.userData.token || localStorage.getItem('token')

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }

            if (token) {
                config.headers['Authorization'] = `Token ${token}`
            }

            await $fetch('/api/auth/me/', config)
                .then(response => {
                    this.userData = {
                        ...this.userData,
                        isAuthenticated: true,
                        ...response
                    }
                })
                .catch(error => {
                    console.log('error //> ', error)
                    this.clearUser()
                    this.userData.error = error
                    this.userData.isAuthenticated = false
                    console.log('this.userData //> ', this.userData)
                }).finally(() => {
                    this.userData.pending = false
                    console.log('this.userData.isAuthenticated //> ', this.userData.isAuthenticated)
                })
        },
        /**
         * Register user
         * @param {username, email, password} body 
         */
        async registerUser(body) {
            const global = useGlobalStore()

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body
            }

            const { data: register, pending, error } = await useAsyncData('login', () => $fetch('/api/auth/register/', config))

            if (error.value) {
                let warnMessage = null
                for (const [key, value] of Object.entries(error._value.data)) {
                    warnMessage = warnMessage ? `${warnMessage} \n\n ${key}: ${value}` : `${key}: ${value}`
                }

                this.register.succes = false
                // Notification
                global.negativeNotify(warnMessage)

            }
            if (register?.value) {
                this.register.succes = true
                // Notification
                global.succesNotify('Register complete')
                await navigateTo('/login')
            }

        },
        /**
         * Login user
         * @param {*} email 
         * @param {*} password 
         */
        async loginUser(
            email,
            password,
        ) {
            this.userData.error = ''
            this.userData.pending = true

            await $fetch('/api/auth/login/', {
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }).then(async res => {
                this.userData = {
                    ...this.userData,
                    isAuthenticated: true,
                    ...res
                }
                localStorage.setItem('token', this.userData.token)
                // Notification
                global.succesNotify('Login complete')
                // NICETOHAVE: It mees like with the route `redirectedFrom` api you can get the previous link, you can use this to pass in the navigateTo function
                // See: https://nuxt.com/docs/api/composables/use-route
                await navigateTo('/design')
            }).catch(err => {
                console.log('error //> ', err)
                this.userData.error = err
                this.userData.isAuthenticated = false
            }).finally(() => {
                this.userData.pending = false
            })

        },
        /**
         * User logout
         */
        async logout() {
            const token = this.userData.token || localStorage.getItem('token')

            if (!token) {
                this.$reset()
                $q.notify({
                    color: 'blue-5',
                    textColor: 'white',
                    // icon: 'warning',
                    message: 'You are already logged-out'
                })
                // Notification
                global.infoNotify('You are already logged-out')
                return
            }

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }

            if (token) {
                config.headers['Authorization'] = `Token ${token}`
            }

            await $fetch('/api/auth/logout/', config).then(async () => {
                localStorage.removeItem('token')
                this.$reset()
                // Notification
                global.succesNotify('Logged-out successfully')
                await navigateTo('/')
            }).catch(err => {
                global.negativeNotify('Something went wrong')
            }).finally(() => {
                return
            })

        }
    },
})