const express = require('express');
const router = express.Router();

// Articles page route
router.get('/', (req, res) => {
  res.render('articles', {
    title: 'Articles & Insights - CodeVoyage',
    description: 'Stay updated with the latest trends, insights, and thought leadership in data science and AI.',
    page: 'articles',
    featuredArticle: {
      title: 'The Future of AI in Healthcare: Opportunities and Challenges',
      excerpt: 'Exploring how artificial intelligence is transforming healthcare delivery, from diagnostic tools to personalized medicine, and the ethical considerations that come with it.',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Healthcare AI',
      image: '/images/articles/ai-healthcare.jpg',
      featured: true
    },
    articles: [
      {
        title: 'Building Scalable Machine Learning Pipelines',
        excerpt: 'Learn the best practices for creating robust, scalable ML pipelines that can handle production workloads.',
        author: 'Alex Patel',
        date: '2024-01-10',
        readTime: '6 min read',
        category: 'Machine Learning',
        image: '/images/articles/ml-pipelines.jpg'
      },
      {
        title: 'Data Strategy: The Foundation of Digital Transformation',
        excerpt: 'Why a solid data strategy is crucial for successful digital transformation initiatives.',
        author: 'Lisa Thompson',
        date: '2024-01-05',
        readTime: '5 min read',
        category: 'Data Strategy',
        image: '/images/articles/data-strategy.jpg'
      },
      {
        title: 'The Rise of MLOps: Bridging the Gap Between Development and Production',
        excerpt: 'Understanding MLOps and how it\'s revolutionizing the way we deploy and manage machine learning models.',
        author: 'Michael Chen',
        date: '2023-12-28',
        readTime: '7 min read',
        category: 'MLOps',
        image: '/images/articles/mlops.jpg'
      },
      {
        title: 'Predictive Analytics in Retail: Driving Customer Experience',
        excerpt: 'How retailers are using predictive analytics to enhance customer experience and boost sales.',
        author: 'Dr. Emily Rodriguez',
        date: '2023-12-20',
        readTime: '6 min read',
        category: 'Retail Analytics',
        image: '/images/articles/retail-analytics.jpg'
      },
      {
        title: 'Ethical AI: Building Responsible Machine Learning Systems',
        excerpt: 'The importance of ethical considerations in AI development and how to implement responsible AI practices.',
        author: 'David Kim',
        date: '2023-12-15',
        readTime: '8 min read',
        category: 'Ethical AI',
        image: '/images/articles/ethical-ai.jpg'
      },
      {
        title: 'Big Data Processing: From Batch to Real-Time',
        excerpt: 'Evolution of big data processing and the shift towards real-time analytics solutions.',
        author: 'Michael Chen',
        date: '2023-12-10',
        readTime: '5 min read',
        category: 'Big Data',
        image: '/images/articles/big-data.jpg'
      }
    ],
    categories: [
      'All',
      'Machine Learning',
      'Artificial Intelligence',
      'Data Strategy',
      'Healthcare AI',
      'Retail Analytics',
      'MLOps',
      'Big Data',
      'Ethical AI'
    ]
  });
});

module.exports = router; 