# Arfve Landing Page

A modern landing page for Arfve, a company building sustainable audio devices.

## Overview

This project is a responsive landing page for Arfve headphones, built with Next.js and styled with Tailwind CSS. The site features a clean, modern design that showcases the brand's focus on sustainability and cutting-edge technology.

## Features

- Modern, responsive design
- Interactive sound toggle for hero video
- Email signup form with validation
- Clean, minimalist UI

## Technology Stack

- Next.js 15+
- React 19+
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
Arfve-Landing/
├── src/
│ ├── app/
│ │ ├── globals.css       # Global styles and Tailwind imports
│ │ ├── layout.tsx        # Root layout with metadata and fonts
│ │ └── page.tsx          # Main landing page
│ ├── components/
│ │ ├── Header.tsx        # Site header with sound toggle
│ │ ├── Hero.tsx          # Hero section with video background
│ │ ├── ProductInfo.tsx   # Product information section
│ │ ├── NewsletterSignup.tsx # Email signup component
│ │ └── Footer.tsx        # Site footer with links
├── public/               # Static assets
│ ├── images/             # Image assets
│ └── HeroVideo 1.mp4     # Hero section background video (not in Git)
├── package.json          # Dependencies and scripts
└── next.config.ts        # Next.js configuration
```

## Media Assets

The landing page requires the following media assets:

1. Hero video (HeroVideo 1.mp4) - Background video for the hero section
2. Person with earbuds image - For the product section
3. Logo and favicon

### Large Media Files

Note that the Hero video file (`public/HeroVideo 1.mp4`) is excluded from Git due to its size. When cloning this repository, you'll need to get this file separately and place it in the `public` directory.

## ToDo

- Add actual product images
- Connect newsletter signup to backend API
- Add animations for scroll effects

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
