# QRTool - ساخت رایگان کد QR

A modern, single-page QR Code Generator built with Next.js, featuring RTL layout and Persian language support.

## ✨ Features

- 🚀 **Instant QR Generation** - Generate QR codes in real-time
- 🎨 **Modern UI** - Clean, minimalist design with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Works seamlessly on mobile and desktop
- 🇮🇷 **RTL Support** - Full Persian/Farsi language support with Vazir Matn font
- 💾 **Download as PNG** - Save your QR codes as high-quality images
- ⚡ **Next.js Performance** - Fast page loads with optimized rendering

## 🛠️ Tech Stack

- **Framework:** Next.js (Page Router)
- **Styling:** Tailwind CSS v4
- **QR Generation:** qrcode.js
- **Font:** Vazir Matn (Google Fonts)
- **Language:** JavaScript (No TypeScript)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qrtool
```

2. Install dependencies:
```bash
npm install
```

3. Install the QR code library:
```bash
npm install qrcode
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Usage

1. Enter any text or URL in the input field
2. Click the "ساخت کد QR" button (or press Enter)
3. View your generated QR code
4. Click "دانلود به صورت PNG" to save the QR code

## 📁 Project Structure

```
qrtool/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── _document.js     # Document with RTL config
│   └── index.js         # Main QR generator page
├── styles/
│   └── globals.css      # Global styles with Vazir Matn font
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🎨 Customization

### Change Colors
Edit the CSS variables in `styles/globals.css`:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
}
```

### Modify QR Code Settings
Edit the QR generation options in `pages/index.js`:
```javascript
const url = await QRCode.toDataURL(inputText, {
  width: 300,
  margin: 2,
  color: {
    dark: '#1e293b',
    light: '#ffffff',
  },
});
```

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Made with ❤️ by Tohid Shabanloo

- YouTube: [@tohidshabanloo](https://youtube.com/@tohidshabanloo)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [qrcode.js](https://github.com/soldair/node-qrcode)
- [Vazir Matn Font](https://github.com/rastikerdar/vazirmatn)
