const express = require('express');
const router = express.Router();

// Careers page route
router.get('/', (req, res) => {
  res.render('careers', {
    title: 'Careers - CodeVoyage',
    description: 'Join our team of data science experts and work on cutting-edge projects that make a real impact.',
    page: 'careers',
    culture: {
      title: 'Why Work With Us',
      description: 'Join a team that values innovation, collaboration, and continuous learning.',
      benefits: [
        {
          title: 'Innovation First',
          description: 'Work with the latest technologies and methodologies in data science.',
          icon: '🚀'
        },
        {
          title: 'Continuous Learning',
          description: 'Access to conferences, courses, and mentorship programs.',
          icon: '📚'
        },
        {
          title: 'Flexible Work',
          description: 'Remote work options and flexible hours to support work-life balance.',
          icon: '🏠'
        },
        {
          title: 'Impactful Projects',
          description: 'Work on projects that solve real-world problems and drive business value.',
          icon: '💡'
        }
      ]
    },
    openPositions: [
      {
        title: 'Senior Data Scientist',
        department: 'Data Science',
        location: 'Remote / San Francisco',
        type: 'Full-time',
        experience: '5+ years',
        description: 'Lead complex data science projects and mentor junior team members.',
        requirements: [
          'PhD in Computer Science, Statistics, or related field',
          '5+ years experience in machine learning and statistical modeling',
          'Expertise in Python, R, and SQL',
          'Experience with deep learning frameworks (TensorFlow, PyTorch)',
          'Strong communication and leadership skills'
        ],
        responsibilities: [
          'Develop and implement machine learning models',
          'Lead client engagements and project delivery',
          'Mentor junior data scientists',
          'Contribute to thought leadership and research'
        ]
      },
      {
        title: 'Data Engineer',
        department: 'Engineering',
        location: 'New York / Remote',
        type: 'Full-time',
        experience: '3+ years',
        description: 'Build scalable data infrastructure and ETL pipelines.',
        requirements: [
          'BS/MS in Computer Science or related field',
          '3+ years experience in data engineering',
          'Expertise in Python, Java, and SQL',
          'Experience with cloud platforms (AWS, GCP, Azure)',
          'Knowledge of big data technologies (Spark, Kafka)'
        ],
        responsibilities: [
          'Design and build data pipelines',
          'Optimize data infrastructure for performance',
          'Implement data quality and monitoring systems',
          'Collaborate with data scientists on model deployment'
        ]
      },
      {
        title: 'MLOps Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        experience: '4+ years',
        description: 'Build and maintain production ML systems and infrastructure.',
        requirements: [
          'BS/MS in Computer Science or related field',
          '4+ years experience in software engineering',
          'Experience with ML model deployment and monitoring',
          'Knowledge of containerization (Docker, Kubernetes)',
          'Familiarity with CI/CD pipelines'
        ],
        responsibilities: [
          'Deploy and monitor ML models in production',
          'Build MLOps infrastructure and tooling',
          'Implement model versioning and tracking',
          'Ensure model reliability and performance'
        ]
      },
      {
        title: 'Data Strategy Consultant',
        department: 'Consulting',
        location: 'Chicago / Remote',
        type: 'Full-time',
        experience: '6+ years',
        description: 'Help clients develop comprehensive data strategies and roadmaps.',
        requirements: [
          'MBA or advanced degree in business or analytics',
          '6+ years experience in consulting or strategy',
          'Experience with data governance and strategy',
          'Strong business acumen and communication skills',
          'Experience in multiple industries'
        ],
        responsibilities: [
          'Develop data strategies for clients',
          'Assess current data capabilities and maturity',
          'Create implementation roadmaps',
          'Lead change management initiatives'
        ]
      }
    ],
    perks: [
      'Competitive salary and equity',
      'Comprehensive health benefits',
      '401(k) with company match',
      'Unlimited PTO',
      'Professional development budget',
      'Home office setup allowance',
      'Regular team events and retreats',
      'Flexible work arrangements'
    ]
  });
});

module.exports = router; 