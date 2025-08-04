const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Email credentials not configured');
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

// Send contact form notification email
const sendContactNotification = async (submission) => {
  try {
    const transporter = createTransporter();
    
    const { name, email, phone, message } = submission;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'awazemohommed@gmail.com',
      subject: 'New Contact Us Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Contact Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #667eea;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="tel:${phone}" style="color: #667eea;">${phone}</a>
                </td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #667eea; margin-top: 0;">Message</h3>
            <p style="color: #333; line-height: 1.6; margin: 0;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Submission Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending contact notification email:', error);
    // Don't throw error, just log it
    return { messageId: 'fallback' };
  }
};

// Send confirmation email to the user
const sendConfirmationEmail = async (submission) => {
  try {
    const transporter = createTransporter();
    
    const { name, email } = submission;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            Thank you for reaching out!
          </h2>
          
          <p style="color: #333; line-height: 1.6;">
            Dear ${name},
          </p>
          
          <p style="color: #333; line-height: 1.6;">
            Thank you for contacting Data Science Consultancy. We have received your message and will get back to you within 24 hours.
          </p>
          
          <p style="color: #333; line-height: 1.6;">
            In the meantime, feel free to explore our services and case studies on our website.
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.BASE_URL || 'http://localhost:3000'}" 
               style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The Data Science Consultancy Team
          </p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to user:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    // Don't throw error, just log it
    return { messageId: 'fallback' };
  }
};

module.exports = {
  sendContactNotification,
  sendConfirmationEmail
}; 