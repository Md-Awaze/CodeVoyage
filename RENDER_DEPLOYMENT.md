# Render Deployment Guide

This guide will help you deploy your Data Science Consultancy website to Render with PostgreSQL database.

## 🚀 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **PostgreSQL Database**: We'll create this on Render

## 📋 Step-by-Step Deployment

### Step 1: Create PostgreSQL Database on Render

1. **Log into Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Sign in with your account

2. **Create New PostgreSQL Database**
   - Click "New +" button
   - Select "PostgreSQL"
   - Choose a name (e.g., `data-science-consultancy-db`)
   - Select your preferred region
   - Choose a plan (Free tier available for development)
   - Click "Create Database"

3. **Get Database Credentials**
   - Once created, click on your database
   - Go to "Connections" tab
   - Note down the following information:
     - **Host**: `your-db-name.render.com`
     - **Port**: Usually `5432`
     - **Database**: `your-db-name`
     - **Username**: `your-db-name`
     - **Password**: Copy the password

### Step 2: Create Web Service

1. **Connect GitHub Repository**
   - In Render dashboard, click "New +"
   - Select "Web Service"
   - Connect your GitHub account
   - Select your repository

2. **Configure Web Service**
   - **Name**: `data-science-consultancy` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose your preferred plan

3. **Add Environment Variables**
   - Go to "Environment" tab
   - Add the following variables:

```env
NODE_ENV=production
PORT=10000
SESSION_SECRET=your-super-secret-production-key

# Database Configuration (from your PostgreSQL service)
PGHOST=your-db-name.render.com
PGPORT=5432
PGDATABASE=your-db-name
PGUSER=your-db-name
PGPASSWORD=your-database-password

# Email Configuration (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Base URL (will be your Render app URL)
BASE_URL=https://your-app-name.onrender.com
```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application

## 🔧 Configuration Details

### Database Configuration

The application is now configured to work with Render PostgreSQL:

- **SSL Required**: All connections use SSL for security
- **Environment Variables**: Uses standard PostgreSQL environment variables
- **Connection Pooling**: Optimized for production use
- **Fallback Handling**: Graceful handling when database is unavailable

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PGHOST` | PostgreSQL host | `your-db-name.render.com` |
| `PGPORT` | PostgreSQL port | `5432` |
| `PGDATABASE` | Database name | `your-db-name` |
| `PGUSER` | Database username | `your-db-name` |
| `PGPASSWORD` | Database password | `auto-generated` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Application port | `10000` (Render default) |
| `SESSION_SECRET` | Session encryption | `your-secret-key` |

## 🚀 Testing Your Deployment

1. **Check Application Status**
   - Go to your web service dashboard
   - Verify status is "Live"
   - Check logs for any errors

2. **Test Database Connection**
   - Visit your application URL
   - Try submitting a contact form
   - Check logs for database connection success

3. **Verify All Pages**
   - Home page: `/`
   - Services: `/our-services`
   - Contact: `/contact-us`
   - Articles: `/articles`
   - Careers: `/careers`

## 🔒 Security Features

✅ **SSL Encryption**: All database connections use SSL  
✅ **Environment Variables**: No hardcoded credentials  
✅ **Helmet.js**: Security headers enabled  
✅ **Session Management**: Secure session handling  
✅ **Input Validation**: Form validation and sanitization  

## 📊 Monitoring

### Render Dashboard
- **Logs**: Real-time application logs
- **Metrics**: Performance and usage statistics
- **Alerts**: Automatic error notifications

### Database Monitoring
- **Connection Status**: Monitor database connectivity
- **Query Performance**: Track slow queries
- **Storage Usage**: Monitor database size

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify environment variables are correct
   - Check if database is running
   - Ensure SSL configuration is correct

2. **Application Won't Start**
   - Check build logs for errors
   - Verify all dependencies are installed
   - Ensure start command is correct

3. **Environment Variables Not Set**
   - Double-check variable names (case-sensitive)
   - Ensure no extra spaces in values
   - Redeploy after adding variables

### Debug Commands

```bash
# Check application logs
# Use Render dashboard or:
curl -s https://your-app.onrender.com

# Test database connection
# Check logs for database connection messages
```

## 🔄 Updates and Maintenance

### Updating Your Application
1. Push changes to your GitHub repository
2. Render will automatically redeploy
3. Monitor deployment logs for any issues

### Database Backups
- Render automatically handles PostgreSQL backups
- Backups are retained based on your plan
- Manual backups available through dashboard

## 📞 Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **PostgreSQL on Render**: [render.com/docs/postgresql](https://render.com/docs/postgresql)
- **Community**: [render.com/community](https://render.com/community)

---

🎉 **Congratulations!** Your Data Science Consultancy website is now deployed on Render with a secure PostgreSQL database. 