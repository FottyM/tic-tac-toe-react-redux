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
        if(squares[i] === null && myTurn === true ){
            squares[i] = 'X';
            myTurn = false;
            this.setState( { squares, myTurn } );

        }else if( squares[i] === null && myTurn === false ) {
            squares[i] = 'O';
            myTurn = true;
            this.setState( { squares, myTurn } );

        }
        console.log(myTurn);
    }



    renderSquare(i){
       return(
           <Square
               value = { this.state.squares[i] }
               onClick = {() => { this.handleClick(i) }}
           />
       );
    }

    render(){
        const status = "Next Player: X";

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
            </div>
        );
    }

}