import { useMapStore } from "../store/map"

export default function Toolbar() {
  const features = useMapStore((s) => s.features)

  const exportGeoJSON = () => {
    const data = { type: "FeatureCollection", features }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "features.geojson"
    a.click()
  }

  return (
    <div style={{ width: 120, background: "#111", color: "#fff", padding: 10 }}>
      <h4>Tools</h4>
      <button onClick={exportGeoJSON}>Export</button>
    </div>
  )
}
