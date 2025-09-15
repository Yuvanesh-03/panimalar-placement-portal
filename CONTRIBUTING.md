# Contributing to Panimalar Placement Portal

First off, thank you for considering contributing to Panimalar Placement Portal! It's people like you that make this project such a great tool for students and recruiters.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to placement@pec.edu.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 🚀 Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your contribution
4. Make your changes
5. Push to your fork and submit a pull request

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**
- **List some other applications where this enhancement exists, if applicable**

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these issues:

- `good first issue` - issues which should only require a few lines of code
- `help wanted` - issues which should be a bit more involved than beginner issues
- `documentation` - issues related to improving documentation

## 🛠️ Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Make your changes**
   - Write/update tests as needed
   - Follow the coding style guide
   - Update documentation as needed

5. **Run tests**
   ```bash
   npm run test
   npm run lint
   ```

## 📝 Style Guidelines

### JavaScript/TypeScript Style Guide

- Use TypeScript for all new files
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for functions and complex logic
- Keep functions small and focused
- Use async/await over promises when possible

### React/Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types with TypeScript interfaces
- Extract reusable logic into custom hooks
- Follow the component file structure:
  ```tsx
  // 1. Imports
  // 2. Type definitions
  // 3. Component definition
  // 4. Styled components (if any)
  // 5. Export
  ```

### CSS/Styling Guidelines

- Use TailwindCSS utilities whenever possible
- Follow mobile-first responsive design
- Maintain consistent spacing and sizing
- Use CSS modules for component-specific styles
- Follow the project's color scheme

## 💬 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```bash
feat(auth): add JWT token refresh mechanism

fix(dashboard): resolve sidebar spacing issue on mobile devices

docs(readme): update installation instructions

style(components): format code according to prettier rules

refactor(api): simplify error handling logic

perf(analytics): optimize chart rendering for large datasets

test(auth): add unit tests for login functionality

chore(deps): update dependencies to latest versions
```

## 🔄 Pull Request Process

1. **Ensure your PR follows these guidelines:**
   - The PR has a descriptive title
   - The PR description clearly describes the problem and solution
   - The PR includes relevant issue numbers if applicable
   - All tests pass
   - Code follows the style guidelines
   - Documentation is updated if needed

2. **PR Title Format:**
   ```
   [Type] Brief description
   ```
   Examples:
   - `[Feature] Add dark mode support`
   - `[Fix] Resolve login redirect issue`
   - `[Docs] Update API documentation`

3. **PR Description Template:**
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Related Issue
   Fixes #(issue number)

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tests pass locally
   - [ ] Added new tests for features
   - [ ] Existing tests updated

   ## Screenshots (if applicable)
   Add screenshots here

   ## Checklist
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented my code where necessary
   - [ ] I have updated the documentation
   - [ ] My changes generate no new warnings
   ```

4. **Review Process:**
   - At least one maintainer review is required
   - All CI checks must pass
   - No merge conflicts
   - Up-to-date with the main branch

## 🤝 Community

### Getting Help

- Create an issue for bugs or feature requests
- Join our discussions on GitHub Discussions
- Email us at placement@pec.edu for other inquiries

### Recognition

Contributors will be recognized in the following ways:
- Listed in the project's README
- Mentioned in release notes
- Special badges for regular contributors

## 📚 Additional Resources

- [Project Documentation](./README.md)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

## 🎉 Thank You!

Thank you for taking the time to contribute to Panimalar Placement Portal! Your efforts help make this platform better for all students and recruiters at Panimalar Engineering College.

---

**Happy Coding! 🚀**