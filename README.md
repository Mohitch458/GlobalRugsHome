# Global Rugs Home

A modern, responsive rug showcase and inquiry website built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. The project provides a luxury-oriented storefront for browsing rug collections, viewing product details, submitting reviews, requesting custom orders, and managing store content through an admin console.

# Visit the live Global Rugs Home wrbsite:

Live Site: http://globalrughome.com/

> **Project status:** Frontend-focused application. Product, category, review, and contact-setting data are currently persisted in the browser using `localStorage`.

## ✨ Features

### Customer Experience

- Luxury-style responsive storefront
- Hero section and brand story
- Curated rug collections
- Product browsing and category filtering
- Product detail pages
- Featured products
- Product images and multiple image URLs
- Product information including:
  - Name
  - Short and full descriptions
  - Price
  - Category
  - Material
  - Size
  - Stock status
  - Rating and review count
- Configurable price visibility
- Optional purchase/Amazon link support
- Customer reviews
- Review media support
- Custom order/inquiry page
- Contact page with configurable email settings
- Responsive navigation and footer
- Scroll-to-top behavior
- Toast notifications
- 404 / not-found page
- Smooth UI animations with Framer Motion

### Admin Console

The `/admin` route provides a management console for store content.

#### Product Management

- Add products
- Edit products
- Delete products
- Add multiple product image URLs
- Configure product category, material, and size
- Set featured products
- Configure price visibility
- Configure purchase availability
- Store Amazon product links

#### Category Management

- Add categories
- Edit categories
- Delete categories
- Configure category image and destination path

#### Contact Settings

- Configure recipient email address(es)
- Configure default email subject
- Configure reusable email body template
- Use `{{PRODUCT}}` as a product-name placeholder

## 🛍️ Rug Collections

The application includes sample collections such as:

- Floral Rugs
- Animal Rugs
- Modern Rugs
- Traditional Rugs
- Irregular & Artistic Rugs
- Natural Fiber Rugs
- Geometric Rugs
- Abstract Rugs
- Kids & Nursery Rugs
- Round Rugs
- Runner Rugs
- Oushak Rugs

Additional categories can be created from the admin console.

## 🧭 Application Routes

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/products` | Product/collection listing |
| `/products/:id` | Product details |
| `/reviews` | Customer reviews |
| `/custom-orders` | Custom order inquiries |
| `/contact` | Contact page |
| `/history` | Brand/history information |
| `/admin` | Store management console |
| `*` | Not-found page |

The routes are defined through React Router. citeturn1view2

## 🏗️ Technology Stack

### Frontend

- **React 18**
- **TypeScript**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **Framer Motion**
- **Lucide React**

### State & Data

- **TanStack React Query**
- Browser `localStorage`
- Custom storage utilities for products, categories, reviews, and contact settings

### Forms & Validation

- React Hook Form
- Zod
- `@hookform/resolvers`

### Testing & Code Quality

- Vitest
- Testing Library
- ESLint
- TypeScript

The current `package.json` also includes build, lint, test, preview, and GitHub Pages deployment scripts. citeturn1view0

## 📁 Project Structure

```text
GlobalRugsHome/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   ├── seedData.ts
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Admin.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomOrders.tsx
│   │   ├── History.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Products.tsx
│   │   └── Reviews.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── README.md
```

## 💾 Data Storage

The current application stores store data in the browser using `localStorage`.

The storage layer currently manages:

### Products

```text
id
name
description
shortDescription
price
salePrice
images
amazonLink
category
material
size
featured
colorPalette
stockStatus
rating
reviewsCount
showPricing
enablePurchase
createdAt
```

### Reviews

```text
id
name
rating
comment
media
userId
createdAt
```

### Categories

```text
id
name
image
path
className
createdAt
```

### Contact Settings

```text
email
subject
bodyTemplate
```

These structures are defined in `src/lib/storage.ts`. citeturn2view0

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Mohitch458/GlobalRugsHome.git
cd GlobalRugsHome
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

### 6. Run linting

```bash
npm run lint
```

### 7. Run tests

```bash
npm run test
```

The repository's current scripts are defined in `package.json`. citeturn1view0

## 🌱 Sample Data

When the homepage loads, the application initializes sample products, reviews, and categories when the corresponding browser storage is empty.

This makes the project usable immediately after installation without requiring an external database. citeturn2view1turn2view0

## 🖼️ Product Images

Products support multiple image URLs. The current application can use externally hosted images, including Google Drive image URLs and other image-hosting services.

For production use, it is recommended to move image storage to a dedicated image/CDN solution rather than relying on manually managed external URLs.

## 🔗 Amazon Integration

Products can contain an Amazon product URL.

The admin product form supports storing an Amazon link, while the product model also includes `showPricing` and `enablePurchase` controls for determining how product information and purchase actions are presented. citeturn2view0turn2view2

## 📧 Contact & Inquiry System

Contact settings are configurable from the admin console.

The email template supports:

```text
{{PRODUCT}}
```

This placeholder can be replaced with the relevant product name when an inquiry is made for a specific rug.

## 🎨 Design System

The interface is designed around a premium/luxury visual style using:

- Serif typography for headings
- Clean sans-serif body text
- Spacious layouts
- Product-focused imagery
- Gold-accent UI elements
- Responsive grids
- Subtle motion and transitions
- Accessible UI primitives from Radix/shadcn

## 📱 Responsive Design

The website is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

Tailwind CSS responsive utilities are used throughout the application.

## 🧪 Testing

Run the test suite with:

```bash
npm run test
```

For continuous test execution during development:

```bash
npm run test:watch
```

## 🚢 Deployment

The project includes a GitHub Pages deployment script:

```bash
npm run deploy
```

Before deploying, create a production build:

```bash
npm run build
npm run deploy
```

If deploying to a custom domain or another hosting platform, configure the Vite base path and hosting settings as required by the selected platform.

## ⚠️ Current Limitations

The current repository is primarily a frontend application.

- Data is stored in browser `localStorage`.
- Data is not shared between different browsers or devices.
- There is currently no server-side database.
- There is currently no server-side authentication/authorization layer documented in the application.
- Admin data changes are therefore local to the browser where they are made.
- External image URLs must remain accessible for images to load.

For a production e-commerce platform, the next architectural step would be to introduce a backend API, database, secure authentication, centralized media storage, and server-side admin authorization.

## 🔮 Recommended Future Improvements

- Node.js/Express or another backend API
- MongoDB/PostgreSQL database
- Secure admin authentication
- Role-based access control
- Cloud image storage/CDN
- Customer accounts
- Wishlist/favorites
- Shopping cart and checkout
- Order management
- Payment gateway integration
- Inventory management
- Search and advanced filters
- Email service integration
- Review moderation
- Analytics dashboard
- SEO metadata and structured data
- Automated CI/CD
- Production monitoring and error tracking

## 📄 License

No license is currently specified in the repository.

If this project will be distributed publicly, add an appropriate `LICENSE` file and update this section.

## 🔗 Repository

**GitHub:** https://github.com/Mohitch458/GlobalRugsHome

---

Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.
