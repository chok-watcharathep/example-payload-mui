export const isCollection = <T>(collection: unknown): collection is T => {
  return (
    collection !== null &&
    collection !== undefined &&
    typeof collection !== 'boolean' &&
    typeof collection !== 'number' &&
    typeof collection !== 'string'
  )
}
