const SPONSORS_URL = "https://cdn.coollabs.io/sponsors.json";

const response = await fetch(SPONSORS_URL);

if (!response.ok) {
  throw new Error(`Failed to fetch sponsors from ${SPONSORS_URL}: ${response.status}`);
}

const sponsorsData = await response.json();

export default sponsorsData;
