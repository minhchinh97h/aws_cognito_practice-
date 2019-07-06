import React from 'react'
import {Fragment} from 'react'
import {CognitoUserPool, 
    CognitoUser, 
    AuthenticationDetails,
} from 'amazon-cognito-identity-js'

import { poolData } from '../../share/aws_cog';

const userPool = new CognitoUserPool(poolData)


const AWS = require('aws-sdk')

AWS.config.region = 'us-east-2';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:1f2424d8-e18a-4841-b038-23d22f863ab7'
});
AWS.config.update({accessKeyId: 'AKIAZKZG3IJ2TGS5N5UU', secretAccessKey: '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'})


export default class Login extends React.Component{

    state = {
        username: '',
        password: ''
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitForm = (event) => {
        let authenticationDetails = new AuthenticationDetails({
            Username: this.state.username,
            Password: this.state.password
        })

        let cognitoUser = new CognitoUser({
            Username: this.state.username,
            Pool: userPool
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                let accessToken = result.getAccessToken().getJwtToken()

                let idToken = result.idToken.getJwtToken

                console.log(accessToken, "\n", idToken)
            },

            onFailure: (error) => {
                console.log(error)
            }
        })


        event.preventDefault()
    }
    
    adminCreateUser = (e) => {
        e.preventDefault()

        let cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

        let params = {
            UserPoolId: poolData.UserPoolId, /* required */
            Username: 'admin', /* required */
            DesiredDeliveryMediums: ["EMAIL"],
            ForceAliasCreation: false,
            MessageAction: "SUPPRESS",
            TemporaryPassword: 'E1500932vamk@',
            UserAttributes: [
              {
                Name: 'email', /* required */
                Value: 'minhchinhduong97@gmail.com'
              }
            ],
            ValidationData: [
              {
                Name: 'phonenumber', /* required */
                Value: '0469518856'
              }
            ]
          };

        cognitoIdentityServiceProvider.adminCreateUser(params, (err, data) => {
            if(err) console.log(err)
            else{
                console.log(data)
            }
        })
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){
    }

    render(){
        return(
            <Fragment>
                <form onSubmit={this.submitForm}>
                    <label>
                        <p>Username: </p>
                        <input type="text" value={this.state.username} onChange={this.handleUsername}></input>
                    </label>
                    <label>
                        <p>Password: </p>
                        <input type="password" onChange={this.handlePassword}></input>
                    </label>

                    <div>
                        <button type="submit">Login</button>
                    </div>

                    <div>
                        <button>Sign up</button>
                    </div>

                    <div>
                        <button onClick={this.adminCreateUser}>Admin create user</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}