const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

// Import database configuration
const { sequelize } = require('./config/database');

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
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
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
const publicPath = path.join(__dirname, 'public');
console.log('📁 Static files path:', publicPath);
console.log('📁 Static files exist:', require('fs').existsSync(publicPath));

app.use(express.static(publicPath, {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    console.log('📁 Serving static file:', filePath);
    // Set proper MIME types for different file types
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.gif') || filePath.endsWith('.ico')) {
      res.setHeader('Content-Type', `image/${filePath.split('.').pop()}`);
    }
    
    // Set cache headers for production
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

// Add explicit routes for static files as fallback
app.get('/css/:file', (req, res) => {
  const fileName = decodeURIComponent(req.params.file);
  const filePath = path.join(__dirname, 'public', 'css', fileName);
  console.log('📁 CSS fallback route:', filePath);
  if (require('fs').existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(filePath);
  } else {
    console.log('❌ CSS file not found:', filePath);
    res.status(404).send('CSS file not found');
  }
});

app.get('/js/:file', (req, res) => {
  const fileName = decodeURIComponent(req.params.file);
  const filePath = path.join(__dirname, 'public', 'js', fileName);
  console.log('📁 JS fallback route:', filePath);
  if (require('fs').existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(filePath);
  } else {
    console.log('❌ JS file not found:', filePath);
    res.status(404).send('JS file not found');
  }
});

app.get('/images/:file', (req, res) => {
  const fileName = decodeURIComponent(req.params.file);
  const filePath = path.join(__dirname, 'public', 'images', fileName);
  console.log('📁 Image fallback route:', filePath);
  if (require('fs').existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.log('❌ Image file not found:', filePath);
    res.status(404).send('Image file not found');
  }
});

app.get('/images/services/:file', (req, res) => {
  const fileName = decodeURIComponent(req.params.file);
  const filePath = path.join(__dirname, 'public', 'images', 'services', fileName);
  console.log('📁 Service image fallback route:', filePath);
  if (require('fs').existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    console.log('❌ Service image file not found:', filePath);
    res.status(404).send('Service image file not found');
  }
});

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

// Debug route to list static files
app.get('/debug-files', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  
  const publicPath = path.join(__dirname, 'public');
  const files = {};
  
  try {
    // List CSS files
    const cssPath = path.join(publicPath, 'css');
    if (fs.existsSync(cssPath)) {
      files.css = fs.readdirSync(cssPath);
    }
    
    // List JS files
    const jsPath = path.join(publicPath, 'js');
    if (fs.existsSync(jsPath)) {
      files.js = fs.readdirSync(jsPath);
    }
    
    // List image files
    const imagesPath = path.join(publicPath, 'images');
    if (fs.existsSync(imagesPath)) {
      files.images = fs.readdirSync(imagesPath);
      
      // List service images
      const servicesPath = path.join(imagesPath, 'services');
      if (fs.existsSync(servicesPath)) {
        files.services = fs.readdirSync(servicesPath);
      }
    }
    
    res.json({
      publicPath,
      publicPathExists: fs.existsSync(publicPath),
      files
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      publicPath,
      publicPathExists: fs.existsSync(publicPath)
    });
  }
});

// Routes
app.use('/', indexRoutes);
app.use('/our-clients', clientsRoutes);
app.use('/our-services', servicesRoutes);
app.use('/why-us', whyUsRoutes);
app.use('/articles', articlesRoutes);
app.use('/careers', careersRoutes);
app.use('/contact-us', contactRoutes);

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

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync database models (in development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synchronized.');
    }
    
    // Start server
    app.listen(PORT, () => {
      const serverUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
      console.log(`🚀 Server running on ${serverUrl}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
      console.log(`🎨 CSS files available at: ${serverUrl}/css/`);
      console.log(`🖼️ Images available at: ${serverUrl}/images/`);
      console.log(`📜 JS files available at: ${serverUrl}/js/`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer(); 