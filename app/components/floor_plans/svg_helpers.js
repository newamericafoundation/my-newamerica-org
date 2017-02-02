/*
 * Transforms coordinate array to svg point coordinates definition.
 *
 */
export function toSvgPointsDef (coordinates) {
  return coordinates.map((point) => {
    return `${point[0]},${100 - point[1]}`
  }).join(',')
}
