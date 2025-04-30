# Arfve Landing Page

A modern, responsive landing page for Arfve, a company building sustainable audio devices.

## Overview

This project is a responsive landing page for Arfve, showcasing the brand's focus on sustainability and cutting-edge technology in audio devices. Built with Next.js 15 and React 19, it features a clean, modern design with a hero image section, static text content, and an email signup form.

## Features

- Responsive design optimized for all device sizes (from iPhone SE to large desktops)
- Full-screen hero section with high-quality background image
- Static text section with bold brand messaging
- Email signup form with validation and success/error states
- Clean, minimalist UI following modern design principles
- Privacy policy modal and cookie consent implementation
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

## Code Organization

The codebase follows a minimalist, component-based structure:

### Core Principles
- **Component-Based Architecture**: UI is divided into reusable, focused components
- **Type Safety**: TypeScript interfaces define clear component props
- **Responsive Design**: All components adapt to different screen sizes
- **Performance Optimization**: Static rendering with client-side hydration

### Key Design Patterns
- **Custom Hooks**: The useWindowSize hook provides responsive breakpoint information
- **Context API**: Used for global state like modal management
- **Inline Styling**: Component-specific styling with inline styles and Tailwind
- **Component Composition**: Smaller components are assembled into the page layout

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
│ │ ├── Header.tsx        # Site header with logo
│ │ ├── HeroSection.tsx   # Image background hero section
│ │ ├── TextSection.tsx   # Static text content section
│ │ ├── EmailSection.tsx  # Email signup form section
│ │ ├── Footer.tsx        # Site footer with links
│ │ ├── ModalProvider.tsx # Context provider for modals
│ │ ├── PrivacyPolicy.tsx # Privacy policy modal content
│ │ └── CookieConsent.tsx # Cookie consent banner
│ │
│ ├── hooks/
│ │ └── useWindowSize.ts  # Custom hook for responsive breakpoints
│ │
│ └── config/             
│    └── emailConfig.ts   # Email submission configuration
│
├── public/               # Static assets
│ ├── images/             # Image assets directory
│ │ └── favicon.png       # Site favicon for metadata
│ ├── Arfve6.jpg          # Product image for email section
│ ├── arfve-logo.svg      # Main logo (white)
│ ├── arfve-logo-dark.svg # Dark version of logo
│
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration with custom breakpoints
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS configuration for Tailwind
└── eslint.config.mjs     # ESLint configuration
```

## Component Architecture

### Page Component (`src/app/page.tsx`)
The main entry point that renders the SimpleLanding component with configurable props:
- Passes content props to child components
- Provides static text content for the page

### SimpleLanding Component (`src/components/SimpleLanding.tsx`)
The main container component that arranges all sections in the proper order:
- Renders Header, HeroSection, TextSection, EmailSection, and Footer
- Passes appropriate props to each section
- Maintains overall page structure and container

### Header Component (`src/components/Header.tsx`)
- Shows the Arfve logo (light or dark version based on scroll position)
- Changes appearance on scroll (transparent to white background)
- Adjusts size and spacing based on device size
- Centered layout with responsive sizing

### HeroSection Component (`src/components/HeroSection.tsx`)
- Displays full-screen background image
- Simple, minimal design focused on visual impact
- Responsive height adjustments for different devices
- Subtle overlay for better text visibility when used with logo

### TextSection Component (`src/components/TextSection.tsx`)
- Displays static brand messaging
- Shows the first text line from the provided array
- Fully responsive with adjustments for screen sizes down to iPhone SE
- Uses dynamic sizing and positioning based on viewport width

### EmailSection Component (`src/components/EmailSection.tsx`)
- Displays product image with responsive adjustments
- Contains email signup form in a separate EmailForm component
- Handles form submission states and validation
- Adjusts layout for different device sizes
- Provides specialized optimizations for small screens

### Footer Component (`src/components/Footer.tsx`)
- Displays logo, copyright, and policy links
- Contains social media links to company profiles
- Adjusts layout for mobile screens (column vs. row layout)
- Provides access to privacy policy modal

### ModalProvider Component (`src/components/ModalProvider.tsx`)
- Provides context for modal management across the app
- Controls the state of privacy policy modal
- Uses React Context API for seamless integration

### CookieConsent Component (`src/components/CookieConsent.tsx`)
- Implements GDPR-compliant cookie consent management
- Provides granular control over cookie preferences
- Uses a consolidated approach to preference management

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

1. Hero image - Background image for the hero section
2. Product image (`public/Arfve6.jpg`) - Image for the email section
3. Logo files in both light and dark versions

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
- For `EmailSection`, preserve the specialized mobile layouts for small screens
- Maintain the current approach of using inline styles with device-specific calculations
- Continue extracting reusable logic to reduce component size and duplication

### 3. Performance Considerations
For future optimizations:
- Implement lazy loading for below-the-fold content
- Further optimize images with next/image quality settings
- Consider using WebP format for image assets

### 4. Adding New Sections
When adding new page sections:
- Follow the pattern of creating responsive styles based on device size
- Use percentage-based widths where possible
- Create device-specific layouts where needed
- Maintain the z-index hierarchy (header: 4, content sections: 2-3)
- Extract reusable components to maintain maintainable file sizes

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

2. **iPhone SE Layout**: While optimized, some edge cases may still exist with extremely small screens where text might be difficult to read.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.



the steps is general, loook in my code to always do it based on what we have and how we doo
