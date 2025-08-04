const express = require('express');
const router = express.Router();

// Our Services page route
router.get('/', (req, res) => {
  res.render('services', {
    title: 'Our Services - CodeVoyage',
    description: 'Comprehensive data science and IT consulting services for businesses, researchers, and organizations.',
    page: 'services',
    coreDataScienceServices: [
      {
        icon: 'fa-chart-bar',
        title: 'Statistical Data Science',
        description: 'Advanced statistical analysis and modeling for actionable insights.'
      },
      {
        icon: 'fa-poll',
        title: 'Surveys',
        description: 'Design, deployment, and analysis of surveys for research and business.'
      },
      {
        icon: 'fa-chart-line',
        title: 'Forecasting & Prediction',
        description: 'Time series forecasting and predictive analytics for future planning.'
      },
      {
        icon: 'fa-map-marked-alt',
        title: 'Spatial Analysis & Mapping',
        description: 'Geospatial data analysis, mapping, and visualization.'
      },
      {
        icon: 'fa-briefcase',
        title: 'Business & Risk Analysis',
        description: 'Risk modeling, business intelligence, and scenario analysis.'
      },
      {
        icon: 'fa-database',
        title: 'Big Data & Machine Learning',
        description: 'Machine learning, big data processing, and AI solutions.'
      },
      {
        icon: 'fa-project-diagram',
        title: 'Simulation & Optimisation',
        description: 'Simulation modeling and optimization for complex systems.'
      },
      {
        icon: 'fa-industry',
        title: 'Mining Analytics',
        description: 'Data-driven solutions for mining and resource industries.'
      },
      {
        icon: 'fa-tachometer-alt',
        title: 'Interactive Dashboards',
        description: 'Custom dashboards for real-time data visualization and decision-making.'
      }
    ],
    itConsultingServices: [
      {
        icon: 'fa-globe',
        title: 'Website Creation',
        description: 'Custom websites for small businesses, startups, and researchers. Responsive, fast, and SEO-optimized.'
      },
      {
        icon: 'fa-database',
        title: 'Data Handling Services',
        description: 'Data collection pipelines, cleaning, labeling, anonymization, secure storage, and governance.'
      }
    ]
  });
});

module.exports = router; 