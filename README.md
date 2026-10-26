# CARACTER.com

A B2B character-IP collaboration platform site: licensing, AI-assisted production,
creator campaigns and a supply-chain / RFQ workflow. Static, five languages,
zero dependencies, no framework.

> **Status: concept build.** The domain and trade-mark position are unconfirmed.
> No partnership, award or client is represented as signed until it is. Partner
> figures are partner-provided and not independently audited. See
> `legal/terms.html` and `trust.html` for the published position.

---

## Build and check

Requires Node.js only. There is nothing to `npm install`.

```bash
node tools/build.js          # build the site into this folder
node tools/build.js --check  # verify output without writing
node tools/check.js          # validate the built HTML
```

`node tools/check.js` must print `✓ all checks passed` before deploying. It checks
canonical URLs, `og:image`, meta-description length, i18n key parity across the
five locales, and reports outstanding translation debt rather than hiding it.

## Layout

| Path | What it is |
| --- | --- |
| `src/pages/**/*.html` | Page sources. Files beginning with `_` are templates. |
| `tools/build.js` | Generator. Reads the sources plus the data in `assets/js/data.js`. |
| `tools/check.js` | Read-only validation of the built output. |
| `tools/mt-page-text.json` | Thai and Japanese page text, keyed by exact English string. |
| `assets/js/site.config.js` | Every value a business decision touches: domain, contact addresses, form routing, analytics id, taglines. |
| `assets/js/data.js` | Characters, audience groups, studio capabilities, collections, FAQ. Editing this is how pages change. |
| `assets/js/i18n.js` | Interface strings in five locales. |
| `assets/js/chrome.js` | Builds the header and footer at runtime. |
| `assets/js/app.js` | Menu, filters, forms and the mailto fallback. |
| `assets/css/style.css` | All styling. |

40 pages are emitted from 24 sources: repeating pages (6 characters, 6 audience
groups, 4 studio capabilities, 4 partner forms, 4 legal pages) are generated from
data, so adding a seventh character is a data edit and not a page build.

## Page authoring

Sources use JSON front-matter and three placeholders:

```
<!--FM
{ "file": "legal/privacy.html", "page": "", "root": "../",
  "title": "Privacy notice", "desc": "…", "canonical": "legal/privacy.html" }
-->

{{T:English|繁中|简中|ภาษาไทย|日本語}}
{{ROOT}}path/to/file.html
{{FRAGMENT}}
```

`{{T:…}}` emits one `<span class="t" data-l="xx">` per locale and CSS shows the
active one, so switching language needs no reload. Supply all five values where
the text is language-specific; for Thai and Japanese you may instead add an entry
to `tools/mt-page-text.json`:

```json
{ "runs": { "English source string": { "th": "…", "ja": "…" } } }
```

A miss is **reported, never silently served as English**. This is deliberate: an
earlier build in this workspace shipped 322 English strings under a Thai label.

## Configuration

`assets/js/site.config.js` — nothing here requires touching the build:

- `domain` / `url` / `domainStatus` — canonical URLs and the published status.
- `contact.*` — one address per desk.
- `forms.endpoint` — **empty**. While empty, forms validate and then offer a
  pre-filled email, and do not claim to have sent anything.
- `forms.routeByKind` — sends each enquiry kind to the right desk.
- `analytics.ga4` — **empty**. No third-party script loads until it is set.

Both empty values are intentional and are reported by `tools/check.js`.

## Deploying

The site is plain static files, so any static host works. Do **not** upload this
folder as-is: `src/`, `tools/` (including the translation table) and this README
sit inside it.

Use the bundle tool, which stages only shippable files, adds host config, zips it
and then verifies the result over HTTP:

```bash
node tools/build.js && node tools/check.js
node _extract/caracter/make-deploy.js
```

It produces `_build/caracter-deploy/` and `_build/caracter-deploy.zip`, and must
print `PASS — bundle is complete, self-contained, and leaks no source or tooling`.
That check asserts every shippable file returns 200, and that `/src/…`,
`/tools/mt-page-text.json` and `/README.md` all return 404.

Upload the zip to Cloudflare Pages (or Netlify / any static host). Set
`domainStatus` to `confirmed` and rebuild **only after** domain ownership and the
trade-mark position are settled.

`robots.txt` and `sitemap.xml` are checked at build time. Confirm the canonical
domain before pointing DNS at the host.

Last verified: **74/74 shippable files 200, 7/7 excluded paths 404**, deploy zip 2.09 MB.

