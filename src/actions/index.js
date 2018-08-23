import firebase from "firebase/app";
import 'firebase/database'
import uuidv1 from "uuid/v1"
// use axios to send PSOT/GET req
// import axios from "axios";

import { FETCH_DATA, FETCH_SINGLE } from '../actions/actionConstants'
import { firebaseConfig } from '../config'

// create firebase instance and set db ref
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export function fetchDataAC() {
    return dispatch => {
        database.ref().once('value')
            .then(snapshot => {
                
                var data = [];

                snapshot.forEach(ss => {
                    data.push(ss.val());
                });
                
                dispatch({
                    type: FETCH_DATA,
                    payload: data
                })
            })
    }
}

export function fetchSingleAC(id) {
    return dispatch => {
        // console.log("id : ", id);
        database.ref(id).once('value').then(snapshot => {
            
            dispatch({
                type: FETCH_SINGLE,
                payload: snapshot.val()
            })

        })
    }
}


export function fetchForUpdateAC(id, callback) {
    return dispatch => {
        // console.log("id : ", id);
        database.ref(id).once('value').then(snapshot => {

            dispatch({
                type: FETCH_SINGLE,
                payload: snapshot.val()
            })
                

        }).then(() => callback())
    }
}




export function uploadDataAC(values, callback) {
    const userId = uuidv1()
    values.id = userId
    firebase.database().ref(userId).set(values)
        .then(() => callback(userId))
}


export function updateAC(id, values, callback){
    
    firebase.database().ref(id).set(values)
        .then(() => callback(id))
}


export function deleteAC(id, callback){

    firebase.database().ref(id).remove()
        .then(() => callback())
}