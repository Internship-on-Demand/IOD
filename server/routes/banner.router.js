const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
// Cloudinary
const cloudinary = require("cloudinary").v2;
const cloudinaryUpload = require('../modules/cloudinary-config');

// allows student to change their banner on profile
router.put('/', rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
      // after the image uploads, we have access to req.file:
      console.log('nifty! req.file:', req.file)
      const bannerUrl = req.file.path;

      const sqlText =
      `
          UPDATE "students" 
          SET "banner" = $1
          WHERE "user_id" = $2
      `
      const sqlValues = [
          bannerUrl,
          req.user.id
      ];
  
      pool.query(sqlText, sqlValues)
       .then((dbres) => {
         res.sendStatus(201);
       })
       .catch((dberror) => {
         console.log('Oops you messed up DB error', dberror);
         res.sendStatus(500)
       })  
      // })
  });

module.exports = router;