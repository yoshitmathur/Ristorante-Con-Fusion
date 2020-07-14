import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

class ContactComponent extends Component {
    static navigationOptions = {
        title: 'Contact Us'
    }
    
    render() {
        return(
            <View>
                <Card title='Our Address' >
                    <Text>
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
            </View>
        );
    }
}

export default ContactComponent;