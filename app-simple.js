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

// Security middleware with production-ready CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
      objectSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
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

// Static files middleware - serve from 'public' directory
// This must come BEFORE any route-specific middleware
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Set proper MIME types for different file types
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.gif') || path.endsWith('.ico')) {
      res.setHeader('Content-Type', `image/${path.split('.').pop()}`);
    }
    
    // Set cache headers for production
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// Debug middleware for static files (development only)
if (process.env.NODE_ENV === 'development') {
  app.use('/css', (req, res, next) => {
    console.log(`📁 CSS Request: ${req.path}`);
    next();
  });
  app.use('/js', (req, res, next) => {
    console.log(`📁 JS Request: ${req.path}`);
    next();
  });
  app.use('/images', (req, res, next) => {
    console.log(`📁 Image Request: ${req.path}`);
    next();
  });
}

// Global variables for templates
app.use((req, res, next) => {
  res.locals.currentPage = req.path;
  res.locals.baseUrl = req.protocol + '://' + req.get('host');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
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
  console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
  console.log(`🎨 CSS files available at: ${serverUrl}/css/`);
  console.log(`🖼️ Images available at: ${serverUrl}/images/`);
  console.log(`📜 JS files available at: ${serverUrl}/js/`);
}); 