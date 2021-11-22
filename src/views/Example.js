import React, { Component } from 'react'

export default class Example extends Component {
    constructor(){
        super();
        this.state={
            name:'Pika',
            students: ["Eduardo", "Leo", "Jackie", "curly"]
        }
        console.log("IN constructor")
    }

    componentDidMount(){
        console.log("In component Did Mount")
    }

    componentDidUpdate(){
        console.log("In component Did Update")
    }

    componentWillUnmount(){
        console.log("In component Will Unmount")
    }


    render() {
        return (
            <div>
                {console.log("in render")}
                {this.state.name === 'Pika' ? `Lets play a game ${this.state.name}` : `Did i sacre you ${this.state.name}?`}
                <br/>
                <button>Set name to "Boo"</button>
                <button>Set name to "Pika"</button>
                <ul>
                    {this.state.students.map((student, index)=><li key={index}>{student}</li>)}
                </ul>
            </div>
        )
    }
}
