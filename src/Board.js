import React, { Component } from 'react';
import Square from './Square'

export default class Board extends Component{
    constructor(props){
        super(props);
    }

    renderSquares(i){
       return <Square />
    }

    render(){
        const status = 'Next: X';
        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquares(0)}
                    {this.renderSquares(1)}
                    {this.renderSquares(2)}
                </div>
                <div className="board-row">
                    {this.renderSquares(3)}
                    {this.renderSquares(4)}
                    {this.renderSquares(5)}
                </div>
                <div className="board-row">
                    {this.renderSquares(6)}
                    {this.renderSquares(7)}
                    {this.renderSquares(8)}
                </div>

            </div>
        );
    }

}