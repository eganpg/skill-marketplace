# CSV Data Analyst

**Version:** 1.0.0
**Author:** Pete Egan
**Category:** Data & Spreadsheets

## Overview

Paste in CSV data and get back a plain-English analysis — no Python, no BI tool, no data team required. Great for quick data checks, ad-hoc analysis, and turning spreadsheet exports into insights you can share in a meeting.

## What It Does

Given CSV data (pasted directly or described), returns:

- **Dataset overview** — row count, column names, data types inferred
- **Statistical summary** — min, max, mean, median for numeric columns
- **Key observations** — top trends, notable values, outliers flagged
- **Data quality notes** — missing values, duplicates, suspicious entries
- **Suggested next steps** — questions worth investigating further, chart types that would visualize this well

## How to Use

1. Activate the **CSV Data Analyst** skill
2. Paste your CSV data directly into the chat (headers + data rows)
3. Optionally describe what you're trying to understand: `"I want to know which region has the most returns"` or `"Flag anything that looks unusual"`
4. Review the analysis and ask follow-up questions

## Example Input

```
Month,Revenue,Orders,Avg Order Value,Returns
Jan,42500,312,136.22,18
Feb,38200,287,133.10,22
Mar,51000,398,128.14,15
Apr,49800,371,134.23,31
May,61200,445,137.53,19
Jun,58900,423,139.24,24
```

## Example Output

**Dataset Overview**
6 rows × 5 columns. Monthly sales data covering January–June.

**Summary**
- Revenue ranged from $38,200 (Feb) to $61,200 (May), with an upward trend from March onward
- Average order value is stable ($128–$139), suggesting volume is driving growth, not pricing changes
- **April returns spike (31)** is a notable outlier — 2× the monthly average of 19.8

**Data Quality**
No missing values. All numeric columns are clean.

**Suggested Next Steps**
- Investigate April returns spike — was there a specific product, promotion, or fulfillment issue?
- Plot revenue vs. returns to check if high-revenue months correlate with more returns
- Calculate return rate (returns/orders) per month for a fairer comparison

## Tips

- Works best with clean, well-labeled CSV exports from tools like Google Sheets, Salesforce, or Shopify
- You don't need to clean the data first — Claude will flag quality issues as part of the analysis
- For large datasets, paste the first 50–100 rows and describe what the full dataset contains

## Installation

After downloading, drag the `.skill` file into the Claude desktop app.
