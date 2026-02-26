// EmailJS Configuration Test Utility
// Run this in browser console to verify your setup

export const testEmailJSConfig = () => {
    console.log('🔍 Testing EmailJS Configuration...\n');

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    console.log('📋 Configuration Check:');
    console.log('Service ID:', serviceId || '❌ MISSING');
    console.log('Template ID:', templateId || '❌ MISSING');
    console.log('Public Key:', publicKey ? '✅ FOUND' : '❌ MISSING');

    if (!serviceId || !templateId || !publicKey) {
        console.error('\n❌ Configuration Error: Missing required EmailJS credentials');
        console.log('Please check your .env.local file and ensure all variables are set.');
        return false;
    }

    console.log('\n✅ All configuration values found!');
    console.log('\n🔧 Next steps:');
    console.log('1. Verify these values match your EmailJS dashboard');
    console.log('2. Test sending an email through your contact form');
    console.log('3. Check your email inbox for received messages');

    return true;
};

// Test Email Template Variables
export const testTemplateVariables = () => {
    console.log('\n🔍 Testing Template Variables...\n');

    const requiredVariables = ['from_name', 'from_email', 'message'];
    console.log('Required template variables:', requiredVariables);
    console.log('\n✅ Make sure your EmailJS template includes these placeholders:');
    console.log('- {{from_name}} for visitor name');
    console.log('- {{from_email}} for visitor email');
    console.log('- {{message}} for visitor message');
};

// Usage: Import and run these functions in your browser console
// import { testEmailJSConfig, testTemplateVariables } from './utils/emailjs-test';
// testEmailJSConfig();
// testTemplateVariables();