# 📋 Task Manager App

A full-stack task management application built with React Native (Expo) and Node.js, featuring user authentication, task CRUD operations, notifications, and a modern UI.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Categories**: Personal, Work, Shopping, Health, Study, Other
- **Priority Levels**: Low, Medium, High with color coding
- **Due Date Management**: Set and track task deadlines
- **Task Status**: Mark tasks as pending or completed
- **Smart Filtering**: Filter by status (All, Pending, Completed, Overdue)
- **Search & Sort**: Find tasks quickly with search and sorting options

### Advanced Features
- **Push Notifications**: Get reminded about upcoming and overdue tasks
- **Statistics Dashboard**: Visual overview of task completion status
- **Responsive Design**: Beautiful UI that works on all screen sizes
- **Offline Support**: Data persistence with AsyncStorage
- **Real-time Updates**: Instant UI updates when tasks change

### Technical Features
- **Secure API**: RESTful API with JWT authentication
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API for global state
- **Navigation**: React Navigation with tab and stack navigation
- **Cross-platform**: Works on iOS, Android, and Web

## 🏗️ Project Structure

```
task-manager/
├── client/                 # React Native (Expo) frontend
│   ├── components/         # Reusable UI components
│   ├── context/           # React Context for state management
│   ├── screens/           # App screens
│   ├── config/            # Configuration files
│   └── assets/            # Images and icons
├── server/                # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middlewares/       # Authentication middleware
│   └── server.js          # Main server file
└── test-data/             # API testing examples
```

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **AsyncStorage** - Local data persistence
- **Expo Notifications** - Push notifications
- **Linear Gradient** - Beautiful UI gradients

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📱 Screenshots

*[Add screenshots of your app here]*

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Mobile device** or **emulator** for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create `server/.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # Start MongoDB service
   mongod
   ```

6. **Start the server**
   ```bash
   cd server
   npm start
   ```
   
   Expected output:
   ```
   ✅ MongoDB connected
   🚀 Server running on port 5000
   ```

7. **Start the client**
   ```bash
   cd client
   npm start
   ```
   
   Expected output:
   ```
   › Metro waiting on expo://192.168.x.x:8081
   › Scan the QR code above with Expo Go
   ```

8. **Test on device**
   - Install **Expo Go** app on your phone
   - Scan the QR code
   - Ensure phone and computer are on same WiFi network

## 🔧 Configuration

### API Configuration

Update `client/config/api.js` with your server IP address:

```javascript
// Replace YOUR_COMPUTER_IP with your actual IP address
const DEV_API_URL = 'http://YOUR_COMPUTER_IP:5000/api';
const PROD_API_URL = 'https://your-production-url.com/api';

export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;
```

### Find Your IP Address

**Windows:**
```bash
ipconfig
# Look for IPv4 Address (usually 192.168.x.x)
```

**Mac/Linux:**
```bash
ifconfig
# or
ip addr
```

## 📖 Usage Guide

### 1. User Registration
- Open the app
- Navigate to Register screen
- Fill in: Name, Email, Password
- Tap Register
- You'll be automatically logged in

### 2. User Login
- Navigate to Login screen
- Enter your email and password
- Tap Login
- Access your task dashboard

### 3. Creating Tasks
- Tap the "+" button or navigate to Add Task
- Fill in task details:
  - **Title** (required)
  - **Description** (optional)
  - **Due Date** (required)
  - **Priority** (Low/Medium/High)
  - **Category** (Personal/Work/Shopping/Health/Study/Other)
  - **Enable Reminders** (toggle)
- Tap "Add Task"

### 4. Managing Tasks
- **View**: All tasks appear on the home screen
- **Edit**: Tap on a task to modify details
- **Complete**: Tap the checkbox to mark as done
- **Delete**: Long press on a task to delete
- **Filter**: Use filter buttons (All, Pending, Completed, Overdue)

### 5. Notifications
- Grant notification permissions when prompted
- Get reminders for tasks due tomorrow
- Get notifications for tasks due today
- Notifications are automatically scheduled

## 🧪 Testing

### API Testing

Test server endpoints with Postman or curl:

**User Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**User Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create Task (with token):**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Test Description","dueDate":"2024-12-31T23:59:59.000Z","priority":"high","category":"work"}'
```

### App Testing

1. **Registration Flow**: Test user signup
2. **Login Flow**: Test user authentication
3. **Task CRUD**: Create, read, update, delete tasks
4. **Filtering**: Test all filter options
5. **Notifications**: Test reminder functionality
6. **Error Handling**: Test with invalid data

## 🐛 Troubleshooting

### Common Issues

**Server Won't Start:**
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

**Client Can't Connect:**
- Verify server is running on port 5000
- Check API_URL in `client/config/api.js`
- Ensure phone and computer are on same network
- Check firewall settings

**Authentication Fails:**
- Verify JWT_SECRET in `.env`
- Check token storage in AsyncStorage
- Verify server logs for errors

**Tasks Not Loading:**
- Check user is authenticated
- Verify token in request headers
- Check MongoDB connection

**Network Errors:**
- Replace `localhost` with your computer's IP address
- Check WiFi network connectivity
- Verify server is accessible from client

### Debug Mode

Enable debug logging:

```javascript
// In client/context/TaskContext.js
console.log('API Response:', data);
console.log('Tasks State:', tasks);
```

## 📱 Building for Production

### Expo Build

```bash
cd client
eas build --platform android
eas build --platform ios
```

### Environment Setup

1. Update `client/config/api.js` with production URL
2. Set `NODE_ENV=production` in server `.env`
3. Use production MongoDB instance
4. Set strong JWT_SECRET

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo** for the amazing development platform
- **React Native** community for excellent documentation
- **MongoDB** for the robust database solution
- **Express.js** for the lightweight web framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the error logs in your terminal
3. Open an issue on GitHub
4. Contact the development team

---

**Happy Task Managing! 🎉**
