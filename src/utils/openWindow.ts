export function openWindow({ path = '', width = 800, height = 600, query = {} }): WindowProxy | null {
  const base = '/admin'

  const queryStr = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return window.open(`${base}${path}?${queryStr}`, `${path}?${queryStr}`, `width=${width},height=${height}`)
}
