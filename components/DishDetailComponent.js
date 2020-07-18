import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const RenderDish = (props) => {

    const dish = props.dish;

    if(dish!=null){
        return(
            <Animatable.View animation='fadeInDown' duration= {2000} delay= {1000}>
                <Card 
                    featuredTitle={dish.name}
                    //image={require('./images/uthappizza.png')}>
                    image={{uri:baseUrl+dish.image}} 
                >
                    <Text>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <Icon 
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color= '#f50'
                            onPress ={()=>props.favorite ? console.log('Alerady') : props.onPress()}
                        >
                        </Icon>
                        <Icon 
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color= '#512da8'
                            onPress ={()=>props.onSelect()}
                        >
                        </Icon>
                    </View>
                </Card>
            </Animatable.View>
            
    )}
        else{
            return(<View></View>)
        }
}

const RenderComments = (props) => {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => (
        <View key={index} style={{margin:10}} >
            <Text style = {{fontSize:14}} >{item.comment}</Text>
            <Text style = {{fontSize:12}} >{item.rating} Stars</Text>
            <Text style = {{fontSize:12}} >{'--' + item.author +', ' + item.date}</Text>
        </View>
    );

    return(
        <Animatable.View animation='fadeInUp' duration= {2000} delay= {1000}>
            <Card title='Comments'>
                <FlatList 
                    data = {comments}
                    renderItem = {renderCommentItem}
                    keyExtractor = {item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {
    state = {
        showModal: false,
        rating: 0,
        author: '',
        comment: '',
    }

    markFavorite = (dishId) => {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Detail'
    }

    reset = () => {
        this.setState({rating: 0, author: '', comment: ''});
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    handleComment = (dishId) => {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author, this.props.comments.comments.length);
        this.reset();
    }

    render(){
        const dishId = this.props.navigation.getParam('dishId', '');

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onSelect={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }
                >
                    <View style={styles.modal}>
                        <View>
                            <Rating
                                showRating
                                fractions={0}
                                startingValue={0}
                                imageSize={40}
                                onFinishRating={(rating) => this.setState({ rating: rating })}
                            />
                        </View>

                        <View style={{marginTop: 20}}>
                            <Input
                                placeholder='Author'
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        type='font-awesome'
                                        size={24}
                                    />
                                }
                                onChangeText={(value) => this.setState({ author: value })}
                            />
                        </View>

                        <View>
                            <Input
                                placeholder="Comment"
                                leftIcon={
                                    <Icon
                                        name='comment-o'
                                        type='font-awesome'
                                        size={24}
                                    />
                                }
                                onChangeText={(value) => this.setState({ comment: value })}
                            />
                        </View>

                        <View style={{marginTop: 20}}>
                            <Button color="#512DA8"
                                title="SUBMIT"
                                onPress={() => this.handleComment(dishId)}
                            />
                        </View>

                        <View style={{marginTop: 10}}>
                            <Button onPress={() => {this.toggleModal(); this.reset()}}
                                color="#989898"
                                title="CLOSE"
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

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