# Nakhlah Frontend Handoff

## Overview
This frontend is a React + TypeScript + Vite app for the Nakhlah platform experience. It is designed to support a public marketing experience, authentication flows, seeker/company role-aware routes, and Supabase-backed profile/auth interactions.

## Technology stack
- React 19
- TypeScript
- Vite
- React Router
- Supabase JS client
- Tailwind CSS
- Oxlint

## Installation
```bash
npm install
```

## Local development
```bash
npm run dev
```

## Production build
```bash
npm run build
```

## Required environment variables
The frontend reads the following variables from the local environment:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_DEV_AUTH_BYPASS=false
VITE_DEV_AUTH_ROLE=seeker
```

Only the publishable Supabase key belongs in the frontend. Do not use service-role keys, database passwords, or connection strings in the client.

## Confirmed roles
The frontend currently supports only these role values:
- seeker
- company

## Frontend / backend boundary
The frontend is responsible for:
- rendering the UI
- routing by role
- calling Supabase Auth and Supabase client APIs from the services layer
- handling local development-only auth bypass behavior

The backend is responsible for:
- Supabase database schema and RLS policies
- profile creation and persistence
- jobs, applications, interview, messaging, storage, and notification permissions
- authentication redirect configuration in Supabase project settings

## Development auth bypass
Development-only bypass is available locally but is disabled by default:

```env
VITE_DEV_AUTH_BYPASS=false
```

It should not activate in production and should not be used for final verification.

## Backend-dependent features
These features require real backend support before they can be considered fully verified:
- automatic profile creation after registration
- profile persistence and role assignment
- RLS-backed job and application access
- company-owned job permissions
- applicant visibility and company-side filtering
- interviews, messages, notifications, storage, reports, and billing workflows

## Related handoff files
- [BACKEND_INTEGRATION_CHECKLIST.md](BACKEND_INTEGRATION_CHECKLIST.md)
