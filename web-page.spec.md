# Designresearch och designbrief för svensk elektrikerfirma

**Leveransfil (.md):** [Ladda ner dokumentet](sandbox:/mnt/data/elektriker_designresearch.md)

Det här dokumentet sammanfattar mönster och best practice från svenska elektriker-/hantverkarhemsidor samt en rekommenderad struktur, designriktning och innehållslista för en ny webbplats för en elektrikerfirma som idag saknar online-närvaro. Fokus är en **enkel, säljande design** med tydliga CTA:er och snabb översikt av tjänster.

## Målbild och målgrupper

Utifrån kundens textunderlag (”Ett anrikt företag med framtiden i fokus… sedan 1925”) bör webbplatsen på några sekunder kommunicera:

1) **Trygghet och säkerhet** (lång erfarenhet + tydliga kvalitets-/regelefterlevnadssignaler).  
2) **Kapacitet och bredd** (både 0–0,4 kV och större elkraft/regionnät/kraftstationer upp till 145 kV).  
3) **Lätt väg till kontakt** (ring eller skicka förfrågan utan friktion).  

I svensk elektrikerbransch är det vanligt att besökaren får ”självsortera” tidigt: privatperson vs företag/entreprenad. DAEL har exempelvis separata ingångar i navigationen för ”Företag” och ”Privatperson”. citeturn4view0

Rekommenderad målgruppslogik för den här kunden (utifrån erbjudandet):

- **Privat & lantbruk / 0–0,4 kV**: vill ha trygghet, tydlighet, snabb bokning, gärna ROT-information.  
- **Industri / entreprenad**: vill se kompetens, arbetsmiljö/säkerhet, leveransmodell, resurser.  
- **Elnät/elkraft / 10–145 kV**: vill se spänningsnivåer, certifieringar och projektstyrning. (Den typen av B2B-ton är tydlig hos t.ex. Selectric och SEKE.) citeturn1view2turn4view3  

## Mönster i svenska elektriker- och elkraftwebbar

**Återkommande mönster på svenska elfirmors startsidor**

Många svenska elektrikerhemsidor följer en liknande konverteringslogik:

- Startsidan inleder nästan alltid med en **hero** som har en kort huvudrubrik + en primär CTA (ofta ”Kontakta oss”, ”Anlita oss” eller ”Begär offert”). citeturn1view1turn1view2turn4view4turn4view5  
- Tjänster presenteras som **klickbara kort** (foto/ikon + kort kopia + ”Läs mer”), vilket fungerar bra när kunden saknar mycket text/bildmaterial. citeturn1view1turn4view1turn4view4  
- Kontaktdetaljer och trovärdighet lyfts ofta i footer: **org.nr, adress, telefon/e-post**, samt ibland auktorisations-/registreringssignal. citeturn1view1turn4view1turn5view0  
- Större aktörer (och koncerner) visar ofta fler ”corporate”-sidor (hållbarhet, policy/ISO, karriär), medan mindre sajter kör en mycket kort meny (tjänster–om oss–kontakt). citeturn4view2turn1view2turn7view1  

**Inspirationsurval (svensk marknad) och vad vi kan återanvända**

