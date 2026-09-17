import { readFileSync, writeFileSync } from "node:fs";

// Natural Earth 1:110m land, public domain. Pass the downloaded GeoJSON path.
// https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson
const land = JSON.parse(readFileSync(process.argv[2], "utf8"));
const paths = land.features.flatMap(({ geometry }) => {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map((rings, i) => {
    const d = rings.map((ring) => ring.map(([lng, lat], point) =>
      `${point ? "L" : "M"}${((lng + 180) * 4).toFixed(1)},${((90 - lat) * 4).toFixed(1)}`,
    ).join(" ") + "Z").join(" ");
    return `<path d="${d}" fill="${["#b9d99e", "#c5dfa9", "#b0d19a"][i % 3]}"/>`;
  });
});
const grid = [];
for (let x = 120; x < 1440; x += 120) grid.push(`<path d="M${x} 0V720"/>`);
for (let y = 120; y < 720; y += 120) grid.push(`<path d="M0 ${y}H1440"/>`);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="720" viewBox="0 0 1440 720"><defs><linearGradient id="ocean" x2="0" y2="1"><stop stop-color="#d6f2f4"/><stop offset=".5" stop-color="#66bfdd"/><stop offset="1" stop-color="#d6f2f4"/></linearGradient></defs><path fill="url(#ocean)" d="M0 0H1440V720H0Z"/><g fill="none" stroke="#effcff" stroke-opacity=".24" stroke-width="1">${grid.join("")}</g><g stroke="#f5f5db" stroke-width="1.8" stroke-linejoin="round" fill-rule="evenodd">${paths.join("")}</g></svg>`;
writeFileSync(new URL("../public/maps/world.svg", import.meta.url), svg);
console.log(`Created local world map (${Math.round(svg.length / 1024)} kB).`);
