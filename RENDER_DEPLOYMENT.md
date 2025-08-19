# Render Deployment Guide - Updated

## Recent Fixes Applied

### 1. Static File Serving Issues Fixed
- **Problem**: CSS, JS, and image files were returning 404 errors on Render
- **Solution**: Updated static file middleware configuration in both `app.js` and `app-simple.js`
- **Changes Made**:
  - Added proper MIME type headers for CSS, JS, and image files
  - Reordered middleware to ensure static files are served before route-specific middleware
  - Improved Content Security Policy (CSP) headers
  - Added proper cache headers for production

### 2. Layout Optimization
- **Problem**: All CSS and JS files were being loaded on every page
- **Solution**: Implemented conditional loading of page-specific files
- **Changes Made**:
  - Updated `views/layout.ejs` to use `additionalCSS` and `additionalJS` arrays
  - Modified route files to specify which files each page needs
  - Removed cache-busting query parameters that were causing issues

### 3. File Structure Verification
All required files are present in the correct locations:
```
public/
├── css/
│   ├── style.css
│   ├── contact.css
│   ├── vintage-articles.css
│   └── vintage-clients.css
├── js/
│   ├── main.js
│   ├── contact.js
│   ├── contact-form.js
│   ├── vintage-articles.js
│   ├── vintage-clients.js
│   ├── services-modal.js
│   └── cardFlip.js
└── images/
    ├── logo.png
    ├── favicon.ico
    └── services/
        └── [all service images]
```

## Deployment Steps

### 1. Environment Variables
Set these environment variables in your Render dashboard:

```bash
NODE_ENV=production
PORT=10000
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
BASE_URL=https://your-app-name.onrender.com
```

### 2. Build Command
```bash
npm install
```

### 3. Start Command
```bash
npm start
```

### 4. Health Check
Add a health check endpoint to your app:

```javascript
// Add this to your app.js
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});
```

## Testing Your Deployment

### 1. Static File Test
Visit these URLs to verify static files are loading:
- `https://your-app.onrender.com/css/style.css`
- `https://your-app.onrender.com/js/main.js`
- `https://your-app.onrender.com/images/logo.png`

### 2. Page Load Test
- Homepage: `https://your-app.onrender.com/`
- Clients: `https://your-app.onrender.com/our-clients`
- Articles: `https://your-app.onrender.com/articles`
- Contact: `https://your-app.onrender.com/contact-us`

### 3. Debug Routes
The app includes debug routes for testing:
- `/debug-static` - Test static file configuration
- `/test-page` - Comprehensive test page
- `/health` - Health check endpoint

## Common Issues and Solutions

### Issue: Static files still returning 404
**Solution**: 
1. Verify the `public` folder is included in your Git repository
2. Check that the build command completes successfully
3. Ensure the start command is `npm start` (not `npm run dev`)

### Issue: MIME type errors for JavaScript files
**Solution**: The updated static file middleware now sets proper MIME types automatically.

### Issue: CSS not loading properly
**Solution**: The layout now loads only necessary CSS files per page, reducing conflicts.

## Performance Optimizations

1. **Static File Caching**: Files are cached for 24 hours in production
2. **Compression**: Gzip compression is enabled
3. **Conditional Loading**: Only necessary files are loaded per page
4. **Proper Headers**: Cache and MIME type headers are set correctly

## Monitoring

Monitor your deployment using:
- Render dashboard logs
- Browser developer tools (Network tab)
- Console logs for any remaining issues

## Support

If you continue to experience issues:
1. Check the Render logs for any error messages
2. Verify all environment variables are set correctly
3. Test the debug routes to isolate the problem
4. Ensure your Git repository includes all necessary files 