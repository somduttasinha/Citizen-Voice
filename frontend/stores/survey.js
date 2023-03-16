import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useGlobalStore } from './global'

export const useSurveyStore = defineStore('survey', {
    state: () => {
        return {
            id: null
        }
    },
    getters: {

    },
    actions: {
        /**
        * Create survey
        * @param {*} name
        * @param {*} description
        * @param {*} publish_date
        * @param {*} expire_date
        * @param {id} id
        */

        /**
         * Create a new survey based on the passed parameters
         */
        async createSurvey(
            name,
            description,
            publish_date,
            expire_date
        ) {
            const user = useUserStore()
            const global = useGlobalStore()
            const csrftoken = user.getCookie('csrftoken');
            const token = user.userData.token

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                method: 'POST',
                body: {
                    name,
                    description,
                    publish_date,
                    expire_date
                },
            }

            if (token) {
                config.headers['Authorization'] = `Token ${token}`
            }

            const { data: register, pending, error } = await useAsyncData('createSurvey', () => $cmsApi('/api/surveys/', config))

            if (error.value) {
                let warnMessage = null
                for (const [key, value] of Object.entries(error._value.data)) {
                    warnMessage = warnMessage ? `${warnMessage} \n\n ${key}: ${value}` : `${key}: ${value}`
                }
                // Notification
                global.warning(warnMessage)
                return null

            }
            if (register?.value) {
                // Notification
                global.succes('createSurvey complete')
                this.id = 1
                return register.value
            }
            return null
        },

        /**
         * Get surveys of the current user
         */
        async getSurveysOfCurrentUser() {
            const user = useUserStore()
            const global = useGlobalStore()
            const csrftoken = user.getCookie('csrftoken');
            const token = user.userData.token

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                method: 'GET'
            }

            if (token) {
                config.headers['Authorization'] = `Token ${token}`
            }
            // ,  pending, refresh, error}
            // const response = await useAsyncData('getSurveys', () => $cmsApi('/api/surveys/my-surveys', config))
            // console.log("Response: ")
            // console.log(response)
            // console.log(response.data.value._value)
            // console.log(response.error.value)
            const { data, pending, error, refresh } = await useAsyncData('getSurveys', () => $cmsApi('/api/surveys/my-surveys', config))
            console.log("Data:")
            console.log(data.value)
            console.log(pending.value)
            console.log(error.value)
            console.log(refresh.value)
            console.log(data)
            console.log(pending)
            console.log(error)
            console.log(refresh)

            // console.log("Target: ")
            // console.log(data.value)
            // console.log(error.value)
            if (error.value) {
                let warnMessage = null
                for (const [key, value] of Object.entries(error._value.data)) {
                    warnMessage = warnMessage ? `${warnMessage} \n\n ${key}: ${value}` : `${key}: ${value}`
                }
                // Notification
                global.warning(warnMessage)

            }
            else {
                Notification
                global.succes('retrieving Surveys complete')
                // global.succes(response.value)
                // this.id = 1
                // await navigateTo('/design')
            }

            // alert(response[0])
            // return response
          // return data
          return data.value, refresh
        },

      /**
       * Delete an existing survey based on the passed ID
       */
      async deleteSurvey(
        id
      ) {
        const user = useUserStore()
        const global = useGlobalStore()
        const csrftoken = user.getCookie('csrftoken');
        const token = user.userData.token

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
          method: 'DELETE'
        }


        if (token) {
          config.headers['Authorization'] = `Token ${token}`
        }

        const { data: register, pending, error } = await useAsyncData('deleteSurvey', () => $cmsApi('/api/surveys/' + id, config))

        if (error.value) {
          let warnMessage = null
          for (const [key, value] of Object.entries(error._value.data)) {
            warnMessage = warnMessage ? `${warnMessage} \n\n ${key}: ${value}` : `${key}: ${value}`
          }
          // Notification
          global.warning(warnMessage)

        }
        else {
          // Notification
          global.succes('deleteSurvey complete')
          this.id = 1
          await navigateTo('/design')
        }

      },
    }
})
