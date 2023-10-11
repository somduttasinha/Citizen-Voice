import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useGlobalStore } from './global'


export const useStoreResponse = defineStore('response', {
    state: () => ({
        response: null,
        currentQuestion: 1
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
            const { data: survey } = await useAsyncData(() => $cmsApi('/api/surveys/' + id));
            return survey
        },
        async createResponse({ id }) {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                //   // Pass the data for the new Response object as the request body
                //   // TODO: have the respondent set to the logged in user
                body: {
                    survey: '/api/surveys/' + id + "/",
                    interview_uuid: "123",
                    respondent: "/api/users/me/"
                },
            }

            const { data: survey } = await useAsyncData(() => $cmsApi('/api/responses/' + id, config));

            console.log(survey)

        }
    }
})