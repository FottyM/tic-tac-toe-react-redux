export function changeTurns (index) {
    return {
        type: 'CHANGE_TURN',
        payload: index
    }
}

export function jumpSteps(step) {
    return{
        type: "JUMP_STEP",
        payload: step
    }
}