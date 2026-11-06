# Deployment Guide

## Overview

La Mer Collection website is deployed on a Hetzner VPS with manual SSH deployment via GitHub Actions CI/CD pipeline. This guide covers setup, deployment process, and troubleshooting.

---

## Server Infrastructure

### Hardware Specifications

- **Provider:** Hetzner Cloud
- **Plan:** CPX22 (2 vCPU, 4GB RAM, 40GB SSD)
- **Region:** Singapore
- **IP Address:** 5.223.53.106
- **OS:** Ubuntu 22.04 LTS

### Network Configuration

- **Domain:** lamercollection.com (registered at Namecheap)
- **DNS:** Points to 5.223.53.106
- **SSL:** Let's Encrypt with auto-renewal (certbot)
- **Port 80:** HTTP (redirects to HTTPS)
- **Port 443:** HTTPS (production traffic)
- **Port 22:** SSH (GitHub Actions only)

---

## Installation & Setup (First Time)

### 1. SSH into VPS

```bash
ssh root@5.223.53.106
```

### 2. Update System

```bash
apt update
apt upgrade -y
apt install -y git nginx certbot python3-certbot-nginx nodejs npm
```

### 3. Install Bun (Package Manager)

```bash
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

### 4. Create Application Directory

```bash
mkdir -p /opt/lamer-website
cd /opt/lamer-website
mkdir repo
```

### 5. Clone Repository

```bash
cd /opt/lamer-website/repo
git clone https://github.com/duongminhphucwork/lamer-collection-website.git .
```

### 6. Setup Environment File

```bash
# Create .env file with secrets
cat > /opt/lamer-website/.env << EOF
SANITY_PROJECT_ID=o2kvv3c9
SANITY_DATASET=production
SANITY_API_TOKEN=sk...    # Get from Sanity dashboard
SANITY_REVALIDATE_SECRET=... # Generate random secret
EOF

chmod 600 /opt/lamer-website/.env
```

### 7. Install Dependencies & Build

```bash
cd /opt/lamer-website/repo
bun install
bun run build
```

### 8. Setup Nginx Configuration

```bash
# Copy Nginx config from repo
cp nginx/sites-available/lamercollection.com /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/lamercollection.com /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### 9. Setup SSL Certificate

```bash
certbot certonly --nginx -d lamercollection.com -d www.lamercollection.com

# Auto-renewal (runs daily)
systemctl enable certbot.timer
systemctl start certbot.timer
```

### 10. Create systemd Service

```bash
cat > /etc/systemd/system/lamer-web.service << EOF
[Unit]
Description=La Mer Collection Website
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/lamer-website/repo
EnvironmentFile=/opt/lamer-website/.env
ExecStart=/root/.bun/bin/bun .next/standalone/server.js
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable lamer-web
systemctl start lamer-web
```

### 11. Verify Deployment

```bash
# Check service status
systemctl status lamer-web

# Check logs
journalctl -u lamer-web -n 50

# Test endpoint
curl http://localhost:3000

# Check Nginx
curl https://lamercollection.com
```

---

## GitHub Actions CI/CD Pipeline

### Configuration Location

File: `.github/workflows/deploy.yml`

### Pipeline Stages

#### Stage 1: Checkout & Setup

```yaml
- uses: actions/checkout@v3
- uses: oven-sh/setup-bun@v1
```

#### Stage 2: Install & Type Check

```bash
bun install
bun run type-check  # Runs: tsc --noEmit
```

#### Stage 3: Build

```bash
bun run build
# Generates:
# - .next/standalone/
# - .next/static/
# - public/
```

#### Stage 4: Deploy to VPS

```bash
ssh -i $SSH_KEY root@5.223.53.106 << 'EOF'
  cd /opt/lamer-website/repo
  git pull origin main
  bun install
  rm -rf .next/cache
  bun run build
  cp -r .next/static/* /opt/lamer-website/.next/static/
  systemctl restart lamer-web
EOF
```

#### Stage 5: Health Check

```bash
curl https://lamercollection.com
# Expected: HTTP 200 + HTML response
```

