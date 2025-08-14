# Reeda's Portfolio Website

A modern, responsive portfolio website showcasing Flutter app development and web development skills. Built with Node.js, Express, and modern web technologies.

## 🚀 Features

- **Dual Expertise Showcase**: Highlights both Flutter mobile app development and web development skills
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Contact Form**: Integrated contact form that sends messages directly to Gmail
- **Project Showcase**: Displays both mobile app and web development projects
- **Skills Visualization**: Interactive skill bars showing proficiency levels
- **Single Page Application**: Smooth navigation without page reloads

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Font Awesome for icons
- Google Fonts (Poppins)

### Backend
- Node.js
- Express.js
- Nodemailer for email functionality
- Express Validator for form validation
- Helmet for security
- CORS for cross-origin requests

### Mobile Development Skills
- Flutter
- Dart
- Firebase
- State Management (Provider/Bloc)
- SQLite

### Web Development Skills
- HTML5, CSS3, JavaScript
- React
- Node.js, Express.js
- MongoDB, PostgreSQL
- VS Code expertise

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file with your Gmail credentials:
   ```
   EMAIL_USER=ridaanser121@gmail.com
   EMAIL_PASS=your-16-character-app-password
   PORT=3000
   NODE_ENV=development
   ```

4. **Configure Gmail App Password**
   
   To enable the contact form to send emails to your Gmail:
   
   1. Go to your [Google Account settings](https://myaccount.google.com/)
   2. Enable 2-Step Verification if not already enabled
   3. Go to Security > App passwords
   4. Generate a new app password for "Mail"
   5. Use that 16-character password in your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Portfolio Sections

### Home
- Hero section with introduction
- Call-to-action buttons

### About
- Personal introduction
- Experience statistics
- Professional journey

### Skills
- **Mobile App Development**: Flutter, Dart, Firebase, State Management
- **Web Development**: HTML5, CSS3, JavaScript, React
- **Backend & Tools**: Node.js, Express.js, VS Code, Git
- **Databases**: MongoDB, PostgreSQL, SQLite

### Projects
- **Flutter Mobile Apps**: E-Commerce app, Task Management app
- **Web Applications**: Plagiarism Checker, Portfolio Website, UniSync

### Contact
- Contact form that sends messages to Gmail
- Contact information display
- Direct email and phone links

## 🔧 Customization

### Adding New Projects
Edit the projects section in `public/index.html`:
```html
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-icon-name"></i>
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Project description...</p>
        <div class="project-technologies">
            <span class="technology-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" target="_blank">GitHub</a>
            <a href="#" target="_blank">Live Demo</a>
        </div>
    </div>
</div>
```

### Updating Skills
Modify the skills section in `public/index.html`:
```html
<div class="skill-item">
    <span class="skill-name">Skill Name</span>
    <div class="skill-bar">
        <div class="skill-progress" data-percent="85"></div>
    </div>
</div>
```

### Changing Contact Information
Update the contact details in `public/index.html`:
```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your-email@gmail.com</span>
</div>
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
Make sure to set these environment variables in your production environment:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `NODE_ENV`: Set to "production"
- `ALLOWED_ORIGIN`: Your domain URL

## 📧 Contact Form Setup

The contact form is configured to send emails to `ridaanser121@gmail.com`. When someone submits the form:

1. The message is validated
2. An email is sent to your Gmail with:
   - Sender's name and email
   - Their message
   - Timestamp
   - Professional formatting

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting to prevent spam
- Input validation and sanitization
- CORS configuration
- Secure email transport

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ by Reeda**