| Exempel | Vad som fungerar väl | Design-/strukturidé att återanvända |
|---|---|---|
| KMS EL | Hero med ”Kontakt”-knapp och därefter visuella servicekort; beskriver även registrering hos Elsäkerhetsverket. citeturn1view1 | Startsidan som ”dashboard”: 4–6 servicekort direkt under hero, varje kort leder till egen sida med CTA. |
| Selectric | Minimalistisk, B2B-ton: rubrik om högspänning + ”Kontakta oss”, följt av block för Verksamhet/Kompetens/Kunden i fokus. citeturn1view2 | ”Single-page-känsla”: 3–4 innehållsblock som snabbt sammanfattar erbjudandet utan mycket fluff. |
| Elektrobyrån | Enkel struktur: om oss → tjänster → kontakt; cookie-dialog och länk till personuppgiftspolicy. citeturn5view1 | Stram 3–4-blocks startsida + tydlig policiesektion i footer. |
| Skäcklinge El | Två CTAs i hero (”Kontakta oss” + ”Våra tjänster”), tidig trygghetslista och kontaktformulär. citeturn4view5 | Primär/sekundär CTA i hero + kompakt ”trygghetsrad” (certifierad, punktlig, registrerad…). |
| Storstadens Elentreprenader | Toppbar med e-post + telefon; tre tydliga tjänsteblock. citeturn4view4 | ”Kontakt alltid synlig”: telefon/e-post direkt i header på desktop och klickbar ”Ring”-CTA på mobil. |
| Sallén Elektriska | Har en tydlig pris-/ROT-sektion (”Vad kostar en elektriker?”) som möter vanlig friktion. citeturn7view0 | För privatkund: kompakt ”Pris & ROT”-panel (om kunden vill/kan kommunicera principer). |
| SEKE | Positionerar sig som totalentreprenör inom elkraft upp till 145 kV. citeturn4view3 | För elkraft/B2B: ”kapabilitetsblock” (spänningsnivåer, geografi, leveransmodell, referenstyper). |
| SELEK | Har meny för tjänster, referensprojekt, hållbarhet och karriär. citeturn4view2 | Designa IA så att ”Referenser” och ”Lediga jobb” kan byggas på senare utan omtag. |

## Rekommenderad informationsarkitektur och sidmallar

Eftersom kunden saknar online-närvaro och har begränsat bild-/referensmaterial är en bra strategi att bygga en **MVP-struktur som går att växa i**.

**Rekommenderad meny (MVP)**

Start • Tjänster (dropdown) • Utbildningar • Maskinuthyrning • Om oss • Kontakt • Spontanansökan

Detta speglar också kundens egna innehållsstruktur (två tjänstenivåer + utbildningar + maskinuthyrning + kontakt och spontanansökan).

**Startsidans sektioner (rekommenderad ordning)**

1) **Hero**  
- Huvudrubrik: ”Ett anrikt företag med framtiden i fokus”  
- Undertitel: 1–2 rader som fångar bredden (0–0,4 kV + 10–145 kV) och geografi (Molkom/Karlstad, hela Sverige)  
- CTA: ”Kontakta oss” (primär) + ”Se tjänster” (sekundär)  

2) **Servicekarta / servicekort**  
- 5 kort: ”0–0,4 kV”, ”10–145 kV”, ”Entreprenad & personal”, ”Utbildningar”, ”Maskinuthyrning”  
- Denna ”kortvägg” är ett mycket vanligt och effektivt upplägg i branschen. citeturn1view1turn4view1turn4view4  

3) **Varför oss (trust tiles)**  
- 4–6 tiles: ”Sedan 1925”, ”Säkerhet & kvalitet”, ”Rikstäckande”, ”Utbildad personal”, ”Dokumentation”, ”Erfarenhet i lantbruk/industri/elnät (om sant)”  

4) **Om oss (kort berättelse)**  
- 6–8 rader om historia, orter och vad man faktiskt gör (detta är extra viktigt för att undvika att sajten känns ”tom” när material saknas)  

5) **Så går det till (process)**  
- 3–4 steg: Kontakt → Förslag/plan → Utförande → Dokumentation & uppföljning  
- Processblock gör tjänsten mer ”köpbar” även utan många case.  

6) **Kontaktblock**  
- Kort formulär + klickbar telefon + e-post  
- Om företaget kan hålla ett återkopplingslöfte (t.ex. ”svar inom 24h”) är det vanligt och konverteringsdrivande i branschen. citeturn3search17turn3search8  

**Snabb guide till sidtyper och CTA:er (för designteamet)**

| Sidtyp | Primär målgrupp | Primär CTA | Sekundär CTA | Innehåll som bör synas tidigt |
|---|---|---|---|---|
| Start | Alla | Kontakta oss / Ring | Se tjänster | Kort värdeerbjudande + servicekort + trust badges |
| Tjänst 0–0,4 kV | Privat, lantbruk | Få offert / Boka | ROT & FAQ | Exempeljobb + trygghetsrad (auktorisation/registrering) |
| Tjänst 10–145 kV | Elnät/elkraft, entreprenad | Entreprenadförfrågan | Se kapabilitet | Spänningsnivåer + leveransmodell + certifieringar |
| Utbildningar | Företag, HR/arbetsledare | Boka / be om datum | Föreslå kurs | Kurslista + språk (sv/en) + upplägg |
| Maskinuthyrning | Entreprenad, montageteam | Skicka förfrågan | Se lista | Sortiment + villkor (leverans, besiktning) |
| Kontakt | Alla | Skicka formulär | Ring | Klickbar telefon + orter + svarstid |
| Spontanansökan | Kandidater | Skicka ansökan | Se mer om oss | Kort pitch + formulär + CV-uppladdning |

