import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

import Internship from '../Internship/Internship';
import './InternshipPage.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
};

function InternshipsPage() {
    
    const dispatch = useDispatch();

    const internships = useSelector((store) => store.internshipReducer);
    const user = useSelector((store) => store.user);

    const [companyName, setCompanyName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [dateRange, setDateRange] = React.useState([null, null]);

    const startDate= dateRange[0];
    const endDate = dateRange[1];

    const [open, setOpen] = React.useState(false);
    const [editOpen, editSetOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch({
            type: 'FETCH_INTERNSHIPS'
        });
    }, [])

    const handleSaveButton = () => {
        console.log(startDate)
        console.log(endDate)
        const newInternship = {
            companyName: companyName,
            subtitle: subtitle,
            logo: logo,
            startDate: startDate,
            endDate: endDate,
            description: description,
        }
        console.log(newInternship)
        dispatch({
            type: 'ADD_INTERNSHIP',
            payload: newInternship
        })
        setOpen(false)
    }; 

    return (
        <div className="container">
            <h1 id='internships-page-title'>Internships
                {user.access_level == 3 &&
                <IconButton
                    onClick={handleOpen}
                >
                    <AddIcon />
                </IconButton>
                }
            </h1>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    New Intership
                </Typography>
                
                <input 
                className="internship-input"
                placeholder="company name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                />

                <input 
                className="internship-input"
                placeholder="internship subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                />

                <input 
                className="internship-input"
                placeholder="logo picture"
                value={logo}
                onChange={(event) => setLogo(event.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="internship start date"
                        endText="internship end date"
                        value={dateRange}
                        onChange={(newValue) => {
                        setDateRange(newValue);
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

                <textarea 
                rows="5"
                className="internship-description"
                placeholder="internship description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                />
                
                <Button 
                    size="small" 
                    variant='contained' 
                    sx={{ backgroundColor: '#15B097' }}
                    onClick={handleSaveButton}
                >
                    Save
                </Button>
                
                <Button 
                    size="small" 
                    variant='contained' 
                    sx={{ backgroundColor: '#15B097' }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                </Box>
            </Modal>    

            <section id='internships-container'>
                {internships.map((internship) => {
                    return <Internship key={internship.id} internship={internship} />;
                })}
            </section>
        </div>
    );
}

export default InternshipsPage;
