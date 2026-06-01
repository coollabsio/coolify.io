const SPONSORS_URL = "https://raw.githubusercontent.com/coollabsio/coollabs-cdn/main/json/sponsors.json";

const response = await fetch(SPONSORS_URL);

if (!response.ok) {
  throw new Error(`Failed to fetch sponsors from ${SPONSORS_URL}: ${response.status}`);
}

const sponsorsData = await response.json();

export default sponsorsData;
