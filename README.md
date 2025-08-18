# eGain Analytics

An analytics dashboard built for sales representatives to gain insight into website visitors. The platform provides company-level summaries, web logs, and trend analysis to help prioritize outreach and identify high-interest accounts.

## Live Demo

[Live Site] https://egain-analytics.vercel.app/

## Project Structure

```
├── backend/
│   ├── app/
│   ├── postman-collection/
│   ├── requirements.txt
│   ├── visitors.json 
│   └── ...        
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   ├── vercel.json           
│   └── ...
├── render.yaml
└── README.md
```

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: FastAPI (Python)
- **Data Source**: Local JSON file (mock database)
- **Deployemnt**: Render (backend) and Vercel (frontend)

### Features and Navigation

- **Account Summaries (Landing Page)**  
  View a paginated table of all companies. Each row shows the company name, domain, total visits, last seen timestamp, and country. A **search bar** at the top lets you look up a company directly by its domain. Clicking a company opens its detailed account view.

- **Account Details**  
  See a full breakdown of one company’s activity. Includes domain, country, total visits, last seen, and calculated interest score. Below are tabs with visualizations:  
  - **Top Pages**: Most visited pages for the company.  
  - **Daily Activity**: Visit counts over time.  
  - **Recent Visits**: Table of the most recent interactions.

- **Web Logs**  
  Explore raw visitor logs with pagination. Includes filter boxes for **company**, **country**, and **page** to quickly drill into specific activity.

- **Trends**  
  View global analytics across all companies with graphs and tables:  
  - **Interest Scores**: Companies ranked by engagement.  
  - **Trending Companies**: Most active companies in the dataset.  
  - **Trending Countries**: Geographic distribution of visits.  
  - **Most Visited Pages**: Popular website sections overall.

- **Navigation Bar**  
  A persistent top menu links directly to **Account Summaries**, **Web Logs**, and **Trends** for quick access.



## API Endpoints

Included postman collection in backend

| Endpoint             | Method | Description                                                                 |
|----------------------|--------|-----------------------------------------------------------------------------|
| `/api/search`        | GET    | Search all visitor logs with optional filters (company, country, page).     |
| `/api/accounts`      | GET    | Get summary of all companies (domain, total visits, last seen, country).    |
| `/api/account/{domain}` | GET | Detailed view of one company by domain: visit activity, top pages, etc.     |
| `/api/trending`      | GET    | Top 5 companies and countries in the last 7 days.                            |
| `/api/pages`         | GET    | Top 10 most visited pages across all companies.                             |
| `/api/scores`        | GET    | Ranked list of companies by interest score (visits + recency + page spread).|


