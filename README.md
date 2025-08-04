# Data Science Consultancy Website

A modern, responsive web application for a data science consultancy built with Node.js, Express.js, EJS templating, and PostgreSQL.

## 🚀 Features

- **Modern Design**: Clean, professional design with responsive layout
- **Server-Side Rendering**: Fast page loads with EJS templating
- **Database Integration**: PostgreSQL with Sequelize ORM
- **Static Pages**: Complete website with all essential pages
- **Contact Forms**: Functional contact and newsletter forms
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Security**: Helmet.js for security headers
- **Performance**: Compression and optimization

## 📋 Pages

- **Home** (`/`) - Landing page with hero section and features
- **Our Clients** (`/our-clients`) - Client success stories and testimonials
- **Our Services** (`/our-services`) - Detailed service offerings

- **Why Us** (`/why-us`) - Company advantages and methodology
- **Articles** (`/articles`) - Blog posts and insights
- **Careers** (`/careers`) - Job openings and company culture
- **Contact Us** (`/contact-us`) - Contact form and information

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS with layouts
- **Database**: PostgreSQL with Sequelize ORM
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Security**: Helmet.js, express-session
- **Performance**: Compression middleware

## 📁 Project Structure

```
data-science-consultancy/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
├── README.md             # Project documentation
├── config/
│   └── database.js       # Database configuration
├── routes/
│   ├── index.js          # Home page routes
│   ├── clients.js        # Clients page routes
│   ├── services.js       # Services page routes
│   ├── people.js         # Team page routes
│   ├── why-us.js         # Why us page routes
│   ├── articles.js       # Articles page routes
│   ├── careers.js        # Careers page routes
│   └── contact.js        # Contact page routes
├── views/
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Home page template
│   ├── clients.ejs       # Clients page template
│   ├── services.ejs      # Services page template
│   ├── people.ejs        # Team page template
│   ├── why-us.ejs        # Why us page template
│   ├── articles.ejs      # Articles page template
│   ├── careers.ejs       # Careers page template
│   ├── contact.ejs       # Contact page template
│   ├── 404.ejs          # 404 error page
│   └── error.ejs        # General error page
└── public/
    ├── css/
    │   └── style.css     # Main stylesheet
    ├── js/
    │   └── main.js       # Client-side JavaScript
    └── images/           # Static images (create as needed)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-science-consultancy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your database credentials:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=data_science_consultancy
   DB_USER=postgres
   DB_PASSWORD=your_password
   SESSION_SECRET=your-super-secret-session-key
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE data_science_consultancy;
   ```

5. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the website**
   Open your browser and navigate to `http://localhost:3000`

## 🔧 Configuration

### Database Configuration

The application uses Sequelize ORM for database operations. The database configuration is in `config/database.js`.

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `SESSION_SECRET`: Session encryption key

## 📱 Features

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox layouts
- Responsive navigation
- Optimized for all screen sizes

### Interactive Elements
- Smooth scrolling navigation
- Animated counters
- Form validation and submission
- Newsletter subscription
- Back-to-top button
- Mobile menu toggle

### Performance Optimizations
- Gzip compression
- Static file serving
- Image lazy loading
- CSS and JS minification ready
- Database connection pooling

## 🎨 Customization

### Styling
- Main styles are in `public/css/style.css`
- Color scheme uses CSS custom properties
- Easy to modify colors, fonts, and layouts
- Responsive breakpoints defined

### Content
- All content is in the route files
- Easy to update text, images, and data
- Template structure is modular
- SEO meta tags included

### Adding New Pages
1. Create a new route file in `routes/`
2. Create a new template in `views/`
3. Add the route to `app.js`
4. Update navigation in `views/layout.ejs`

## 🔒 Security

- Helmet.js for security headers
- Session management with express-session
- Input validation and sanitization
- CSRF protection ready
- Environment variable protection

## 📊 Database

The application is set up with Sequelize ORM and PostgreSQL. In development mode, the database will be automatically synced with the models.

### Database Models
Currently, the application uses placeholder data. To add database models:

1. Create models in a `models/` directory
2. Import and sync models in `app.js`
3. Update routes to use database queries

## 🚀 Deployment

### Production Setup

1. **Set environment variables**
   ```bash
   NODE_ENV=production
   PORT=3000
   # ... other production variables
   ```

2. **Install production dependencies**
   ```bash
   npm install --production
   ```

3. **Start the application**
   ```bash
   npm start
   ```

### Deployment Options

- **Heroku**: Add PostgreSQL addon and deploy
- **DigitalOcean**: Use App Platform or Droplet
- **AWS**: Deploy on EC2 or use Elastic Beanstalk
- **Vercel**: Deploy as Node.js application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: hello@datascienceconsultancy.com

## 🔄 Updates

### Version 1.0.0
- Initial release
- Complete website with all pages
- Responsive design
- Database integration
- Contact forms
- Modern UI/UX

---

**Built with ❤️ for the data science community** 