**Sidmall: tjänstesida (gäller alla tjänster)**

- Intro: 3–5 rader  
- ”Det här hjälper vi med”: 5–7 punktlistor (”typiska jobb”)  
- ”Passar för”: privat/företag/industri (beroende på sida)  
- Geografiskt: Molkom/Karlstad + var ni tar jobb  
- ”Så går det till”: samma 3–4 steg  
- CTA + kontaktkort i sidkolumn eller sticky på mobil  

För högspänning/elkraft är det extra bra att ha ett tydligt kapabilitetsblock (spänningsnivåer, leveransmodell, projektledning) eftersom det är så den typen av aktörer ofta kommunicerar. citeturn1view2turn4view3turn4view2  

**Rekommenderad sid- och CTA-mappning (för designteamet)**

| Sida | Primär målgrupp | Primär CTA | Måste-ha innehåll | Bra trust-signal |
|---|---|---|---|---|
| Start | Alla | Kontakta oss / Ring | Tjänsteöverblick + process + kontakt | ”Sedan 1925” + ”Registrerad hos Elsäkerhetsverket” |
| 0–0,4 kV | Privat/lantbruk | Få hjälp / offert | Typiska jobb + ROT/FAQ (om relevant) | Auktorisation/registrering + dokumentation |
| 10–145 kV | Elnät/elkraft | Entreprenadförfrågan | Spänningsnivåer + leveransmodell + projektledning | Certifieringar/ID06/utbildningar (om sant) |
| Utbildningar | B2B | Boka / fråga om datum | Kurslista + språk (sv/eng) + metadata (längd, plats) | Säljtrygghet (”vi löser även specialkurser”) |
| Maskinuthyrning | B2B | Skicka förfrågan | Lista + leverans/returvillkor | ”Besiktning vid återlämning” (om ni vill) |
| Kontakt | Alla | Skicka | Form + telefon + e-post + orter | GDPR-notis + integritetspolicy |
| Spontanansökan | Jobbsök | Skicka ansökan | Form + CV-upload | Integritet + employer brand |

**Utbildningar (strukturförslag)**

- Lista utbildningar som ”chips”/kort med kort summary + CTA ”Boka/Fråga om datum”  
- Lägg till info att flera kurser kan köras på engelska (om det är en USP)  

**Maskinuthyrning (MVP som inte känns provisorisk)**

Kunden har i textunderlaget en ”Oj här var det tomt”-formulering. Rekommendationen är att ersätta den med en mer professionell variant:

> ”Sortimentet uppdateras. Skicka en förfrågan via formuläret så återkommer vi snabbt med pris och tillgänglighet.”

Lägg maskinlistan i tabell och planera för att komplettera med en bild per maskin senare.

**Kontakt (två flöden)**

För att hantera både privat och elkraft/entreprenad föreslås två kontaktflöden:

- ”Få hjälp / offert” (privat + mindre jobb): kort form  
- ”Entreprenadförfrågan / bemanning” (B2B): form med fler kvalificeringsfrågor (spänningsnivå, plats, tidsplan, dokumentkrav)  

**Spontanansökan**

Håll sidan enkel men seriös: employer brand-text + formulär + möjlighet att bifoga CV. Många större aktörer har separata karriär-/jobbsidor, men även mindre firmor samlar det under ”Jobba hos oss”. citeturn4view2turn4view4turn5view0  

## Designsystem: färg, typografi och komponenter

**Färgstrategi för röd/vit/blå logga**

Röd/vit/blå behöver inte göra designen ”tråkig”. Nyckeln är att:

