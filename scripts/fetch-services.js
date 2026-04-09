#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const TEMPLATES_URL =
  'https://raw.githubusercontent.com/coollabsio/coolify/v4.x/templates/service-templates-latest.json';
const LOGO_BASE_URL =
  'https://raw.githubusercontent.com/coollabsio/coolify/v4.x/public/';

function formatName(id) {
  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function main() {
  console.log('Fetching service templates from Coolify repo...');

  const response = await fetch(TEMPLATES_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch service templates: HTTP ${response.status}`);
  }

  const templates = await response.json();
  const services = [];

  for (const [id, template] of Object.entries(templates)) {
    const logo = template.logo
      ? `${LOGO_BASE_URL}${template.logo}`
      : null;

    services.push({
      id,
      name: template.name || formatName(id),
      slogan: template.slogan || '',
      logo,
      category: template.category || 'other',
      documentation: `https://coolify.io/docs/services/${id}`,
    });
  }

  // Sort alphabetically by name
  services.sort((a, b) => a.name.localeCompare(b.name));

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'services.json');
  fs.writeFileSync(outputPath, JSON.stringify(services));

  console.log(`\nSaved ${services.length} services to public/services.json`);
}

main().catch((error) => {
  console.error('Failed to fetch services:', error.message);
  process.exit(1);
});
