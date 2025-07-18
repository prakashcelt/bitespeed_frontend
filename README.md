# BiteSpeed Frontend Task: Chatbot Flow Builder

A modern, interactive chatbot flow builder built with React and React Flow. This application allows users to create chatbot conversation flows by connecting different types of nodes with a drag-and-drop interface.

![BiteSpeed Chatbot Flow Builder](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Flow](https://img.shields.io/badge/React%20Flow-12.3.4-FF6B6B?style=for-the-badge&logo=react&logoColor=white)

## ✨ Features

### 🎯 Core Functionality
- **Text Node**: Send text messages in the chatbot flow
- **Drag & Drop**: Add nodes by dragging from the nodes panel or clicking
- **Visual Flow Builder**: Interactive flow canvas with snap-to-grid
- **Node Connections**: Connect nodes with edges to define conversation flow
- **Settings Panel**: Edit node properties when selected

### 🔧 Technical Features
- **Source Handle Validation**: Only one edge can originate from a source handle
- **Target Handle Support**: Multiple edges can connect to target handles
- **Flow Validation**: Save validation prevents invalid flow configurations
- **Extensible Architecture**: Easy to add new node types in the future
- **Beautiful UI**: Modern, responsive design with smooth animations

### 🚀 Advanced Features
- **Smart Notifications**: Beautiful toast notifications for user feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Enhanced user experience
- **Auto-save Prevention**: Validates flow before saving

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bitespeed_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

### Adding Nodes
1. **Drag & Drop**: Drag a node from the Nodes Panel and drop it on the canvas
2. **Click to Add**: Click on a node type in the Nodes Panel to add it to the canvas

### Editing Nodes
1. Click on any node to select it
2. The Settings Panel will appear on the right
3. Edit the text message in the textarea
4. Click "Back" to return to the Nodes Panel

### Connecting Nodes
1. Drag from a source handle (bottom of node) to a target handle (top of another node)
2. Only one connection is allowed per source handle
3. Multiple connections can be made to target handles

### Saving the Flow
1. Click the "Save Changes" button in the header
2. The app will validate the flow:
   - ✅ Single node flows are valid
   - ✅ Multiple node flows with one starting point are valid
   - ❌ Multiple node flows with multiple starting points will show an error

## 🏗️ Project Structure

```
src/
├── components/
│   ├── nodes/
│   │   ├── TextNode.jsx          # Text message node component
│   │   └── TextNode.css          # Text node styling
│   └── panels/
│       ├── NodesPanel.jsx        # Available nodes panel
│       ├── NodesPanel.css        # Nodes panel styling
│       ├── SettingsPanel.jsx     # Node settings panel
│       └── SettingsPanel.css     # Settings panel styling
├── App.jsx                       # Main application component
├── App.css                       # Main application styling
├── index.css                     # Global styles
└── main.jsx                      # Application entry point
```

## 🎨 Design System

The application uses a modern design system with:
- **Color Palette**: Blue primary (#3b82f6) with purple accents (#8b5cf6)
- **Typography**: System fonts with proper hierarchy
- **Animations**: Smooth transitions and hover effects
- **Shadows**: Subtle depth with layered shadows
- **Gradients**: Modern gradient overlays for visual appeal

## 🔮 Future Enhancements

The architecture is designed to be extensible. Future node types can be easily added:

```javascript
// Example: Adding a new condition node
const nodeTypes = {
  textNode: TextNode,
  conditionNode: ConditionNode,  // New node type
  delayNode: DelayNode,          // Another new node type
};
```

### Planned Features
- **Condition Nodes**: Add branching logic to flows
- **Delay Nodes**: Add time delays between messages
- **API Integration Nodes**: Connect to external services
- **Template Library**: Pre-built flow templates
- **Export/Import**: Save and load flow configurations
- **Analytics**: Flow performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent flow builder library
- [Vite](https://vitejs.dev/) for the fast development experience
- [React](https://reactjs.org/) for the component architecture
