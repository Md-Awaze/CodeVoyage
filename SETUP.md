# Quick Setup Guide

## 🚀 Immediate Testing (No Database Required)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application (simplified version):**
   ```bash
   npm run simple
   ```

3. **Access the website:**
   Open your browser and go to `http://localhost:3000`

## 📋 Available Pages

- **Home**: `http://localhost:3000/`
- **Our Clients**: `http://localhost:3000/our-clients`
- **Our Services**: `http://localhost:3000/our-services`

- **Why Us**: `http://localhost:3000/why-us`
- **Articles**: `http://localhost:3000/articles`
- **Careers**: `http://localhost:3000/careers`
- **Contact Us**: `http://localhost:3000/contact-us`

## 🗄️ Full Setup with Database

1. **Install PostgreSQL** (if not already installed)

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Create database:**
   ```bash
   npm run setup-db
   ```

4. **Start with database:**
   ```bash
   npm run dev
   ```

## 🎨 Features Included

✅ **Complete Website Structure**
- 8 static pages with professional content
- Responsive design for all devices
- Modern UI with animations and interactions

✅ **Technical Implementation**
- Express.js server with proper routing
- EJS templating with layouts
- PostgreSQL database integration (optional)
- Security middleware (Helmet.js)
- Performance optimization (compression)

✅ **Interactive Elements**
- Contact forms with validation
- Newsletter subscription
- Mobile navigation
- Smooth scrolling
- Animated counters
- Back-to-top button

✅ **Professional Design**
- Modern gradient backgrounds
- Card-based layouts
- Professional typography
- Consistent branding
- SEO-friendly structure

## 🔧 Customization

### Content Updates
- Edit route files in `/routes/` to update page content
- Modify templates in `/views/` for layout changes
- Update styles in `/public/css/style.css`

### Adding New Pages
1. Create route file in `/routes/`
2. Create template in `/views/`
3. Add route to `app.js`
4. Update navigation in `views/layout.ejs`

### Database Integration
- Create models in `/models/` directory
- Import models in `app.js`
- Update routes to use database queries

## 🚀 Deployment Options

### Heroku
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### DigitalOcean App Platform
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### Vercel
```bash
npm install -g vercel
vercel
```

## 📱 Mobile Responsive

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security Features

- Helmet.js for security headers
- Session management
- Input validation
- Environment variable protection
- CSRF protection ready

## 📊 Performance

- Gzip compression enabled
- Static file serving optimized
- Database connection pooling
- Image lazy loading
- CSS/JS minification ready

---

**Ready to use! The application is running on http://localhost:3000** 