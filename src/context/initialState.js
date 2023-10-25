export const initialState = {
    user: localStorage.getItem('user') ==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('user')),
    session: localStorage.getItem('session') ==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('session')),
    requests_count: localStorage.getItem('requests_count')==='undefined' ? localStorage.clear() : JSON.parse(localStorage.getItem('requests_count'))
};