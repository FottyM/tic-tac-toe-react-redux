const initialState = {
    history: [{
        squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    myTurn: true,
};

const turnsReducer = ( state = initialState, action)=>{

    switch (action.type){
        case "CHANGE_TURN":
            return changerTurns( action.payload, state);
        case "JUMP_STEP":
            return jumpTo( action.payload, state);
        default:
            return {...state};

    }
};

const jumpTo = (step, state)=>{
    return {
        ...state,
        stepNumber:step,
        myTurn: ( step % 2 ) === 0
    }
};

const changerTurns = (i, state)=>{

    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const myTurn =  state.myTurn;

    if (winner(squares)) return {...state};

    if (squares[i] === null && myTurn) {
        squares[i] = 'X';

        return {
            ...state,
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            myTurn: !state.myTurn,
        }
    } else if (squares[i] === null && !myTurn) {
        squares[i] = 'O';
        return {
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            myTurn: !state.myTurn,
        };
    }
};

const winner =  (squares) =>{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export  default turnsReducer;
