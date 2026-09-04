# JARVIS PRO MAX

🤖 **A Powerful Personal AI Assistant for Mobile Devices**

## 📱 Overview

JARVIS PRO MAX is a full-featured AI assistant application built for Android and web platforms. It provides conversational AI, project management, development tools, and intelligent automation capabilities.

## 🚀 Features

### Core Features
- **AI Chat Interface** - Natural language conversations with multiple AI providers
- **Authentication** - Secure user login and registration
- **Memory System** - Persistent storage of important information
- **Project Management** - Create and manage development projects
- **Development Tools** - Code generation, testing, and debugging
- **Settings & Preferences** - Customizable user experience

### Planned Features
- Voice Commands & Speech-to-Text
- Web Search Integration
- Multi-device Synchronization
- Advanced Automation
- Game Development Module
- Website Builder
- Android Native Integration

## 🛠️ Tech Stack

### Frontend
- **React Native** with Expo
- **React Navigation** for routing
- **Context API** for state management
- **Axios** for API calls
- **Expo AV** for audio/video
- **Expo Secure Store** for secure storage

### Backend
- **Node.js** with Express
- **JWT** for authentication
- **MongoDB** for data persistence (optional)
- **Bcrypt** for password hashing
- **Helmet** for security
- **Rate Limiting** for API protection

### DevOps
- **GitHub Actions** for CI/CD
- **EAS Build** for APK compilation
- **Automated Testing**

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android device or emulator (for APK testing)
- Expo Go app (for development)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/shubhamjamge543-design/jarvis-pro-max.git
cd jarvis-pro-max

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on Web
npm run web
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your environment variables
# - JWT_SECRET
# - OPENAI_API_KEY or other AI provider keys
# - MONGODB_URI (optional)

# Start development server
npm run dev

# Start production server
npm start
```

## 🔑 Configuration

### AI Provider Setup

1. **OpenAI**
   - Get API key from https://platform.openai.com/api-keys
   - Add to `server/.env`:
     ```
     OPENAI_API_KEY=sk-...
     DEFAULT_AI_PROVIDER=openai
     DEFAULT_AI_MODEL=gpt-3.5-turbo
     ```

2. **Anthropic (Claude)**
   - Get API key from https://console.anthropic.com
   - Add to `server/.env`:
     ```
     ANTHROPIC_API_KEY=sk-ant-...
     DEFAULT_AI_PROVIDER=anthropic
     DEFAULT_AI_MODEL=claude-3-sonnet
     ```

### Database Setup (Optional)

```bash
# MongoDB local installation or use MongoDB Atlas
MONGODB_URI=mongodb://localhost:27017/jarvis-pro-max
```

## 🏗️ Project Structure

```
jarvis-pro-max/
├── App.js                    # Main app entry point
├── app.json                  # Expo configuration
├── package.json              # Frontend dependencies
├── src/
│   ├── screens/             # Screen components
│   │   ├── ChatScreen.js
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── DevelopmentScreen.js
│   │   └── SettingsScreen.js
│   ├── context/             # React contexts
│   │   ├── AuthContext.js
│   │   ├── ThemeContext.js
│   │   ├── MemoryContext.js
│   │   └── ToolContext.js
│   ├── navigation/          # Navigation stacks
│   │   ├── AuthStack.js
│   │   └── MainStack.js
│   └── config/              # Configuration files
│       └── api.js
├── server/                   # Backend server
│   ├── index.js             # Server entry point
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── memory.js
│   │   ├── tools.js
│   │   ├── projects.js
│   │   └── settings.js
│   └── package.json
└── .github/
    └── workflows/           # GitHub Actions
        ├── build-apk.yml    # APK build pipeline
        └── test.yml         # Testing pipeline
```

## 🚀 Deployment

### Build APK for Android

```bash
# Option 1: Using EAS Build (Recommended)
npm install -g eas-cli
eas build --platform android

# Option 2: Using GitHub Actions (Automatic)
# Push to 'development' branch, APK is built automatically
# Download from Actions artifacts
```

### Install APK on Android Device

1. Download the APK file
2. Transfer to Android device
3. Enable "Install from Unknown Sources" in Settings
4. Open file manager and tap APK file
5. Follow installation prompts

### Deploy Backend

```bash
# Option 1: Local/Self-hosted
cd server
npm install
PORT=5000 npm start

# Option 2: Cloud (Heroku, Railway, Render)
heroku create jarvis-pro-max-backend
git push heroku main
```

## 🔐 Security

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Secure API key storage (never in code)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Helmet for HTTP headers
- ✅ Input validation
- ✅ HTTPS recommended for production

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh JWT token

### Chat
- `POST /api/chat` - Send message to AI
- `GET /api/chat/history/:userId` - Get chat history

### Memory
- `GET /api/memory` - Get all memories
- `POST /api/memory` - Create memory
- `DELETE /api/memory/:memoryId` - Delete memory
- `GET /api/memory/search?q=query` - Search memories

### Tools
- `GET /api/tools` - List available tools
- `POST /api/tools/execute` - Execute a tool

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create project
- `GET /api/projects/:projectId` - Get project details

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings
- `POST /api/settings/api-keys/verify` - Verify API key

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test ChatScreen.test.js
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend connection issues
- Check if backend server is running: `curl http://localhost:5000/api/health`
- Verify `API_BASE_URL` in `src/config/api.js`
- Check firewall settings

### APK build failures
- Ensure you have `EXPO_TOKEN` set in GitHub Secrets
- Check Node.js version compatibility
- Review build logs in GitHub Actions

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Authentication](https://jwt.io/)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Shubham Jamge**
- GitHub: [@shubhamjamge543-design](https://github.com/shubhamjamge543-design)
- Email: shubhamjamge543@gmail.com

## 🙏 Acknowledgments

- Expo & React Native community
- OpenAI & Claude for AI capabilities
- All contributors and supporters

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: shubhamjamge543@gmail.com

---

**JARVIS PRO MAX** - Building the Future of Personal AI Assistants 🚀
