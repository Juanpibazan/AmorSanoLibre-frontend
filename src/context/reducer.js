
export const actionTypes = {
    SET_USER:'SET_USER',
    SET_SESSION:'SET_SESSION'
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
        default:
            return state;
    }
};