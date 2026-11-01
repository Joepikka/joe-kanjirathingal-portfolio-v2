"""Build the one-page resume PDF (assets/joe-kanjirathingal-resume.pdf).

Run: python scripts/build_resume.py
Needs reportlab and the Calibri fonts that ship with Windows (C:/Windows/Fonts).
Edit the CONTENT section below, rebuild, and check that it still fits one page.
"""
from pathlib import Path

from reportlab.lib.colors import black
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "joe-kanjirathingal-resume.pdf"
FONTS = Path("C:/Windows/Fonts")

pdfmetrics.registerFont(TTFont("Calibri", str(FONTS / "calibri.ttf")))
pdfmetrics.registerFont(TTFont("Calibri-Bold", str(FONTS / "calibrib.ttf")))
pdfmetrics.registerFont(TTFont("Calibri-Italic", str(FONTS / "calibrii.ttf")))
pdfmetrics.registerFontFamily("Calibri", normal="Calibri", bold="Calibri-Bold", italic="Calibri-Italic")

BODY = 10.1
name = ParagraphStyle("name", fontName="Calibri-Bold", fontSize=23, leading=26, alignment=TA_CENTER)
head = ParagraphStyle("head", fontName="Calibri", fontSize=10.8, leading=13.2, alignment=TA_CENTER)
section = ParagraphStyle("section", fontName="Calibri-Bold", fontSize=10.2, leading=12.4, spaceBefore=6, spaceAfter=2.5)
body = ParagraphStyle("body", fontName="Calibri", fontSize=BODY, leading=11.9)
title = ParagraphStyle("title", parent=body, fontName="Calibri-Bold", spaceBefore=2.5)
meta = ParagraphStyle("meta", parent=body, fontName="Calibri-Italic")
bullet = ParagraphStyle("bullet", parent=body, leftIndent=12, bulletIndent=0)


def link(url, text):
    return f'<a href="{url}"><u>{text}</u></a>'


V1 = "https://joe-kanjirathingal-portfolio.vercel.app"  # the public portfolio; V2 is staging

# ---------------- CONTENT ----------------
HEADER = [
    "Data Analyst | Power BI, SQL, Python | Machine Learning",
    f"Thrissur, Kerala, India | +91 8075915694 | {link('mailto:joepikka5@gmail.com', 'joepikka5@gmail.com')} | "
    f"{link('https://github.com/Joepikka', 'github.com/Joepikka')}",
    f"{link('https://www.linkedin.com/in/joe-kanjirathingal-8b71a6360/', 'linkedin.com/in/joe-kanjirathingal-8b71a6360')} | "
    f"{link(V1, 'joe-kanjirathingal-portfolio.vercel.app')}",
]
SUMMARY = (
    "B.Tech Artificial Intelligence student (graduating March 2027) seeking data analyst, data science and machine "
    "learning internships. Built Power BI dashboards (DAX, Power Query, star-schema data models), Excel reports and SQL "
    "warehouses with tested ETL pipelines; skilled in data cleaning, data analysis, data visualization and statistics."
)
EDUCATION = ("B.Tech in Artificial Intelligence | Sep 2023 - Mar 2027 (expected)",
             "Vidya Academy of Science and Technology, Thrissur, Kerala")
