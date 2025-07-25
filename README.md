# Web Data Generator React App

A React application for generating web analytics data through an AWS API endpoint. This app provides an interactive form to configure and execute web data generation requests.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Modern web browser

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If you have the project files, navigate to the project directory
   cd react-web-data-generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Open the Application**
   - The app will automatically open in your browser at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is busy)
   - If it doesn't open automatically, manually navigate to the URL shown in the terminal

## 📋 How to Use

### 1. Fill Out the Form
- **Email** (required): Enter your email address
- **Sandbox**: Customize the sandbox identifier (default: "sandbox123")
- **Schema ID**: Customize the schema identifier (default: "schema_xyz_001")
- **Number of Users**: Set how many users to generate (1-1000)
- **Number of Events**: Set how many events to generate (1-1000)
- **Time Range (Days)**: Set the time period for data generation (1-365 days)
- **User Prompt**: Describe the type of data you want to generate

### 2. Generate Data
- Click the **"Generate Web Data"** button
- The app will attempt to call the AWS API endpoint
- You'll see a loading indicator while the request is processing

### 3. View Results
- **Success**: API response will be displayed in formatted JSON
- **Error**: Detailed error message with troubleshooting tips
- **Raw Response**: The exact response from the API (if different from JSON)

## 🔧 Technical Details

### API Endpoint
```
https://qs4ng286xa.execute-api.us-east-1.amazonaws.com/omnis-web-data-gen-latest
```

### Request Format
```json
{
  "event_type": "web_data_new",
  "event_types": ["page_view", "add_to_cart", "purchase"],
  "num_users": 100,
  "num_events": 100,
  "time_range_days": 30,
  "output_format": "json",
  "email": "your-email@example.com",
  "sandbox": "sandbox123",
  "schema_id": "schema_xyz_001",
  "user_prompt": "Generate basic commerce analytics data for testing"
}
```

### CORS Handling
The app implements multiple strategies to handle CORS issues:
1. **Proxy approach** (React dev server proxy)
2. **Direct API call** (with enhanced headers)
3. **CORS proxy fallback** (using cors-anywhere.herokuapp.com)

## 🐛 Troubleshooting

### Common Issues

#### 1. "Failed to Fetch" Error
**Problem**: CORS (Cross-Origin Resource Sharing) restrictions
**Solutions**:
- Check browser console for detailed error messages
- Try refreshing the page
- Ensure you're using a modern browser
- Check internet connection

#### 2. White Text on White Background
**Problem**: Styling issues
**Solution**: Refresh the page or clear browser cache

#### 3. API Not Responding
**Problem**: API endpoint might be down or restricted
**Solutions**:
- Check if the API endpoint is accessible
- Verify your email address is correct
- Try different parameter values
- Check the browser console for detailed logs

### Debug Steps

1. **Open Browser Developer Tools** (F12)
2. **Go to Console Tab**
3. **Submit the form**
4. **Look for detailed logs**:
   - Request data being sent
   - Response status codes
   - Error messages
   - Raw response text

## 📁 Project Structure

```
react-web-data-generator/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.js              # Main App component
│   ├── App.css             # App styling
│   ├── GenerateWebData.js  # Main form component
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
├── reasoning.txt           # CORS issues documentation
└── README.md               # This file
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

### Making Changes

1. **Edit Components**: Modify files in the `src/` directory
2. **Update Styling**: Edit `src/App.css` or component inline styles
3. **Add Dependencies**: Use `npm install <package-name>`
4. **Test Changes**: The development server will automatically reload

## 🔒 CORS Issues

### What is CORS?
CORS (Cross-Origin Resource Sharing) is a browser security feature that prevents web pages from making requests to different domains.

### Why It Happens
- Your app runs on `localhost:3001`
- The API is on `aws.amazonaws.com`
- The API doesn't allow cross-origin requests from browsers

### Current Status
The app implements multiple fallback strategies, but CORS issues may persist due to server-side configuration limitations.

### Solutions (for developers)
1. **Backend Proxy**: Create a server to make API calls
2. **API Configuration**: Modify the AWS API to allow CORS
3. **Different Deployment**: Deploy to a domain the API allows

## 📝 Notes

- The app is designed for development and testing purposes
- CORS issues are common with third-party APIs
- The multiple endpoint strategy provides the best chance of success
- Error handling provides detailed feedback for debugging
- Response display shows both parsed and raw data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and development purposes.

## 🆘 Support

If you encounter issues:
1. Check the browser console for error messages
2. Review the troubleshooting section above
3. Check the `reasoning.txt` file for technical details
4. Ensure all prerequisites are met

---

**Note**: This application demonstrates React development practices and API integration. The CORS issues encountered are common when working with third-party APIs that don't support cross-origin requests from browsers. 