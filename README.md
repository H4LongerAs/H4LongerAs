# H4LongerAsset

Personal global market dashboard with 15-minute delayed market data.

Local URL:

```text
http://127.0.0.1:4173/
```

When deployed with GitHub Pages, the public URL will usually be:

```text
https://<your-github-username>.github.io/H4LongerAsset/
```

The dashboard is static HTML/CSS/JS. Market data is stored in `market-data.json`.

`market-data.json` is generated during deployment and intentionally ignored by
Git because it can be too large for normal GitHub file limits.

Equity performance datasets use a slower refresh cadence by default:

- Korean equity performance data: 16:00 KST on weekdays
- US equity performance data: 08:00 KST on weekdays

The local updater still refreshes the Market Dashboard more frequently during
market hours, while sector/equity performance data follows the schedule above.
