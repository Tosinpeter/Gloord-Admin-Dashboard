# Gloord Admin Dashboard

A comprehensive admin dashboard for managing dermatology clinic operations, built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Role-based Access Control**: Separate interfaces for Admin and Doctor users
- **Patient Management**: Complete patient lifecycle management
- **Case Review System**: Streamlined case approval workflow
- **Analytics Dashboard**: Real-time metrics and charts for clinic performance
- **Multi-language Support**: English, French, and Arabic localization
- **Responsive Design**: Optimized for desktop and mobile devices
- **Notification System**: Real-time notifications for important updates
- **Product Catalog**: Manage treatment products and recommendations

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Internationalization**: next-intl
- **Testing**: Playwright (E2E), Vitest (Unit)
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd gloord-admin-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test:unit` - Run unit tests with Vitest
- `npm test:e2e` - Run end-to-end tests with Playwright
- `npm test:e2e:ui` - Run Playwright tests with UI
- `npm run test:all` - Run all tests

## Project Structure

```
app/                    # Next.js app directory
├── admin/             # Admin-specific pages
├── doctor/            # Doctor-specific pages
├── globals.css        # Global styles
├── layout.tsx         # Root layout
└── page.tsx           # Home page

components/            # Reusable components
├── ui/               # UI components (buttons, tables, etc.)
├── admin/            # Admin-specific components
└── ...

lib/                  # Utility functions and configurations
messages/             # Internationalization files
tests/                # Test files
```

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Component and utility function testing with Vitest
- **E2E Tests**: Full user journey testing with Playwright across Chromium, Firefox, and Safari

## Internationalization

The app supports multiple languages:

- English (en)
- French (fr)
- Arabic (ar) - RTL support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is private and proprietary.
