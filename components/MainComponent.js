import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail },
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headreTitleStyle: {
            color: '#fff'
        }
    }
});

const MenuNavigatorContainer = createAppContainer(MenuNavigator);

class Main extends Component {

  render() {
 
    return (
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}> 
            <MenuNavigatorContainer />
        </View>
    );
  }
}
  
export default Main;