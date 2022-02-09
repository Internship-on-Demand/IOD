import React from 'react';
import './AdminPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

function AdminPage() {
    const dispatch = useDispatch();

    const applications = useSelector((store) => store.applicationsReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_APPLICATIONS'
        });
    }, [])

    return (
      <div className="container admin-page">
          <Grid container spacing={2}>
                <Grid item sm={5} className="admin-alerts-container">
                    <center>
                        <h2>Internship Applications</h2>
                    </center>
                    {applications.map((application) => {
                        return (
                            <div key={application.id}>
                                {application.new_notification ?
                                    <p className='new-notification'>
                                        - <span className='application-name move-right'>{application.student_name}</span> has applied at <span className='application-company'>{application.company}</span>
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </p>
                                :
                                    <p>
                                        - <span className='application-name'>{application.student_name}</span> has applied at <span className='application-company'>{application.company}</span>
                                        <IconButton>
                                            <ClearIcon />
                                        </IconButton>
                                    </p>
                                }
                            </div>
                        );
                    })}
                </Grid>
          </Grid>
      </div>
    );
}

export default AdminPage;
