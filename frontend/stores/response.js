import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { useGlobalStore } from './global';
import setRequestConfig from './utils/setRequestConfig';
import { useSurveyStore } from './survey';

export const useStoreResponse = defineStore('response', {
    state: () => (
        {
        responseId: null,
        respondent: null, // if null it means that the respondent 
        currentQuestion: 1, 
        surveyId: null,
        answersToCurrentSurvey: [],
    }
    ),
    getters: {
        response() {
            return this.responseId
        },
        // when using ARROW functions, state should be passed as an argument to be able to 
        // access the state of the store using 'this'
        getAnswersToCurrentSurvey: (state) => this.answersToCurrentSurvey
        
    },
    actions: {
        getRespondentId(){
            if (localStorage?.getItem('respondent-id') !== null) {
                return localStorage.getItem('respondent-id')
            }
            return null
        },
        setResponse(response) {
            // [manuel]: Change the value of the response. Is response the right name? is response here the answer to a question?
            this.responseId = response
        },
        setCurrentQuestion(questionNumber) {
            this.currentQuestion = questionNumber
        },
        async getSurvey({ id }) {
            
            const { data: survey } = await useAsyncData(() => $cmsApi('/api/surveys/' + id)); 

            if (survey) {
                console.log('survey.value.id in get Survey//> ', survey.value.id);
                this.surveyId = survey.id;
            }
            
            return survey
        },
        async createResponse({ surveyId, respondentId=null  }) {
            /**
         * Creates a new respondent object linked to a survey and stores the id in the localstorage this way we know if it's the same respondent over multiple questions
         * First it checks if the respondent-id is not already in the localstorage, if so it skips the respondent creation
         * @param {*} param0 
         * @returns 
         * 
         * @question what happens if a respondent does multiple surveys, do we need to link all the surveys?
         */
            
            // console.log('surveyId //> ', surveyId);
            const user = useUserStore()
            const csrftoken = user.getCookie('csrftoken');
            const token = user.getAuthToken


            const config = setRequestConfig({
                method: 'POST', 
                body: {
                    survey: surveyId,
                    respondent: respondentId  // TODO [manuel]: this is required by the api
                }
            });

            // First let's check if the respondent is already in the localstorage   
            if (localStorage?.getItem('respondent') !== null) {
                console.log('surveyID in respose store //> ', surveyId);
                
                return localStorage.getItem('respondent-id')

            }

            
            const { data: response, pending, error} = await useAsyncData(() => $cmsApi('api/responses/response/create-response/', config));


            if (response?.value?.interview_uuid){
                localStorage.setItem('responseId', response.value.interview_uuid)
                console.log('response.value.interview_uuid //> ', response.value.interview_uuid);
                return response.value.interview_uuid
            }
            return null
        },

        async submitAnswer(answers) {
            const user = useUserStore();
            const global = useGlobalStore();
            const csrftoken = user.getCookie('csrftoken');
            const token = user.getAuthToken;

            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                method: 'POST',
                // pas the data for the new Response object as the request body
                
                // TODO: have the repondent set to the logged in user 
                body: {
                    survey: "apli/surveys/"+surveyId+'/',
                    repondent : "api/users/me/",
                    answers: answers,
                    responseId: responseId,
                }
            };
            if (token) {
                config.headers['Authorization'] = `Token ${token}`
            };
            const {data: survey, pending, error} = await useAsyncData('retrieveResponse', () => $cmsApi('/api/responses/submit-response/', config));

            console.log(answers);
        }

        // TODO: CONTINUE HERE
        // implement the submit-response endpoint in the backend

            // if (token) {
            //     config.headers['Authorization'] = `Token ${token}`

            // }

            // const {data: _response}  = await useAsyncData( () => $cmsApi('/api/responses/', config));

            // console.log('response in response store//> ', _response.value.interview_uuid);

            // // return _response
            // this.setResponse(_response.value.interview_uuid)
            // return true
            // // console.log('id //> ', id);
            // // console.log(survey)

        
    }
})