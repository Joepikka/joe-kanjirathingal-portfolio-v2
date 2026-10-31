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


V1 = "https://joe-kanjirathingal-portfolio.vercel.app"
V2 = "https://joe-kanjirathingal-portfolio-v2.vercel.app"

# ---------------- CONTENT ----------------
HEADER = [
    "Data Science and Machine Learning",
    f"Thrissur, Kerala, India | +91 8075915694 | {link('mailto:joepikka5@gmail.com', 'joepikka5@gmail.com')}",
    f"{link('https://github.com/Joepikka', 'github.com/Joepikka')} | "
    f"{link('https://www.linkedin.com/in/joe-kanjirathingal-8b71a6360/', 'LinkedIn')} | {link(V2, 'Portfolio')}",
]
SUMMARY = (
    "B.Tech Artificial Intelligence student graduating in March 2027, seeking data analyst, data science and machine "
    "learning internships. Built a tested SQL warehouse over 110 million e-commerce events and fine-tuned and deployed "
    "a transformer model for product matching; project experience in Python, SQL, statistics, NLP classification, "
    "forecasting and dashboards, with reproducible evaluation."
)
EDUCATION = ("B.Tech in Artificial Intelligence | Sep 2023 - Mar 2027 (expected)",
             "Vidya Academy of Science and Technology, Thrissur, Kerala")
SKILLS = [
    ("Programming and Data", "Python, SQL (window functions, CTEs), DuckDB, Parquet, pandas, NumPy, data validation"),
    ("Analytics", "Excel (SUMIFS, XLOOKUP, PivotTables), cohort and funnel analysis, A/B test design, forecasting"),
    ("Machine Learning", "scikit-learn, PyTorch, Hugging Face Transformers, ONNX, NLP, classification, calibration"),
    ("Visualization and Applications", "Chart.js, Three.js, GeoPandas, Leaflet, FastAPI, Django, React, TypeScript"),
    ("Databases and Tools", "PostgreSQL, SQLite, Supabase, Git, GitHub, Vercel"),
]
PROJECTS = [
    ("Retail Analytics Lab - E-commerce Data Warehouse and Analysis", "https://retail-analytics-lab.vercel.app", "Live site",
     "Oct 2026 | Python, SQL, DuckDB, Parquet, NumPy, SciPy, Excel",
     ["Built a reproducible Python and DuckDB pipeline and star schema over 110M e-commerce events (4.6 GB); 14 data "
      "tests reconcile rows and $505.1M of revenue from raw files to every output.",
      "Detected a 48-hour purchase-tracking outage that created a false 53% weekend revenue effect; added automated "
      "gap detection and excluded the affected days from conversion analysis.",
      "Wrote SQL marts (window functions, cohorts, Pareto) and a decision memo: 42% of buyers drive 79% of revenue; "
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
      "Evaluated 4,500 CLINC150 known-intent test requests: 96.24% accuracy and 0.9624 macro-F1, versus 91.96% "
      "accuracy for the lexical baseline; retained human review after unsupported-request evaluation failed."]),
    ("Kerala Crime Intelligence Map - Data Dashboard", "https://kerala-crime-map.pages.dev/", "Live demo",
     "Sep 2026 - Present | Python, JavaScript, Leaflet, Chart.js",
     ["Built an interactive dashboard of published Kerala Police statistics with district comparisons, year filters, "
      "trend charts, population-adjusted rates and CSV exports.",
      "Reconciled source totals and distinguished 14-district POCSO coverage from statewide-only categories; "
      "documented partial-year 2026 data and population-base limitations."]),
    ("La Liga - Predictive Modeling and Evaluation", f"{V1}/project.html?id=laliga-ml", "Project",
     "Oct 2026 | Python, PyTorch, NumPy, scikit-learn, SQLite",
     ["Prepared historical football data with source hashes, reconciliation checks and chronological train/test splits.",
      "Built a leak-free chronological evaluation against a frozen baseline on 86 held-out fixtures; reported that the "
      "selected release did not improve on it (47.67% vs 50.00% accuracy)."]),
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
