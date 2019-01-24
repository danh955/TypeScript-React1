import * as React from 'react';

interface SquareProps extends React.Props<any> {
    value: string;
    onClick: () => void;
}

export default class Square extends React.Component<SquareProps> {
    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}
