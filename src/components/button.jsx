import React, { Component } from 'react';


/**
 *  Button component, it will render the button design and content
 */
class Button extends Component {
    state = {}

    getButtonClass = () => {
        return `btn ml-5 ${this.props.value.bg}`;
    };

    render() {
        const { value } = this.props;
        return (
            <button
                key={value.id} //Button ID
                className={this.getButtonClass()} // Set the CSS of the button
                onClick={() => this.props.onClick(value.id) } //Click emiter.
            >
                &nbsp;
            </button>
        );
    }
}

export default Button;