import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Internship from '../Internship/Internship';

function InternshipsPage() {
    const dispatch = useDispatch();

    const internships = useSelector((store) => store.internshipReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_INTERNSHIPS'
        });
    }, [])

    return (
        <div className="container">
            <h1 id='internships-page-title'>Internships</h1>
            <section id='internships-container'>
                {internships.map((internship) => {
                    return <Internship key={internship.id} internship={internship} />;
                })}
            </section>
        </div>
    );
}

export default InternshipsPage;