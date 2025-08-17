# eGain Analytics

An analytics dashboard built for sales representatives to gain insight into website visitors. The platform provides company-level summaries, web logs, and trend analysis to help prioritize outreach and identify high-interest accounts.

## Live Demo

[Live Site]

Note: Not including a run locally in README since there is a live link


## Project Structure

```
egain-analytics/
├── frontend/
├── backend/
├── visitors.json
└── README.md
```

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: FastAPI (Python)
- **Data Source**: Local JSON file (mock database)


## Features

- **Account Summary**  
  General summary of company visits and search tool for more detailed trends for a specific domain

- **Web Logs**  
  Web logs with filters for company, country, and visited page.

- **Trends**  
  Visual graphs and tables highlighting interest scores, top companies, countries, and visited pages.


### API Endpoints

Included postman collection in backend

| Endpoint             | Method | Description                                                                 |
|----------------------|--------|-----------------------------------------------------------------------------|
| `/api/search`        | GET    | Search all visitor logs with optional filters (company, country, page).     |
| `/api/accounts`      | GET    | Get summary of all companies (domain, total visits, last seen, country).    |
| `/api/account/{domain}` | GET | Detailed view of one company by domain: visit activity, top pages, etc.     |
| `/api/trending`      | GET    | Top 5 companies and countries in the last 7 days.                            |
| `/api/pages`         | GET    | Top 10 most visited pages across all companies.                             |
| `/api/scores`        | GET    | Ranked list of companies by interest score (visits + recency + page spread).|


