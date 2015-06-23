import React from 'react';


class Button extends React.Component {
    render() {
        let newClassName = (this.props.className || '') + ' btn btn-lg';
        return (
            <button className={newClassName} onClick={this.props.onClick}>{this.props.children}</button>
        );
    }
}
export default Button;