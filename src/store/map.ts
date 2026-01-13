import { create } from "zustand"

interface MapState {
  features: GeoJSON.Feature[]
  addFeature: (f: GeoJSON.Feature) => void
}

export const useMapStore = create<MapState>((set) => ({
  features: [],
  addFeature: (f) => set((s) => ({ features: [...s.features, f] }))
}))
