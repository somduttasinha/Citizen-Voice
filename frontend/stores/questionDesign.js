import { defineStore } from 'pinia'
import setRequestConfig from './utils/setRequestConfig';

export const useQuestionDesignStore = defineStore('question', {
    state: () => {
        return {
            id: null,
            currentQuestions: []
        }
    },
    getters: {
        currentQuestion: (state) => state.currentQuestion
    },
    actions: {
        async setOrderedQuestionBySurvey(id) {
            console.log('id //> ', id)
            const config = setRequestConfig({ method: 'GET', survey_id: id })
            const { data } = await useAsyncData(() => $cmsApi('api/questions/', config));

            this.currentQuestions = data
        },
        addNewQuestion(newQuestion) {
            this.currentQuestions.push(newQuestion)
        },
        removeQuestion(index) {

        },
        // setCurrentQuestionsDesign(currentQuestions) {
        //     this.currentQuestions = currentQuestions
        // },
    }
})