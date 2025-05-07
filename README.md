# 🚦 Traffic Light Simulation

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📝 Description

A web application that simulates how traffic lights work with proper color sequence and timers. Built with Node.js and Express on the server side, along with HTML, CSS, and JavaScript on the client side.

## ✨ Features

- 🚥 Realistic traffic light simulation
- ⏱️ Countdown timer for each light color
- 🔄 Automatic color transitions following standard sequence (red → green → yellow → red)
- 📱 Responsive design (mobile-friendly)
- 🌐 Backend server with Node.js & Express
- 🎛️ Control panel for simulation parameters

## 🚀 How to Use

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or newer
- [npm](https://www.npmjs.com/) v6 or newer

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/riezaekatomara/fgo24-traffic-light.git
   ```

2. Navigate to the project directory:
   ```bash
   cd fgo24-traffic-light
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Open your browser and access `http://localhost:3000` (or the configured port)

## 📖 How It Works

The traffic light simulation follows the standard cycle:

1. **Red** - Stop (duration: 3 seconds)
2. **Yellow** - Prepare to stop (duration: 2 seconds)
3. **Green** - Go (duration: 3 seconds)

The application uses JavaScript to control the timer and automatically change the light colors. Users can see the currently active light and the remaining time before changing to the next color.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript

## 📁 Project Structure

```
fgo24-traffic-light/
├── css/
│   ├── styles.css
├── js/
│   ├── script.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## 👨‍💻 Developer

- **Rieza Ekatomara** - [GitHub](https://github.com/riezaekatomara)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are always welcome! Feel free to submit a pull request or open an issue if you have suggestions for improvements.

---

Made with ❤️ as part of FGO24 (Kodacademy)
