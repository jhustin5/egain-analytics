from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from typing import Optional
from collections import defaultdict
from datetime import datetime, timedelta, timezone

VISITOR_DATA = json.loads(Path("backend/visitors.json").read_text())

app = FastAPI()

"""
CORS settings
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_ts(ts_str):
    return datetime.fromisoformat(ts_str).replace(tzinfo=timezone.utc)

def compute_interest_score(visits, days_since_last_seen, unique_pages):
    recency_score = max(0, 7 - days_since_last_seen)
    return round(
        2.0 * visits +
        3.0 * recency_score +
        1.5 * unique_pages,
        2
    )

"""
Search sorted visitor logs by optional filters (company, country, page).
Returns the first 100 matched records.
"""
@app.get("/api/search")
def search_visitors(
    company: Optional[str] = Query(None),
    country: Optional[str] = Query(None),
    page: Optional[str] = Query(None)
):

    results = VISITOR_DATA

    if company:
        results = [r for r in results if company.lower() in r["company_name"].lower()]
    if country:
        results = [r for r in results if r["country"].lower() == country.lower()]
    if page:
        results = [r for r in results if page.lower() in r["url_path"].lower()]

    results = sorted(results, key=lambda x: parse_ts(x["timestamp"]), reverse=True)

    return results[:100]


"""
Return summarized data for all company accounts.
Each entry includes visit count, country, and last seen timestamp.
"""
@app.get("/api/accounts")
def get_account_summary():
    companies = {}
    for r in VISITOR_DATA:
        domain = r["company_domain"]
        if domain not in companies:
            companies[domain] = {
                "company_name": r["company_name"],
                "domain": domain,
                "visits": 0,
                "last_seen": r["timestamp"],
                "country": r["country"],
            }
        companies[domain]["visits"] += 1
        if r["timestamp"] > companies[domain]["last_seen"]:
            companies[domain]["last_seen"] = r["timestamp"]
    return list(companies.values())

"""
Return detailed activity for a single company based on its domain.
Includes visit count, last seen, top pages, daily activity, and recent visits.
"""
@app.get("/api/account/{domain}")
def get_account_detail(domain: str):
    records = [r for r in VISITOR_DATA if r["company_domain"].lower() == domain.lower()]

    if not records:
        return {"error": f"No data found for domain: {domain}"}

    top_pages = {}
    activity_by_day = {}

    for r in records:
        path = r["url_path"]
        date = r["timestamp"][:10]
        top_pages[path] = top_pages.get(path, 0) + 1
        activity_by_day[date] = activity_by_day.get(date, 0) + 1

    latest_ts = max(r["timestamp"] for r in records)
    recent_visits = sorted(records, key=lambda r: r["timestamp"], reverse=True)[:5]
    recent_visits_trimmed = [
        {
            "timestamp": r["timestamp"],
            "url_path": r["url_path"],
            "country": r["country"]
        }
        for r in recent_visits
    ]

    now = datetime.now(timezone.utc)
    last_seen_dt = datetime.fromisoformat(latest_ts).replace(tzinfo=timezone.utc)
    days_since_last_seen = (now - last_seen_dt).days
    unique_pages = len(set(r["url_path"] for r in records))
    visits = len(records)

    interest_score = compute_interest_score(visits, days_since_last_seen, unique_pages)

    return {
        "company_name": records[0]["company_name"],
        "domain": domain.lower(),
        "country": records[0]["country"],
        "visits": visits,
        "last_seen": latest_ts,
        "top_pages": sorted(top_pages.items(), key=lambda x: x[1], reverse=True)[:5],
        "daily_activity": dict(sorted(activity_by_day.items())),
        "recent_visits": recent_visits_trimmed,
        "interest_score": interest_score
    }


"""
Return top 5 most active companies and countries in the last 7 days.
"""
@app.get("/api/trending")
def get_trending():
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=7)

    company_visits = defaultdict(int)
    country_visits = defaultdict(int)

    for r in VISITOR_DATA:
        ts = datetime.fromisoformat(r["timestamp"]).replace(tzinfo=timezone.utc)
        if ts >= cutoff:
            company_visits[r["company_domain"]] += 1
            country_visits[r["country"]] += 1

    top_companies = sorted(company_visits.items(), key=lambda x: x[1], reverse=True)[:5]
    top_countries = sorted(country_visits.items(), key=lambda x: x[1], reverse=True)[:5]

    return {
        "top_companies_last_7_days": [{"domain": d, "visits": v} for d, v in top_companies],
        "top_countries_last_7_days": [{"country": c, "visits": v} for c, v in top_countries]
    }


"""
Return the 10 most visited pages across all visitors.
"""
@app.get("/api/pages")
def get_top_pages():
    page_counts = defaultdict(int)

    for r in VISITOR_DATA:
        path = r["url_path"]
        page_counts[path] += 1

    top_pages = sorted(page_counts.items(), key=lambda x: x[1], reverse=True)

    return [{"url_path": p, "visits": v} for p, v in top_pages[:10]]

"""
Return weighted interest scores for all companies.
Scored by: visits + recency bonus + unique pages.
"""
@app.get("/api/scores")
def get_interest_scores():
    now = datetime.now(timezone.utc)
    scores = []

    company_records = defaultdict(list)
    for r in VISITOR_DATA:
        company_records[r["company_domain"]].append(r)

    for domain, records in company_records.items():
        visits = len(records)
        latest_ts = max(r["timestamp"] for r in records)
        last_seen_dt = datetime.fromisoformat(latest_ts).replace(tzinfo=timezone.utc)
        days_since_last_seen = (now - last_seen_dt).days
        unique_pages = len(set(r["url_path"] for r in records))

        score = compute_interest_score(visits, days_since_last_seen, unique_pages)

        scores.append({
            "domain": domain,
            "company_name": records[0]["company_name"],
            "country": records[0]["country"],
            "visits": visits,
            "last_seen": latest_ts,
            "interest_score": score,
        })

    return sorted(scores, key=lambda x: x["interest_score"], reverse=True)
