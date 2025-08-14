const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.ALLOWED_ORIGIN || 'https://yourdomain.com'] 
    : ['http://localhost:3004', 'http://127.0.0.1:3004'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y',
  etag: true
}));

// Contact form validation
const validateContactForm = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
];

// Contact form endpoint
app.post('/api/contact', validateContactForm, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { name, email, message } = req.body;
    
    // Create contact message object
    const contactMessage = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      ip: req.ip
    };
    
    // Save to file
    const messagesFile = path.join(__dirname, 'contact-messages.json');
    let messages = [];
    
    try {
      if (fs.existsSync(messagesFile)) {
        const fileContent = fs.readFileSync(messagesFile, 'utf8');
        messages = JSON.parse(fileContent);
      }
    } catch (error) {
      console.log('Creating new messages file...');
    }
    
    messages.push(contactMessage);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    
    // Log the contact form submission
    console.log(`✅ Contact form submission saved from ${name} (${email}): ${message}`);
    console.log(`📁 Message saved to: ${messagesFile}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    });
  }
});

// View contact messages endpoint (for you to check messages)
app.get('/api/messages', (req, res) => {
  try {
    const messagesFile = path.join(__dirname, 'contact-messages.json');
    if (fs.existsSync(messagesFile)) {
      const fileContent = fs.readFileSync(messagesFile, 'utf8');
      const messages = JSON.parse(fileContent);
      res.json({ success: true, messages });
    } else {
      res.json({ success: true, messages: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading messages' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Route handlers for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/skills', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'skills.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve the main HTML file for any other routes (fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Visit: http://localhost:${PORT}`);
  console.log(`🔒 Security features enabled`);
  console.log(`📧 Contact messages will be saved to: contact-messages.json`);
}); 