

# Connect Dashboard Data from Google Sheets

## Overview
Create an integration that pulls dashboard data from a Google Spreadsheet, replacing the current hardcoded mock data. This involves building an edge function to read from Google Sheets API and updating dashboard components to fetch live data.

## Architecture

```text
Google Sheet ──► Edge Function (proxy) ──► Dashboard Components
                  (reads sheet via          (fetch on load,
                   Google Sheets API)        display data)
```

## Google Sheet Structure
You'll need a Google Sheet with tabs matching your dashboard sections:
- **KPIs** — Revenue, Food Cost %, Waste %, etc.
- **Revenue** — Monthly revenue vs target
- **Food Cost** — Monthly actual vs target
- **Waste** — Weekly waste data + categories
- **Inventory** — Current stock items
- **Menu** — Menu item performance
- **Marketing** — Channel performance + campaigns

## Implementation Steps

### 1. Set up Google Sheets API access
- Create a Google Cloud service account with Sheets API enabled
- Share your Google Sheet with the service account email (read-only)
- Store the service account JSON key and Sheet ID as secrets

### 2. Create edge function `read-google-sheet`
- Accepts a `tab` query parameter (e.g., `?tab=KPIs`)
- Authenticates with Google Sheets API using the service account
- Returns the sheet data as JSON
- Includes CORS headers for frontend access

### 3. Create a data hook `useSheetData`
- Custom React hook that calls the edge function
- Caches results to avoid redundant fetches
- Returns `{ data, loading, error }` for each section
- Transforms raw sheet rows into the typed objects the dashboard components expect

### 4. Update dashboard components
- Replace static imports from `dashboardData.ts` with the `useSheetData` hook
- Add loading skeletons while data fetches
- Add error states with fallback to sample data
- Components affected: KPICards, RevenueChart, FoodCostChart, WasteSection, InventorySection, MenuEngineering, MarketingSection, and the Marketing dedicated page

### 5. Settings page for Sheet configuration
- Add a simple settings form where the user can enter/update their Google Sheet ID
- Store the Sheet ID per user in the database (new `user_settings` table)

## What You Need to Provide
1. **Google Cloud service account JSON key** — for API authentication
2. **Google Sheet ID** — from the sheet URL (the long string between `/d/` and `/edit`)
3. **Sheet must be shared** with the service account email address

## Technical Details
- Edge function uses Google Sheets API v4 (`sheets.googleapis.com/v4/spreadsheets`)
- JWT-based auth from service account credentials (no OAuth consent needed for server-to-server)
- Data is fetched fresh on each page load (can add caching later)
- Fallback to existing mock data if the sheet is unavailable

