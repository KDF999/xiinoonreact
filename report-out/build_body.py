#!/usr/bin/env python3
"""Generate the XII NOON website project report body (ReportLab)."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Flowable, ListFlowable, ListItem,
)
from reportlab.platypus.tableofcontents import TableOfContents
import hashlib

# ───── Fonts ─────
FONT_DIR = "/usr/share/fonts"
pdfmetrics.registerFont(TTFont("Cormorant", f"{FONT_DIR}/truetype/cormorant-garamond/CormorantGaramond-Regular.ttf")) if os.path.exists(f"{FONT_DIR}/truetype/cormorant-garamond/CormorantGaramond-Regular.ttf") else None
# Fallback to Jost/Noto if Cormorant not present; use Noto Serif as serif proxy
SERIF = "NotoSerifSC" if os.path.exists(f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf") else "Times-Roman"
SERIF_B = "NotoSerifSC-Bold" if os.path.exists(f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf") else "Times-Bold"
SANS = "NotoSansSC" if os.path.exists(f"{FONT_DIR}/truetype/chinese/NotoSansSC-Regular.ttf") else "Helvetica"
SANS_B = "NotoSansSC-Bold" if os.path.exists(f"{FONT_DIR}/truetype/chinese/NotoSansSC-Bold.ttf") else "Helvetica-Bold"

if SERIF == "NotoSerifSC":
    pdfmetrics.registerFont(TTFont("NotoSerifSC", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("NotoSerifSC-Bold", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf"))
    registerFontFamily("NotoSerifSC", normal="NotoSerifSC", bold="NotoSerifSC-Bold")
if SANS == "NotoSansSC":
    pdfmetrics.registerFont(TTFont("NotoSansSC", f"{FONT_DIR}/truetype/chinese/NotoSansSC-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("NotoSansSC-Bold", f"{FONT_DIR}/truetype/chinese/NotoSansSC-Bold.ttf"))
    registerFontFamily("NotoSansSC", normal="NotoSansSC", bold="NotoSansSC-Bold")

# ───── Palette (luxury black/gold) ─────
BLACK = HexColor("#080704")
DEEP = HexColor("#0e0c08")
GOLD = HexColor("#c9a84c")
GOLD_LIGHT = HexColor("#e8c97a")
CREAM = HexColor("#f0e8d5")
CREAM_DK = HexColor("#c8b98a")
MUTED = HexColor("#8a7f6a")
LINE = HexColor("#d9cdb0")
PAGE_BG = HexColor("#faf8f3")  # warm white page
RULE = HexColor("#c9a84c")

OUTPUT = "/home/z/my-project/report-out/body.pdf"

# ───── Styles ─────
ss = getSampleStyleSheet()

H1 = ParagraphStyle("H1", parent=ss["Heading1"], fontName=SERIF_B, fontSize=26,
    leading=32, textColor=BLACK, spaceBefore=10, spaceAfter=12, alignment=TA_LEFT)
H2 = ParagraphStyle("H2", parent=ss["Heading2"], fontName=SERIF_B, fontSize=18,
    leading=24, textColor=BLACK, spaceBefore=18, spaceAfter=8, alignment=TA_LEFT)
H3 = ParagraphStyle("H3", parent=ss["Heading3"], fontName=SERIF_B, fontSize=13,
    leading=18, textColor=GOLD, spaceBefore=12, spaceAfter=6, alignment=TA_LEFT)
EYEBROW = ParagraphStyle("Eyebrow", fontName=SANS, fontSize=9, leading=12,
    textColor=GOLD, spaceAfter=4, alignment=TA_LEFT)  # tracking via uppercase
BODY = ParagraphStyle("Body", fontName=SERIF, fontSize=10.5, leading=16,
    textColor=HexColor("#2a2620"), spaceAfter=8, alignment=TA_JUSTIFY)
BODY_LEFT = ParagraphStyle("BodyLeft", parent=BODY, alignment=TA_LEFT)
BULLET = ParagraphStyle("Bullet", parent=BODY, leftIndent=14, bulletIndent=2, spaceAfter=4)
QUOTE = ParagraphStyle("Quote", fontName=SERIF, fontSize=13, leading=20,
    textColor=BLACK, spaceBefore=8, spaceAfter=10, alignment=TA_LEFT,
    leftIndent=16, borderColor=GOLD, borderPadding=10, borderWidth=0,
    backColor=HexColor("#f3eee2"))
SMALL = ParagraphStyle("Small", fontName=SANS, fontSize=8.5, leading=12,
    textColor=CREAM_DK, alignment=TA_CENTER)
TOC0 = ParagraphStyle("TOC0", fontName=SERIF_B, fontSize=11, leading=18,
    textColor=BLACK, leftIndent=0, spaceBefore=6)
TOC1 = ParagraphStyle("TOC1", fontName=SERIF, fontSize=10, leading=15,
    textColor=HexColor("#4a443a"), leftIndent=16, spaceBefore=2)
CAPTION = ParagraphStyle("Caption", fontName=SANS, fontSize=8.5, leading=12,
    textColor=CREAM_DK, alignment=TA_CENTER, spaceBefore=4, spaceAfter=10)

# ───── TocDocTemplate ─────
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, "bookmark_name"):
            level = getattr(flowable, "bookmark_level", 0)
            text = getattr(flowable, "bookmark_text", "")
            key = getattr(flowable, "bookmark_key", "")
            self.notify("TOCEntry", (level, text, self.page, key))

def heading(text, style, level=0):
    key = f"h_{hashlib.md5(text.encode()).hexdigest()[:8]}"
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

# ───── Decorative flowables ─────
class GoldRule(Flowable):
    def __init__(self, width=120):
        Flowable.__init__(self)
        self.width = width
        self.height = 8
    def draw(self):
        c = self.canv
        c.setStrokeColor(GOLD)
        c.setLineWidth(0.8)
        c.line(0, 4, self.width, 4)
        c.setFillColor(GOLD)
        c.circle(self.width/2, 4, 1.6, fill=1, stroke=0)

class SectionDivider(Flowable):
    def __init__(self, width=440):
        Flowable.__init__(self)
        self.width = width
        self.height = 24
    def draw(self):
        c = self.canv
        mid = self.width/2
        c.setStrokeColor(GOLD)
        c.setLineWidth(0.5)
        c.line(0, 12, mid-14, 12)
        c.line(mid+14, 12, self.width, 12)
        c.setFillColor(GOLD)
        c.saveState()
        c.translate(mid, 12)
        c.rotate(45)
        c.rect(-3, -3, 6, 6, fill=1, stroke=0)
        c.restoreState()

# ───── Page background + header/footer ─────
def page_decorations(canvas, doc):
    canvas.saveState()
    # warm white background
    canvas.setFillColor(PAGE_BG)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    # top gold hairline
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.4)
    canvas.line(20*mm, A4[1]-14*mm, A4[0]-20*mm, A4[1]-14*mm)
    # top brand mark (small)
    canvas.setFont(SANS, 7.5)
    canvas.setFillColor(CREAM_DK)
    canvas.drawString(20*mm, A4[1]-11*mm, "XII NOON  ·  PROJECT REPORT")
    canvas.drawRightString(A4[0]-20*mm, A4[1]-11*mm, "ULTRA-LUXURY TIMEKEEPING")
    # footer
    canvas.setLineWidth(0.3)
    canvas.setStrokeColor(HexColor("#d9cdb0"))
    canvas.line(20*mm, 14*mm, A4[0]-20*mm, 14*mm)
    canvas.setFont(SANS, 7.5)
    canvas.setFillColor(CREAM_DK)
    canvas.drawString(20*mm, 10*mm, "XII NOON  ·  Make with India, For the World")
    canvas.drawRightString(A4[0]-20*mm, 10*mm, f"Page {doc.page}")
    canvas.restoreState()

# ───── Story builder ─────

# Wrap long table cells in Paragraphs so they wrap within column width
CELL = ParagraphStyle("Cell", fontName=SERIF, fontSize=9, leading=12,
    textColor=HexColor("#2a2620"))
CELL_B = ParagraphStyle("CellB", fontName=SERIF_B, fontSize=9.5, leading=12.5,
    textColor=BLACK)
CELL_GOLD = ParagraphStyle("CellGold", fontName=SANS_B, fontSize=9, leading=12,
    textColor=GOLD)
def wrap_table(data, header=True):
    out = []
    for ri, row in enumerate(data):
        newrow = []
        for ci, cell in enumerate(row):
            if isinstance(cell, str):
                if header and ri == 0:
                    newrow.append(Paragraph(f'<font color="#f0e8d5">{cell}</font>', ParagraphStyle("hdr", fontName=SANS_B, fontSize=8.5, leading=11, textColor=CREAM)))
                else:
                    # first col = label -> gold/bold style handled by TableStyle; use CELL
                    newrow.append(Paragraph(cell, CELL))
            else:
                newrow.append(cell)
        out.append(newrow)
    return out

story = []

# ===== Table of Contents =====
story.append(Spacer(1, 8*mm))
story.append(Paragraph("CONTENTS", ParagraphStyle("TOCtitle", fontName=SANS, fontSize=11,
    leading=14, textColor=GOLD, alignment=TA_LEFT, spaceAfter=4)))
story.append(Paragraph("Table of Contents", ParagraphStyle("TOCh", fontName=SERIF_B,
    fontSize=24, leading=30, textColor=BLACK, spaceAfter=12)))
story.append(GoldRule(80))
story.append(Spacer(1, 10*mm))
toc = TableOfContents()
toc.levelStyles = [TOC0, TOC1]
story.append(toc)
story.append(PageBreak())

# ===== 1. Executive Summary =====
story.append(Paragraph("01  ·  OVERVIEW", EYEBROW))
story.append(heading("Executive Summary", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "This report presents the XII NOON digital experience — a multi-page cinematic website "
    "conceived as the digital expression of an ultra-luxury Indian timekeeping maison. "
    "The project delivers a sophisticated, narrative-driven web presence that translates the "
    "brand&rsquo;s philosophy of sovereignty, scarcity, and permanence into an immersive online journey. "
    "Every element, from the typography to the scroll-driven animations, has been crafted to "
    "position XII NOON not as a participant in global luxury, but as a definer of it.", BODY))
story.append(Paragraph(
    "The website comprises eight distinct routes, each serving a specific purpose within the "
    "brand&rsquo;s narrative architecture. The homepage establishes the maison&rsquo;s manifesto through "
    "a full-screen hero, philosophical pillars, and the complete collection. Four dedicated product "
    "pages present each object &mdash; The Tricolor Edition, The Emirati Edition, The Signature, and "
    "The Vajra Pen &mdash; with detailed specifications, heritage storytelling, and cinematic "
    "scroll-sequence animations. Supporting pages for Brand Story, Media, and Private Enquiry "
    "complete the experience, culminating in a working enquiry system that captures and persists "
    "qualified interest.", BODY))
story.append(Paragraph(
    "Built on a modern technology stack (Next.js, TypeScript, Prisma), the site is fully "
    "responsive, accessible, and production-ready. It integrates a film-grain aesthetic, a custom "
    "gold cursor, scroll-progress indicators, and Ken Burns parallax imagery to deliver an "
    "experience commensurate with the objects it presents. This document outlines the design "
    "philosophy, technical architecture, feature set, and deployment guidance for the project.", BODY))

story.append(Spacer(1, 8))
story.append(SectionDivider())
story.append(Spacer(1, 6))
story.append(Paragraph(
    "&ldquo;Not a response to the world of luxury &mdash; India&rsquo;s assertion within it.&rdquo;",
    ParagraphStyle("PullQuote", fontName=SERIF, fontSize=14, leading=22, textColor=BLACK,
    alignment=TA_CENTER, spaceBefore=4, spaceAfter=4)))
story.append(Paragraph("— XII NOON Manifesto", ParagraphStyle("PullAttr", fontName=SANS,
    fontSize=8.5, leading=12, textColor=GOLD, alignment=TA_CENTER, spaceAfter=8)))
story.append(PageBreak())

# ===== 2. Brand & Design Philosophy =====
story.append(Paragraph("02  ·  DESIGN", EYEBROW))
story.append(heading("Brand &amp; Design Philosophy", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))

story.append(heading("Visual Language", H2, 0))
story.append(Paragraph(
    "The visual language of XII NOON draws from the architectural precision and ceremonial "
    "geometry of Bharat, translated into a digital medium with uncompromising exactitude. The "
    "palette is deliberately restrained: a deep matte black (#080704) serves as the canvas, "
    "against which a single accent of antique gold (#c9a84c) and a warm cream (#f0e8d5) carry "
    "all typography and interaction. This disciplined chromatic approach ensures that the "
    "objects &mdash; not the interface &mdash; remain the focus of attention at all times.", BODY))
story.append(Paragraph(
    "Typography pairs Cormorant Garamond, a high-contrast serif evoking editorial luxury, with "
    "Jost, a geometric sans-serif used for eyebrows, labels, and metadata. Wide letter-spacing "
    "on uppercase labels lends a ceremonial, almost architectural quality to the navigation and "
    "section headers. A persistent film-grain overlay and a custom gold cursor with a trailing "
    "ring introduce tactile, cinematic texture that distinguishes the experience from a "
    "conventional e-commerce interface.", BODY))

story.append(heading("The Three Pillars", H2, 0))
story.append(Paragraph(
    "The maison&rsquo;s philosophy is structured around three immovable pillars that govern both "
    "the brand and its digital expression. These are not marketing claims but operating "
    "principles, reflected in everything from the restricted production numbers to the gated "
    "enquiry process.", BODY))

pillar_data = [
    ["Pillar", "Principle", "Digital Expression"],
    ["I", "Production is Restricted",
     "A finite allocation. The site never displays prices or stock counts; availability is conveyed only through private conversation."],
    ["II", "Access is Controlled",
     "No object is sold through the site. The Private Enquiry form gates all acquisition behind a reviewed, invitation-based process."],
    ["III", "Ownership is Extended, Never Offered",
     "The language throughout positions possession as a privilege conferred, not a transaction completed. The maison chooses its custodians."],
]
t = Table(wrap_table(pillar_data), colWidths=[15*mm, 46*mm, 100*mm])
t.setStyle(TableStyle([
    ("FONTNAME", (0,0), (-1,0), SANS_B),
    ("FONTSIZE", (0,0), (-1,0), 8.5),
    ("TEXTCOLOR", (0,0), (-1,0), CREAM),
    ("BACKGROUND", (0,0), (-1,0), BLACK),
    ("FONTNAME", (0,1), (0,-1), SERIF),
    ("FONTSIZE", (0,1), (0,-1), 20),
    ("TEXTCOLOR", (0,1), (0,-1), GOLD),
    ("FONTNAME", (1,1), (-1,-1), SERIF),
    ("FONTSIZE", (1,1), (-1,-1), 9.5),
    ("TEXTCOLOR", (1,1), (-1,-1), HexColor("#2a2620")),
    ("BACKGROUND", (0,1), (-1,-1), HexColor("#f3eee2")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [HexColor("#f3eee2"), HexColor("#faf8f3")]),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("ALIGN", (0,0), (0,-1), "CENTER"),
    ("LEFTPADDING", (0,0), (-1,-1), 10),
    ("RIGHTPADDING", (0,0), (-1,-1), 10),
    ("TOPPADDING", (0,0), (-1,-1), 10),
    ("BOTTOMPADDING", (0,0), (-1,-1), 10),
    ("LINEBELOW", (0,0), (-1,-1), 0.4, LINE),
    ("BOX", (0,0), (-1,-1), 0.6, GOLD),
]))
story.append(t)
story.append(Spacer(1, 10))
story.append(Paragraph(
    "These pillars inform every interaction design decision: the absence of a shopping cart, the "
    "emphasis on &lsquo;extension&rsquo; over &lsquo;purchase&rsquo; in all copy, and the deliberate friction "
    "introduced by requiring a reviewed enquiry before any conversation about acquisition begins.", BODY))
story.append(PageBreak())

# ===== 3. Site Architecture =====
story.append(Paragraph("03  ·  ARCHITECTURE", EYEBROW))
story.append(heading("Site Architecture &amp; Navigation", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "The website is structured as a multi-page experience with eight routes, each purpose-built "
    "for a distinct stage of the brand narrative. Navigation is anchored by a persistent header "
    "that transitions from transparent to a frosted backdrop on scroll, ensuring legibility "
    "without sacrificing the immersive feel. A dedicated mobile drawer provides the full "
    "navigation on small screens, with numbered links and a prominent enquiry call-to-action.", BODY))

routes = [
    ["Route", "Purpose", "Key Features"],
    ["/", "Homepage", "Cinematic hero, marquee, philosophy, collection grid, craft, gallery, standards, Vajra teaser, enquiry"],
    ["/tricolor", "The Tricolor Edition", "Product hero, story, heritage, cinematic scrub, specifications, highlights, related"],
    ["/emirati-edition", "The Emirati Edition", "Product hero, story, heritage, specifications, highlights, related"],
    ["/signature", "The Signature", "Product hero, story, heritage, specifications, highlights, related"],
    ["/vajra-pen", "The Vajra Pen", "Product hero, story, heritage, cinematic scrub above specs, highlights, related"],
    ["/brand-story", "Brand Story", "Manifesto, philosophy, craft, standards recap, closing statement"],
    ["/media", "Media Gallery", "Bento-style gallery of all imagery with hover captions, viewing CTA"],
    ["/private-enquiry", "Private Enquiry", "Full-page enquiry form with persistence, contact details, success state"],
]
rt = Table(wrap_table(routes), colWidths=[30*mm, 40*mm, 90*mm])
rt.setStyle(TableStyle([
    ("FONTNAME", (0,0), (-1,0), SANS_B),
    ("FONTSIZE", (0,0), (-1,0), 8.5),
    ("TEXTCOLOR", (0,0), (-1,0), CREAM),
    ("BACKGROUND", (0,0), (-1,0), BLACK),
    ("FONTNAME", (0,1), (1,-1), SANS_B),
    ("FONTSIZE", (0,1), (1,-1), 8.5),
    ("TEXTCOLOR", (0,1), (1,-1), GOLD),
    ("FONTNAME", (2,1), (2,-1), SERIF),
    ("FONTSIZE", (2,1), (2,-1), 9),
    ("TEXTCOLOR", (2,1), (2,-1), HexColor("#2a2620")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [HexColor("#f3eee2"), HexColor("#faf8f3")]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("TOPPADDING", (0,0), (-1,-1), 8),
    ("BOTTOMPADDING", (0,0), (-1,-1), 8),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, LINE),
    ("BOX", (0,0), (-1,-1), 0.6, GOLD),
]))
story.append(rt)
story.append(Spacer(1, 10))
story.append(Paragraph(
    "Every route is server-rendered for performance and SEO, with metadata (title, description, "
    "Open Graph) tailored per page. A shared SiteShell wrapper ensures consistent chrome &mdash; "
    "film grain, custom cursor, scroll progress, navigation, and footer &mdash; across all pages, "
    "while allowing each page&rsquo;s content to vary independently. All internal links use Next.js "
    "client-side navigation for instant, flicker-free transitions.", BODY))
story.append(PageBreak())

# ===== 4. The Collection =====
story.append(Paragraph("04  ·  COLLECTION", EYEBROW))
story.append(heading("The Collection", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "The collection comprises four objects of permanence, each conceived as an heirloom rather "
    "than an acquisition. The homepage presents them in a responsive two-by-two grid with hover "
    "zoom and quick-view dialogs; dedicated pages provide the full narrative for each, including "
    "heritage, specifications, and a related-objects carousel that encourages exploration across "
    "the collection.", BODY))

products = [
    ["Object", "Category", "Edition", "Defining Characteristic"],
    ["The Tricolor Edition", "The Watch", "Limited to 12", "Ashoka Chakra in platinum filigree; saffron sapphires, white diamonds, Colombian emeralds"],
    ["The Emirati Edition", "The Watch", "Private allocation", "Full pavé diamond case; Arabic geometric motifs cast in 18K gold"],
    ["The Signature", "The Watch", "By invitation", "Oval Colombian emerald dial; pavé diamond bezel; sculpted gold bracelet"],
    ["The Vajra Pen", "Writing Instrument", "Numbered series", "18K gold nib; hand-turned barrel; pavé diamond crown; Vajra thunderbolt motif"],
]
pt = Table(wrap_table(products), colWidths=[38*mm, 28*mm, 32*mm, 62*mm])
pt.setStyle(TableStyle([
    ("FONTNAME", (0,0), (-1,0), SANS_B),
    ("FONTSIZE", (0,0), (-1,0), 8.5),
    ("TEXTCOLOR", (0,0), (-1,0), CREAM),
    ("BACKGROUND", (0,0), (-1,0), BLACK),
    ("FONTNAME", (0,1), (0,-1), SERIF_B),
    ("FONTSIZE", (0,1), (0,-1), 10),
    ("TEXTCOLOR", (0,1), (0,-1), BLACK),
    ("FONTNAME", (1,1), (-1,-1), SERIF),
    ("FONTSIZE", (1,1), (-1,-1), 8.5),
    ("TEXTCOLOR", (1,1), (-1,-1), HexColor("#2a2620")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [HexColor("#f3eee2"), HexColor("#faf8f3")]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("TOPPADDING", (0,0), (-1,-1), 9),
    ("BOTTOMPADDING", (0,0), (-1,-1), 9),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, LINE),
    ("BOX", (0,0), (-1,-1), 0.6, GOLD),
]))
story.append(pt)
story.append(Spacer(1, 12))

story.append(heading("Product Page Structure", H2, 0))
story.append(Paragraph(
    "Each product page follows a consistent, considered structure designed to move the visitor "
    "from first impression to enquiry. A full-height page hero with breadcrumbs and the object&rsquo;s "
    "name sits over the product image. The story section pairs the long description with a "
    "large product image and an &lsquo;Enquire Privately&rsquo; call-to-action. A heritage section "
    "presents the cultural narrative against a blurred backdrop of the object. Specifications "
    "and highlights follow in a two-column layout, and a related-objects grid closes the page, "
    "encouraging cross-collection exploration.", BODY))
story.append(Paragraph(
    "Two of the four products &mdash; The Vajra Pen and, on the homepage, a Vajra teaser &mdash; "
    "feature the cinematic scroll-sequence animation described in the following section. The "
    "remaining two rely on the strength of their imagery and copy, ensuring variety in pacing "
    "across the collection.", BODY))
story.append(PageBreak())

# ===== 5. Cinematic Scroll Experience =====
story.append(Paragraph("05  ·  EXPERIENCE", EYEBROW))
story.append(heading("Cinematic Scroll-Sequence Experience", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "The signature interaction of the XII NOON website is the cinematic scroll-sequence &mdash; a "
    "technique in which a tall, sticky section reveals text beats in precise choreography as the "
    "visitor scrolls, accompanied by a slowly zooming background and a gold progress bar. This "
    "approach, inspired by high-end editorial and film title sequences, transforms passive "
    "scrolling into an act of discovery, demanding attention and rewarding it with narrative "
    "revelation.", BODY))

story.append(heading("How It Works", H2, 0))
story.append(Paragraph(
    "Each cinematic section spans several viewport heights (typically 420&ndash;560vh) with a "
    "sticky inner container that remains fixed while the visitor scrolls through it. As scroll "
    "progress advances from zero to one, a series of &lsquo;beats&rsquo; &mdash; headlines, subtitles, "
    "quotes, and outlined gold &lsquo;ghost words&rsquo; &mdash; fade in and out using a trapezoidal "
    "easing curve: a quick eighteen-percent fade-in, a sixty-four-percent hold at full opacity, "
    "and a quick eighteen-percent fade-out, with a subtle vertical drift that lends weight to "
    "the motion. The background image scales from 1.08 to 1.24 across the section, producing a "
    "slow cinematic zoom.", BODY))
story.append(Paragraph(
    "A gold progress bar at the base of each section provides a discreet sense of position "
    "within the sequence. The brand name &lsquo;XII NOON&rsquo; can be designated as a persistent beat, "
    "remaining at full opacity throughout the section while surrounding text changes &mdash; a "
    "technique used to anchor identity during the most narrative moments.", BODY))

story.append(heading("Where It Appears", H2, 0))
scrubs = [
    ["Location", "Beats", "Purpose"],
    ["Homepage Vajra Teaser", "4 beats + CTA", "Introduces the Vajra Pen mid-scroll; CTA links to the full product page"],
    ["Vajra Pen Product Page", "6 beats", "Full cinematic sequence above the specifications, themed to the object&rsquo;s heritage"],
]
st = Table(wrap_table(scrubs), colWidths=[56*mm, 38*mm, 66*mm])
st.setStyle(TableStyle([
    ("FONTNAME", (0,0), (-1,0), SANS_B),
    ("FONTSIZE", (0,0), (-1,0), 8.5),
    ("TEXTCOLOR", (0,0), (-1,0), CREAM),
    ("BACKGROUND", (0,0), (-1,0), BLACK),
    ("FONTNAME", (0,1), (-1,-1), SERIF),
    ("FONTSIZE", (0,1), (-1,-1), 9.5),
    ("TEXTCOLOR", (0,1), (-1,-1), HexColor("#2a2620")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [HexColor("#f3eee2"), HexColor("#faf8f3")]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("TOPPADDING", (0,0), (-1,-1), 9),
    ("BOTTOMPADDING", (0,0), (-1,-1), 9),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, LINE),
    ("BOX", (0,0), (-1,-1), 0.6, GOLD),
]))
story.append(st)
story.append(Spacer(1, 10))
story.append(Paragraph(
    "The teaser&rsquo;s call-to-action button fades in with its own scroll window and links to the "
    "full product page, where the complete six-beat sequence plays out above the specifications. "
    "This graduated reveal &mdash; from teaser to full sequence &mdash; creates a sense of depth and "
    "reward for the engaged visitor.", BODY))
story.append(PageBreak())

# ===== 6. Feature Inventory =====
story.append(Paragraph("06  ·  FEATURES", EYEBROW))
story.append(heading("Feature Inventory", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "Beyond the cinematic sequences, the website incorporates a suite of features designed to "
    "elevate the experience and support the maison&rsquo;s operational needs. The following inventory "
    "catalogues the principal capabilities by category.", BODY))

story.append(heading("Interactive &amp; Visual", H2, 0))
features_visual = [
    "<b>Custom gold cursor</b> &mdash; a dot with a trailing ring that grows on hover over interactive elements; disabled on touch devices for native behaviour.",
    "<b>Scroll-progress indicator</b> &mdash; a slim gold bar at the top of the viewport reflects reading position throughout the site.",
    "<b>Film-grain overlay</b> &mdash; a subtle, fixed noise texture lends a cinematic, tactile quality across all pages.",
    "<b>Scroll-reveal animations</b> &mdash; content blocks fade and rise into view via IntersectionObserver, with staggered delays for visual rhythm.",
    "<b>Ken Burns parallax</b> &mdash; hero and section backgrounds employ slow zoom and parallax translation for depth.",
    "<b>Marquee ticker</b> &mdash; a continuous gold ticker of brand phrases sits beneath the hero, with edge fades.",
    "<b>Rotating SVG seal</b> &mdash; a circular text-path brand seal slowly rotates in the hero corner on desktop.",
]
for f in features_visual:
    story.append(Paragraph(f"&bull; {f}", BULLET))

story.append(heading("Commerce &amp; Lead Capture", H2, 0))
features_comm = [
    "<b>Private Enquiry form</b> &mdash; a validated form (name, email, phone, country, object of interest, message) posts to a dedicated API and persists each submission to the database, with a success state and toast confirmation.",
    "<b>Newsletter signup</b> &mdash; the footer form captures email subscriptions, de-duplicated via upsert, with its own success state.",
    "<b>Product quick-view dialogs</b> &mdash; homepage collection cards open a detailed modal with specifications and an enquiry call-to-action, keeping visitors in context.",
    "<b>Object-of-interest preselection</b> &mdash; enquiry forms default to the relevant product when reached from a product context.",
]
for f in features_comm:
    story.append(Paragraph(f"&bull; {f}", BULLET))

story.append(heading("Technical &amp; Quality", H2, 0))
features_tech = [
    "<b>Fully responsive</b> &mdash; mobile-first layout with no horizontal overflow at 390px; touch-friendly targets and a dedicated mobile navigation drawer.",
    "<b>Server-rendered routes</b> &mdash; each page is a server component with tailored metadata for SEO and social sharing.",
    "<b>Type-safe data layer</b> &mdash; product data, specifications, and heritage are defined in a shared TypeScript module, ensuring consistency across homepage cards and product pages.",
    "<b>Accessible semantics</b> &mdash; semantic HTML, ARIA labels, keyboard-navigable controls, and alt text throughout.",
    "<b>Optimised assets</b> &mdash; all imagery served as WebP; fonts loaded with display swap for fast first paint.",
    "<b>Lint-clean codebase</b> &mdash; the project passes ESLint with zero errors or warnings.",
]
for f in features_tech:
    story.append(Paragraph(f"&bull; {f}", BULLET))
story.append(PageBreak())

# ===== 7. Technology Stack =====
story.append(Paragraph("07  ·  TECHNOLOGY", EYEBROW))
story.append(heading("Technology Stack", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))
story.append(Paragraph(
    "The project is built on a modern, production-grade stack chosen for performance, "
    "maintainability, and alignment with current best practices. Every dependency serves a "
    "specific purpose; no superfluous libraries are included.", BODY))

stack = [
    ["Layer", "Technology", "Role"],
    ["Framework", "Next.js 16 (App Router)", "Server rendering, routing, API routes, image optimisation"],
    ["Language", "TypeScript 5", "Type safety across the data layer, components, and APIs"],
    ["Styling", "Tailwind CSS 4 + custom CSS", "Utility-first layout plus bespoke luxury components (cursor, scrub, grain)"],
    ["UI Library", "shadcn/ui (New York)", "Accessible primitives (toast, dialog, etc.) with Lucide icons"],
    ["Database", "Prisma ORM + SQLite", "Schema-managed persistence for enquiries and newsletter subscriptions"],
    ["Fonts", "Cormorant Garamond + Jost", "Editorial serif for display; geometric sans for labels and UI"],
    ["AI Tooling", "z-ai-web-dev-sdk", "Used during build for content research (web reader) and image analysis (VLM)"],
]
skt = Table(wrap_table(stack), colWidths=[30*mm, 48*mm, 82*mm])
skt.setStyle(TableStyle([
    ("FONTNAME", (0,0), (-1,0), SANS_B),
    ("FONTSIZE", (0,0), (-1,0), 8.5),
    ("TEXTCOLOR", (0,0), (-1,0), CREAM),
    ("BACKGROUND", (0,0), (-1,0), BLACK),
    ("FONTNAME", (0,1), (0,-1), SANS_B),
    ("FONTSIZE", (0,1), (0,-1), 9),
    ("TEXTCOLOR", (0,1), (0,-1), GOLD),
    ("FONTNAME", (1,1), (-1,-1), SERIF),
    ("FONTSIZE", (1,1), (-1,-1), 9),
    ("TEXTCOLOR", (1,1), (-1,-1), HexColor("#2a2620")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [HexColor("#f3eee2"), HexColor("#faf8f3")]),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("LEFTPADDING", (0,0), (-1,-1), 8),
    ("RIGHTPADDING", (0,0), (-1,-1), 8),
    ("TOPPADDING", (0,0), (-1,-1), 8),
    ("BOTTOMPADDING", (0,0), (-1,-1), 8),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, LINE),
    ("BOX", (0,0), (-1,-1), 0.6, GOLD),
]))
story.append(skt)
story.append(Spacer(1, 12))
story.append(Paragraph(
    "The database schema defines two models: Enquiry (capturing full contact details, the object "
    "of interest, a status field for workflow management, and timestamps) and Newsletter (a "
    "deduplicated email registry). Both are accessed exclusively through validated API routes, "
    "which perform input sanitisation and return structured JSON responses. This separation "
    "keeps the data layer secure and testable, and allows the maison to integrate the captured "
    "leads into a CRM or email platform at a later stage without changes to the frontend.", BODY))
story.append(PageBreak())

# ===== 8. Deployment & Next Steps =====
story.append(Paragraph("08  ·  DEPLOYMENT", EYEBROW))
story.append(heading("Deployment &amp; Next Steps", H1, 0))
story.append(GoldRule(100))
story.append(Spacer(1, 6))

story.append(heading("Publishing to a Custom Domain", H2, 0))
story.append(Paragraph(
    "The website is ready for deployment to the maison&rsquo;s domain. The recommended path is "
    "Vercel, the platform maintained by the creators of Next.js, which offers automatic builds, "
    "global edge distribution, and seamless custom-domain configuration. The process is "
    "straightforward: the project repository is connected to a Vercel project, the platform "
    "auto-detects the Next.js framework, and each push to the main branch triggers a production "
    "deployment. The custom domain (for example, xiinoon.in) is then added in the project&rsquo;s "
    "domain settings, and the domain&rsquo;s DNS records are updated to point to Vercel&rsquo;s servers. "
    "SSL certificates are provisioned automatically.", BODY))
story.append(Paragraph(
    "Alternative platforms such as Netlify or self-hosting on a virtual private server are also "
    "viable. The choice of host should be weighed against the maison&rsquo;s requirements for "
    "global latency, operational overhead, and the database considerations outlined below.", BODY))

story.append(heading("Database Considerations for Production", H2, 0))
story.append(Paragraph(
    "The project currently uses SQLite, a file-based database, which is ideal for development but "
    "not suitable for serverless production environments where the filesystem is ephemeral. "
    "Before going live, the database should be migrated to a hosted PostgreSQL service &mdash; "
    "Vercel Postgres, Supabase, and Neon all offer capable free tiers. The migration involves "
    "updating the Prisma schema&rsquo;s provider, setting the production DATABASE_URL environment "
    "variable, and running the schema synchronisation command. The application code itself "
    "requires no changes, as all data access is abstracted through Prisma.", BODY))

story.append(heading("Recommended Next Steps", H2, 0))
nextsteps = [
    "<b>Content photography</b> &mdash; commission high-resolution photography of each object to replace the current imagery, ensuring consistency of lighting and background across the collection.",
    "<b>Cinematic product video</b> &mdash; produce short, looped product films for each object&rsquo;s hero, enabling the video-background variant of the cinematic scrub across all product pages.",
    "<b>Analytics &amp; insights</b> &mdash; integrate a privacy-respecting analytics platform to understand visitor journeys through the enquiry funnel.",
    "<b>CRM integration</b> &mdash; connect the enquiry API to the maison&rsquo;s CRM so that submissions create leads automatically, with email notifications to the relevant team.",
    "<b>Content expansion</b> &mdash; develop dedicated Brand Story and Media pages further with editorial content, behind-the-atelier films, and press features.",
    "<b>Internationalisation</b> &mdash; should the maison address multiple markets, the architecture supports the addition of locale-specific routes and translated copy.",
]
for n in nextsteps:
    story.append(Paragraph(f"&bull; {n}", BULLET))

story.append(Spacer(1, 14))
story.append(SectionDivider())
story.append(Spacer(1, 10))
story.append(Paragraph(
    "XII NOON does not follow time.",
    ParagraphStyle("Close1", fontName=SERIF, fontSize=16, leading=22, textColor=BLACK,
    alignment=TA_CENTER, spaceAfter=2)))
story.append(Paragraph("XII NOON defines it.",
    ParagraphStyle("Close2", fontName=SERIF, fontSize=16, leading=22, textColor=GOLD,
    alignment=TA_CENTER, spaceAfter=10, fontStyle="italic")))

# ───── Build ─────
doc = TocDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=22*mm, rightMargin=22*mm,
    topMargin=24*mm, bottomMargin=22*mm,
    title="XII NOON — Project Report",
    author="Z.ai",
    subject="Website & Digital Experience Report",
    creator="Z.ai",
)
doc.multiBuild(story, onFirstPage=page_decorations, onLaterPages=page_decorations)
print(f"Body PDF generated: {OUTPUT}")
