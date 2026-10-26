# Claims policy — what this site may and may not assert

Every claim-bearing block on the site carries a machine-readable
`data-claim-type` attribute with one of four values:

| Value | Means | Rule |
| --- | --- | --- |
| `verified` | Checked against a primary source that is cited on the page | May be stated plainly |
| `partner-claimed` | Supplied by a partner; not independently audited | Must carry attribution and a date |
| `example` | Demonstration material, not a live offer | Must say so in the same block |
| `aspirational` | A plan or design intent | Must be written in the future or conditional |

## Never permitted, in any block

- Any GMV, ROI, revenue, valuation or royalty rate not published by a cited source.
- Follower, creator, factory or partner counts without attribution and date.
- The words "guaranteed", "proven", "the only", "the first" applied to CARACTER.
- Any figure from the StarRise material presented as CARACTER's own result.
- Any claim that a licence exists before a written agreement is signed.

## Required page-level statements

- Legal pages carry a visible draft notice until qualified counsel approves them.
- The FURI MONSTER collection is labelled as a demonstration, with rights status
  stated and no original artwork made downloadable.
- Forms state that submitting does not create a licence, an order or a
  confidentiality obligation.
- Where AI is used, disclosure is part of the deliverable, not a footnote.

## Review

The claims policy is checked at build time by `node tools/check.js` for the
mechanical rules (unique titles, descriptions, canonical URLs) and manually
before each deploy for the assertion rules above. Any change to a public number
requires a source and a date in the same commit.
