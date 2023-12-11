import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useGlobalStore } from './global'
import setRequestConfig from './utils/setRequestConfig';


export const useStoreResponse = defineStore('response', {
    state: () => ({
        responseId: null,
        currentQuestion: 1 // TODO [manuel]: this should be set to the first question of the survey
    }),
    getters: {
        response() {
            return this.responseId
        }
    },
    actions: {
        setResponse(response) {
            // [manuel]: Change the value of the response. Is response the right name? is response here the answer to a question?
            this.responseId = response
        },
        setCurrentQuestion(questionNumber) {
            this.currentQuestion = questionNumber
        },
        async getSurvey({ id }) {
            console.log('id //> ', id)
            const { data: survey } = await useAsyncData(() => $cmsApi('/api/surveys/' + id)); // TODO [manuel]: ID is undefined when starting the survey
            return survey
        },
        async createResponse({ surveyId  }) {
            /* Create a new response object in the backend, and
            returns the following JSON response:
            {
            "created": "2023-11-24T12:40:36.779244Z",
            "updated": "2023-11-24T12:40:36.779651Z",
            "survey": 1,
            "respondent": 1,
            "interview_uuid": "ec030b1d-24ce-4df5-93c9-335ea7da1615"
        }
            */
            
            // console.log('surveyId //> ', surveyId);
            const user = useUserStore()
            const csrftoken = user.getCookie('csrftoken');
            const token = user.getAuthToken

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                method: 'POST',
                //   // Pass the data for the new Response object as the request body
                //   // TODO: have the respondent set to the logged in user
                body: {
                    survey: 1 , // This must include the survey ID
                    respondent: 1 // TODO [manuel]: this should be the logged in user
                },
            };

            if (token) {
                config.headers['Authorization'] = `Token ${token}`

            }

            const {data: _response}  = await useAsyncData( () => $cmsApi('/api/responses/', config));

            console.log('response in response store//> ', _response.value.interview_uuid);

            // return _response
            this.setResponse(_response.value.interview_uuid)
            return true
            // console.log('id //> ', id);
            // console.log(survey)

        }
    }
})