### GitHub Actions Secrets

Store these in repository settings (Settings → Secrets and variables → Actions):

| Secret Name              | Value            | Example                      |
| ------------------------ | ---------------- | ---------------------------- |
| VPS_HOST                 | IP address       | 5.223.53.106                 |
| VPS_USER                 | SSH user         | root                         |
| VPS_SSH_KEY              | Private SSH key  | (copy ~/.ssh/id_rsa content) |
| SANITY_API_TOKEN         | CMS editor token | sk...                        |
| SANITY_REVALIDATE_SECRET | Webhook secret   | random-string                |

### Setup SSH Key for GitHub Actions

**On VPS:**

```bash
# Generate SSH key (if not exists)
ssh-keygen -t ed25519 -f ~/.ssh/github_actions -C "github-actions"

# Copy private key
cat ~/.ssh/github_actions
```

**In GitHub:**

1. Go to repository Settings → Secrets and variables → Actions
2. Create secret `VPS_SSH_KEY`
3. Paste the private key content

---

## Deployment Process

### Automatic Deployment (git push)

```bash
# 1. Make changes locally
git add .
git commit -m "feat: add property detail page"

# 2. Push to main branch
git push origin main

# 3. GitHub Actions automatically:
#    - Runs type check
#    - Builds Next.js
#    - SSHs to VPS
#    - Deploys new code
#    - Runs health check

# 4. Monitor deployment
# Go to GitHub → Actions tab → see progress
```

### Manual Deployment (Emergency)

```bash
ssh root@5.223.53.106

cd /opt/lamer-website/repo
git pull origin main
bun install
bun run build
cp -r .next/static/* /opt/lamer-website/.next/static/
systemctl restart lamer-web

# Verify
curl https://lamercollection.com
```

---

## Environment Variables

### Server-side (.env on VPS)

```bash
SANITY_PROJECT_ID=o2kvv3c9
SANITY_DATASET=production
SANITY_API_TOKEN=sk...              # Sensitive
SANITY_REVALIDATE_SECRET=secret123  # Sensitive
```

These variables are loaded by systemd from `/opt/lamer-website/.env` and available to the Node.js process.

### Client-side (Used in browser)

None - all CMS queries are server-side via GROQ.

### Build-time (GitHub Actions)

```bash
SANITY_PROJECT_ID=o2kvv3c9
SANITY_DATASET=production
# (No SANITY_API_TOKEN needed at build time - only runtime)
```

---

## Monitoring & Health Checks

### systemd Service Monitoring

Check service status:

```bash
systemctl status lamer-web
```

View logs:

```bash
journalctl -u lamer-web -f  # Follow logs
journalctl -u lamer-web -n 100  # Last 100 lines
journalctl -u lamer-web --since "2 hours ago"  # Last 2 hours
```

Restart service:

```bash
systemctl restart lamer-web
```

### Nginx Monitoring

Check Nginx status:

```bash
systemctl status nginx
nginx -t  # Test configuration
```

View access logs:

```bash
tail -f /var/log/nginx/access.log
```

View error logs:

```bash
tail -f /var/log/nginx/error.log
```

### Automatic Health Check (GitHub Actions)

The deploy workflow includes a health check:

```bash
curl -f https://lamercollection.com || exit 1
```

If this fails, GitHub will send an email notification.

### Manual Health Check

```bash
# Direct server
curl http://localhost:3000

# Via Nginx (production)
curl https://lamercollection.com

# Check response headers
curl -I https://lamercollection.com
# Should show: HTTP/1.1 200 OK, Content-Type: text/html
```

---

## ISR Webhook Revalidation

### Sanity Webhook Setup

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project `o2kvv3c9`
3. Go to API → Webhooks
4. Create new webhook:
   - **Name:** Revalidate Website
   - **URL:** https://lamercollection.com/api/revalidate
   - **Trigger:** All document types
   - **HTTP Method:** POST
   - **HTTP Headers:** Add header
     - **Name:** x-sanity-revalidate-secret
     - **Value:** (your SANITY_REVALIDATE_SECRET)

