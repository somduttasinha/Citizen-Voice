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
        async registerUser(body, $q) {
            const global = useGlobalStore()

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body
            }

            const { data, pending, error, refresh } = await useAsyncData('mountains', () => $fetch('/api/auth/register/', config))

            watch(data, (newCount) => {  // Because count starts out null, you won't have access  // to its contents immediately, but you can watch it.
                console.log('data //> ', data)
            })

            watch(error, (newCount) => {  // Because count starts out null, you won't have access  // to its contents immediately, but you can watch it.
                console.log('error //> ', error)
            })



            // const res = await $fetch('/api/auth/register/', config)
            //     .then(response => {
            //         console.log('response //> ', response)
            //         this.register.succes = true
            //         // Notification
            //         global.succesNotify('Register complete')
            //     })
            //     .catch(error => {
            //         console.log('error //> ', error)
            //         this.register.succes = false
            //         // Notification
            //         global.negativeNotify('Something went wrong')
            //     })

            console.log('data //> ', data, error, pending)
        },
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
            }).then(res => {
                this.userData = {
                    ...this.userData,
                    isAuthenticated: true,
                    ...res
                }
                localStorage.setItem('token', this.userData.token)
            }).catch(err => {
                console.log('error //> ', err)
                this.userData.error = err
                this.userData.isAuthenticated = false
            }).finally(() => {
                this.userData.pending = false
            })

        },
        // updateUser(payload) {

        // },
        async logout($q) {
            const token = this.userData.token || localStorage.getItem('token')

            if (!token) {
                this.$reset()
                $q.notify({
                    color: 'blue-5',
                    textColor: 'white',
                    // icon: 'warning',
                    message: 'You are already logged-out'
                })
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

            await $fetch('/api/auth/logout/', config).then(() => {
                localStorage.removeItem('token')
                this.$reset()
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Logged-out'
                })
            }).catch(err => {
                $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: 'Something went wrong'
                })
            }).finally(() => {
                return
            })

        }
    },
})