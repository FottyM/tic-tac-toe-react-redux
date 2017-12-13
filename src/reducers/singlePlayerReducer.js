const initialState = {
    board: Array(9).fill(' '),
    maxPlayer : 'X',
    minPLayer : 'O'

}

const singlePlayerReducer = (state = initialState, action) =>{
    console.log(state);
    switch (action.type){
        case "SP_CHANGE_TURN":
            return {...state};
        default:
            return {...state};
    }
}

export default singlePlayerReducer;