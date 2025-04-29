# Arfve Landing Page

A modern, responsive landing page for Arfve, a company building sustainable audio devices.

## Overview

This project is a responsive landing page for Arfve, showcasing the brand's focus on sustainability and cutting-edge technology in audio devices. Built with Next.js 15 and React 19, it features a clean, modern design with a video hero section, interactive elements, and an email signup form.

## Features

- Responsive design optimized for all device sizes (from iPhone SE to large desktops)
- Hero section with full-screen background video
- Interactive sound toggle for hero video
- Scrolling text animation with automatic text transitions
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
│ │ ├── TextSection.tsx   # Text content section with scroll animation
│ │ ├── EmailSection.tsx  # Email signup form section
│ │ └── Footer.tsx        # Site footer with links
│ │
│ ├── hooks/
│ │ ├── useWindowSize.ts  # Custom hook for responsive breakpoints
│ │ └── useScrollObserver.ts # Custom hook for scroll animations
│ │
│ └── utils/              # Utility functions
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
├── tailwind.config.js    # Tailwind CSS configuration with custom breakpoints
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
- Adjusts size and spacing based on device size

### TextSection Component (`src/components/TextSection.tsx`)
- Displays animated text lines that change on scroll
- Uses scroll percentage to determine which text line to show
- Fully responsive with adjustments for screen sizes down to iPhone SE
- Uses dynamic sizing and positioning based on viewport width

### EmailSection Component (`src/components/EmailSection.tsx`)
- Displays product image with responsive adjustments
- Contains email signup form
- Handles form submission states
- Adjusts layout for different device sizes, including specific optimizations for small screens

### Footer Component (`src/components/Footer.tsx`)
- Displays logo, copyright, and policy links
- Contains social media links
- Adjusts layout for mobile screens (column vs. row layout)

## Responsive Design Approach

The site uses a comprehensive approach to responsive design:

### Breakpoint System
Defined breakpoints in `src/hooks/useWindowSize.ts`:
- xs: 480px (iPhone SE and similar small devices)
- sm: 640px
- md: 768px (tablets)
- lg: 1024px
- xl: 1280px
- xxl: 1440px

### Device Detection
The `useWindowSize` hook provides:
- Current viewport dimensions
- Boolean flags for device types (isMobile, isTablet, isDesktop, isLargeDesktop)
- Extra small device detection for very small screens

### Responsive Implementation
Each component implements responsive design through:
1. **Fluid Layouts**: Using percentage-based widths
2. **Conditional Styling**: Different styles applied based on device type
3. **Dynamic Calculations**: Position and size calculations based on viewport width
4. **Special Mobile Handling**: Extra optimizations for iPhone SE and small devices
5. **Tailwind Classes**: Utility classes for responsive properties

### Mobile Optimizations
Special considerations for mobile devices:
- Reduced font sizes
- Adjusted spacing and paddings
- Simplified layouts
- Focused image cropping
- Touch-friendly button sizes

## Media Assets

The landing page requires the following media assets:

1. Hero video (`public/HeroVideo1.mp4`) - Background video for the hero section (533MB)
2. Product image (`public/Arfve6.jpg`) - Image for the email section (17MB)
3. Logo files in both light and dark versions
4. Sound control SVG icons

### Large Media Files

Note that the Hero video file (`public/HeroVideo1.mp4`) is very large (533MB) and the product image (`public/Arfve6.jpg`) is 17MB. When cloning this repository, you may need to get these files separately if they're not included in the repository due to size constraints.

## Custom Hooks

### useWindowSize
A responsive design hook that:
- Detects current viewport dimensions
- Determines device type based on breakpoints
- Provides boolean flags for responsive conditions
- Re-renders components when screen size changes

### useScrollObserver
A hook for scroll-based animations that:
- Observes elements entering the viewport
- Adds CSS classes based on visibility
- Controls animation timing
- Supports custom thresholds for animation triggers

## Future Development Guidelines

### 1. Responsive Design
When adding new components or modifying existing ones:
- Always test on multiple screen sizes, particularly:
  - iPhone SE (320px width) - most challenging
  - Mobile phones (375-428px)
  - Tablets (768px) 
  - Desktops (1024px+)
- Use the `useWindowSize` hook for responsive logic
- Add special handling for iPhone SE where needed
- Verify all content is visible without horizontal scrolling
- Ensure text remains readable at all sizes

### 2. Component Modifications
When modifying existing components:
- The `TextSection` scrolling animation is sensitive to timing - maintain the scrollPercentage calculation 
- For `EmailSection`, preserve the specialized mobile layouts for small screens
- Maintain the current approach of using inline styles with device-specific calculations

### 3. Performance Considerations
For future optimizations:
- Consider serving different sized video files for different devices
- Implement lazy loading for below-the-fold content
- Further optimize images with next/image quality settings
- Consider using WebP format for image assets

### 4. Adding New Sections
When adding new page sections:
- Follow the pattern of creating responsive styles based on device size
- Use percentage-based widths where possible
- Create device-specific layouts where needed
- Maintain the z-index hierarchy (header: 4, email section: 2, text section: 1)

### 5. API Integration
For implementing the email signup functionality:
- Add API endpoint for email collection in pages/api directory
- Update the handleSubmit function in EmailSection.tsx
- Ensure proper error handling and loading states
- Add CSRF protection for the form submission

### 6. Browser Compatibility
The site has been tested on:
- Chrome (latest)
- Safari (latest)
- Firefox (latest) 
- Edge (latest)

When making changes, test across these browsers and ensure compatibility with:
- iOS Safari
- Chrome for Android

## Known Issues and Limitations

1. **Email Form**: The form currently logs submissions to the console. A backend API needs to be implemented.

2. **Video Loading**: On slow connections, the initial video loading can take time - consider adding a placeholder image.

3. **iPhone SE Layout**: While optimized, some edge cases may still exist with extremely small screens where text might be difficult to read.

4. **Scroll Animation**: The text section animation depends on scroll position and may behave differently on various browser/device combinations.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
