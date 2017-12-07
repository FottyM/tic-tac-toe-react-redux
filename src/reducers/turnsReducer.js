const state = {

};

const turnsReducer = (state = {...state}, action)=>{
    switch (action.type){
        case "CHANGE_TURN":
            break;
        default:
            state = {...state};
            break;

    }

    return state

};

export  default turnsReducer;
