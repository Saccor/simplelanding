# Arfve Landing Page

A modern, responsive landing page for Arfve, a company building sustainable audio devices.

## Overview

This project is a responsive landing page for Arfve, showcasing the brand's focus on sustainability and cutting-edge technology in audio devices. Built with Next.js 15 and React 19, it features a clean, modern design with a video hero section, interactive elements, and an email signup form.

## Features

- Responsive design optimized for all device sizes
- Hero section with full-screen background video
- Interactive sound toggle for hero video
- Email signup form with validation and success/error states
- Clean, minimalist UI following modern design principles
- Animated transitions and loading states
- SEO-optimized metadata

## Technology Stack

- Next.js 15.3.1
- React 19.0.0
- TypeScript 5+
- Tailwind CSS 4
- Turbopack (for development)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Large media files (see Media Assets section)

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Structure

```
simplelanding/
├── src/
│ ├── app/
│ │ ├── globals.css       # Global styles and Tailwind imports
│ │ ├── layout.tsx        # Root layout with metadata and fonts
│ │ ├── page.tsx          # Main landing page component
│ │ └── favicon.ico       # Browser favicon
│ │
│ ├── components/
│ │ ├── SimpleLanding.tsx # Main container component
│ │ ├── Header.tsx        # Site header with logo and sound toggle
│ │ ├── HeroSection.tsx   # Video background hero section
│ │ ├── TextSection.tsx   # Text content section
│ │ ├── EmailSection.tsx  # Email signup form section
│ │ └── Footer.tsx        # Site footer with links
│
├── public/               # Static assets
│ ├── images/             # Image assets directory
│ │ └── favicon.png       # Site favicon for metadata
│ ├── HeroVideo1.mp4      # Hero section background video (large file)
│ ├── Arfve6.jpg          # Product image for email section
│ ├── arfve-logo.svg      # Main logo (white)
│ ├── arfve-logo-dark.svg # Dark version of logo
│ ├── volume-on.svg       # Sound icon for video unmuted state
│ └── volume-off.svg      # Sound icon for video muted state
│
├── next.config.js        # Next.js configuration (includes video file handling)
├── next.config.ts        # TypeScript version of Next.js config
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS configuration for Tailwind
└── eslint.config.mjs     # ESLint configuration
```

## Component Architecture

### Page Component (`src/app/page.tsx`)
The main entry point that renders the SimpleLanding component with configurable props.

### SimpleLanding Component (`src/components/SimpleLanding.tsx`)
The main container component that:
- Handles video loading and playback state
- Manages mute/unmute functionality
- Handles email form submission
- Arranges all sections in the proper order

### Header Component (`src/components/Header.tsx`)
- Displays the logo
- Provides video sound toggle
- Changes appearance on scroll

### Footer Component (`src/components/Footer.tsx`)
- Displays logo, copyright, and policy links
- Contains social media links

### Email Section (`src/components/EmailSection.tsx`)
- Displays product image
- Contains email signup form
- Handles form submission states

## Media Assets

The landing page requires the following media assets:

1. Hero video (`public/HeroVideo1.mp4`) - Background video for the hero section (533MB)
2. Product image (`public/Arfve6.jpg`) - Image for the email section (17MB)
3. Logo files in both light and dark versions
4. Sound control SVG icons

### Large Media Files

Note that the Hero video file (`public/HeroVideo1.mp4`) is very large (533MB) and the product image (`public/Arfve6.jpg`) is 17MB. When cloning this repository, you may need to get these files separately if they're not included in the repository due to size constraints.

## Configuration Details

### Video Handling in Next.js
The project uses `file-loader` to handle video files in development. This is configured in `next.config.js`.

### Development with Turbopack
The project is configured to use Turbopack in development for faster builds. This is set in the `dev` script in `package.json`.

## Key Implementation Notes

1. **Video Loading**: The SimpleLanding component handles video loading states with a loading spinner.

2. **Email Form**: The form currently logs submissions to the console. A TODO remains to implement the actual API endpoint for email signup.

3. **Responsive Design**: The site uses Tailwind's responsive classes to adapt to different screen sizes.

4. **Sound Control**: Video sound is controlled globally with a state that's passed down from the page component.

## To-Do Items

- [ ] Implement backend API for email signup collection
- [ ] Add proper link destinations in the Footer component
- [ ] Add analytics tracking
- [ ] Improve video loading performance and optimize large media files
- [ ] Add proper privacy policy and cookie settings pages
- [ ] Implement proper error handling for the email form
- [ ] Add more interactive elements and animations
- [ ] Optimize images and videos for different screen sizes
- [ ] Add internationalization support

## Development Guidelines

1. Follow existing code style and component structure
2. Maintain responsive design principles across all components
3. Optimize media assets before adding them to the project
4. Test across multiple device sizes and browsers
5. Keep accessibility in mind when making UI changes

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
