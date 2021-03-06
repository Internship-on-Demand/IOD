import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchStudents() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/students'
        });

        yield put({
            type: 'SET_STUDENTS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchStudents Saga', err);
    };
}

function* fetchStudentProfile(action) {
    const studentId= action.payload;
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/user/${studentId}`
        })
        yield put({
            type: 'SET_PROFILE',
            payload: response.data
        })

    } catch (err) {
        console.error('GET profile by student id', err);
    }
}

// Gets all students, but also with their access_level
function* fetchStudentsAdmin() {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/students/admin'
        });

        yield put({
            type: 'SET_STUDENTS',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchStudents Saga', err);
    };
}

// Fetches specific student
function* fetchSelectedProfile(action) {
    try {
        const response = yield axios({
            method: 'GET',
            url: `/api/students/${action.payload}`
        });
        console.log(response.data);

        yield put({
            type: 'SET_PROFILE',
            payload: response.data
        });
    } catch(err) {
        console.log('Error in fetchStudents Saga', err);
    };
}

// Edit student cohort
function* changeCohort(action) {
    try {
        yield axios({
            method: 'PUT',
            url: '/api/students',
            data: {cohort: action.payload}
        });

        yield put({
            type: 'FETCH_STUDENTS'
        });
    } catch(err) {
        console.log('Error in fetchStudents Saga', err);
    };
}


function* studentsSaga() {
    yield takeEvery('FETCH_STUDENTS', fetchStudents);
    yield takeEvery('GET_STUDENT', fetchStudentProfile);
    yield takeEvery('FETCH_STUDENTS_ADMIN', fetchStudentsAdmin);
    yield takeEvery('FETCH_SELECTED_PROFILE', fetchSelectedProfile);
    yield takeEvery('CHANGE_COHORT', changeCohort);
}




export default studentsSaga;