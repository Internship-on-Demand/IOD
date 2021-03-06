import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import "./EditInternship.css";

// for editing the internships
function EditInternship() {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    // grab the chosen internship to edit from reducer
    const editInternshipReducer = useSelector(store => store.editInternship)

    // fill reducer with the single internship to edit
    useEffect(() => {
        dispatch({
            type: 'FETCH_SINGLE_INTERNSHIP',
            payload: params.id
        })
    }, [params.id]);

    // All below are handling the ability to edit the data of the internship
    const handleNameChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_NAME',
            payload: e.target.value
        })
    }
    
    const handleSubtitleChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_SUBTITLE',
            payload: e.target.value
        })
    }

    const handleDescriptionChange = (e) => {
        dispatch({
            type: 'EDIT_INTERNSHIP_DESCRIPTION',
            payload: e.target.value
        })
    }

    const handleDateChange = (newValues) => {
        let startDate = newValues[0];
        let endDate = newValues[1];
        dispatch({
            type: 'EDIT_INTERNSHIP_START_DATE',
            payload: startDate
        });
        dispatch({
            type: 'EDIT_INTERNSHIP_END_DATE',
            payload: endDate
        });
    }

    // what happens when finalizing the edit
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = editInternshipReducer.id;
        const name = editInternshipReducer.name;
        const subtitle = editInternshipReducer.subtitle;
        const description = editInternshipReducer.description;
        const startDate = editInternshipReducer.start_date;
        const endDate = editInternshipReducer.end_date;

        const editedInternship = {
            id,
            name,
            subtitle,
            description,
            startDate,
            endDate,
        }

        // send off the data with the newly edited internship
        dispatch({
            type: 'EDIT_INTERNSHIP',
            payload: {
                id: params.id,
                payload: editedInternship
            }
        })
        // go back to internships page
        history.push(`/internships`)
    }

    // what happens when the back button is pressed
    const handleBack = (e) => {
        e.preventDefault();
        history.push(`/internships`)
    }

    return (
        <div className="container">
            <center>
                <form className="edit-internship" onSubmit={handleSubmit}>
                    <h3 className="internship-title">Edit Internship</h3>
                    <img className="login-gradient" src="gradient_bar.png" draggable={false} />

                    <input 
                        className="internship-edit-input"
                        value={editInternshipReducer.name|| ""}
                        onChange={handleNameChange}
                    />
                    
                    <input 
                        className="internship-edit-input"
                        value={editInternshipReducer.subtitle|| ""}
                        onChange={handleSubtitleChange}
                    />         

                    <textarea 
                        rows="8"
                        className="internship-edit-description"
                        value={editInternshipReducer.description|| ""}
                        onChange={handleDescriptionChange}
                    />  

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                startText="Start Date"
                                endText="End Date"
                                value={[editInternshipReducer.start_date, editInternshipReducer.end_date] || [null, null]}
                                onChange={(newValues) => {
                                    handleDateChange(newValues);
                                }}
                                renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                                )}
                            />
                    </LocalizationProvider>
                    
                    <div className='edit-internship-btn-container'>
                        <IconButton type='submit'>
                                <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    </div>
                </form>
            </center>
        </div>
    );
}

export default EditInternship;
