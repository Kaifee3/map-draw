OPENSTREETMAP DRAWING APPLICATION

This project is a frontend web application built using React.js and TypeScript.
It renders OpenStreetMap tiles and allows users to draw different geometrical shapes on the map while enforcing spatial rules.
All drawn shapes can be exported as a GeoJSON file.

TECH STACK USED

> React.js with TypeScript
> React Leaflet & Leaflet Dra
> Turf.js for spatial operations
> Zustand for state management
> Vite for project setup

SETUP AND RUN INSTRUCTIONS

Clone the repository

git clone https://github.com/kaifee3/map-draw.git
cd osm-draw

Install dependencies

npm install

Run the project

npm run dev

Open in browser

http://localhost:5173

APPLICATION FEATURES

OpenStreetMap base layer with zoom and pan

Drawing tools for:

> Polygon
> Rectangle
> Circle
> LineString
> Polygon overlap handling
> LineStrings are allowed to cross any shape
> Export all drawn shapes as GeoJSON
> Clean and modular project structure
> POLYGON OVERLAP LOGIC EXPLANATION
> Polygon overlap handling is implemented using Turf.js.

Rules applied:

> Polygon, Rectangle, and Circle are treated as polygonal shapes
> These shapes are not allowed to overlap with existing polygonal shapes
> If a new polygon partially overlaps an existing one, the overlapping area is removed automatically
> If a new polygon completely encloses an existing polygon, the action is blocked and an error is shown
> LineString is excluded from all overlap rules and can freely cross any shape

Logic flow:

> When a shape is drawn, it is converted into GeoJSON
> Existing polygonal shapes are fetched from the global state
> If the new polygon fully contains an existing polygon, drawing is rejected
> If the new polygon partially overlaps, the overlapping area is removed using Turf.js difference
> If the result is valid, the shape is added to the state

Turf.js functions used:

1 booleanContains

2 booleanOverlap

3. difference

GEOJSON EXPORT

The Export button downloads all drawn shapes as a GeoJSON file.

Sample exported GeoJSON:

{
"type": "FeatureCollection",
"features": [
{
"type": "Feature",
"id": "a1b2c3d4",
"geometry": {
"type": "Polygon",
"coordinates": [
[
[77.1, 28.6],
[77.3, 28.6],
[77.3, 28.8],
[77.1, 28.8],
[77.1, 28.6]
]
]
},
"properties": {
"shapeType": "polygon"
}
}
]
}

PROJECT STRUCTURE

src
├── components
│ ├── MapV.tsx
│ └── ToolB.tsx
├── store
│ └── map.ts
│ └── geo.ts
├── config
│ └── limits.ts
├── App.tsx
└── main.tsx

POSSIBLE IMPROVEMENTS

> Shape editing and deletion
> Better UI notifications instead of alerts
> Undo and redo support
> Backend storage for GeoJSON
> Shape limit indicators

