import * as React from 'react';
import Square from './Square'

interface BoardProps extends React.Props<any> {
    squares: string[];
    onClick: (i: number) => void;
}

// This will render a 3x3 board.
export default class Board extends React.Component<BoardProps> {
    render(): JSX.Element {
        const rowElements: JSX.Element[] = [];
        for (let rowIdx = 0; rowIdx < this.props.squares.length; rowIdx += 3)
        {
            const columnElements: JSX.Element[] = [];
            for(let columnIdx = rowIdx; columnIdx < rowIdx + 3; columnIdx++)
            {
                columnElements.push(
                    <Square 
                        value={this.props.squares[columnIdx]}
                        onClick={() => this.props.onClick(columnIdx)}
                    />);
            }
            rowElements.push(<div className="board-row"> {columnElements} </div>);
        }

        return (<div>{rowElements}</div>);
    }
}
