import { useQuestionDesignStore } from "~/stores/questionDesign"

const questionStore = useQuestionDesignStore()


/**
 * This set a proxy for the q
 * @param {*} props 
 * @returns Question
 * 
 */
const question = (props) => {
    return computed({
        get: () => questionStore.currentQuestions[props.index],
        set: (value) => {
            const updatedKeys = Object.keys(value).reduce((keys, key) => {
                if (value[key] !== question[key]) {
                    keys.push(key)
                }
                return keys
            }, [])

            if (updatedKeys.length > 0) {
                const updatedQuestion = { ...question, ...value }
                questionStore.setCurrentQuestionValue(props.index, updatedQuestion)
            }
        }
    })
}



export default question