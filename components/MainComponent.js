import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators'

import Home from "./HomeComponent";
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

const MenuNavigator = createAppContainer(createStackNavigator({
    Menu: { 
        screen: Menu,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.openDrawer()} />
        })
    },
    Dishdetail: { screen: Dishdetail },
},
));

const HomeNavigator = createAppContainer(createStackNavigator({
    Home: { 
        screen: Home,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
        }) 
    }
},
));

const ContactNavigator = createAppContainer(createStackNavigator({
    Contact: { 
        screen: Contact,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
        })
    }
},
));

const AboutNavigator = createAppContainer(createStackNavigator({
    About: { 
        screen: About,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
        }) 
    }
},
));

const FavoriteNavigator = createAppContainer(createStackNavigator({
    Favorites: { 
        screen: Favorites,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
        }) 
    }
},
));

const ReservationNavigator = createAppContainer(createStackNavigator({
    Reservation: { 
        screen: Reservation,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.openDrawer()} />
        })
    },
    Dishdetail: { screen: Dishdetail },
},
));

const LoginNavigator = createAppContainer(createStackNavigator({
    Login: { 
        screen: Login,
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#512da8'
            },
            headerTintColor: '#fff',
            headreTitleStyle: {
                color: '#fff'
            },
            headerLeft: () => <Icon name='menu' size={24} color='white' onPress={()=>navigation.openDrawer()} />
        })
    },
    Dishdetail: { screen: Dishdetail },
},
));



const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView
            style = {styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                        <Image style = {styles.drawerImage} source={require('./images/logo.png')} />
                    </View>
                    <View style={{flex:2}}>
                        <Text style = {styles.drawerHeaderText}>
                            Ristorante Con Fusion
                        </Text>
                    </View>
                </View>

                <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);



const MainNavigator = createAppContainer(createDrawerNavigator({
    Login: { 
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({tintColor}) => (
                <Icon name='sign-in' size={24} color={tintColor} type='font-awesome' /> 
            )
        }
    },
    
    Home: { 
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => (
                <Icon name='home' size={24} color={tintColor} type='font-awesome' /> 
            )
        }
    },
  
    About: { 
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',  
            drawerIcon: ({tintColor}) => (
                <Icon name='info-circle' size={24} color={tintColor} type='font-awesome' /> 
            )        
        }
    },
  
    Menu: { 
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu', 
            drawerIcon: ({tintColor}) => (
                <Icon name='list' size={24} color={tintColor} type='font-awesome' /> 
            )           
        }
    },
  
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({tintColor}) => (
                <Icon name='address-card' size={22} color={tintColor} type='font-awesome' /> 
            )
        }
    },

    Favorites: {
        screen: FavoriteNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({tintColor}) => (
                <Icon name='heart' size={22} color={tintColor} type='font-awesome' /> 
            )
        }
    },

    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({tintColor}) => (
                <Icon name='cutlery' size={24} color={tintColor} type='font-awesome' /> 
            )
        }
    },
}, {
        initialRouteName: 'Home',
        contentComponent: CustomDrawerContentComponent,
        drawerBackgroundColor: '#D1C4E9',
}));

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type,
                ToastAndroid.LONG
            )
        });    

        NetInfo.addEventListener(connectionChange => {
            this.handleConnectivityChange(connectionChange)
        });
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(connectionChange => {
            this.handleConnectivityChange(connectionChange)
        });
    }
    
    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
            case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
            case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
            case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
            default:
            break;
        }
    }

  render() {
 
    return (
        <View style={{flex:1}}> 
            <MainNavigator />
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },    
    drawerHeader: {
        backgroundColor: '#512da8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
});


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}


const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

  
export default connect(mapStateToProps, mapDispatchToProps)(Main);



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
