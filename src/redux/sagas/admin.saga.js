import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// get applications from database
function* fetchApplications(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/applications'
        })
        
        console.log(response.data);
        yield put({
            type: 'SET_APPLICATIONS',
            payload: response.data
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}
// creating new applications to be stored in database
function* sendApplication(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/applications',
            data: {company: action.payload.company, name: action.payload.name}
        })
        
        yield put({
            type: 'FETCH_APPLICATIONS'
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

// allows admin to delete notifications
function* removeNotification(action) {
    try {
        yield axios({
            method: 'DELETE',
            url: '/api/applications',
            data: {id: action.payload}
        })

        yield put({
            type: 'FETCH_APPLICATIONS'
        })
    } catch (error) {
        console.log('DELETE internship error', error);
    }
}

function* seenNotification(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/applications'
        })
    }   catch (error) {
        console.log(error)
    }
}

// Makes user an admin
function* addAdmin(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/applications/add',
            data: {id: action.payload}
        })

        yield put({
            type: 'FETCH_STUDENTS_ADMIN'
        })
    }   catch (error) {
        console.log(error)
    }
}

// Removes admin from a user
function* removeAdmin(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/applications/remove',
            data: {id: action.payload}
        })

        yield put({
            type: 'FETCH_STUDENTS_ADMIN'
        })
    }   catch (error) {
        console.log(error)
    }
}


function* adminSaga() {
    yield takeLatest('FETCH_APPLICATIONS', fetchApplications);
    yield takeLatest('SEND_APPLICATION', sendApplication);
    yield takeLatest('REMOVE_NOTIFICATION', removeNotification);
    yield takeLatest('SEEN_NOTIFICATION', seenNotification);
    yield takeLatest('ADD_ADMIN', addAdmin);
    yield takeLatest('REMOVE_ADMIN', removeAdmin);
}

export default adminSaga;
