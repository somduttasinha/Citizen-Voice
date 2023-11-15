import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useGlobalStore } from './global'


/* TODO [manuel]: CONTINUE HERE
    - create a response object can collect uuid, 
    - use uuid on response path
*/

export const useStoreResponse = defineStore('response', {
    state: () => ({
        response: null,
        currentQuestion: 1 // TODO [manuel]: this should be set to the first question of the survey
    }),
    actions: {
        setResponse(response) {
            this.response = response
        },
        setCurrentQuestion(questionNumber) {
            this.currentQuestion = questionNumber
        },
        async getResponse({ id }) {
            console.log('id //> ', id)
            const { data: survey } = await useAsyncData(() => $cmsApi('/api/surveys/' + id)); // TODO [manuel]: ID is undefined when starting the survey
            return survey
        },
        async createResponse() {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                //   // Pass the data for the new Response object as the request body
                //   // TODO: have the respondent set to the logged in user
                body: {
                    survey: '/api/surveys/' ,
                    respondent: "/api/users/me/"
                },
            }

            const { data: survey } = await useAsyncData(() => $cmsApi('/api/responses/' + id, config));

            console.log(survey)

        }
    }
})