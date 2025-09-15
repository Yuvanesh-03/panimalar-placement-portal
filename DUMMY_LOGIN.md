# Dummy Login Credentials

This document contains the dummy login credentials for testing the placement portal. These credentials are hardcoded into the application for easy development and demonstration purposes.

## Available Test Accounts

### 👨‍🎓 Student Account
- **Email**: `student@pec.edu`
- **Password**: `student123`
- **Role**: Student
- **Features**: Job search, applications, profile management, analytics

### 🏢 Company Account
- **Email**: `company@pec.edu`
- **Password**: `company123`
- **Role**: Company
- **Features**: Job posting, applicant management, company profile, analytics

### 👩‍💼 Placement Officer Account
- **Email**: `officer@pec.edu`
- **Password**: `officer123`
- **Role**: Officer
- **Features**: Student management, company management, placement drives, reports

## How to Use

1. Navigate to the login page (`/auth/login`)
2. Either:
   - **Option A**: Click on any of the credential cards shown on the login page to auto-fill the form
   - **Option B**: Manually enter the email and password from above
3. Click "Sign In" to access the respective dashboard

## Features by Role

### Student Dashboard (`/dashboard`)
- **Profile**: Complete student profile with resume upload
- **Job Search**: Browse and apply for jobs posted by companies
- **Applications**: Track application status and history
- **Analytics**: View placement statistics and progress

### Company Dashboard (`/company`)
- **Profile**: Company profile management
- **Post Jobs**: Create and manage job postings
- **Applicants**: View and manage job applicants
- **Analytics**: View hiring statistics and metrics

### Officer Dashboard (`/officer`)
- **Profile**: Officer profile management
- **Students**: Manage student records and profiles
- **Companies**: Manage company partnerships
- **Drives**: Organize placement drives
- **Reports**: Generate placement reports and analytics

## User Profile Data

Each dummy account comes with pre-populated profile data:

### Student Profile (John Doe)
- Roll Number: PEC2021001
- Department: Computer Science
- Year: 4th Year
- GPA: 8.5
- Skills: JavaScript, React, Node.js
- Phone: +91 9876543210

### Company Profile (Tech Corp Solutions)
- Industry: Information Technology
- Website: https://techcorp.com
- Location: Chennai, Tamil Nadu
- Company Size: 500-1000 employees
- Phone: +91 9876543211

### Officer Profile (Prof. Sarah Wilson)
- Employee ID: PEC2020001
- Department: Placement Cell
- Designation: Senior Placement Officer
- Experience: 5+ years
- Phone: +91 9876543212

## Navigation Flow

After successful login, users are automatically redirected to their role-specific dashboard:

- **Students** → `/dashboard`
- **Companies** → `/company`
- **Officers** → `/officer`

## Note for Developers

- These dummy credentials are implemented in `src/store/slices/authSlice.ts`
- The login form auto-fill functionality is in `src/pages/auth/Login.tsx`
- Authentication state is managed through Redux Toolkit
- Protected routes ensure users only access their permitted areas
- JWT tokens are simulated using dummy tokens stored in localStorage

## Security Note

⚠️ **Important**: These dummy credentials are for development and testing purposes only. They should be removed or secured before deploying to production.