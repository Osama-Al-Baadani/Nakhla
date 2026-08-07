# Backend Integration Checklist

This frontend currently supports role-aware UI flows using the confirmed `profiles.role` values:

- `seeker`
- `company`

The frontend does not create or modify schema, policies, or data directly. The backend developer should confirm the following items before claiming live end-to-end verification.

## Authentication and profile lifecycle
- automatic profile creation after registration
- profile persistence after sign-up
- `profiles.role` persistence after registration
- handling of users whose profile exists but `role` is still `null`

## RLS and grants
- `profiles` table access and grants
- `jobs` table access and grants
- `applications` table access and grants
- storage buckets and upload policies

## Ownership and visibility
- `jobs.company_id` ownership mapping
- company-only job create/update/delete permissions
- seeker/company visibility of jobs
- applicant visibility for company-side pages

## Job and application workflows
- confirmed job status values
- confirmed application status values
- job create/update/delete permissions
- applications insert/select/update permissions
- status transition rules
- applicant details visibility

## Additional backend features
- interviews
- messages and Realtime
- training/tests/certificates
- notifications
- attendance/KPI/reports/billing

## Authentication configuration
- Supabase Authentication Site URL
- Supabase Authentication Redirect URLs
- email/password and social auth settings as needed

## Required test accounts for final verification
- real seeker account
- real company account
- at least one company-owned job
- at least one application flow for a seeker
- at least one company-side review flow for an application