- använda vit/ljusgrå som bas  
- använda **mörk blå** för ”tyngd” (header, footer, overlays)  
- använda **röd sparsamt** som CTA- och highlightfärg  

Tillgänglighet: WCAG förklarar att text behöver tillräcklig kontrast mot sin bakgrund för läsbarhet (SC 1.4.3 Contrast (Minimum)); logotyper är undantagna från kontrastkrav. citeturn8search3  

**Konkreta palettförslag (med hex) som passar loggans röd/vit/blå**

Palett A – Industriell & trygg (rekommenderas)  
- Bas: `#FFFFFF` (vit), `#F5F7FA` (ljus grå yta)  
- Text: `#111827`  
- Primär blå: `#0B1F3B` (marin)  
- CTA röd: `#C8102E` (signalröd)  
- Sekundär text: `#6B7280`  

Palett B – Modern tech (lite mer ”digital”)  
- Bas: `#FFFFFF`, `#F1F5F9`  
- Text: `#0F172A`  
- Blå: `#1D4ED8`  
- CTA röd: `#B91C1C`  

Palett C – Ljus med tydlig CTA (om ni vill låta foto dominera)  
- Bas: `#FFFFFF`, `#F8FAFC`  
- Text: `#111827`  
- Neutral accent: `#334155`  
- CTA röd: `#C8102E`  

**Typografi**

För en ”ren och säljande” känsla fungerar en modern sans:

- Rubriker: Inter / Montserrat / Poppins (semibold)  
- Brödtext: Inter / Source Sans 3 (regular)  

Att rubrikerna får vara stora och att content är tydligt skannbart är extra viktigt eftersom målgruppen ofta är mobil och vill agera snabbt.

**Komponenter som bör ingå i designsystemet**

- **Sticky header** med klickbar telefon + ”Kontakta oss”-knapp (mobil: fast bottom CTA ”Ring” + ”Skicka förfrågan”). Detta speglar hur flera elfirmor håller kontakt nära till hands. citeturn4view4turn4view5  
- **Servicekort** (ikon eller foto, rubrik, 1 rad beskrivning, ”Läs mer”). citeturn1view1turn4view1turn4view4  
- **Trust badges** (t.ex. ”Sedan 1925”, ”Registrerat elinstallationsföretag”, ”ID06”, ”Certifierad för…”)  
- **Processblock** (3–4 steg)  
- **Form-komponenter** med tydliga labels och synlig fokusmarkering  

Tillgänglighet: WCAG kräver att fokusindikatorn är synlig för tangentbordsanvändare (SC 2.4.7 Focus Visible). citeturn11search3  

## Konvertering, trovärdighet och regelefterlevnad

**CTA-hierarki och friktionsfri kontakt**

Branschmönster är att CTA kommer tidigt och ofta (hero, efter tjänster, i footer). citeturn1view1turn4view5turn1view2  

Rekommenderad CTA-hierarki:

- Primär: ”Ring” (klickbart nummer) och/eller ”Skicka förfrågan”  
- Sekundär: ”Se tjänster”  
- För B2B/elkraft: separat CTA ”Entreprenadförfrågan”  

**Särskilt viktigt i Sverige: registrering hos Elsäkerhetsverket**

Elsäkerhetsverket är tydliga med att företag som ska göra elarbeten måste registrera sig hos myndigheten och att kunder kan kontrollera detta via ”Kolla elföretaget”. citeturn2search0turn2search8  

De uppmuntrar även företag att berätta att de är registrerade och använda ”Kolla elföretaget”-logotypen i sin kommunikation. citeturn2search24  

Designrekommendation: lägg en liten badge ”Registrerad hos Elsäkerhetsverket” i ”Varför oss” och/eller footern, gärna med länk till söktjänsten (i inspirationslänklistan längst ned).

**ID06 och entreprenadmiljö**

ID06 har kommunicerat skärpta identifieringskrav som börjar gälla i början av 2026. citeturn2search1turn2search9turn2search13  

Om kunden verkar mycket på byggarbetsplatser kan en kort rad i B2B-delen (”ID06, relevanta utbildningar”) fungera som stark trovärdighetssignal.

**ROT-avdrag och konsumenttrygghet**

