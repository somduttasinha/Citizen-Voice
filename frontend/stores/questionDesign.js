import { defineStore, } from 'pinia'
import setRequestConfig from './utils/setRequestConfig';
import { sortBy, path } from 'ramda'

// UTILS
const sortByOrder = sortBy(path(['order']))

const questionPlaceholder = {
    choices: "",
    is_geospatial: false,
    map_view: null,
    order: 0,
    question_type: "",
    required: true,
    survey: "",
    text: ""
}


export const useQuestionDesignStore = defineStore('question', {
    state: () => ({
        id: null,
        currentQuestions: []
    }),
    getters: {
        getCurrentQuestions: (state) => state.currentQuestions
    },
    actions: {
        async saveCurrentQuestions() {
            const config = setRequestConfig({ method: 'POST', body: [...this.currentQuestions] })
            const { data, refresh, error } = await useAsyncData(() => $cmsApi(`api/questions/`, config));
            this.currentQuestions = sortByOrder(data.value)
            refresh()
        },
        async setOrderedQuestionBySurvey(id) {
            const config = setRequestConfig({ method: 'GET', survey_id: id })
            const { data } = await useAsyncData(() => $cmsApi(`api/questions/${id}/ordered_questions`, config));

            this.$patch({ currentQuestions: data })
        },
        addNewQuestion(newQuestion) {
            this.$patch({ currentQuestions: [...this.currentQuestions, newQuestion] })
        },
        // TODO
        removeQuestion(index) {

        },
        setCurrentQuestionValue(index, value) {
            const tempCurrentQuestions = this.currentQuestions
            tempCurrentQuestions[index] = value
            this.$patch({ currentQuestions: tempCurrentQuestions })
        }
    },

})