5. Test webhook by publishing any document in Studio

### Webhook Handler

File: `src/app/api/revalidate/route.ts`

```typescript
export async function POST(req: Request) {
  // 1. Validate secret header
  const secret = req.headers.get("x-sanity-revalidate-secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Parse webhook body
  const { type, documentId } = await req.json();

  // 3. Revalidate affected paths
  revalidateTag("pageContent"); // Next.js 16: requires 2nd arg
  revalidatePath("/");

  // 4. Return success
  return new Response(JSON.stringify({ success: true, revalidated: ["/"] }), {
    status: 200,
  });
}
```

---

## SSL Certificate Management

### Current Certificate

```bash
# Check certificate validity
openssl x509 -in /etc/letsencrypt/live/lamercollection.com/fullchain.pem -text -noout

# Or use certbot
certbot certificates
```

### Manual Renewal

```bash
certbot renew --force-renewal
systemctl restart nginx
```

### Auto-Renewal Check

```bash
systemctl status certbot.timer
systemctl list-timers certbot.timer
```

---

## Troubleshooting

### Issue: Website shows 502 Bad Gateway

**Diagnosis:**

```bash
# Check if app is running
systemctl status lamer-web

# Check app logs
journalctl -u lamer-web -n 50
```

**Solution:**

```bash
# Restart the service
systemctl restart lamer-web

# If that fails, check if port 3000 is in use
lsof -i :3000

# Kill conflicting process if needed
kill -9 <PID>

# Restart again
systemctl start lamer-web
```

### Issue: New content from CMS not showing

**Diagnosis:**

```bash
# Check webhook was sent (Sanity dashboard → Webhooks → History)
# Check revalidate endpoint in app logs
journalctl -u lamer-web | grep revalidate
```

**Solution:**

```bash
# Manual revalidation (trigger ISR regeneration)
curl -X POST https://lamercollection.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-sanity-revalidate-secret: YOUR_SECRET" \
  -d '{"type": "property"}'

# Or clear cache and rebuild
cd /opt/lamer-website/repo
rm -rf .next/cache
bun run build
systemctl restart lamer-web
```

### Issue: Nginx returns 404 or 503

**Diagnosis:**

```bash
# Check Nginx is running
systemctl status nginx

# Test config
nginx -t

# Check upstream (app server)
curl http://localhost:3000
```

**Solution:**

```bash
# Restart Nginx
systemctl restart nginx

# Check if app is still running
systemctl status lamer-web

# View Nginx error logs
tail -f /var/log/nginx/error.log
```

### Issue: High memory usage causing crashes

**Diagnosis:**

```bash
# Check memory
free -h
ps aux | grep node

# Check total memory used by app
ps aux | grep .next/standalone
```

**Solution:**

```bash
# If consistently > 3.5GB, increase VPS size or optimize:
# 1. Clear .next/cache
rm -rf /opt/lamer-website/repo/.next/cache

# 2. Restart app
systemctl restart lamer-web

# 3. Monitor memory
watch -n 1 free -h
```

### Issue: SSL Certificate expired

**Diagnosis:**

```bash
certbot certificates
# Check expiry date
```

**Solution:**

```bash
# Renew immediately
certbot renew --force-renewal

# Restart Nginx
systemctl restart nginx

# Verify
curl -I https://lamercollection.com
```

### Issue: Deployment fails in GitHub Actions

**Diagnosis:**

1. Check GitHub Actions logs (Actions tab)
2. Look for error at which step:
   - Type check: `tsc --noEmit`
   - Build: `bun run build`
   - Deploy: SSH connection or remote commands

**Solution by Error Type:**

**Type check failure:**

```bash
# Run locally first
bun run type-check

# Fix TypeScript errors in code
# Commit and push
```

**Build failure:**

```bash
# Build locally
bun run build

# Check for missing dependencies
bun install

# Verify .next/standalone exists
ls -la .next/standalone/
```

**SSH connection failure:**

