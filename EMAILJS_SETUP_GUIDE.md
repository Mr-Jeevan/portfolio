# EmailJS Setup Guide for Portfolio Contact Form

## 📋 Overview
This guide will help you set up EmailJS to make your contact form actually send emails to jeevanraj.rj7@gmail.com.

## 🚀 Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (easiest option) or your preferred email provider
4. Follow the authentication process:
   - For Gmail: Sign in with your Google account
   - Grant EmailJS permission to send emails on your behalf
5. Note down the **Service ID** (you'll need this for .env.local)

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Configure the template:

**Template Name**: Portfolio Contact Form

**Subject**: `New Portfolio Contact from {{from_name}}`

**To Email**: `jeevanraj.rj7@gmail.com`

**From Name**: `{{from_name}}`

**From Email**: `{{from_email}}`

**Body**:
```
Hello,

You have received a new message from your portfolio:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
{{to_email}}
```

4. Click **Save** and note the **Template ID**

### 4. Get Your Public Key
1. Go to **Account** > **API Keys**
2. Copy your **Public Key**

### 5. Configure Environment Variables
1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=template_your_template_id  
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Test the Setup
1. Save all changes
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to your contact form and test sending a message
4. Check your email (jeevanraj.rj7@gmail.com) for the received message

## 🛠️ Troubleshooting

### Common Issues:

**❌ "Email service not configured"**
- Make sure `.env.local` file exists in project root
- Verify all three variables are correctly set
- Restart development server after changing .env

**❌ "Authentication failed"**
- Double-check your Public Key
- Ensure you're using the correct Service ID
- Verify your email service is properly connected

**❌ "Template not found"**
- Confirm Template ID is correct
- Check that template is saved and active
- Verify template variables match form field names

**❌ Emails going to spam**
- Check spam/junk folder
- Add your email as a trusted sender
- Verify email template formatting

### Testing Checklist:
- [ ] Form submits without errors
- [ ] Success message displays
- [ ] Email arrives in inbox (not spam)
- [ ] All form data is included in email
- [ ] Form resets after submission
- [ ] Error messages display for invalid inputs

## 📧 Email Template Variables Reference

Make sure your template uses these exact variable names:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email  
- `{{message}}` - Visitor's message
- `{{to_email}}` - Your email (jeevanraj.rj7@gmail.com)

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your Public Key secure but it's safe for client-side use
- EmailJS handles the email sending securely
- Form validation prevents spam submissions

## 🎯 Production Deployment

When deploying to production:
1. Add the same environment variables to your hosting platform
2. For Vercel: Settings > Environment Variables
3. For Netlify: Site settings > Build & deploy > Environment
4. For GitHub Pages: Not supported (use a different hosting option)

## 🆘 Need Help?

If you're still having issues:
1. Check browser console for detailed error messages
2. Verify all EmailJS credentials in dashboard
3. Test with EmailJS's built-in testing tool in the dashboard
4. Contact EmailJS support if problems persist

---

**Remember**: The form will only work when properly configured with valid EmailJS credentials. The enhanced error handling will now give you specific feedback about what's wrong if emails aren't sending.