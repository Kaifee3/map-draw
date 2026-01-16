import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import { useMapStore } from "../store/map"
import { processPolygon } from "../store/geo"

export default function MapView() {
  const addFeature = useMapStore((s) => s.addFeature)
  const features = useMapStore((s) => s.features)

  const onCreate = (e: any) => {
    const layer = e.layer

    if (e.layerType === "rectangle") {
      const bounds = layer.getBounds()
      const expanded = bounds.pad(125.125)
      layer.setBounds(expanded)
    }

    if (e.layerType === "circle") {
      const r = layer.getRadius()
      layer.setRadius(r * 1.5)
    }

    const geo = layer.toGeoJSON()
    geo.id = crypto.randomUUID()

    if (e.layerType !== "polyline") {
      const existing = features.filter(
        f => f.geometry.type !== "LineString"
      )

      try {
        const processed = processPolygon(geo as any, existing as any)
        if (!processed) return
        addFeature(processed)
      } catch {
        alert("Polygon fully encloses another polygon")
      }
    } else {
      addFeature(geo)
    }
  }

  return (
    <MapContainer center={[28.6, 77.2]} zoom={6} style={{ flex: 1 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreate}
          draw={{
            polygon: true,
            rectangle: true,
            circle: true,
            polyline: true,
            marker: false,
            circlemarker: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  )
}
