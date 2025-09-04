// Ref: https://payloadcms.com/docs/rest-api/overview
/**
 * depth - automatically populates relationships and uploads
 * locale - retrieves document(s) in a specific locale
 * fallbackLocale - specifies a fallback locale if no locale value exists
 * select - specifies which fields to include to the result
 * populate - specifies which fields to include to the result from populated documents
 * limit - limits the number of documents returned
 * page - specifies which page to get documents from when used with a limit
 * sort - specifies the field(s) to use to sort the returned documents by
 * where - specifies advanced filters to use to query documents
 * joins - specifies the custom request for each join field by name of the field
 */
import type { JoinQuery, PopulateType, TypedLocale, Where } from 'payload'

export interface BaseAdminRequest<TJoinQuery extends JoinQuery, TSelect> {
  depth?: number
  locale?: TypedLocale | 'all'
  fallbackLocale?: TypedLocale
  select?: TSelect
  populate?: PopulateType
  limit?: number
  page?: number
  sort?: string[]
  where?: Where
  joins?: TJoinQuery
}
