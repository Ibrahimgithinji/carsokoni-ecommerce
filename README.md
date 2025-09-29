# Carsokoni - Car E-commerce Website

A modern, responsive React.js e-commerce website for browsing and purchasing cars online. Built with React, Redux, React Router, and custom CSS styling.

## 🚀 Features

### Core Features
- **Homepage**: Hero section, featured cars, categories, and newsletter signup
- **Car Listings**: Grid/list layout with filters, search, sorting, and pagination
- **Car Details**: Image gallery, specifications, pricing, and related cars
- **Shopping Cart**: Add/remove items, quantity management, and order summary
- **Authentication**: Login, register, and profile pages (UI only)
- **Responsive Design**: Mobile, tablet, desktop, and large screen support

### Advanced Features
- **Redux State Management**: Centralized state with cars, cart, and user slices
- **Search & Filters**: Real-time search with debouncing and multiple filter options
- **Image Gallery**: Interactive thumbnail navigation with lazy loading
- **Loading States**: Custom loading spinner and skeleton states
- **Animations**: Smooth transitions and hover effects
- **Error Handling**: 404 pages and error boundaries

## 🛠️ Tech Stack

- **Frontend**: React.js with functional components and hooks
- **State Management**: Redux Toolkit with slices
- **Routing**: React Router for navigation
- **Styling**: Custom CSS with CSS variables and responsive design
- **Icons**: SVG icons for UI elements
- **Data**: Local JSON file with 10 sample cars

## 📁 Project Structure

```
carsokoni/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Loading.js
│   │   │   └── SearchBar.js
│   │   ├── car/
│   │   │   ├── CarCard.js
│   │   │   └── FilterSidebar.js
│   │   └── cart/
│   ├── data/
│   │   └── cars.json
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── CarListingsPage.js
│   │   ├── CarDetailsPage.js
│   │   ├── CartPage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── ProfilePage.js
│   │   ├── AboutPage.js
│   │   ├── ContactPage.js
│   │   └── NotFoundPage.js
│   ├── store/
│   │   ├── slices/
│   │   │   ├── carsSlice.js
│   │   │   ├── cartSlice.js
│   │   │   └── userSlice.js
│   │   └── index.js
│   ├── styles/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── utils/
│   ├── App.js
│   └── index.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carsokoni
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🎨 Styling

### CSS Architecture
- **Custom CSS** without frameworks for full control
- **CSS Variables** for theme consistency and easy customization
- **Mobile-first** responsive design approach
- **BEM methodology** for class naming

### Responsive Breakpoints
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large screens**: 1440px+

### Key CSS Features
- Custom loading spinner animation
- Smooth hover effects on car cards
- Form validation states
- Dark/Light theme support via CSS variables

## 🔧 Redux Store Structure

```javascript
{
  "cars": {
    "items": [],
    "loading": false,
    "error": "",
    "filters": {
      "priceRange": [0, 5000000],
      "brands": [],
      "categories": [],
      "searchTerm": ""
    },
    "sortBy": "newest"
  },
  "cart": {
    "items": [],
    "total": 0,
    "itemCount": 0
  },
  "user": {
    "isAuthenticated": false,
    "userInfo": {},
    "loading": false
  }
}
```

## 🚗 Sample Car Data

The application includes 10 sample cars with complete information:

```json
{
  "id": "car_001",
  "brand": "Toyota",
  "model": "Camry",
  "year": 2023,
  "price": 2500000,
  "category": "Sedan",
  "images": ["url1", "url2"],
  "specifications": {
    "engine": "2.5L 4-Cylinder",
    "transmission": "CVT",
    "fuelType": "Petrol",
    "mileage": "15 km/l",
    "seatingCapacity": 5,
    "color": "Silver"
  },
  "features": ["Air Conditioning", "ABS", "Airbags"],
  "description": "A reliable and fuel-efficient sedan...",
  "inStock": true,
  "rating": 4.5
}
```

## 🎯 Key Features Implementation

### 1. Homepage
- Hero section with call-to-action
- Featured cars carousel
- Category navigation
- Newsletter signup form

### 2. Car Listings
- Grid and list view toggle
- Advanced filtering system
- Real-time search with debouncing
- Pagination with customizable items per page
- Sorting by price, year, name, and rating

### 3. Car Details
- Interactive image gallery
- Complete specifications display
- Related cars suggestions
- Add to cart functionality
- Social sharing options

### 4. Shopping Cart
- Persistent cart state
- Quantity management
- Price calculations
- Checkout process initiation
- Empty state handling

### 5. Authentication
- Form validation
- Protected routes
- User session management
- Profile management

## 🔍 Performance Optimizations

- **React.memo** for component memoization
- **useCallback** and **useMemo** for expensive operations
- **Lazy loading** for images
- **Debounced search** to reduce API calls
- **Code splitting** for optimal bundle sizes
- **Stable Redux selectors** to prevent unnecessary re-renders

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Redux team for state management
- Create React App for the boilerplate
- All contributors and supporters

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using React.js and Redux**