// Global user state

const initialState = {
    token: null,
    user: {
        id: null,
        email: '',
        password: '',
    },
    error: '',
    pending: false,
}

export const useAuthUser = () => {
    return useState('user', () => initialState);
};