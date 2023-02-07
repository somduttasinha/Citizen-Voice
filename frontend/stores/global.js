import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            notify: null
        }
    },
    getters: {
        getQNotify: (state) => state.notify
    },
    actions: {
        succesNotify(message = 'Succes') {
            this.getQNotify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: message
            })
        },
        // Use for fail and errors
        negativeNotify(message = 'Something went wrong') {
            this.getQNotify({
                color: 'negative',
                textColor: 'white',
                icon: 'warning',
                message: message
            })
        },
        infoNotify(message) {
            this.getQNotify({
                color: 'info',
                textColor: 'white',
                icon: 'info',
                message: message
            })
        },
        initalizeNotify() {
            (async () => {
                const { useToast } = await import("vue-toastification")
                this.notify = useToast()
                // or with options
                this.notify.success("My toast content");
            })()
        },
    }
})