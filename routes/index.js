const express = require('express');
const router = express.Router();

// Debug route for testing static files in production
if (process.env.NODE_ENV === 'production') {
  router.get('/debug-static', (req, res) => {
    res.json({
      message: 'Static file debug route',
      environment: process.env.NODE_ENV,
      baseUrl: req.protocol + '://' + req.get('host'),
      cssPath: '/css/style.css',
      jsPath: '/js/main.js',
      imagePath: '/images/logo.png'
    });
  });

  router.get('/test-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.send(`
      /* Test CSS */
      body { 
        background-color: red !important; 
        color: white !important; 
      }
      .test-css-loaded { 
        display: block !important; 
        background: green !important; 
        padding: 20px !important; 
        margin: 20px !important; 
      }
    `);
  });
}

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'CodeVoyage - Transforming Data, Code, and Beyond',
    description: 'Leading data science consultancy helping businesses transform through advanced analytics and AI solutions.',
    page: 'home',
    hero: {
      title: 'Transform Your Business with Data Science',
      subtitle: 'We help organizations unlock the power of their data through advanced analytics, machine learning, and AI solutions.',
      cta: 'Get Started'
    },
    features: [
      {
        title: 'Advanced Analytics',
        description: 'Turn complex data into actionable insights with our cutting-edge analytics solutions.',
        icon: '📊'
      },
      {
        title: 'Machine Learning',
        description: 'Build intelligent systems that learn and adapt to your business needs.',
        icon: '🤖'
      },
      {
        title: 'AI Solutions',
        description: 'Implement AI-driven solutions that automate processes and enhance decision-making.',
        icon: '🧠'
      }
    ],
    coreDataScienceServices: [
      {
        title: 'Statistical Data Science',
        description: 'Advanced statistical analysis and modeling to uncover patterns and relationships in your data.',
        icon: '📈',
        image: '/images/services/statistical-analysis.svg'
      },
      {
        title: 'Surveys',
        description: 'Design and analyze comprehensive surveys to gather valuable insights from your target audience.',
        icon: '📋',
        image: '/images/services/surveys.svg'
      },
      {
        title: 'Forecasting and Prediction',
        description: 'Predict future trends and outcomes using sophisticated forecasting models and time series analysis.',
        icon: '🔮',
        image: '/images/services/forecasting.svg'
      },
      {
        title: 'Spatial Analysis and Mapping',
        description: 'Geospatial data analysis and interactive mapping solutions for location-based insights.',
        icon: '🗺️',
        image: '/images/services/spatial-analysis.svg'
      },
      {
        title: 'Business and Risk Analysis',
        description: 'Comprehensive business intelligence and risk assessment to support strategic decision-making.',
        icon: '⚖️',
        image: '/images/services/business-analysis.svg'
      },
      {
        title: 'Big Data and Machine Learning',
        description: 'Scalable big data processing and advanced machine learning algorithms for complex datasets.',
        icon: '🤖',
        image: '/images/services/machine-learning.svg'
      },
      {
        title: 'Simulation and Optimisation',
        description: 'Computer simulations and optimization techniques to improve processes and performance.',
        icon: '⚙️',
        image: '/images/services/simulation.svg'
      },
      {
        title: 'Mining Analytics',
        description: 'Specialized analytics for mining operations, including predictive maintenance and resource optimization.',
        icon: '⛏️',
        image: '/images/services/mining-analytics.svg'
      },
      {
        title: 'Interactive Dashboards',
        description: 'Real-time interactive dashboards and data visualization tools for better insights.',
        icon: '📊',
        image: '/images/services/dashboards.svg'
      }
    ],
    itConsultingServices: [
      {
        title: 'Website Creation',
        description: 'Custom websites for startups and researchers with modern design and functionality.',
        icon: '🌐',
        image: '/images/services/website-creation.svg'
      },
      {
        title: 'Data Handling Services',
        description: 'Comprehensive data collection, cleaning, storage, labeling, and governance solutions.',
        icon: '🗄️',
        image: '/images/services/data-handling.svg'
      }
    ]
  });
});

module.exports = router; 