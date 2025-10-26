# Bot Muse - Supabase Setup Guide

## ✅ What's Been Done

1. ✅ Environment variables configured in `.env`
2. ✅ `.gitignore` updated to protect your secrets
3. ✅ Supabase client configured
4. ✅ Database schema created in `supabase_migration.sql`
5. ✅ Google Gemini AI integrated for WhatsApp chat

## 🚀 Next Steps

### 1. Run the Database Migration

1. Go to your Supabase Dashboard: https://kuldfuhtejsitssoronm.supabase.co
2. Click on **SQL Editor** in the sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase_migration.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press Ctrl+Enter)

This will create:
- All 8 tables (businesses, products, customers, orders, campaigns, templates, automations, analytics)
- Indexes for performance
- Triggers for auto-updating timestamps
- Row Level Security policies
- Helper functions and views

### 2. Start Your Development Server

```bash
npm run dev
# or
npm start
```

### 3. Test the Setup

1. Go to http://localhost:5173 (or your dev server URL)
2. Try signing up a new account
3. Complete the business setup
4. **Test Gemini AI**: Visit http://localhost:5173/gemini-demo to try the AI chat
5. Start using the app!

## 🔐 Your Credentials

**Supabase Project URL:**
```
https://kuldfuhtejsitssoronm.supabase.co
```

**Your .env file contains:**
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon key
- `VITE_GEMINI_API_KEY` - Your Google Gemini API key

## 📊 Database Features

- **Row Level Security**: Each user can only access their own data
- **Automatic Timestamps**: Created/updated at automatically maintained
- **Auto-updating Stats**: Customer stats update when orders complete
- **Performance Indexes**: Optimized for fast queries
- **Security Functions**: Helper functions for business ownership checks

## 🐛 Troubleshooting

### "Missing Supabase environment variables" Error
- Make sure `.env` file exists in the project root
- Restart your dev server after creating `.env`

### Can't connect to Supabase
- Check your internet connection
- Verify your credentials in Supabase Dashboard
- Make sure you've run the migration SQL

### Permission Denied Errors
- Check that Row Level Security is enabled (should be in migration)
- Verify you're signed in as a user
- Check that you've created a business profile

## 📝 Notes

- The `.env` file is already in `.gitignore` - your secrets are safe
- Never commit your `.env` file to Git
- The anon key is safe to use in the browser (RLS protects your data)
- Always use the anon key, never the service_role key in client code

## 🤖 Gemini AI Features

Your app now includes:
- **WhatsApp Chat AI**: Powered by Google Gemini Pro (free tier)
- **Product Recommendations**: AI suggests relevant products
- **Sentiment Analysis**: Understands customer mood
- **Natural Conversations**: Conversational, WhatsApp-friendly responses
- **Business Context**: AI knows your products and customers

### Test the AI:
Visit http://localhost:5173/gemini-demo to try the AI chat with sample products!

## 🎉 You're All Set!

Your Bot Muse app is now connected to Supabase and Gemini AI - ready to use!
