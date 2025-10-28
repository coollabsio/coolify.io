Landing page of [coolify.io](https://coolify.io)

## Development

### Prerequisites

- Node.js (or Bun)
- GitHub Personal Access Token (optional, but recommended to avoid rate limits)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your GitHub token to avoid API rate limits when fetching contributors.

### Creating a GitHub Token

The build process fetches contributor data from GitHub. Without a token, you're limited to 60 requests/hour. With a token, this increases to 5,000 requests/hour.

To create a token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Coolify Contributors Script")
4. Select scope: **public_repo** (read access to public repositories)
5. Click "Generate token"
6. Copy the token to your `.env` file:
   ```
   GITHUB_TOKEN=your_token_here
   ```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

When deploying (Docker, CI/CD, etc.), make sure to set the `GITHUB_TOKEN` environment variable to avoid rate limiting during builds.