```bash
# Check GitHub Secrets
# Verify VPS_HOST, VPS_USER, VPS_SSH_KEY

# Test SSH manually
ssh -i $SSH_KEY root@5.223.53.106 echo "test"
```

**Remote build failure:**

```bash
# SSH to VPS and check disk space
df -h
# If < 5GB free, clean old builds
rm -rf /opt/lamer-website/repo/.next

# Check Bun is installed
which bun
/root/.bun/bin/bun --version
```

---

## Database & Backups

### CMS Backup (Sanity)

- **Who:** Sanity.io automatically
- **Frequency:** Real-time with version history
- **Retention:** Unlimited (all versions accessible)
- **Restore:** Use Sanity Studio to revert to previous version

### Code Backup (Git)

- **Who:** GitHub
- **Frequency:** Every commit
- **Retention:** Indefinite
- **Restore:** `git reset --hard <commit-hash>`

### No Database

- This project uses Sanity CMS instead of a traditional database
- No separate PostgreSQL/MongoDB to back up

---

## Performance Tuning

### Nginx Caching Headers

Already configured in `/etc/nginx/sites-available/lamercollection.com`:

```nginx
# Static assets: 1 hour
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
  expires 1h;
  add_header Cache-Control "public, immutable";
}

# HTML: No caching (ISR handles freshness)
location / {
  proxy_pass http://app_server;
}
```

### Gzip Compression

```nginx
gzip on;
gzip_types text/html text/css application/javascript;
gzip_min_length 1000;
gzip_vary on;
```

### Next.js Optimization

- `bun run build` creates optimized standalone bundle
- `.next/static/` contains optimized CSS/JS
- Images are optimized via `next/image` component

---

## Upgrading Dependencies

### Next.js Upgrade

```bash
# Locally
npm install next@latest
bun run type-check
bun run build

# Test locally, then commit and push
```

### Node.js Upgrade

```bash
# On VPS, check current version
node --version

# Don't manually upgrade; ensure systemd uses Bun instead of Node
# (Current setup uses `/root/.bun/bin/bun .next/standalone/server.js`)
```

---

## Security Best Practices

### SSH Keys

- Rotate SSH keys annually
- Keep private key secure in GitHub Secrets
- Never commit private keys to repository

### Environment Variables

- Store all secrets in GitHub Secrets and `/opt/lamer-website/.env`
- Never commit `.env` to git
- Rotate SANITY_REVALIDATE_SECRET if exposed

### Firewall (UFW)

```bash
# Current rules (should be in place)
ufw allow 22    # SSH (for GitHub Actions)
ufw allow 80    # HTTP (redirects to HTTPS)
ufw allow 443   # HTTPS (production traffic)
ufw default deny incoming
ufw default allow outgoing
ufw enable
```

### HTTPS Only

- Nginx redirects all HTTP to HTTPS
- HSTS header forces browser to use HTTPS
- SSL certificate auto-renews via certbot

---

## Disaster Recovery Plan

### If VPS is Lost/Corrupted

1. Create new VPS at Hetzner (same size)
2. Get new IP, update DNS at Namecheap
3. Follow "Installation & Setup" section above
4. CMS data is safe in Sanity (restored automatically)

### If Deployment Fails

1. Check GitHub Actions logs for error
2. Fix issue locally, commit, and push again
3. Or manually SSH to VPS and rollback:
   ```bash
   cd /opt/lamer-website/repo
   git reset --hard <previous-commit>
   bun run build
   systemctl restart lamer-web
   ```

### If CMS Content is Lost

- Use Sanity Studio to revert to previous version
- All changes are version-controlled in Sanity

---

## References

- **GitHub Actions:** https://docs.github.com/en/actions
- **Next.js Deployment:** https://nextjs.org/docs/app/building-your-application/deploying
- **Sanity Webhooks:** https://www.sanity.io/docs/webhooks
- **Certbot Auto-renewal:** https://certbot.eff.org/instructions/ubuntu-jammy/nginx
- **systemd Service:** https://www.freedesktop.org/software/systemd/man/systemd.service.html

---

**Last Updated:** March 2026 | **Status:** Production | **Uptime Target:** 99.9%
