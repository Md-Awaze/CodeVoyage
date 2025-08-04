const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

// Import routes
const indexRoutes = require('./routes/index');
const clientsRoutes = require('./routes/clients');
const servicesRoutes = require('./routes/services');

const whyUsRoutes = require('./routes/why-us');
const articlesRoutes = require('./routes/articles');
const careersRoutes = require('./routes/careers');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Global variables for templates
app.use((req, res, next) => {
  res.locals.currentPage = req.path;
  res.locals.baseUrl = req.protocol + '://' + req.get('host');
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/our-clients', clientsRoutes);
app.use('/our-services', servicesRoutes);

app.use('/why-us', whyUsRoutes);
app.use('/articles', articlesRoutes);
app.use('/careers', careersRoutes);
app.use('/contact-us', contactRoutes);
app.use('/contact', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Server Error',
    description: 'Something went wrong on our end. Please try again later.',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(PORT, () => {
  const serverUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
  console.log(`🚀 Server running on ${serverUrl}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💡 This is a simplified version without database connection`);
  console.log(`🔗 Visit ${serverUrl} to view the website`);
}); 