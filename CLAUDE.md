# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page application that integrates with Builder.io for content management. The project is built for creating dynamic marketing websites with customizable components, Mailchimp integration, and security features.

## Development Commands

```bash
# Start development server
yarn dev
# or
npm run dev

# Build for production
yarn build
# or
npm run build

# Start production server
yarn start
# or
npm run start

# Lint code
yarn lint
# or
npm run lint
```

## Architecture

### Builder.io Integration
- Content is managed through Builder.io CMS using the `@builder.io/sdk-react` package
- Custom components are registered in `components/builderRegistry.js` for use in the Builder.io visual editor
- Pages are dynamically generated from Builder.io content via the catch-all route `app/[...slug]/page.js`
- Site-wide data is fetched from the `site-data` model and passed through React Context

### Component System
- **Custom Components**: All reusable UI components are in `/components` directory
- **Builder Registry**: Components must be registered in `builderRegistry.js` with their inputs/props defined for Builder.io compatibility
- **Theme Support**: Most components support light/dark/white theme variants
- **Icon Integration**: Uses `react-icons` library, particularly icons from `AiOutline*` family

### Key Dependencies
- **Next.js 15**: App Router with React 19 RC
- **Builder.io SDK**: Content management and visual editing
- **Tailwind CSS + DaisyUI**: Styling framework with pre-built components
- **Arcjet**: Security protection (bot detection, rate limiting, shields)
- **React Icons**: Icon library
- **Mailchimp Integration**: Newsletter subscription via custom API route

### API Routes
- `app/api/subscribe/route.js`: Handles Mailchimp newsletter subscriptions with Arcjet security protection
- Includes bot detection, rate limiting, and IP validation
- Supports UTM parameter tracking and custom tags

### Environment Variables Required
```bash
NEXT_PUBLIC_BUILDER_API_KEY=  # Builder.io public API key
NEXT_PUBLIC_GTM=              # Google Tag Manager ID
ARCJET_KEY=                   # Arcjet security key
MAILCHIMP_API_KEY=            # Mailchimp API key
MAILCHIMP_LIST_ID=           # Mailchimp list ID
```

### Content Models in Builder.io
- `page`: Main page content
- `site-data`: Global site configuration (fonts, etc.)
- `popup`: Popup components
- Additional models for CSS, symbols, and imports

### Typography and Fonts
- Dynamic Google Fonts loading based on site-data configuration
- CSS custom properties for body and display fonts
- Font families configurable through Builder.io site-data

### Security Features
- Arcjet integration for bot protection and rate limiting
- Shield protection against common attacks
- IP-based filtering for hosting providers
- Request validation and sanitization

## Development Workflow

When adding new components:
1. Create component in `/components` directory
2. Register in `builderRegistry.js` with appropriate inputs
3. Import and add to `customComponents` array
4. Test in Builder.io visual editor

When modifying existing components, ensure:
- Theme support is maintained (light/dark/white)
- Props are properly typed in the registry
- Builder.io compatibility is preserved
- Responsive design is maintained

## Project Structure Notes

- `/app`: Next.js app router structure
- `/components`: React components and Builder.io registry
- `/helpers`: Utility functions for data processing
- `/assets`: Static images and assets  
- `/import`: Builder.io import configurations and schemas
- `/scripts`: Separate Node.js utilities (has own package.json)