## Verification beyond `check.js`

Three extra read-only tools used while building this site. They live outside the
site folder so they never ship:

```bash
node _extract/audit-cjk.js                     # inline {{T:}} runs missing zh-Hant / zh-Hans
node _extract/caracter/verify-locales.js       # built HTML: five-locale runs, script purity
node _extract/caracter/check-starter.js        # link integrity + docx text extraction
```

`verify-locales.js` checks that Thai contains no CJK, Japanese contains no Thai,
Chinese contains CJK, and that no translatable string is left identical to
English. Brand tokens (`FURI MONSTER`, `CARACTER`, `WhatsApp`) are exempt because
they stay Latin in every language.

Current state: **997 five-locale runs, 0 fallbacks, 0 wrong-script values.**

## Languages, search, assistant and answer-engine support

| Capability | How it works | Cost |
| --- | --- | --- |
| Five languages | English, 繁體中文, 简体中文, ไทย, 日本語 are baked into every page as `<span class="t" data-l="…">`; CSS shows the active one, so switching is instant and needs no reload. | none |
| Google Translate | Loaded **only when the visitor asks**, from the footer control. The UI states that it sends the page text to Google, and that the five built-in languages need no third party. | none until used |
| Search | `search-index.json` is generated at build time (titles, H1, up to five headings per page, all five locales). The header search button opens a keyboard-accessible dialog; `/` or `Ctrl/⌘+K` opens it too. | none |
| Assistant | A **scripted** assistant, not a live model. It answers from six authored entries plus a fallback that returns the closest pages from the search index. It is labelled as scripted on screen. | none |
| Answer engines (GEO) | `llms.txt` states the positioning, the key facts and a page index; `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot; every page carries JSON-LD (`Organization`, `WebSite`) plus canonical, OG and a unique title and description. | none |

`site-tools.js` implements the first four client-side. It has no dependencies and no
API keys. It is the only script that talks to a third party, and only on request.

### What the assistant will not do

It will not quote a price, a rate, a royalty figure, a partner count or any
performance number, because none of those are published on the site. Ask it about
FURI MONSTER and it will tell you that rights status is demonstration only.
## Version control and GitHub

This folder is the repository. **105 files, 2.09 MB.**

> GitHub's web uploader (**Add file → Upload files**) accepts **100 files per
> batch**. This repository has 105, so either use GitHub Desktop / the `git` CLI
> (no limit), or upload in two batches: everything except `src/` and `tools/`
> first (about 77 files), then `src/` and `tools/` (28 files).

Recommended: **GitHub Desktop** — drag this folder in, commit, publish. Or:

```bash
git init
git add .
git commit -m "CARACTER.com — concept build"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### Make the repository private until launch

`README.md`, `CLAIMS_POLICY.md` and `PRODUCT_BOUNDARY.md` are internal notes. The
public site already states most of the honest position, so this is not a secret
leak — but a private repository avoids an early reader quoting an unfinished
document back at you.

### Do not serve the live site from GitHub Pages

GitHub Pages' acceptable-use policy forbids using it to run an online business or
commercial service. Use the repository for version control and history, and deploy
the built output to a host that permits commercial use — the verified path is the
Cloudflare Pages bundle produced by the deploy tool above.

`.nojekyll` is included so that if Pages is ever used for a **preview** or a
documentation branch, files are served as-is rather than being processed by Jekyll.

### What is committed, and why

The generated HTML, `sitemap.xml`, `llms.txt` and `search-index.json` are committed
deliberately: a clone can be uploaded to a static host without running a build, and
reviewers can read the real markup on GitHub. `src/` and `tools/` are committed so
the output is reproducible:

```bash
node tools/build.js && node tools/check.js
```

Verified: a fresh build from a clean copy of this repository reproduces every
file byte-for-byte, with no diff.
## Honest gaps

- Forms are not connected. `forms.endpoint` is empty by design.
- No analytics until `analytics.ga4` is set.
- No login, database, AI generation, social API, RFQ delivery, e-signature or
  royalty settlement. Those are specified, not built.
- `caracter.com` ownership and the `CARACTER` / `CATRACTER` trade-mark position
  are unconfirmed. `catracter.com` currently serves an unrelated consumer site.
- Partner figures (creator counts, livestream sales) are partner-provided and are
  published only with an explicit attribution line.
- FURI MONSTER artwork is used as an internal demonstration IP. Written
  authorisation for commercial use has not been reviewed.

Do not remove these statements without evidence. They are the reason the rest of
the site is credible.
