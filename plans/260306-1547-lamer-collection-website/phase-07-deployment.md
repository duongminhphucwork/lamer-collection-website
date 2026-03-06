---
phase: 7
title: "Deployment & CI/CD"
status: pending
priority: P2
effort: 4h
---

# Phase 7: Deployment & CI/CD

## Context Links

- [Overview Plan](./plan.md)

## Overview

Deploy to Hetzner VPS using Docker + Nginx reverse proxy + GitHub Actions CI/CD. Similar pattern to existing CBTik project.

## Architecture

```
                    ┌─────────────────────────┐
                    │     Hetzner VPS          │
                    │                          │
Internet ──HTTPS──▶│  Nginx (port 80/443)     │
                    │    │                     │
                    │    ├──▶ Next.js (3000)   │
                    │    │    (Docker)          │
                    │    │                     │
                    │    └──▶ Static assets    │
                    │         (cached)         │
                    │                          │
                    │  Certbot (Let's Encrypt) │
                    └─────────────────────────┘

GitHub Actions:
  push to main → build Docker image → push to registry → SSH deploy → restart container
```

## Related Code Files

### Create

- `Dockerfile` - Multi-stage build for Next.js
- `docker-compose.yml` - Service definition
- `.dockerignore` - Exclude unnecessary files
- `nginx/nginx.conf` - Reverse proxy + caching config
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `.env.example` - Required environment variables

## Dockerfile (Multi-stage)

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Nginx Config

Key features:

- SSL termination (Let's Encrypt)
- Reverse proxy to Next.js on port 3000
- Static asset caching (images, fonts: 1 year)
- Gzip compression
- Security headers (HSTS, X-Frame-Options, CSP)
- Rate limiting on contact form endpoint

## GitHub Actions Pipeline

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup node 20
      - npm ci
      - npm run build (verify build succeeds)
      - docker build + tag
      - docker push to GitHub Container Registry
      - SSH to VPS: docker pull + docker-compose up -d
      - health check: curl site URL
```

## Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx

# Deployment
VPS_HOST=xxx.xxx.xxx.xxx
VPS_USER=deploy
VPS_SSH_KEY=<GitHub secret>

# Site
NEXT_PUBLIC_SITE_URL=https://lamercollection.com
```

## Implementation Steps

1. Create `Dockerfile` with multi-stage build
2. Configure `next.config.ts` for standalone output
3. Create `docker-compose.yml`
4. Create `.dockerignore`
5. Create `nginx/nginx.conf` with SSL, proxy, caching
6. Create `.github/workflows/deploy.yml`
7. Create `.env.example`
8. Test Docker build locally: `docker build -t lamer . && docker run -p 3000:3000 lamer`
9. Setup VPS: install Docker, Nginx, Certbot
10. Configure DNS for lamercollection.com
11. First deploy via GitHub Actions
12. Verify SSL, caching headers, security headers
13. Setup Sanity webhook URL pointing to production

## Todo List

- [ ] Create Dockerfile (multi-stage)
- [ ] Configure next.config.ts for standalone output
- [ ] Create docker-compose.yml
- [ ] Create .dockerignore
- [ ] Create nginx.conf
- [ ] Create GitHub Actions deploy workflow
- [ ] Create .env.example
- [ ] Test Docker build locally
- [ ] Setup VPS (Docker, Nginx, Certbot)
- [ ] Configure DNS
- [ ] First production deploy
- [ ] Verify SSL and security headers
- [ ] Setup Sanity revalidation webhook

## Success Criteria

- `docker build` succeeds, image under 200MB
- GitHub Actions deploys on push to main
- Site accessible at https://lamercollection.com
- SSL A+ rating on SSL Labs
- Gzip enabled, static assets cached
- Zero-downtime deploys (docker-compose pull + up)

## Risk Assessment

- **VPS sizing**: Start with CX21 (2 vCPU, 4GB RAM). Sufficient for branding site.
- **SSL setup**: Use Certbot with auto-renewal cron job
- **Deployment failures**: GitHub Actions should notify on failure. Manual SSH fallback.

## Next Steps

- Phase 8: Testing and QA
