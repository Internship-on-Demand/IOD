import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchInternships(action) {
    try {
        // Make an axios request to the server for tasks
        const response = yield axios({
            method: 'GET',
            url: '/api/internship'
        })
        // Update the internships
        console.log(response.data)
        yield put({
            type: 'SET_INTERNSHIPS',
            payload: response.data
        });
    } catch(err) {
        console.error('GET error: ', err);
    }
}

function* addInternship(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/internship',
            data: action.payload
        })
        yield put({
            type: 'FETCH_INTERNSHIPS'
        })
    } catch (err) {
        console.log('POST internship error:', err);
    }
}

function* deleteInternship(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url: `/api/internship/${action.payload}`,
        })
        yield put({
            type: 'FETCH_INTERNSHIPS'
        })
    } catch (error) {
        console.log('DELETE internship error', error);
    }
}

function* editInternship(action) {
    try {
        yield axios({
            method: 'PUT',
            url: `/api/internship/${action.payload.id}`,
            data: action.payload
        })
        yield put({
            type: 'FETCH_INTERNSHIPS'
        })
    }   catch (error) {
        console.log(error)
    }
}

function* fetchSingleInternship(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/internship/${action.payload}`,
        })
        yield put ({
            type: 'SET_INTERNSHIP_TO_EDIT',
            payload: response.data
        })
    }   catch (error) {
        console.log(error)
    }
}

function* internshipSaga() {
    yield takeLatest('FETCH_INTERNSHIPS', fetchInternships);
    yield takeLatest('ADD_INTERNSHIP', addInternship);
    yield takeLatest('DELETE_INTERNSHIP', deleteInternship);
    yield takeEvery('EDIT_INTERNSHIP', editInternship);
    yield takeLatest('FETCH_SINGLE_INTERNSHIP', fetchSingleInternship);
}

export default internshipSaga;
