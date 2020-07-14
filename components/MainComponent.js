import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import Home from "./HomeComponent";
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';

const MenuNavigator = createAppContainer(createStackNavigator({
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
}));

// const MenuNavigatorContainer = createAppContainer(MenuNavigator);

const HomeNavigator = createAppContainer(createStackNavigator({
    Menu: { screen: Home }
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512da8'
        },
        headerTintColor: '#fff',
        headreTitleStyle: {
            color: '#fff'
        }
    }
}));

// const MainNavigator = createAppContainer(createDrawerNavigator({
//     Home: {
//         screen: HomeNavigator,
//         navigationOptions: {
//             title: 'Home',
//             drawerLabel: 'Home'
//         }
//     },
//     Menu: {
//         screen: MenuNavigator,
//         navigationOptions: {
//             title: 'Menu',
//             drawerLabel: 'Menu'
//         }
//     }
// }, {
//     drawerBackgroundColor: '#d1c4e9'
// }));

const MainNavigator = createAppContainer(createDrawerNavigator({
    HomeComponents: { 
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            // drawerIcon:({tintColor})=>(
            // <Icon name='home' size={24} color={tintColor} 
            // type='font-awesome' /> )
        }
    },
  
    //   About: { screen: AboutNavigator,
    //     navigationOptions: {
    //       title: 'About Us',
    //       drawerLabel: 'About Us',
    //       drawerIcon:({tintColor})=>(
    //         <Icon name='info-circle' size={24} color={tintColor} 
    //         type='font-awesome' />
    //       )}
    //   },
  
    MENU: { 
        screen: MenuNavigator,
        navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu',
        // drawerIcon:({tintColor})=>(
        //   <Icon name='list' size={24} color={tintColor} 
        //     type='font-awesome' /> )
        }
    },
  
    //   Contact: { screen: ContactNavigator,
    //     navigationOptions: { title: '',
    //       drawerLabel: 'Contact Us',
    //       drawerIcon:({tintColor})=>(
    //       <Icon name='address-card' size={22} color={tintColor} 
    //         type='font-awesome' /> )}
    //     }
    }, 
    {
        drawerBackgroundColor: '#D1C4E9',
        // contentComponent : CustomDrawerContentComponent
}));

class Main extends Component {

  render() {
 
    return (
        <View style={{flex:1}}> 
            <MainNavigator />
        </View>
    );
  }
}
  
export default Main;