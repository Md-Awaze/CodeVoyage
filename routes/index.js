const express = require('express');
const router = express.Router();

// Debug route for testing static files
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

router.get('/debug-main', (req, res) => {
  res.render('index', {
    title: 'CodeVoyage - Debug Main Page',
    description: 'Debug version of the main page',
    page: 'home',
    hero: {
      title: 'Transform Your Business with Data Science',
      subtitle: 'We help organizations unlock the power of their data through advanced analytics, machine learning, and AI solutions.',
      cta: 'Get Started'
    },
    coreDataScienceServices: [
      {
        title: 'Statistical Data Science',
        description: 'Advanced statistical analysis and modeling to uncover patterns and relationships in your data.',
        icon: '📈',
        image: '/images/services/statistical-analysis.svg'
      }
    ],
    itConsultingServices: [
      {
        title: 'Website Creation',
        description: 'Custom websites for startups and researchers with modern design and functionality.',
        icon: '🌐',
        image: '/images/services/website-creation.svg'
      }
    ]
  });
});

router.get('/test-page', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Debug Test Page</title>
      <link rel="stylesheet" href="/css/style.css">
      <style>
        .test-container {
          max-width: 800px;
          margin: 50px auto;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .test-button {
          background: white;
          color: #667eea;
          padding: 15px 30px;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          cursor: pointer;
          margin: 10px;
          transition: all 0.3s ease;
        }
        .test-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .status {
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          font-weight: bold;
        }
        .status.success { background: #4CAF50; }
        .status.error { background: #f44336; }
        .status.info { background: #2196F3; }
      </style>
    </head>
    <body>
      <div class="test-container">
        <h1 style="text-align: center; margin-bottom: 30px;">🔧 Debug Test Page</h1>
        
        <div class="status success">
          ✅ Server is running on http://localhost:3000
        </div>
        
        <div class="status info">
          📁 Static files are being served from /public directory
        </div>
        
        <div class="status success">
          🎨 CSS is loaded (if you see this styled, CSS is working)
        </div>
        
        <div class="status success">
          🖼️ Images are working (logo should appear below)
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="/images/logo.png" alt="CodeVoyage Logo" style="max-width: 200px; border-radius: 10px;">
        </div>
        
        <div class="status info">
          📜 JavaScript is working (check console for messages)
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <button class="test-button" onclick="testJavaScript()">Test JavaScript</button>
          <button class="test-button" onclick="testCSS()">Test CSS</button>
        </div>
        
        <div id="test-results" style="margin-top: 20px;"></div>
      </div>
      
      <script src="/js/main.js"></script>
      <script>
        console.log('✅ JavaScript is working!');
        console.log('✅ Main.js loaded successfully');
        
        function testJavaScript() {
          const results = document.getElementById('test-results');
          results.innerHTML = '<div class="status success">✅ JavaScript is working! Button click detected.</div>';
        }
        
        function testCSS() {
          const results = document.getElementById('test-results');
          results.innerHTML = '<div class="status success">✅ CSS is working! Styles are being applied.</div>';
        }
        
        // Test if main.js functions are available
        if (typeof document.addEventListener === 'function') {
          console.log('✅ DOM methods are available');
        }
        
        // Test if external CSS is loaded
        const styleSheets = document.styleSheets;
        console.log('📊 Number of stylesheets loaded:', styleSheets.length);
        for (let i = 0; i < styleSheets.length; i++) {
          try {
            console.log('📄 Stylesheet', i, ':', styleSheets[i].href);
          } catch (e) {
            console.log('📄 Stylesheet', i, ': (CORS restricted)');
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Home page route
router.get('/', (req, res) => {
  res.render('index', {
    title: 'CodeVoyage - Transforming Data, Code, and Beyond',
    description: 'Leading data science consultancy helping businesses transform through advanced analytics and AI solutions.',
    page: 'home',
    additionalCSS: ['contact.css'],
    additionalJS: ['services-modal.js', 'cardFlip.js'],
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