För privatkund är pris/ROT och ”hur det funkar” en vanlig friktionspunkt. Sallén har en tydlig pris-/ROT-sektion tidigt på startsidan. citeturn7view0  

Skatteverket anger att man kan få rotavdrag med högst **30% av arbetskostnaden**, att företaget gör avdraget på fakturan och att material/resor inte ger rätt till avdrag. citeturn10search0turn9view0  

Konsumentverket påminner samtidigt om att konsumenten skyddas av konsumenttjänstlagen när man anlitar hantverkare och att arbetet ska utföras fackmässigt. citeturn8search6turn8search2  

Praktik på webb: en kompakt FAQ-panel för privatkunder (ROT, offert, dokumentation, tidsplan) minskar osäkerhet.

**GDPR, integritet och cookies**

När ni tar in personuppgifter via formulär behöver besökaren få tydlig information om behandlingen. EU-kommissionen sammanfattar att man vid insamling ska informera bl.a. om personuppgiftsansvarig, syfte, rättslig grund, lagringstid, mottagare och rättigheter/klagomål. citeturn12search7turn2search10  

Svenska aktörer löser detta ofta med kort text vid formulär + länk till integritetspolicy. Granitor skriver t.ex. att uppgifter sparas när man kontaktar dem via formulär. citeturn6search1 Bravida använder en tydlig bekräftelse/acceptans-kryssruta i kontaktflöde. citeturn6search4  

Cookie-banner är också vanligt (t.ex. Elektrobyrån). citeturn5view1  

## SEO, mätning och lanseringschecklista

**Lokal synlighet när man saknar online-närvaro**

Lansera gärna parallellt:

- **Google Business Profile** (bilder, öppettider, serviceområden, recensioner). Google beskriver att en Business Profile gör att man kan hantera hur företaget syns på Search och Maps utan kostnad. citeturn13search3turn13search5  
- NAP-konsekvens (Name/Address/Phone) mellan webb och Business Profile.

**Strukturerad data (Local SEO)**

Implementera LocalBusiness/Electrician-structured data. Google beskriver hur LocalBusiness structured data fungerar och vilka properties som krävs för rich results. citeturn12search0turn12search4 Schema.org har även en typ för ”Electrician” som kan användas i markup. citeturn12search2  

**Prestanda och UX**

Google beskriver Core Web Vitals som mätetal som mäter verklig användarupplevelse och rekommenderar att sajter arbetar med dem. citeturn11search4turn11search0 Snabb prestanda hänger ofta ihop med bättre konvertering; Cloudflare sammanfattar forskning som pekar på att rendering-fördröjning kan ge intäktstapp per besökare. citeturn11search13  

**Frågor som hjälper oss spika designriktningen**

1) Vilken del är viktigast att vinna affärer på 2026: **privat (0–0,4 kV)** eller **elkraft/entreprenad (10–145 kV)**?  
2) Är primär CTA helst **telefon** eller **formulär** (och vill ni ha separata flöden för privat vs B2B)?  
3) Har de jour/beredskap eller tydliga svarstider som kan lovas (t.ex. ”svar inom 24h”)?  
4) Finns varumärkesriktlinjer utöver loggan (exakta färgkoder, tonläge, typsnitt)?  

**Inspirationslänkar och källor**

```text
Exempel som kunden nämnde:
- https://www.elektrobyran.se/
- https://kmsel.se/
- https://selectric.se/

Ytterligare svenska exempel som analyserats:
- https://www.dael.se/
- https://www.elektropartner.se/
- https://storstadensel.se/
- https://www.skacklingeel.se/
- https://www.sallen.se/
- https://www.seke.nu/
- https://selek.nu/

Regelverk/auktorisation:
- https://www.elsakerhetsverket.se/kollaelforetaget
- https://www.elsakerhetsverket.se/yrkespersoner/registrera-ditt-elforetag/sa-registrerar-du-ditt-foretag/

ROT:
- https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrotavdraget.4.5947400c11f47f9dd80004014.html

Google Business Profile:
- https://support.google.com/business/answer/7039811

Structured data:
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://schema.org/Electrician

Tillgänglighet:
- https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html
```