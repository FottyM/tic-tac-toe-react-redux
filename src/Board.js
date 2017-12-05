import React, { Component } from 'react';
import Square from './Square'

export default class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            myTurn: true,
        }
    }

    handleClick(i){
        let myTurn = this.state.myTurn;
        const squares = this.state.squares.slice();

        if(winner(squares)) return;

        if(squares[i] === null && myTurn ){
            squares[i] = 'X';
            myTurn = false;
            this.setState( { squares, myTurn } );

        }else if( squares[i] === null && !myTurn ) {
            squares[i] = 'O';
            myTurn = true;
            this.setState( { squares, myTurn } );

        }
    }

    renderSquare(i){
       return(
           <Square
               value = { this.state.squares[i] }
               onClick = {() => { this.handleClick(i) }}
           />
       );
    }

    resetGame(){
        this.setState(
            {
                squares: Array(9).fill(null),
                myTurn: true,
            }
        )
    }

    render(){
        const theWinner = winner(this.state.squares);
        let status;
        if(theWinner){
            status = `The winner is inner: ${theWinner}`
        }else {
            status = `Who's next ${this.state.myTurn ? 'X' : 'O'}`;
        }

        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <button onClick={ () => this.resetGame()}>
                    Reset Game
                </button>
            </div>
        );
    }

}

function winner( squares) {
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
}