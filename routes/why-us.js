const express = require('express');
const router = express.Router();

// Why Us page route
router.get('/', (req, res) => {
  res.render('why-us', {
    title: 'Why Choose Us - CodeVoyage',
    description: 'Discover what makes us the leading choice for data science consulting and solutions.',
    page: 'why-us',
    advantages: [
      {
        title: 'Proven Track Record',
        description: 'Over 150 successful projects across diverse industries with measurable ROI.',
        icon: '🏆',
        details: [
          '95% client satisfaction rate',
          'Average 300% ROI for clients',
          '150+ projects completed',
          '10+ years of experience'
        ]
      },
      {
        title: 'Expert Team',
        description: 'World-class data scientists and engineers with advanced degrees from top universities.',
        icon: '👥',
        details: [
          '8 PhD holders on staff',
          'Average 12 years experience',
          'Former Google, Microsoft, McKinsey',
          'Continuous learning culture'
        ]
      },
      {
        title: 'End-to-End Solutions',
        description: 'Complete data science lifecycle from strategy to implementation and maintenance.',
        icon: '🔄',
        details: [
          'Strategy development',
          'Data engineering',
          'Model development',
          'Deployment & monitoring'
        ]
      },
      {
        title: 'Cutting-Edge Technology',
        description: 'Stay ahead with the latest tools, frameworks, and methodologies in data science.',
        icon: '⚡',
        details: [
          'Latest ML frameworks',
          'Cloud-native solutions',
          'Real-time processing',
          'Scalable architecture'
        ]
      },
      {
        title: 'Industry Expertise',
        description: 'Deep understanding of various industries and their unique data challenges.',
        icon: '🏢',
        details: [
          'Healthcare & Life Sciences',
          'Financial Services',
          'Retail & E-commerce',
          'Manufacturing & Logistics'
        ]
      },
      {
        title: 'Ongoing Support',
        description: 'Long-term partnership with continuous support and optimization services.',
        icon: '🤝',
        details: [
          '24/7 technical support',
          'Regular model updates',
          'Performance monitoring',
          'Continuous improvement'
        ]
      }
    ],
    testimonials: [
      {
        quote: "The team delivered exceptional results, helping us increase revenue by 40% through their predictive analytics solution.",
        author: "Jennifer Smith",
        position: "CTO, TechCorp Inc.",
        company: "TechCorp Inc."
      },
      {
        quote: "Their expertise in machine learning transformed our operations and gave us a competitive edge in the market.",
        author: "Robert Johnson",
        position: "CEO, Global Retail Group",
        company: "Global Retail Group"
      },
      {
        quote: "Professional, knowledgeable, and results-driven. They exceeded our expectations in every way.",
        author: "Dr. Maria Garcia",
        position: "Director of Research, HealthFirst Medical",
        company: "HealthFirst Medical"
      }
    ],
    stats: {
      projectsCompleted: 150,
      clientSatisfaction: '95%',
      averageROI: '300%',
      teamSize: 25
    }
  });
});

module.exports = router; 