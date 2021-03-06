const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const skillsRouter = require('./routes/skills.router');
const internshipRouter = require('./routes/internship.router');
const profileRouter = require('./routes/profile.router');
const pictureRouter = require('./routes/picture.router');
const bannerRouter = require('./routes/banner.router');
const resumeRouter = require('./routes/resume.router');
const announcementsRouter = require('./routes/announcements.router');
const studentsRouter = require('./routes/students.router');
const portfolioRouter = require('./routes/portfolio.router');
const applicationsRouter = require('./routes/applications.router');
const categoriesRouter = require('./routes/categories.router');
const logoRouter = require('./routes/logo.router');
const favoriteProjectRouter = require('./routes/favorite.project.router');
const projectRouter = require('./routes/project.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/internship', internshipRouter);
app.use('/api/profile', profileRouter);
app.use('/api/picture', pictureRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/students', studentsRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/logo', logoRouter);
app.use('/api/favoriteProject', favoriteProjectRouter);
app.use('/api/project', projectRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
