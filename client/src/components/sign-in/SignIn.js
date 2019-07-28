import React from 'react'

import {CognitoUserPool} from 'amazon-cognito-identity-js'
import {poolData} from '../../share/aws_cog'

const userPool = new CognitoUserPool(poolData)

const AWS = require('aws-sdk')

export default class SignIn extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        confirmCode: ""
    }

    _onChange = (e) => {
        if(e.target.name === "username"){
            this.setState({
                username: e.target.value
            })
        }
        else if(e.target.name === "email"){
            this.setState({
                email: e.target.value
            })
        }

        else if (e.target.name === "password"){
            this.setState({
                password: e.target.value
            })
        }

        else{
            this.setState({
                confirmCode: e.target.value
            })
        }
    }

    createAccount = (e) => {
        new AWS.CognitoIdentityServiceProvider().signUp({
            ClientId: poolData.ClientId,
            Username: this.state.username,
            Password: this.state.password,
            UserAttributes: [{
                Name: "email",
                Value: this.state.email
            }]
        }, (err, data) => {
            if(err) return console.log(err, err.stack)

            console.log(data)
        })

        e.preventDefault()
    }
    
    confirmRegistration = (e) => {
        new AWS.CognitoIdentityServiceProvider().confirmSignUp({
            ClientId: poolData.ClientId,
            ConfirmationCode: this.state.confirmCode,
            Username: this.state.username,
        }, (err, data) => {
            if(err) return console.log(err, err.stack)

            console.log(data)
        })
    }

    render() {
        return (
            <>
            <form>
                <label>
                    <p>Username: </p>
                    <input type="text" name="username" value={this.state.username} onChange={this._onChange} />
                </label>

                <label>
                    <p>Email: </p>
                    <input type="email" name="email" value={this.state.email} onChange={this._onChange} />
                </label>

                <label>
                    <p>Password: </p>
                    <input type="password" name="password" value={this.state.password} onChange={this._onChange} />
                </label>

                <div>
                    <button
                        onClick={this.createAccount}
                    >
                        Create
                    </button>
                </div>
            </form>

            <div>
                <label>
                    <p>Confirmation code:</p>
                    <input type="text" name="confirm-code" value={this.state.confirmCode} onChange={this._onChange} />
                </label>

                <div>
                    <button
                        onClick={this.confirmRegistration}
                    >
                        Confirm
                    </button>
                </div>
            </div>

            </>
        )
    }
}