const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
require('dotenv').config();
const cloudinaryUpload = require('../modules/cloudinary-config');

// grabs all data for projects for portfolio page
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
      SELECT
        "projects"."id",
        "projects"."project_name",
        "projects"."description",
        "projects"."internship_id",
        "projects"."image",
        "projects"."user_id",
        "internships"."company_name",
        "internships"."company_subtitle",
        "internships"."company_logo"
      FROM "projects"
        JOIN "internships"
          ON "projects"."internship_id" = "internships"."id"
      WHERE "projects"."user_id" = $1;
    `;
  const sqlValues = [req.user.id];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      console.log(
        `All the projects for user_id ${req.user.id} ==>`,
        dbRes.rows
      );

      // groups projects to their specific internship
      // Transform dbRes.rows array to be an object where each
      // key corresponds to a given internship, and each key's value is an
      const splitProjects = (projects) => {
        let grouped = {};
        for (let project of projects) {
          if (!grouped[project.internship_id]) {
            grouped[project.internship_id] = [];
          }
          grouped[project.internship_id].push(project);
        }
        return grouped;
      };
      // array of project objects
      const transformedProjectData = splitProjects(dbRes.rows);
      console.log("This split array", splitProjects(dbRes.rows));

      res.send(transformedProjectData);
    })
    .catch((dbErr) => {
      console.log("Error: ", dbErr);
      res.sendStatus(500);
    });
});


//  gets specific project
router.get('/specific/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
      SELECT
        "projects"."id",
        "projects"."project_name",
        "projects"."description",
        "projects"."internship_id",
        "projects"."image",
        "projects"."user_id",
        "internships"."company_name",
        "internships"."company_subtitle",
        "internships"."company_logo"
      FROM "projects"
        JOIN "internships"
          ON "projects"."internship_id" = "internships"."id"
      WHERE "projects"."user_id" = $1;
    `;
  const sqlValues = [
    req.params.id
  ];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      console.log(
        `All the projects for user_id ${req.params.id} ==>`,
        dbRes.rows
      );

      // Transform dbRes.rows array to be an object where each
      // key corresponds to a given internship, and each key's value is an
      const splitProjects = (projects) => {
        let grouped = {};
        for (let project of projects) {
          if (!grouped[project.internship_id]) {
            grouped[project.internship_id] = [];
          }
          grouped[project.internship_id].push(project);
        }
        return grouped;
      };
      // array of project objects
      const transformedProjectData = splitProjects(dbRes.rows);
      console.log("This split array", splitProjects(dbRes.rows));

      res.send(transformedProjectData);
    })
    .catch((dbErr) => {
      console.log("Error: ", dbErr);
      res.sendStatus(500);
    });
});

// gets and specified project
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT * FROM "projects"
    WHERE "id" = $1;
  `;
  const sqlValues = [req.params.id];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.log("Error: ", dbErr);
      res.sendStatus(500);
    });
});

// allows student to make a new project
router.post("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    INSERT INTO "projects" ("project_name", "description", "image", "user_id", "internship_id")
    VALUES
    ($1, $2, $3, $4, $5);
    `;
  const sqlValues = [
    req.body.title,
    req.body.description,
    req.body.image,
    req.user.id,
    req.body.internship_id,
  ];
  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("Error: ", dbErr);
      res.sendStatus(500);
    });
});

// allows student to delete their projects
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
    DELETE FROM "projects" 
        WHERE "id"=$1;
    `;
  const sqlValues = [req.params.id];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error("DELETE projects error", dbErr);
      res.sendStatus(500);
    });
});

// allows student to edit their projects
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    UPDATE "projects"
    SET
      "project_name" = $1,
      "description" = $2,
      "internship_id" = $3
    WHERE "id" = $4;
  `;
  const sqlValues = [
    req.body.name,
    req.body.description,
    req.body.internship_id,
    req.params.id,
  ];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("Error: ", dbErr);
      res.sendStatus(500);
    });
});

router.put("/image/:id", rejectUnauthenticated, cloudinaryUpload.single('image'), async (req, res) => {
  // after the image uploads, we have access to req.file:
  console.log('nifty! req.file:', req.file);
  const pictureUrl = req.file.path;

  const sqlText = `
    UPDATE "projects"
    SET "image" = $1
    WHERE "id" = $2;
  `;
  const sqlValues = [
    pictureUrl,
    req.params.id,
  ];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("Error: ", dbErr);
      res.sendStatus(500);
    });
});


module.exports = router;
