const express = require('express');
const router = express.Router();

// Our Clients page route
router.get('/', (req, res) => {
  res.render('clients', {
    title: 'Tales of Transformation - Our Clients',
    description: 'Chronicles of data science success stories - discover how we\'ve helped organizations achieve the extraordinary.',
    page: 'clients',
    clients: [
      {
        name: 'TechCorp Inc.',
        industry: 'Technology',
        logo: '/images/clients/techcorp.png',
        description: 'In the digital realm where innovation meets necessity, TechCorp found themselves at a crossroads. Their customer retention rates, though respectable, held untapped potential that traditional methods could not unlock.',
        results: ['35% increase in customer retention', 'Improved customer segmentation', 'Enhanced marketing ROI'],
        story: {
          challenge: 'Facing declining customer loyalty in a competitive market',
          solution: 'Implemented predictive analytics and machine learning algorithms',
          outcome: 'Transformed customer experience and boosted retention significantly'
        }
      },
      {
        name: 'Global Retail Group',
        industry: 'Retail',
        logo: '/images/clients/global-retail.png',
        description: 'Amidst the bustling world of commerce, Global Retail Group faced the age-old challenge of inventory management. Their vast network of stores required a solution that could predict demand with uncanny accuracy.',
        results: ['25% reduction in inventory costs', 'Improved stock forecasting', 'Enhanced supply chain efficiency'],
        story: {
          challenge: 'Inefficient inventory management across multiple locations',
          solution: 'Developed AI-powered demand forecasting system',
          outcome: 'Streamlined operations and reduced waste dramatically'
        }
      },
      {
        name: 'HealthFirst Medical',
        industry: 'Healthcare',
        logo: '/images/clients/healthfirst.png',
        description: 'In the sacred halls of healing, where every decision carries the weight of human life, HealthFirst Medical sought to enhance their diagnostic capabilities through the power of artificial intelligence.',
        results: ['40% improvement in diagnostic accuracy', 'Reduced diagnosis time', 'Enhanced patient outcomes'],
        story: {
          challenge: 'Need for faster, more accurate medical diagnostics',
          solution: 'Created AI-powered diagnostic assistance tools',
          outcome: 'Improved patient care and treatment outcomes'
        }
      },
      {
        name: 'FinancePro Bank',
        industry: 'Financial Services',
        logo: '/images/clients/financepro.png',
        description: 'Within the fortress of finance, where trust and security are paramount, FinancePro Bank confronted the ever-evolving threat of financial fraud. They needed a guardian that never sleeps.',
        results: ['$2M in fraud prevention', 'Real-time transaction monitoring', 'Enhanced security protocols'],
        story: {
          challenge: 'Increasing sophisticated fraud attempts',
          solution: 'Built real-time fraud detection system',
          outcome: 'Protected millions in assets and customer trust'
        }
      }
    ]
  });
});

module.exports = router; 