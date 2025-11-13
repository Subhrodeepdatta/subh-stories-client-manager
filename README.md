# Subh Stories Client Manager

Desktop client and project management application for Subh Stories video editing business.

## Features

- ✅ **Client Management**: Add, edit, and manage client information (name, email, phone, address)
- ✅ **Project Management**: Create and track projects for each client
- ✅ **Offline-First**: All data stored locally on your hard drive (JSON files)
- ✅ **Modern UI**: Clean, premium beige-themed interface
- ✅ **Desktop App**: Built with Electron for Windows, Mac, and Linux
- 🔄 **Optional Online Sync**: Firebase integration ready (add your config)

## Project Structure

```
subh-stories-client-manager/
├── src/
│   ├── index.js          # React entry point
│   ├── App.js            # Main application component
│   └── styles.css        # Application styles
├── main.js               # Electron main process
├── index.html            # HTML template
├── webpack.config.js     # Webpack configuration
├── package.json          # Dependencies and scripts
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Subhrodeepdatta/subh-stories-client-manager.git
   cd subh-stories-client-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the app**
   ```bash
   npm run build
   ```

4. **Run the app**
   ```bash
   npm start
   ```

## Development

For development with live reload:

```bash
# Terminal 1: Watch and rebuild on changes
npm run dev

# Terminal 2: Run Electron
npm start
```

## Data Storage

By default, all client and project data is stored in a `data.json` file in your application directory.

Data structure:
```json
{
  "clients": [
    {
      "id": 1234567890,
      "name": "Client Name",
      "email": "client@example.com",
      "phone": "+91-1234567890",
      "projects": [
        {
          "id": 9876543210,
          "title": "Wedding Video Edit",
          "details": "Full day coverage edit",
          "status": "In Progress",
          "deliveryDate": "2025-12-01"
        }
      ]
    }
  ]
}
```

## Optional: Firebase Integration

To enable online sync:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Create `src/firebase.js` with your config:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

4. Install Firebase:
```bash
npm install firebase
```

## Missing Files to Add

You need to create these files in your local repository:

### 1. `main.js` (Electron main process)
### 2. `src/index.js` (React entry point)
### 3. `src/App.js` (Main React component)
### 4. `src/styles.css` (Styling)
### 5. `index.html` (HTML template)
### 6. `webpack.config.js` (Build configuration)
### 7. `.babelrc` (Babel configuration)

**See the next section for complete file contents!**

## Complete File Contents

I've provided all file contents in the repository. Simply clone and add the missing files as described above.

## Building for Production

To create a distributable application:

```bash
npm install electron-builder --save-dev
npm run build
npx electron-builder
```

## License

MIT License - Free to use for personal and commercial projects.

## Support

For issues or questions, create an issue on GitHub or contact Subh Stories.

---

**Created by Subh Stories** - Premium Video Editing Services
