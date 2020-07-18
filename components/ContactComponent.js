import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class ContactComponent extends Component {
    static navigationOptions = {
        title: 'Contact Us'
    }
    
    render() {
        return(
            <View>
                <Animatable.View animation='fadeInDown' duration= {2000} delay= {1000}>
                    <Card title='Our Address' >
                        <Text style = {{margin: 10}}>
                            {`
121, Clear Water Bay Road
Clear Water Bay, Kowloon
HONG KONG
Tel: +852 1234 5678
Fax: +852 8765 4321
Email:confusion@food.net
                            `}
                        </Text>
                    </Card>
                </Animatable.View>
                
            </View>
        );
    }
}

export default ContactComponent;