import * as turf from "@turf/turf"

export function processPolygon(newPoly: any, existing: any[]) {
  let result = newPoly
  for (const e of existing) {
    if (turf.booleanContains(result, e)) {
      throw new Error("ENCLOSE")
    }
    if (turf.booleanOverlap(result, e)) {
      const diff = turf.difference(turf.featureCollection([result, e]))
      if (!diff) return null
      result = diff
    }
  }
  return result
}
