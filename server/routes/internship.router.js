const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = 
    `
        SELECT * FROM "internships"
    `;

    pool.query(sqlText)
        .then((dbres) => res.send(dbres.rows[0]))
        .catch((dberror) => {
        console.log('Oops you messed up DB error', dberror);
        res.sendStatus(500)
    })  
});

router.post('/', rejectUnauthenticated, (req, res) => {
    
    const sqlQuery =`INSERT INTO "internships" ("company_name", "company_subtitle", "start_date", "end_date", "company_logo", "company_description")
        VALUES ($1, $2, $3, $4, $5, $6);`
    const sqlValues = [
        req.body.companyName,
        req.body.subtitle,
        req.body.startDate,
        req.body.endDate,
        req.user.logo,
        req.body.description
    ];
    
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST internship error', dbErr);
            res.sendStatus(500);
        })
});

// router.post('/', rejectUnauthenticated, (req, res) => {
//     const sqlText =`INSERT INTO "tasks" ("name", "description", "difficulty", "user_id")
//       VALUES ($1, $2, $3, $4);`
//     const sqlValues = [
//         req.body.name,
//         req.body.description,
//         req.body.difficulty,
//         req.user.id
//     ];

//      pool.query(sqlText, sqlValues)
//       .then((dbres) => res.sendStatus(201))
//       .catch((dberror) => {
//         console.log('Opps you messed up DB error', dberror);
//         res.sendStatus(500)
//       })   
//     // endpoint functionality
//   });

module.exports = router;