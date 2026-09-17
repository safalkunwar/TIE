# World map

`world.svg` is a locally hosted, stylized equirectangular map generated from
[Natural Earth 1:110m land](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson).
Natural Earth data is [public domain](https://www.naturalearthdata.com/about/terms-of-use/).

Regenerate with `node scripts/build-world-map.mjs <path-to-ne_110m_land.geojson>`.
Both the interactive globe and the non-WebGL map use this asset.
