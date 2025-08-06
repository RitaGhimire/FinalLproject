# 🌍 HobbyHub Travel Forum

A modern, responsive travel forum web application built with React, Vite, and Supabase. Share your travel experiences, discover new destinations, and connect with fellow travelers from around the world!

## ✨ Features

### 🏠 Home Feed
- View all travel posts in a beautiful grid layout
- Search posts by title with real-time filtering
- Sort posts by creation date or popularity (upvotes)
- Responsive design that works on all devices

### 📝 Create & Edit Posts
- Create new posts with title, content, and image URL
- Rich text support for detailed travel stories
- Image preview functionality
- Edit existing posts with full CRUD operations
- Delete posts with confirmation dialog

### 📖 Post Details
- Dedicated page for each post with full content
- High-quality image display
- Upvoting system - show your appreciation!
- Comments section for community discussions
- Post metadata (creation date, upvote count)

### 💬 Interactive Comments
- Add comments to any post
- View all comments in chronological order
- Engage with the travel community

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds and glassmorphism effects
- Smooth animations and hover effects
- Intuitive navigation with React Router
- Mobile-first responsive design
- Clean, modern typography and spacing

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Styling**: Pure CSS with modern design principles
- **Icons**: Emoji-based for universal compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hobbyhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Go to [Supabase](https://supabase.com) and create a new project
   - Wait for the project to be fully set up
   - Go to Settings > API to get your credentials

4. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the following SQL commands:

   ```sql
   -- Create posts table
   CREATE TABLE posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT,
     image_url TEXT,
     upvotes INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create comments table
   CREATE TABLE comments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

   -- Create policies to allow all operations (since no auth required)
   CREATE POLICY "Allow all operations on posts" ON posts FOR ALL USING (true);
   CREATE POLICY "Allow all operations on comments" ON comments FOR ALL USING (true);
   ```

6. **Add sample data (optional)**
   - Run the SQL commands from `sample-data.sql` in your Supabase SQL Editor
   - This will populate your database with example travel posts and comments

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start exploring the HobbyHub Travel Forum!

## 📱 Usage Guide

### Creating a Post
1. Click "Create Post" in the navigation
2. Fill in the required title field
3. Add optional content describing your travel experience
4. Include an image URL to showcase your destination
5. Click "Create Post" to share with the community

### Interacting with Posts
- **Browse**: Scroll through the home feed to discover new destinations
- **Search**: Use the search bar to find posts about specific locations
- **Sort**: Toggle between sorting by date or popularity
- **Read**: Click any post to view full details and comments
- **Upvote**: Show appreciation by clicking the heart button
- **Comment**: Share your thoughts or ask questions
- **Edit/Delete**: Modify or remove posts you've created

## 🎯 Project Requirements Met

✅ **Post Creation Form**
- Title field (required)
- Optional content text area
- Optional image URL field
- Form validation and error handling

✅ **Home Feed Display**
- Shows creation time, title, and upvote count
- Clickable posts leading to detail pages
- Clean, organized layout

✅ **Sorting & Searching**
- Sort by creation time or upvotes
- Real-time search by title
- Intuitive user interface

✅ **Post Interaction**
- Dedicated post detail pages
- Upvoting functionality (unlimited upvotes)
- Comment system
- Edit and delete capabilities

✅ **Modern Design**
- Responsive web design principles
- Beautiful visual hierarchy
- Smooth user experience
- Accessibility considerations

## 🌟 Design Philosophy

This application focuses on creating a welcoming community space for travel enthusiasts. The design emphasizes:

- **Visual Appeal**: Gradient backgrounds and modern card layouts create an engaging experience
- **Usability**: Intuitive navigation and clear calls-to-action guide users naturally
- **Community**: Comment systems and upvoting encourage interaction and discussion
- **Accessibility**: High contrast ratios, readable fonts, and semantic HTML structure
- **Performance**: Optimized images, efficient queries, and fast loading times

## 🔮 Future Enhancements

Potential features for future development:
- User authentication and profiles
- Image upload functionality
- Advanced search filters (location, date range, tags)
- User reputation system
- Mobile app version
- Social media integration
- Trip planning tools
- Interactive maps integration

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share feedback on the user experience

## 📄 License

This project is created for educational purposes as part of the CodePath Web Development program.

---

**Happy Traveling! 🌍✈️**

*Share your adventures, inspire others, and discover your next destination with HobbyHub Travel Forum.*# FinalLproject
