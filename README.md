# Next.js Clerk Authentication Demo

A comprehensive demonstration of Clerk authentication integration with Next.js 15, showcasing various authentication patterns and implementations.

## Overview

This project demonstrates:

- Pre-built Clerk authentication components
- Custom authentication flows
- Protected routes
- Dashboard implementations
- Profile management

## Application Structure

### Core Pages

[Home Page `/app/page.tsx`](/app/page.tsx "Home Page")

- Landing page with authentication status
- Login/signup navigation
- User info display for authenticated users

### Authentication Pages

[Sign Up Page `/app/signup/[[...signup]]/page.tsx`](/app/signup/[[...signup]]/page.tsx "Sign Up Page")

- Standard Clerk signup implementation
- Uses built-in Clerk SignUp component

[Login Page `/app/login/[[...login]]/page.tsx`](/app/login/[[...login]]/page.tsx "Login Page")

- Standard Clerk login page
- Uses built-in Clerk SignIn component

[Animated Sign Up & Login Page `/app/signup_and_login/[[...sign-up]]/page.tsx`](/app/signup_and_login/[[...sign-up]]/page.tsx "Animated Sign Up & Login Page")

- Combined signup/login interface
- Unified authentication flow

[Animated Custom Sign Up & Login Page `/app/signup_and_login_custom/[[...sign-up]]/page.tsx`](/app/signup_and_login_custom/[[...sign-up]]/page.tsx "Animated Custom Sign Up & Login Page")

- Custom authentication implementation
- Manual form handling and validation
- Custom error management
- Email verification flow

### Dashboard Implementation

[Role Based Dashboard Page `/app/dashboard/layout.tsx`](/app/dashboard/layout.tsx "Role Based Dashboard Page")

- Dashboard layout wrapper
- Authentication protection
- Navigation structure

[Admin Dashboard Section `/app/dashboard/@adminDashboard/page.tsx`](/app/dashboard/@adminDashboard/page.tsx "Admin Dashboard Section")

- Admin-specific dashboard view
- Protected admin-only content

[User Dashboard Section `/app/dashboard/@userDashboard/page.tsx`](/app/dashboard/@userDashboard/page.tsx "User Dashboard Section")

- Standard user dashboard
- User-specific content and actions

[Profile Page `/app/dashboard/profile/page.tsx`](/app/dashboard/profile/page.tsx "Update Image, Username, E-mail, Password")

- User profile management
- Profile image upload
- Account settings

### Utility Pages

[Password Reset `/app/password_reset/page.tsx`](/app/password_reset/page.tsx "Password Reset")

- Password reset functionality
- Email verification for reset

## Setup

### 1. Install dependencies:

```
npm install
```

### 2. Install dependencies:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### 3. Install dependencies:

```
npm run dev
```

## Technologies

- Next.js 15
- Clerk Authentication
- TypeScript
- Tailwind CSS
- Documentation
- Next.js Documentation
- Clerk Documentation
