const express = require('express');
const router = express.Router();

// Try to import database and email modules, but handle gracefully if they fail
let createSubmission, sendContactNotification, sendConfirmationEmail;

try {
  const contactModel = require('../models/contactSubmission');
  createSubmission = contactModel.createSubmission;
} catch (error) {
  console.log('⚠️ Database module not available, using fallback storage');
  createSubmission = async (submission) => {
    console.log('📝 Contact submission (fallback):', submission);
    return { id: Date.now(), submitted_at: new Date() };
  };
}

try {
  const emailUtils = require('../utils/sendEmail');
  sendContactNotification = emailUtils.sendContactNotification;
  sendConfirmationEmail = emailUtils.sendConfirmationEmail;
} catch (error) {
  console.log('⚠️ Email module not available, using fallback');
  sendContactNotification = async (submission) => {
    console.log('📧 Contact notification (fallback):', submission);
    return { messageId: 'fallback' };
  };
  sendConfirmationEmail = async (submission) => {
    console.log('📧 Confirmation email (fallback):', submission);
    return { messageId: 'fallback' };
  };
}

// Input validation and sanitization
const validateContactForm = (data) => {
  const errors = {};
  
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (!/^[A-Za-z\s]+$/.test(data.name.trim())) {
    errors.name = 'Name can only contain letters and spaces';
  }
  
  // Email validation
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation (optional)
  if (data.phone && data.phone.trim()) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
  }
  
  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Message cannot exceed 1000 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: {
      name: data.name ? data.name.trim() : '',
      email: data.email ? data.email.trim().toLowerCase() : '',
      phone: data.phone ? data.phone.trim() : '',
      message: data.message ? data.message.trim() : ''
    }
  };
};

// GET contact page
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - CodeVoyage',
    description: 'Get in touch with our team to discuss your data science needs and how we can help transform your business.',
    page: 'contact'
  });
});

// Test route for debugging
router.get('/test', (req, res) => {
  res.json({ message: 'Contact route is working!' });
});

// POST contact form submission
router.post('/', async (req, res) => {
  console.log('📝 Contact form submission received:', req.body);
  
  try {
    // Validate and sanitize input
    const validation = validateContactForm(req.body);
    console.log('✅ Validation result:', validation);
    
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }
    
    const { name, email, phone, message } = validation.sanitizedData;
    console.log('✅ Sanitized data:', { name, email, phone, message });
    
    // Save to database (or fallback)
    const submission = await createSubmission({
      name,
      email,
      phone,
      message
    });
    console.log('✅ Database submission result:', submission);
    
    // Send notification email to admin (or fallback)
    await sendContactNotification({
      name,
      email,
      phone,
      message
    });
    console.log('✅ Admin notification sent');
    
    // Send confirmation email to user (or fallback)
    await sendConfirmationEmail({
      name,
      email
    });
    console.log('✅ User confirmation sent');
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      submissionId: submission.id
    });
    
  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    console.error('❌ Error stack:', error.stack);
    
    // Handle specific database errors
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({
        success: false,
        message: 'A submission with this email already exists. Please wait before submitting again.'
      });
    }
    
    // Handle email errors
    if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Your message was saved, but there was an issue sending the notification email. We will review your submission shortly.'
      });
    }
    
    // Generic error response
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission. Please try again later.'
    });
  }
});

// GET contact form data (for admin purposes - add authentication in production)
router.get('/submissions', async (req, res) => {
  try {
    const { getAllSubmissions } = require('../models/contactSubmission');
    const submissions = await getAllSubmissions();
    
    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions'
    });
  }
});

module.exports = router; 