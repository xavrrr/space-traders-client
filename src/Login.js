import React, { Component } from 'react';
import { SpaceTraders } from 'spacetraders-sdk';
import './App.css';

const spaceTraders = new SpaceTraders();

class LoginWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            token: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleTokenChange = this.handleTokenChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handleTokenChange(event) {
        this.setState({token: event.target.value});
    }

    async signIn(event) {
        event.preventDefault();

        spaceTraders.init(this.state.username, this.state.token);

        spaceTraders.getStatus().then((result) => {
            if (result.status === "spacetraders is currently online and available to play") {
                spaceTraders.getAccount().then((response) => {
                    if (response.user.username === this.state.username) {
                        console.log("Success");
                    } else {
                        console.log("Auth failed");
                    }
                });
            } else {
                console.log("Failed to access server");
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.signIn} className="login-form">
                <h2>Log In</h2>
                <p>Please login to continue</p>
                <label className="full-width-input">
                    Username
                    <input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)} required />
                </label>
                <label className="full-width-input">
                    Token
                    <input type="text" placeholder="Token" value={this.state.token} onChange={(e) => this.handleTokenChange(e)} required />
                </label>
                    <button className="button">Login</button>
            </form>
        );
    }
};

export default LoginWidget;
