# API Documentation

## `POST /api/inquiries`

Creates a contact inquiry. Public endpoint. There is **no** public endpoint to list or read inquiries.

### Request

`Content-Type: application/json`, maximum 20 KB.

| Field | Type | Rules |
|---|---|---|
| `fullName` | string | required, 2 to 100 chars |
| `email` | string | required, valid email, max 254, lowercased |
| `companyName` | string | optional, max 120 |
| `category` | string | one of `GENERAL`, `WEBSITE_DEVELOPMENT`, `SOFTWARE_DEVELOPMENT`, `BRANDING_DESIGN`, `DIGITAL_MARKETING`, `TECHNICAL_SUPPORT`, `EDUCATION_LEARNING`, `PARTNERSHIP`, `OTHER` |
| `subject` | string | required, 3 to 150 |
| `message` | string | required, 20 to 3000 |
| `privacyAccepted` | boolean | must be `true` |
| `website` | string | honeypot, must stay empty |
| `startedAt` | number | optional, ms timestamp when the form was shown |

### Responses

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ "ok": true, "message": "..." }` | Received (also returned for spam-signal and duplicate submissions) |
| 400 | `{ "ok": false, "message": "Invalid request." }` | Malformed JSON |
| 403 | `{ "ok": false, ... }` | Cross-origin browser request |
| 413 | `{ "ok": false, ... }` | Body too large |
| 415 | `{ "ok": false, ... }` | Not JSON |
| 422 | `{ "ok": false, "message": "...", "errors": { "field": "message" } }` | Validation failed |
| 429 | `{ "ok": false, ... }` + `Retry-After` | Rate limited (default 5 per 10 minutes per IP) |
| 503 | `{ "ok": false, ... }` | Neither storage nor email succeeded |
| 500 | `{ "ok": false, ... }` | Unexpected error (generic message) |

Other methods return 405.

### Example

```bash
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Rahim Uddin","email":"rahim@example.com","category":"WEBSITE_DEVELOPMENT","subject":"Company website","message":"We would like a corporate website for our business.","privacyAccepted":true}'
```
