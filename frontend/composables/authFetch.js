/**
 * 
 * @param {string} url 
 * @param {object} options 
 * @returns {object}
 */
export const fetchWithCookie = async (url, options) => {
    const token = localStorage.getItem('token')

    const { data } = await useAsyncData(() => $fetch(url, { ...options, }));
    return data.value
}

