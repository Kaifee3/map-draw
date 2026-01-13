import MapView from "./components/MapV"
import Toolbar from "./components/ToolB"

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Toolbar />
      <MapView />
    </div>
  )
}