SKILLS = [
    ("BI and Reporting", "Power BI (DAX, Power Query, data modeling), Excel (PivotTables, slicers, XLOOKUP, SUMIFS), KPIs"),
    ("Programming and Data", "Python, SQL (window functions, CTEs), pandas, NumPy, DuckDB, ETL, data cleaning"),
    ("Statistics", "regression, hypothesis testing, time-series analysis, A/B test design, forecasting, cohort analysis"),
    ("Machine Learning", "scikit-learn, PyTorch, Hugging Face Transformers, ONNX, NLP, classification, model evaluation"),
    ("Visualization and Tools", "Flourish, Chart.js, Leaflet, web scraping (Scrapling), FastAPI, React, PostgreSQL, Git"),
]
PROJECTS = [
    ("Kerala Vegetable Prices - Power BI Dashboard, Price Analysis and Spike Warning", "https://kerala-veg-prices.vercel.app", "Live site",
     "Nov 2026 | Power BI, Excel, Python, SQL, DuckDB, scikit-learn, statsmodels, Scrapling",
     ["Built a 3-page Power BI dashboard on a star-schema data model (9 tables, Power Query, 20 DAX measures, KPI cards, "
      "slicers) and an Excel workbook with PivotTables whose 12 KPIs match Python.",
      "Cleaned 26.5M Agmarknet records (5 GB) in a tested ETL pipeline; found Kerala paid 1.9-3.3x the all-India "
      "wholesale price, with 20%+ gaps between markets 40 km apart.",
      "Trained a logistic regression spike-warning model on a chronological split: 0.33 PR-AUC versus 0.04 chance, "
      "warning of 4 of 5 held-out spikes a median 16 days early."]),
    ("Retail Analytics Lab - E-commerce Data Warehouse and Analysis", "https://retail-analytics-lab.vercel.app", "Live site",
     "Oct 2026 | Python, SQL, DuckDB, Parquet, NumPy, SciPy, Excel",
     ["Built a reproducible Python and DuckDB pipeline and star schema over 110M e-commerce events (4.6 GB); 14 data "
      "tests reconcile rows and $505.1M of revenue from raw files to every output.",
      "Detected a 48-hour purchase-tracking outage that created a false 53% weekend revenue effect; added automated "
      "gap detection and excluded the affected days from conversion analysis.",
      "Wrote SQL marts (window functions, cohorts, Pareto) and a business memo: 42% of buyers drive 79% of revenue; "
      "13-day forecast at 5.6% MAPE versus a 5.9% seasonal-naive baseline."]),
    ("QuoteCheck - Supplier Quotation Review and Product Matching", f"{V1}/project.html?id=quotecheck", "Project",
     "Oct 2026 - Present | Python, PyTorch, FastAPI, React, PostgreSQL, ONNX, Vercel",
     ["Built a quotation-review app with PDF/XLSX extraction, source-linked corrections, exact pricing and exports.",
      "Fine-tuned MiniLM on 19,835 product pairs; achieved 74.3% validation average precision and 64.7% F1 on a "
      "4,500-pair WDC Products benchmark, versus 43.4% F1 for the logistic baseline.",
      "Deployed ONNX CPU inference on Vercel with PostgreSQL; verified by 247 automated tests and 3 browser workflows."]),
    ("IntentDesk - NLP Classification and Evaluation", "https://github.com/Joepikka/intentdesk", "GitHub",
     "Oct 2026 | Python, scikit-learn, PyTorch, FastAPI, SQLite",
     ["Built an NLP workflow for 150 intent categories using frozen pretrained MPNet embeddings, a downstream "
      "classifier and probability calibration.",
      "96.24% accuracy on 4,500 CLINC150 test requests versus 91.96% for a lexical baseline; kept human review "
      "after unsupported-request detection failed."]),
    ("Kerala Crime Intelligence Map - Data Dashboard", "https://kerala-crime-map.pages.dev/", "Live demo",
     "Sep 2026 - Present | Python, JavaScript, Leaflet, Chart.js",
     ["Built an interactive dashboard of published Kerala Police statistics with district comparisons, trend charts "
      "and population-adjusted rates; reconciled district totals against the state total."]),
]
TRAINING = ("Python Full-Stack Development | SMEClabs, Kochi | Jun 2026 - Dec 2026 (expected)",
            "Six-month programme covering Python, SQL, Django, HTML/CSS and JavaScript.")
# -----------------------------------------


def story():
    s = [Paragraph("Joe Kanjirathingal", name), Spacer(1, 2)]
    s += [Paragraph(line, head) for line in HEADER]
    s += [Paragraph("SUMMARY", section), Paragraph(SUMMARY, body)]
    s += [Paragraph("EDUCATION", section), Paragraph(f"<b>{EDUCATION[0]}</b>", body), Paragraph(EDUCATION[1], body)]
    s += [Paragraph("TECHNICAL SKILLS", section)]
    s += [Paragraph(f"<b>{label}:</b> {text}", body) for label, text in SKILLS]
    s += [Paragraph("SELECTED PROJECTS", section)]
    for heading, url, label, when, bullets in PROJECTS:
        s.append(Paragraph(f"{heading} | {link(url, label)}", title))
        s.append(Paragraph(when, meta))
        s += [Paragraph(b, bullet, bulletText="•") for b in bullets]
    s += [Paragraph("TRAINING", section), Paragraph(f"<b>{TRAINING[0]}</b>", body), Paragraph(TRAINING[1], body)]
    return s


def main():
    doc = SimpleDocTemplate(str(OUT), pagesize=LETTER, leftMargin=0.6 * inch, rightMargin=0.6 * inch,
                            topMargin=0.5 * inch, bottomMargin=0.4 * inch,
                            title="Joe Kanjirathingal - CV", author="Joe Kanjirathingal")
    doc.build(story())
    pages = doc.page
    print(f"wrote {OUT.relative_to(ROOT)} ({pages} page{'s' if pages != 1 else ''})")
    if pages != 1:
        raise SystemExit("resume must fit on one page: shorten the content")


if __name__ == "__main__":
    main()
