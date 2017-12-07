const state = {
    history: [{
        squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    myTurn: true,
};

const turnsReducer = ( state = {...state}, action)=>{
    console.log(state);
    switch (action.type){
        case "CHANGE_TURN":
            return state;
        default:
            return state;

    }
};

export  default turnsReducer;
