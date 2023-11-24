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
            // [manuel]: Change the value of the response. Is response the right name? is response here the answer to a question?
            this.response = response
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
            
            console.log('surveyId //> ', surveyId);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                //   // Pass the data for the new Response object as the request body
                //   // TODO: have the respondent set to the logged in user
                body: {
                    survey: 1 , // This must include the survey ID
                    respondent: 1 // TODO [manuel]: this should be the logged in user
                },
            };

            const { data: response } = await useAsyncData( () => $cmsApi('/api/responses/', config));

            return response
            // this.setResponse(survey.interview_uuid)
            // console.log('id //> ', id);
            // console.log(survey)

        }
    }
})