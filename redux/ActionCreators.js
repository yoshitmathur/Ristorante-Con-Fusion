import * as ActionTypes from './ActionTypes';
import baseUrl from '../shared/baseUrl'
import { comments } from './comments';
import { dishes } from './dishes';

//comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok){
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => { response.json })
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



//dishes 
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok){
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => { response.json })
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING 
})

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
 



//leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok){
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => { response.json })
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING 
})

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_DISHES,
    payload: leaders
});




//promotions
export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok){
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => { response.json })
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)))
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOS_LOADING 
})

export const promotionsFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
});

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});