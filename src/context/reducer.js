
export const actionTypes = {
    SET_USER:'SET_USER',
    SET_SESSION:'SET_SESSION',
    SET_REQUESTS_COUNT: 'SET_REQUESTS_COUNT'
};

export const reducer = (state,action)=>{
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_SESSION:
            return {
                ...state,
                session: action.session
            }
        case actionTypes.SET_REQUESTS_COUNT:
            return {
                ...state,
                requests_count: action.requests_count
            }
        default:
            return state;
    }
};