const initialState = {
    board: Array(9).fill(''),
    maxPlayer : 'X',
    minPLayer : 'O',
    winner: null,
    turn: 'X'

}

const singlePlayerReducer = (state = initialState, action) =>{

    switch (action.type){
        case "SP_CHANGE_TURNS":
            return {...state, ...action.payload};
        default:
            return {...state};
    }
}

export default singlePlayerReducer;