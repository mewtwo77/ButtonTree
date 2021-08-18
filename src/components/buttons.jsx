import React, { Component } from 'react';
import Button from './button';

/**
 * Buttns components contains the lists of buttons to be displayed.
 */
class Buttons extends Component {
    state = {
        currentButtonId: 0, //Current selectd button ID
        buttons: [ //Button array containing their id, background and child (refers to the next button that will be shown once it was selected.)
            { id: 0, bg: '', child: [1, 2,] }, //Initial value, showing [1] white & [2] red button.
            { id: 1, bg: 'white', child: [3, 4] }, //[1] White button, will result to [3] white & [4] orange button once clicked.
            { id: 2, bg: 'red', child: [5, 6] }, //[2] Red button, will result to [5] black & [6] red button once clicked.
            { id: 3, bg: 'white', child: [5, 6] }, //[3] White button, will result to [5] black & [6] red button once clicked.
            { id: 4, bg: 'orange', child: [7, 8, 5] }, //[4] Orange button, will result to [7] green, [8] orange  & [5] black button once clicked.
            { id: 5, bg: 'black', child: [7, 8, 5] }, //[5] Black button, will result to [7] green, [8] orange  & [5] black (itself) button once clicked.
            { id: 6, bg: 'red', child: 0 }, //[6] Red button, user is lost and will go to initial button.
            { id: 7, bg: 'green', child: [7, 8] }, //[7] Green button,  will result to [7] green (itself) & [8] orange button once clicked.
            { id: 8, bg: 'orange', child: [7, 8] } //[8] Green button,  will result to [7] green & [8] orange (itself) button once clicked.
        ],
        winningButton: { buttonId: [7, 8], maxSubsequenPressedtCount: 2 }, //Winning params, set the button Id to be clicked subsequently to win.
        winner: { buttonId: null, subsequenPressedtCount: 0 }, //Winner object, it will store the current status of the winning button.
        msg: { won: "Congratulations, You Won!!!", lost: "You Lost, Please try again!!!" } //message to be displayed.
    }

    handleCLick = (pressedButtonId) => { //handling the button click event
        const { winningButton } = this.state; //store in a variable the winningButton params
        const { msg } = this.state; //store msg in variable
        let { winner } = this.state; // create a copy of winner object from the state object

        if (this.getButtonChild(pressedButtonId) === 0) { //Check if the child of the selected button is 0
            alert(msg.lost); //Display the lose message
            return this.resetWinnerObj(); // Reset the winner object and update the state.
        } else if (winningButton.buttonId.find(c => c === pressedButtonId)) { //Check if the selected button is one of the winning button.
            if (winner.buttonId === null) {//check if the winner object button is null, means the winng button is select once for this cycle.
                winner.buttonId = pressedButtonId; //store the current selected button to winner object
                winner.subsequenPressedtCount = 1; // update the winner object subsequent pressed to 1.
            } else if (winner.buttonId === pressedButtonId) {//check if the previous winner object button is equal to current selected button.
                winner.subsequenPressedtCount += 1; //Increment the winner object button subsequent pressed.
                if (winner.subsequenPressedtCount === winningButton.maxSubsequenPressedtCount) { //check ff the current button is pressed subsequently to maximum pressed count to win.
                    alert(msg.won); //Display winning message
                    return this.resetWinnerObj(); //Reset the winner object and update the state.
                }
            } else {
                alert(msg.lost); //Display the lose message.
                return this.resetWinnerObj(); //Reset the winner object and update the state.
            }
            this.setState({ winner }); //Update the winner object state.
        }
        this.setState({ currentButtonId: pressedButtonId }); //Update the currentlty pressed object state.
    }

    getButtonChild = (pressedButtonId) => { //Get the child button of the selected button
        return this.state.buttons[pressedButtonId].child; //return the child button ID.
    }

    resetWinnerObj = () => { //Reset the winner object
        //this.state.winner = { buttonId: null, subsequenPressedtCount: 0 }; //Update the winner object in the state,
        this.setState({ winner: { buttonId: null, subsequenPressedtCount: 0 } })//Update the winner object in the state
        this.setState({ currentButtonId: 0, }); //reset the current selected button id to 0 and the state to flush the winner state also.
    }

    render() {
        return (
            <div>
                {this.state.buttons[this.state.currentButtonId].child.map(buttonId => ( //Get the child of the currently selected button and map the child button.
                    <Button //Button component.
                        key={buttonId}  //Button Id.
                        value={this.state.buttons[buttonId]} //Button props.
                        onClick={this.handleCLick} //Click emiter.
                    />
                ))}
            </div>
        );
    }
}

export default Buttons; //Export Buttons component.