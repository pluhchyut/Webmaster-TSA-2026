from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


CITATIONS = [
    'Wikimedia Commons contributor. "Downtown shops, New Providence, NJ." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_NJ_downtown_shops.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "New Providence EMS firehouse exterior." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_EMS_firehouse.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "New Providence Memorial Library exterior (spring)." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_Memorial_Library_exterior_spring.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "New Providence Memorial Library interior book stacks." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_Memorial_Library_interior_stacks.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "New Providence Memorial Library media shelves." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_Memorial_Library_media_shelves.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "New Providence public park with 9/11 memorial garden." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_NJ_public_park_with_9-11_Memorial.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "New Providence municipal building." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_NJ_municipal_building.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "Alan M. Augustine Pavilion, New Providence park." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_NJ_public_park_with_Augustine_pavilion.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "Salt Brook School, New Providence, NJ." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_NJ_Salt_Brook_School.jpg. Accessed 1 Apr. 2026.',
    'Wikimedia Commons contributor. "School campus drive, New Providence, NJ." <i>Wikimedia Commons</i>, Wikimedia Foundation, n.d., https://commons.wikimedia.org/wiki/File:New_Providence_NJ_school_campus_drive.jpg. Accessed 1 Apr. 2026.',
]


def get_times_font_name() -> str:
    candidates = [
        Path("/System/Library/Fonts/Supplemental/Times New Roman.ttf"),
        Path("/Library/Fonts/Times New Roman.ttf"),
        Path.home() / "Library/Fonts/Times New Roman.ttf",
    ]
    for candidate in candidates:
        if candidate.exists():
            pdfmetrics.registerFont(TTFont("TimesNewRoman", str(candidate)))
            return "TimesNewRoman"
    return "Times-Roman"


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent
    output_path = repo_root / "assets" / "docs" / "mla-works-cited.pdf"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    font_name = get_times_font_name()

    document = SimpleDocTemplate(
        str(output_path),
        pagesize=letter,
        leftMargin=inch,
        rightMargin=inch,
        topMargin=inch,
        bottomMargin=inch,
        title="Works Cited",
        author="New Providence Community Hub",
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "WorksCitedTitle",
        parent=styles["Normal"],
        fontName=font_name,
        fontSize=12,
        leading=24,
        alignment=1,
        spaceAfter=12,
    )
    entry_style = ParagraphStyle(
        "WorksCitedEntry",
        parent=styles["Normal"],
        fontName=font_name,
        fontSize=12,
        leading=24,
        leftIndent=18,
        firstLineIndent=-18,
        spaceAfter=0,
    )

    story = [Paragraph("Works Cited", title_style), Spacer(1, 2)]
    for citation in CITATIONS:
        escaped_citation = (
            escape(citation).replace("&lt;i&gt;", "<i>").replace("&lt;/i&gt;", "</i>")
        )
        story.append(Paragraph(escaped_citation, entry_style))

    document.build(story)
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
