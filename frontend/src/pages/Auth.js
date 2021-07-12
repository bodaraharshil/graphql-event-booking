import React from 'react';
import "./auth.css";

class Authpage extends React.Component {

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        const requestBody = {
            query: `
                mutation($email:String!,$password:String!) {
                    createUser(userInput:{email:$email,password:$password}) {
                        _id
                        email
                        password
                    }
                }
            `,
            variables: { password, email }
        };
        await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    render() {
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" placeholder="E-mail" ref={this.emailEl} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder="Password" ref={this.passwordEl} />
                </div>
                <div className="form-actions">
                    <button type="submit" >Submit</button>
                    <button type="button">Switch to Signup</button>
                </div>
            </form>
        )
    }
}

export default Authpage;