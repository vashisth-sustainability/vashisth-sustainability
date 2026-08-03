import pandas as pd

# 1. Excel file ko read karein
excel_file = 'esg_data.xlsx'  # Apni Excel file ka naam yahan likhein
df = pd.read_excel(excel_file)

# 2. HTML cards ka code generate karna shuru karein
cards_html = ""

for index, row in df.iterrows():
    company = row['CompanyName']
    badge = row['CategoryBadge']
    desc = row['Description']
    pdf_link = row['PdfLink']

    # Har ek row ke liye professional card ka HTML template
    card_template = f"""
            <!-- {company} Profile Card -->
            <div class="card">
                <div>
                    <span class="badge">{badge}</span>
                    <h3>{company} ESG Profile</h3>
                    <p>{desc}</p>
                </div>
                <a href="{pdf_link}" target="_blank" class="btn-view">View Profile PDF</a>
            </div>
    """
    cards_html += card_template

# 3. Naya HTML page ka poora structure taiyar karein
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESG Profiles & Case Studies - Vashisth Sustainability</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8fafc;
            color: #334155;
        }}
        header {{
            background: #ffffff;
            padding: 15px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            position: sticky;
            top: 0;
            z-index: 1000;
        }}
        .logo {{
            font-weight: 700;
            font-size: 20px;
            color: #0f172a;
            text-decoration: none;
        }}
        nav ul {{
            list-style: none;
            display: flex;
            gap: 25px;
            margin: 0;
            padding: 0;
            align-items: center;
        }}
        nav ul li a {{
            text-decoration: none;
            color: #64748b;
            font-weight: 500;
            font-size: 15px;
            transition: color 0.3s ease;
        }}
        nav ul li a:hover, nav ul li a.active {{
            color: #059669;
        }}
        .profiles-hero {{
            background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%);
            color: #ffffff;
            text-align: center;
            padding: 70px 20px;
        }}
        .profiles-hero h1 {{
            font-size: 38px;
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }}
        .profiles-hero p {{
            font-size: 18px;
            color: #d1fae5;
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.6;
        }}
        .container {{
            max-width: 1200px;
            margin: -40px auto 60px auto;
            padding: 0 20px;
            position: relative;
        }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
        }}
        .card {{
            background: #ffffff;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-top: 4px solid #059669;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}
        .card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 20px 30px -10px rgba(5, 150, 105, 0.15);
        }}
        .badge {{
            background: #d1fae5;
            color: #065f46;
            font-size: 12px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            display: inline-block;
            width: max-content;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        .card h3 {{
            font-size: 22px;
            color: #0f172a;
            margin: 0 0 12px 0;
            font-weight: 600;
        }}
        .card p {{
            font-size: 14px;
            color: #475569;
            line-height: 1.6;
            margin-bottom: 25px;
        }}
        .btn-view {{
            background: #0f172a;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            transition: background 0.3s ease;
            display: block;
        }}
        .btn-view:hover {{
            background: #059669;
        }}
    </style>
</head>
<body>

    <header>
        <a href="index.html" class="logo">Vashisth Sustainability</a>
        <nav>
            <ul>
                <li><a href="index.html#home">Home</a></li>
                <li><a href="index.html#about">About</a></li>
                <li><a href="index.html#services">Services</a></li>
                <li><a href="index.html#industries">Industries</a></li>
                <li><a href="esg-profiles.html" class="active">ESG Profiles</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section class="profiles-hero">
        <h1>Featured ESG Profiles & Case Studies</h1>
        <p>Explore comprehensive sustainability benchmarking reports, emission data tracking, and framework alignments developed for leading sectors.</p>
    </section>

    <div class="container">
        <div class="grid">
            {cards_html}
        </div>
    </div>

</body>
</html>
"""

# 4. esg-profiles.html file ko automatically update/overwrite kar dein
with open('esg-profiles.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Success! Excel data ke mutabiq 'esg-profiles.html' update ho chuki hai.")