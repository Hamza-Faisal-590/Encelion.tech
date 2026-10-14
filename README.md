# Encelion.tech — Next.js Static Frontend

Modern, high-performance static website and interactive application interface for **Encelion.tech** — building intelligent AI solutions for modern businesses.

## Overview

This repository contains the standalone Next.js frontend, crafted with:
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS & Modern Design System (Space Grotesk, Space Mono, DM Sans)
- **Icons**: [Lucide React](https://lucide.dev/) & 3D custom branding assets
- **3D Graphics & Animations**: Three.js, React Three Fiber, React Three Drei, Framer Motion
- **State Management**: Zustand & React Query

## Features & Pages

- **Landing Page (`/`)**: Hero with 3D robot graphics, interactive pills, services overview, product showcases, case studies, founders, and contact CTA.
- **About (`/about`)**: Company vision, leadership team, values, and company milestones.
- **Services (`/services`, `/services/[slug]`)**: Complete showcase of AI services (Autonomous Agents, Enterprise Chatbots, Workflow Automation, Computer Vision, Custom AI).
- **Products (`/products`)**: Enterprise product lineup with feature breakdowns and interactive previews.
- **Case Studies (`/case-studies`, `/case-studies/[slug]`)**: Comprehensive case studies with ROI metrics and impact summaries.
- **Contact (`/contact`)**: Interactive inquiry and project onboarding form.
- **Auth & Dashboard (`/login`, `/register`, `/dashboard`, `/agents`, `/analytics`, `/workflows`, `/knowledge`, `/leads`, `/vision`, `/voice`, `/settings`)**: Interactive platform views.

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 2. Run the Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Build for Production / Static Export
```bash
pnpm build
# or
npm run build
```
