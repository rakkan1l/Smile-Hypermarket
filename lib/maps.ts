/**
 * Map provider abstraction.
 *
 * Today this uses keyless Google Maps embeds. To switch to the Google Maps
 * JavaScript / Embed API, set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY and the embed
 * URL below will use the official Embed API automatically. Components only
 * ever call these helpers, so no UI code needs to change.
 */
type MapTarget = { latitude: number; longitude: number; mapQuery: string };

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function getMapEmbedUrl(target: MapTarget, zoom = 15) {
  if (apiKey) {
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(target.mapQuery)}&zoom=${zoom}`;
  }
  return `https://maps.google.com/maps?q=${target.latitude},${target.longitude}&z=${zoom}&output=embed`;
}

export function getDirectionsUrl(target: MapTarget) {
  return `https://www.google.com/maps/dir/?api=1&destination=${target.latitude},${target.longitude}`;
}
