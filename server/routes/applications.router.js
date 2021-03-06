const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    } = require('../modules/authentication-middleware');

// getting all the data fro the db for the applications page
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * FROM "applications"
        ORDER BY "id" ASC;
    `;

    pool.query(sqlQuery)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((dbErr) => {
        console.log('Error: ', dbErr);
        res.sendStatus(500);
    })
});

// allows admin to add new applications to the database
router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        INSERT INTO "applications" ("company", "student_name")
        VALUES ($1, $2);
    `;
    const sqlValues = [
        req.body.company,
        req.body.name
    ];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

// allows admin to edit applicatons
router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "applications"
        SET "new_notification" = false;
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

// allows admin to delete applications
router.delete('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        DELETE FROM "applications" 
        WHERE "id"=$1;
    `;
    const sqlValues = [
        req.body.id
    ];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

// Allows admin to add other admins
router.put('/add', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "user"
        SET "access_level" = 3
        WHERE "id" = $1;
    `;
    const sqlValues = [
        req.body.id
    ];

    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});

// Remove admin
router.put('/remove', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        UPDATE "user"
        SET "access_level" = 1
        WHERE "id" = $1;
    `;
    const sqlValues = [
        req.body.id
    ];
// Allows admin to remove other admins
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.error('POST friends error', dbErr);
            res.sendStatus(500);
        })
});


module.exports = router;
