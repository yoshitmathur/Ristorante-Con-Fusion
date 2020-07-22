import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
// import { SecureStore } from 'expo';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    state= {
        username: '',
        password: '',
        remember: false
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userData => {
                let userinfo = JSON.parse(userData);
                if(userinfo) {
                    this.setState({ username: userinfo.username, 
                        password: userinfo.password,
                        remember: true
                    });
                }
            })
    }

    static navigationOptions = {
        title: 'Login'
    };

    handleLogin = () => {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
    }

    render() {
        return(
            <View style={styles.container} >
                <Input
                    placeholder = 'Username'
                    leftIcon = {{type: 'font-awesome', name: 'user-o'}}
                    onChangeText = {(username) => this.setState({username})}
                    value = {this.state.username}
                    style = {styles.formInput}
                />

                <Input
                    placeholder = 'Password'
                    leftIcon = {{type: 'font-awesome', name: 'key'}}
                    onChangeText = {(password) => this.setState({password})}
                    value = {this.state.password}
                    style = {styles.formInput}
                />

                <CheckBox 
                    title='Remember Me?'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    style={styles.formCheckbox}
                />

                <View style={styles.formButton} >
                    <Button 
                        title="Login"
                        color='#512da8'
                        onPress={() => this.handleLogin()}
                    />
                </View>
            </View>
        );
    }

}

export default Login;

const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        margin: 20,
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }

});