# Panimalar Placement Portal 🎓

<div align="center">
  <img src="https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.0+-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</div>

<br>

A comprehensive university placement management system designed specifically for **Panimalar Engineering College (PEC)**. This modern web application streamlines the campus recruitment process by connecting students, companies, and placement officers on a unified platform.

## 🌟 Key Features

### For Students 👨‍🎓
- **Smart Job Search**: Browse and filter job opportunities based on skills, location, and preferences
- **Application Tracking**: Monitor application status in real-time with visual progress indicators
- **Analytics Dashboard**: Track placement probability, profile views, and interview performance
- **Profile Management**: Build comprehensive profiles with academic records, skills, and achievements
- **Interview Preparation**: Access resources and schedule mock interviews
- **Real-time Notifications**: Get instant updates on new opportunities and application status
- **Messages**: Direct communication with recruiters and placement officers

### For Companies 🏢
- **Talent Discovery**: Access pre-screened student profiles matching job requirements
- **Job Posting Management**: Create, edit, and manage multiple job postings
- **Application Review**: Streamlined applicant tracking system with filtering and sorting
- **Campus Drive Coordination**: Schedule and manage placement drives efficiently
- **Analytics & Reports**: Track hiring metrics and recruitment funnel performance
- **Direct Messaging**: Communicate with potential candidates

### For Placement Officers 👔
- **Centralized Management**: Oversee all placement activities from a single dashboard
- **Student & Company Management**: Verify profiles and manage access permissions
- **Placement Drive Coordination**: Schedule, organize, and monitor campus recruitment events
- **Comprehensive Reports**: Generate placement statistics and trend analysis
- **Communication Hub**: Facilitate communication between students and recruiters
- **Data Analytics**: Visual insights into placement trends and performance metrics

## 🚀 Tech Stack

### Frontend
- **[React.js 18+](https://react.dev/)** - Modern UI library with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development experience
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Predictable state management
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Material UI](https://mui.com/)** - Pre-built component library
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions
- **[Chart.js](https://www.chartjs.org/)/[Recharts](https://recharts.org/)** - Interactive data visualization
- **[React Router v6](https://reactrouter.com/)** - Client-side routing
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling

### Architecture
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Granular permission management
- **Responsive Design** - Mobile-first approach for all screen sizes
- **Component-based Architecture** - Reusable and maintainable code structure

## 📱 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Dashboard+Preview" alt="Dashboard" width="800">
  <p><i>Student Dashboard with Analytics</i></p>
</div>

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Git for version control
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yuvanesh-03/panimalar-placement-portal.git
   cd panimalar-placement-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

### Run Tests

```bash
npm run test
# or
yarn test
```

## 🔐 Default Login Credentials

### Student Login
- **Email**: `student@pec.edu`
- **Password**: `student123`

### Company Login
- **Email**: `hr@techcorp.com`
- **Password**: `company123`

### Placement Officer Login
- **Email**: `officer@pec.edu`
- **Password**: `officer123`

## 📂 Project Structure

```
panimalar-placement-portal/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Common components
│   │   └── ui/          # UI library components
│   ├── layouts/         # Dashboard layouts
│   │   ├── StudentDashboard.tsx
│   │   ├── CompanyDashboard.tsx
│   │   └── OfficerDashboard.tsx
│   ├── pages/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   ├── student/     # Student pages
│   │   ├── company/     # Company pages
│   │   └── officer/     # Officer pages
│   ├── store/           # Redux store configuration
│   │   └── slices/      # Redux slices
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript type definitions
│   └── App.tsx          # Main app component
├── public/              # Static assets
├── .env.example         # Environment variables template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
└── package.json         # Project dependencies
```

## 🎨 Design Philosophy

- **Modern & Minimalistic**: Clean interfaces with focus on usability
- **Professional Color Palette**: Blue and emerald gradients for a corporate feel
- **Accessibility First**: WCAG compliant with keyboard navigation support
- **Performance Optimized**: Fast load times and smooth interactions
- **Intuitive Navigation**: User-friendly workflows for all stakeholders

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Yuvanesh** - *Lead Developer* - [GitHub](https://github.com/Yuvanesh-03)

## 🙏 Acknowledgments

- Panimalar Engineering College for the opportunity
- All contributors who have helped shape this project
- The open-source community for the amazing tools and libraries

## 📞 Contact

For queries related to this project, please contact:
- **Email**: placement@pec.edu
- **GitHub Issues**: [Create an issue](https://github.com/Yuvanesh-03/panimalar-placement-portal/issues)

---

<div align="center">
  <b>Built with ❤️ for Panimalar Engineering College students</b>
  <br>
  <sub>Making campus placements seamless and efficient</sub>
</div>

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
