import React, {Component} from 'react';
import { Text, View, StyleSheet, Picker, Switch, Button, ScrollView, Modal, Alert, Platform } from 'react-native'
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import {Notifications} from 'expo';

class Reservation extends Component {
    state = {
        guests: 1,
        smoking: false,
        date: '',
        showModal: false
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    reset() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
        });
    }

    handleReservation = () => {
        console.log(JSON.stringify(this.state));
        // this.toggleModal(); 
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? ' + this.state.smoking + '\nDate and Time: ' + this.state.date,
            [
                { 
                    text: 'Cancel', 
                    onPress: () => this.reset(), 
                    style: 'cancel' 
                },
                {
                    text: 'OK', onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.reset();
                    }
                },
            ],
            { cancelable: false }
        );         
    }

    resetForm =() => {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    obtainNotificationPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== 'granted')
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted')
                Alert.alert('Permission not granted to show notifications');
        return permission
    }

    presentLocalNotification = async (date) => {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512da8'
            }
        });
    }

    obtainCalendarPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if(permission.status !== 'granted')
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if(permission.status !== 'granted')
                Alert.alert('Permission not granted to show notifications');
        return permission
    }

    addReservationToCalendar = async (date) => {
        await this.obtainCalendarPermission();

        let date1 = Date.parse(date);
        let startDate = new Date(date1);
        let endDate = new Date(Date.parse(startDate) + 2*60*60*1000);

        // console.log(date1, startDate, endDate);

        const defaultCalendarSource = Platform.OS === 'ios' ? await getDefaultCalendarSource() : 
                                      { isLocalAccount: true, name: 'Expo Calendar' };

        let details = {            
            title: 'Con Fusion Table Reservation',            
            source: defaultCalendarSource,            
            name: 'internalCalendarName',            
            color: 'blue',            
            entityType: Calendar.EntityTypes.EVENT,            
            sourceId: defaultCalendarSource.id,            
            ownerAccount: 'personal',            
            accessLevel: Calendar.CalendarAccessLevel.OWNER,    
        }



  const calendarId = await Calendar.createCalendarAsync(details);

        Calendar.createEventAsync(calendarId, {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });

    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation='zoomIn' >
                    <View style = {styles.formRow} >
                        <Text style = {styles.formLabel} >Number of Guests</Text>
                        <Picker 
                            style = {styles.formItem}
                            selectedValue = {this.state.guests}
                            onValueChange = {(itemValue, itemIndex) => this.setState({guests: itemValue})}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>

                    <View style = {styles.formRow} >
                        <Text style = {styles.formLabel} >Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512da8'
                            onValueChange={(value)=>this.setState({smoking: value})}    
                        >
                        </Switch>
                    </View>

                    <View style = {styles.formRow} >
                        <Text style = {styles.formLabel} >Date and Time</Text>
                        <DatePicker
                            style = {{flex: 2, margin: 20}}
                            date = {this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2020-07-16'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }} 
                            onDateChange={(date)=>{this.setState({date: date})}}   
                        />
                    </View>

                    <View style = {styles.formRow} >
                        <Button
                            title='RESERVE'
                            color='#512da8'
                            onPress={()=>this.handleReservation()}
                            accessibilityLabel='learn more'
                        />
                    </View>

                </Animatable.View>
                
                {/* <Modal 
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }
                >
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal> */}
            </ScrollView>
        );
    }
}

export default Reservation;

const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: '#512da8',
        textAlign: "center",
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});