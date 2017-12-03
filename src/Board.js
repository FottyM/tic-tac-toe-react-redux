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
            <div className="Board">

            </div>
        );
    }

}