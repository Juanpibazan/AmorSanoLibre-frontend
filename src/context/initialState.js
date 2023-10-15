export const initialState = {
    user: localStorage.getItem('user') ==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('user'))
};