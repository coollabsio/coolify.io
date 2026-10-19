import { stripDashes } from "../utils/stripDashes";

const SPONSORS_URL = "https://cdn.coollabs.io/sponsors.json";

const response = await fetch(SPONSORS_URL);

if (!response.ok) {
  throw new Error(`Failed to fetch sponsors from ${SPONSORS_URL}: ${response.status}`);
}

const sponsorsData = await response.json();

for (const tier of Object.values(sponsorsData.tiers ?? {})) {
  if (!Array.isArray(tier)) continue;
  for (const sponsor of tier) {
    sponsor.name = stripDashes(sponsor.name);
    sponsor.description = stripDashes(sponsor.description);
    sponsor.additionalContent = stripDashes(sponsor.additionalContent);
  }
}

export default sponsorsData;
