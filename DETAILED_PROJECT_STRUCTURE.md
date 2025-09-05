# Detailed Project Structure

## 📁 Frontend Structure (`/src/frontend`)

### 🎯 Purpose

Public-facing website serving end users. Uses **Material-UI (MUI)** components exclusively for consistent design system.

### 📂 Components (`/src/frontend/components`)

#### Structure & Purpose

```
components/
├── icons/           # Icon components (SVG icons, custom icon wrappers)
├── layouts/         # Page layout components (headers, footers, main layouts)
├── providers/       # React context providers (theme, query client, auth)
├── ui/             # Reusable UI components (buttons, forms, modals)
└── index.ts        # Export barrel for easy imports
```

**Unit Folder Explanation:**

- **`icons/`**: Contains all icon-related components, typically wrapping SVG icons
- **`layouts/`**: Page structure components that define the overall layout (header, sidebar, footer, main content area)
- **`providers/`**: React Context providers that wrap the application or sections with shared state/configuration
- **`ui/`**: Reusable, generic UI components that can be used across different features

#### Example: UI Component with Styling

**File Structure:**

```
components/ui/RichText/
├── RichText.tsx
├── RichText.style.ts
└── index.ts
```

**File**: `components/ui/RichText/RichText.tsx`

```typescript
import { Typography } from '@mui/material'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverters, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'

import useStyles from './RichText.style'

const typographyConverter: JSXConverters<DefaultNodeTypes> = {
  heading: ({ node, nodesToJSX }) => {
    return <Typography variant={node.tag}>{nodesToJSX({ nodes: node.children })}</Typography>
  },
  text: ({ node }) => {
    return (
      <Typography component="span" variant="body1">
        {node.text}
      </Typography>
    )
  },
  paragraph: ({ node, nodesToJSX }) => {
    return (
      <Typography component="p" variant="body1">
        {nodesToJSX({ nodes: node.children })}
      </Typography>
    )
  },
}

const jsxConverter: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...typographyConverter,
})

type RichTextProps = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

const RichText = (props: RichTextProps) => {
  const { className, ...restProps } = props
  const styles = useStyles()

  return (
    <div style={styles.container}>
      <RichTextConverter {...restProps} className={className} converters={jsxConverter} />
    </div>
  )
}

export default RichText
```

**File**: `components/ui/RichText/RichText.style.ts`

```typescript
import { useTheme } from '@mui/material/styles'

const useStyles = () => {
  const theme = useTheme()

  return {
    container: {
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        marginBottom: theme.spacing(2),
        color: theme.palette.text.primary,
      },
      '& p': {
        marginBottom: theme.spacing(1),
        lineHeight: 1.6,
      },
    },
  }
}

export default useStyles
```

#### Example: Layout Component

**File Structure:**

```
components/layouts/TheMainLayout/
├── TheMainLayout.tsx
├── TheMainLayout.style.ts
└── index.ts
```

**File**: `components/layouts/TheMainLayout/TheMainLayout.tsx`

```typescript
'use client'

import Box from '@mui/material/Box'
import { TheMainFooter, TheMainHeader } from '@/frontend/components'
import useStyles from './TheMainLayout.style'

interface TheMainLayoutProps {
  children: React.ReactNode
}

const TheMainLayout = ({ children }: TheMainLayoutProps) => {
  const styles = useStyles()

  return (
    <Box sx={styles.container}>
      <TheMainHeader />
      <Box component="main" sx={styles.main}>
        {children}
      </Box>
      <TheMainFooter />
    </Box>
  )
}

export default TheMainLayout
```

#### Index File Pattern

**File**: `components/index.ts`

```typescript
export * from './icons'
export * from './ui'
export * from './layouts'
export * from './providers'
```

### 📂 Features (`/src/frontend/features`)

#### Structure & Purpose

```
features/
├── category/        # Category feature module
│   ├── components/  # Category-specific UI components
│   ├── enums/      # Category-specific enumerations
│   ├── hooks/      # Category-specific React hooks
│   ├── interfaces/ # Category-specific TypeScript interfaces
│   └── services/   # Category API service functions
└── product/        # Product feature module
    ├── components/ # Product-specific UI components
    ├── enums/     # Product-specific enumerations
    ├── hooks/     # Product-specific React hooks
    ├── interfaces/# Product-specific TypeScript interfaces
    └── services/  # Product API service functions
```

**Unit Folder Explanation:**

- **`components/`**: Feature-specific UI components that are only used within this feature domain
- **`enums/`**: Enumeration constants specific to this feature (query keys, status values, etc.)
- **`hooks/`**: Custom React hooks for this feature, including data fetching hooks with React Query
- **`interfaces/`**: TypeScript type definitions for API requests/responses and component props
- **`services/`**: Pure functions that handle API calls and data transformation for this feature

#### Example: Feature Interface

**File**: `features/category/interfaces/category.interface.ts`

```typescript
import type { PaginatedDocs, JoinQuery } from 'payload'
import type { CategoriesSelect, Category } from '@/payload-types'
import type { BaseAdminRequest } from '@/shared/interfaces'

export interface GetCategoryListRequest
  extends BaseAdminRequest<JoinQuery<'categories'>, CategoriesSelect> {}

export interface GetCategoryListResponse extends PaginatedDocs<Category> {}

export interface GetCategoryDetailRequest {
  id: number
  locale?: string
  draft?: boolean
}

export interface GetCategoryDetailResponse extends Category {}

export interface CreateCategoryRequest {
  name: string
  slug: string
  description?: string
  parentId?: number
  isActive?: boolean
  locale?: string
}

export interface CreateCategoryResponse extends Category {}

export interface UpdateCategoryRequest {
  id: number
  name?: string
  slug?: string
  description?: string
  parentId?: number
  isActive?: boolean
  locale?: string
}

export interface UpdateCategoryResponse extends Category {}

export interface DeleteCategoryRequest {
  id: number
  locale?: string
}

export interface DeleteCategoryResponse {
  id: number
  message: string
  success: boolean
}

export interface BulkDeleteCategoryRequest {
  ids: number[]
  locale?: string
}

export interface BulkDeleteCategoryResponse {
  deletedIds: number[]
  failedIds: number[]
  message: string
  success: boolean
}
```

#### Example: Feature Enum

**File**: `features/category/enums/category.enum.ts`

```typescript
export enum CategoryQueryKey {
  GET_CATEGORY_LIST = 'getCategoryList',
}
```

#### Example: Feature Hook with Locale

**File**: `features/category/hooks/useGetCategoryList.ts`

```typescript
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { CategoryQueryKey } from '@/frontend/features/category/enums'
import type {
  GetCategoryListRequest,
  GetCategoryListResponse,
} from '@/frontend/features/category/interfaces'
import { getCategoryList } from '@/frontend/features/category/services'

const useGetCategoryList = (
  request: GetCategoryListRequest,
  options?: Omit<UseQueryOptions<GetCategoryListResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  const locale = useLocale() // Always get locale from next-intl for frontend

  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery<GetCategoryListResponse, Error>({
    queryKey: [CategoryQueryKey.GET_CATEGORY_LIST, requestWithLocale],
    queryFn: () => getCategoryList(requestWithLocale),
    ...options,
  })
}

export default useGetCategoryList
```

#### Example: Feature Service

**File**: `features/category/services/category.service.ts`

```typescript
import { isAxiosError } from 'axios'
import type {
  GetCategoryListRequest,
  GetCategoryListResponse,
} from '@/frontend/features/category/interfaces'
import { axiosInstance } from '@/frontend/libs'

export const getCategoryList = async (request: GetCategoryListRequest) => {
  try {
    const { data } = await axiosInstance.get<GetCategoryListResponse>('/categories', {
      params: request,
    })
    return data
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data
    }
    throw error
  }
}
```

### 📂 Hooks (`/src/frontend/hooks`)

#### Purpose & Structure

Global React hooks that can be used across multiple features in the frontend.

**Unit Folder Explanation:**

- Contains reusable hooks that don't belong to a specific feature
- Examples: URL state management, form handling, authentication, theme switching
- Should be generic enough to be used in multiple places

#### Global Frontend Hooks

**File**: `hooks/useUrlQueryState.ts`

```typescript
import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DEFAUlT_PAGE, DEFAUlT_PAGE_SIZE } from '@/frontend/constants'

interface UseUrlQueryStateProps {
  scrollToTop?: boolean
  defaultPage?: string
  defaultLimit?: string
}

const useUrlQueryState = ({
  scrollToTop = true,
  defaultPage = DEFAUlT_PAGE,
  defaultLimit = DEFAUlT_PAGE_SIZE,
}: UseUrlQueryStateProps = {}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get('page') ?? defaultPage)
  const limit = Number(searchParams.get('limit') ?? defaultLimit)
  const search = searchParams.get('search') ?? ''

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', page.toString())
      params.set('limit', limit.toString())
      router.push(`${pathname}?${params.toString()}`, { scroll: scrollToTop })
    },
    [searchParams, router],
  )

  return {
    pagination: { page, limit, handlePageChange },
    search: { search },
    filter: {
      /* filter methods */
    },
  }
}

export default useUrlQueryState
```

### 📂 Utils (`/src/frontend/utils`)

#### Purpose & Structure

Utility functions specific to frontend operations.

**Unit Folder Explanation:**

- Pure functions that perform common frontend operations
- Examples: data formatting, validation, URL manipulation, local storage handling
- Should be stateless and easily testable

#### Example: Query Utility

**File**: `utils/query.util.ts`

```typescript
import { DEFAUlT_PAGE, DEFAUlT_PAGE_SIZE } from '@/frontend/constants'
import type { BaseSearchRequest } from '@/frontend/interfaces'

interface GetUrlQueryStateOptions {
  defaultPage?: string
  defaultPageSize?: string
}

export const getUrlQueryState = (
  searchParams: BaseSearchRequest,
  options?: GetUrlQueryStateOptions,
) => {
  const page = Number(searchParams.page?.toString() ?? options?.defaultPage ?? DEFAUlT_PAGE)
  const pageSize = Number(
    searchParams.limit?.toString() ?? options?.defaultPageSize ?? DEFAUlT_PAGE_SIZE,
  )
  const search = searchParams.search ?? ''

  return {
    page,
    pageSize,
    search,
  }
}
```

### 📂 Other Frontend Folders

#### `constants/` - Frontend Constants

**Purpose**: Configuration values, default settings, and static data specific to frontend

```typescript
export const DEFAUlT_PAGE = '1'
export const DEFAUlT_PAGE_SIZE = '10'
```

#### `enums/` - Frontend Enums

**Purpose**: Enumeration values used across multiple frontend features

```typescript
export enum Route {
  CATEGORIES = '/categories',
  PRODUCTS = '/products',
}
```

#### `interfaces/` - Frontend Interfaces

**Purpose**: TypeScript interfaces used across multiple frontend features

```typescript
export interface BaseSearchRequest {
  page?: number
  limit?: number
  search?: string
  sort?: string
}
```

#### `libs/` - External Library Configurations

**Purpose**: Configuration and setup for external libraries (axios, react-query, etc.)

```typescript
// axios.lib.ts
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})
```

#### `theme/` - MUI Theme Configuration

**Purpose**: Material-UI theme customization and styling configuration

```typescript
// base.theme.ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
})
```

---

## 📁 Payload Structure (`/src/payload`)

### 🎯 Purpose

Admin panel and backoffice functionality using Payload CMS. Uses **Payload UI components** and standard HTML elements - **NO Material-UI**.

### 📂 Features (`/src/payload/features`)

#### Structure & Purpose

```
features/
├── category/       # Category management in admin
├── master-data/    # Master data management
├── media/         # Media file management
├── product/       # Product management in admin
│   ├── collections/  # Payload CMS collection definitions
│   ├── components/   # Admin-specific UI components
│   ├── enums/       # Product admin enumerations
│   ├── hooks/       # Product admin React hooks
│   ├── interfaces/  # Product admin TypeScript interfaces
│   ├── pages/       # Custom admin page components
│   └── services/    # Product admin API services
└── user/          # User management
```

**Unit Folder Explanation:**

- **`collections/`**: Payload CMS collection configurations defining data models, fields, and admin UI
- **`components/`**: Admin-specific UI components using Payload UI library and standard HTML
- **`enums/`**: Admin-specific enumeration constants
- **`hooks/`**: Custom React hooks for admin functionality, including data fetching with React Query
- **`interfaces/`**: TypeScript interfaces for admin API requests/responses
- **`pages/`**: Custom admin pages that extend or replace default Payload admin views
- **`services/`**: API service functions for admin operations

#### Example: Payload Collection

**File**: `features/product/collections/product.collection.ts`

```typescript
import type { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: { th: 'สินค้า' },
    plural: { th: 'สินค้า' },
  },
  admin: {
    useAsTitle: 'name',
    group: 'Example',
    components: {
      views: {
        edit: {
          customView: {
            path: '/detail',
            Component: {
              path: '@/payload/features/product/pages',
              exportName: 'ProductDetailPage',
            },
            tab: {
              label: 'รายละเอียด',
              href: '/detail',
              order: 1,
            },
          },
        },
      },
    },
    defaultColumns: ['name', 'slug', 'price', 'updatedAt', 'updatedBy', 'actions'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.user) {
          data.updatedBy = req.user.id
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
  ],
}

export default Products
```

#### Example: Custom Admin Page

**File Structure:**

```
features/product/pages/ProductDetailPage/
├── ProductDetailPage.tsx
├── ProductDetailPage.scss
└── index.ts
```

**File**: `features/product/pages/ProductDetailPage/ProductDetailPage.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { Collapsible, Gutter, LoadingOverlay, useStepNav } from '@payloadcms/ui'
import { notFound, useParams } from 'next/navigation'

import { ADMIN_ROUTE_COLLECTION } from '@/payload/constants'
import { useAdminGetProductDetail } from '@/payload/features/product/hooks'
import type { Faculty, Major, University } from '@/payload-types'
import { isCollection } from '@/shared/utils'

import './ProductDetailPage.scss'

const ProductDetailPage = () => {
  const paramsHook = useParams()
  const stepNavHook = useStepNav()

  const { data: productDetail, isLoading } = useAdminGetProductDetail({
    id: Number(paramsHook.segments?.[2]),
    draft: true,
  })

  useEffect(() => {
    if (!productDetail) return

    stepNavHook.setStepNav([
      {
        label: 'สินค้า',
        url: `${ADMIN_ROUTE_COLLECTION}/products`,
      },
      {
        label: productDetail.name,
        url: `${ADMIN_ROUTE_COLLECTION}/products/${productDetail.id}`,
      },
      {
        label: 'รายละเอียด',
      },
    ])
  }, [productDetail])

  if (isLoading) {
    return (
      <Gutter>
        <LoadingOverlay />
      </Gutter>
    )
  }

  if (!productDetail) {
    notFound()
  }

  return (
    <div className="product-detail-page">
      <Gutter className="document-fields__edit">
        <Collapsible
          header={`${productDetail.name} เชื่อมโยงหลักสูตร`}
          className="link-curriculum-container"
        >
          {productDetail.linkCurriculums?.map((linkCurriculum) => (
            <Collapsible
              header={
                isCollection<University>(linkCurriculum.university)
                  ? linkCurriculum.university.name
                  : linkCurriculum.university
              }
              key={linkCurriculum.id}
            >
              <div className="curriculum-details">
                <p className="university-name">
                  {isCollection<University>(linkCurriculum.university)
                    ? linkCurriculum.university.name
                    : linkCurriculum.university}
                </p>
                <p className="faculties">
                  {linkCurriculum.faculties
                    ?.map((facultyRelation) =>
                      isCollection<Faculty>(facultyRelation.faculty)
                        ? facultyRelation.faculty.name
                        : facultyRelation.faculty,
                    )
                    .join(', ')}
                </p>
              </div>
            </Collapsible>
          ))}
        </Collapsible>
      </Gutter>
    </div>
  )
}

export default ProductDetailPage
```

### 📂 Hooks (`/src/payload/hooks`)

#### Purpose & Structure

Global React hooks for admin functionality.

**Unit Folder Explanation:**

- Admin-specific hooks that can be used across multiple payload features
- Examples: admin authentication, admin locale handling, admin permissions

#### Example: Admin Hook with Locale

**File**: `hooks/useLocale.ts`

```typescript
import { useLocale } from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation'
import type { TypedLocale } from 'payload'
import { DEFAULT_LOCALE } from '@/shared/constants'

const useAdminLocale = () => {
  const searchParamsHook = useSearchParams()
  const locale = searchParamsHook.get('locale')
  const localeHook = useLocale()

  return (locale || localeHook.code || DEFAULT_LOCALE) as TypedLocale
}

export default useAdminLocale
```

#### Example: Admin Feature Hook with Locale

**File**: `features/product/hooks/useAdminGetProductDetail.ts`

```typescript
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import { useAdminLocale } from '@/payload/hooks' // Always use useAdminLocale for payload
import { ProductQueryKey } from '@/payload/features/product/enums'
import type {
  GetProductDetailRequest,
  GetProductDetailResponse,
} from '@/payload/features/product/interfaces'
import { getProductDetail } from '@/payload/features/product/services'

const useAdminGetProductDetail = (
  request: GetProductDetailRequest,
  options?: Omit<UseQueryOptions<GetProductDetailResponse, Error>, 'queryKey' | 'queryFn'>,
) => {
  const locale = useAdminLocale() // Always get locale from useAdminLocale for payload

  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery<GetProductDetailResponse, Error>({
    queryKey: [ProductQueryKey.GET_PRODUCT_DETAIL, requestWithLocale],
    queryFn: () => getProductDetail(requestWithLocale),
    ...options,
  })
}

export default useAdminGetProductDetail
```

### 📂 Migrations (`/src/payload/migrations`)

#### Purpose & Structure

Database schema migrations for Payload CMS.

**Unit Folder Explanation:**

- Contains database migration files for schema changes
- Each migration has up (apply) and down (rollback) functions
- Migrations are timestamped and run in order

#### Example Migration

**File**: `migrations/20250903_021807_add_example_schema.ts`

```typescript
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection.collection('examples').createIndex({ name: 1 }, { unique: true })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.connection.collection('examples').dropIndex({ name: 1 })
}
```

### 📂 Seed (`/src/payload/seed`)

#### Purpose & Structure

Initial data seeding for the database.

**Unit Folder Explanation:**

- Contains functions to populate database with initial/default data
- Used for setting up development environments or initial production data

---

## 📁 Shared Structure (`/src/shared`)

### 🎯 Purpose

Reusable code accessible by both frontend and payload domains.

### 📂 Utils (`/src/shared/utils`)

#### Purpose & Structure

Utility functions that can be used by both frontend and payload.

**Unit Folder Explanation:**

- Pure functions that don't depend on frontend or payload specific libraries
- Examples: data validation, type guards, data transformation, date formatting

#### Example: Collection Utility

**File**: `utils/collection.util.ts`

```typescript
export const isCollection = <T>(collection: unknown): collection is T => {
  return (
    collection !== null &&
    collection !== undefined &&
    typeof collection !== 'boolean' &&
    typeof collection !== 'number' &&
    typeof collection !== 'string'
  )
}
```

#### Example: Media Utility

**File**: `utils/media.util.ts`

```typescript
import type { Media } from '@/payload-types'

export const isMedia = (image: unknown): image is Media => {
  return typeof image === 'object' && image !== null && 'url' in image
}
```

### 📂 Interfaces (`/src/shared/interfaces`)

#### Purpose & Structure

TypeScript interfaces shared between frontend and payload.

**Unit Folder Explanation:**

- Common type definitions used by both domains
- Examples: API request/response base types, common data structures

#### Example: Shared Interface

**File**: `interfaces/request.interface.ts`

```typescript
export interface BaseSearchRequest {
  page?: number
  limit?: number
  search?: string
  sort?: string
}

export interface BaseAdminRequest<T = any, S = any> extends BaseSearchRequest {
  locale?: string
  where?: T
  select?: S
  draft?: boolean
}
```

### 📂 Constants (`/src/shared/constants`)

#### Purpose & Structure

Constants shared between frontend and payload.

**Unit Folder Explanation:**

- Configuration values used by both domains
- Examples: default locales, common validation rules, shared configuration

#### Example: Shared Constants

**File**: `constants/config.constant.ts`

```typescript
export const DEFAULT_LOCALE = 'th'
export const SUPPORTED_LOCALES = ['th', 'en'] as const
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100
```

---

## 🔄 Development Rules & Standards

### 🎨 UI Component Styling Rules

#### Rule 1: Component Styling Structure

**REQUIRED**: All UI components that need styling must create a dedicated folder with separate style files.

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.style.ts    # For MUI/JS styles for frontend
├── ComponentName.scss        # For SASS styles for payload
└── index.ts
```

#### ❌ Forbidden: Inline Styles

```typescript
// DON'T DO THIS
const MyComponent = () => {
  return (
    <div style={{ padding: '16px', backgroundColor: 'red' }}>
      Content
    </div>
  )
}
```

#### ✅ Required: Separate Style Files

```typescript
// MyComponent.tsx
import useStyles from './MyComponent.style'

const MyComponent = () => {
  const styles = useStyles()
  return (
    <div style={styles.container}>
      Content
    </div>
  )
}

// MyComponent.style.ts
import { useTheme } from '@mui/material/styles'

const useStyles = () => {
  const theme = useTheme()
  return {
    container: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.error.main,
    },
  }
}

export default useStyles
```

### 🌐 Locale Handling Rules

#### Rule 2: React Query Hooks Must Always Pass Locale

**REQUIRED**: All custom hooks that wrap React Query for API calls must include locale in the request.

#### Frontend Locale Rule

```typescript
// ✅ CORRECT: Frontend hooks use useLocale from next-intl
import { useLocale } from 'next-intl'

const useGetCategoryList = (request: GetCategoryListRequest) => {
  const locale = useLocale() // Always use next-intl useLocale for frontend

  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery({
    queryKey: [CategoryQueryKey.GET_CATEGORY_LIST, requestWithLocale],
    queryFn: () => getCategoryList(requestWithLocale),
  })
}
```

#### Payload Locale Rule

```typescript
// ✅ CORRECT: Payload hooks use useAdminLocale
import { useAdminLocale } from '@/payload/hooks'

const useAdminGetProductDetail = (request: GetProductDetailRequest) => {
  const locale = useAdminLocale() // Always use useAdminLocale for payload

  const requestWithLocale = {
    locale,
    ...request,
  }

  return useQuery({
    queryKey: [ProductQueryKey.GET_PRODUCT_DETAIL, requestWithLocale],
    queryFn: () => getProductDetail(requestWithLocale),
  })
}
```

#### ❌ Forbidden: Wrong Locale Hook Usage

```typescript
// DON'T DO THIS - Wrong locale hook for domain
import { useLocale } from '@payloadcms/ui' // Wrong for frontend
import { useLocale } from 'next-intl' // Wrong for payload
```

### 🎯 Component Library Rules

#### Rule 3: Frontend Components - MUI Only

**REQUIRED**: Frontend components must use Material-UI components exclusively.

```typescript
// ✅ CORRECT: Frontend using MUI
import { Button, TextField, Box, Typography } from '@mui/material'

const FrontendComponent = () => {
  return (
    <Box>
      <Typography variant="h1">Title</Typography>
      <TextField label="Input" />
      <Button variant="contained">Submit</Button>
    </Box>
  )
}
```

#### Rule 4: Payload Components - Payload UI Only

**REQUIRED**: Payload components must use Payload UI components and standard HTML. NO Material-UI.

```typescript
// ✅ CORRECT: Payload using Payload UI + HTML
import { Button, Gutter, LoadingOverlay } from '@payloadcms/ui'

const PayloadComponent = () => {
  return (
    <Gutter>
      <h1>Title</h1>
      <input type="text" placeholder="Input" />
      <Button>Submit</Button>
    </Gutter>
  )
}
```

#### ❌ Forbidden: Wrong Component Library Usage

```typescript
// DON'T DO THIS - MUI in Payload
import { Button } from '@mui/material' // Wrong for payload

// DON'T DO THIS - Payload UI in Frontend
import { Button } from '@payloadcms/ui' // Wrong for frontend
```

### 📁 File Organization Rules

#### Rule 5: Index Files for All Directories

**REQUIRED**: Every directory must have an `index.ts` file for barrel exports.

```typescript
// Export everything from subdirectories
export * from './category'
export * from './product'

// Export specific items
export { default as useUrlQueryState } from './useUrlQueryState'
```

#### Rule 6: Feature-Based Organization

**REQUIRED**: Each feature must be self-contained with standardized folder structure.

```
feature-name/
├── components/    # Feature-specific components
├── hooks/        # Feature-specific hooks
├── interfaces/   # Feature-specific types
├── services/     # Feature-specific API calls
├── enums/       # Feature-specific enums
├── utils/       # Feature-specific utilities
```

### 🔄 Import Rules

#### Rule 7: No Cross-Domain Imports

**FORBIDDEN**: Frontend and Payload cannot import from each other.

```typescript
// ❌ FORBIDDEN
import { useAdminLocale } from '@/payload/hooks' // Frontend importing payload
import { useUrlQueryState } from '@/frontend/hooks' // Payload importing frontend
```

#### Rule 8: Shared Imports Allowed

**ALLOWED**: Both domains can import from shared.

```typescript
// ✅ ALLOWED
import { isMedia } from '@/shared/utils'
import { DEFAULT_LOCALE } from '@/shared/constants'
```

### 🧪 Testing Rules

#### Rule 9: Test File Co-location

**REQUIRED**: Test files must be co-located with source files.

```
hooks/
├── useGetCategoryList.ts
├── useGetCategoryList.spec.ts
└── index.ts
```

#### Rule 10: Test File Naming

- **Unit tests**: `.spec.ts` suffix
- **Integration tests**: `.test.ts` suffix

---

## 📋 Naming Conventions Summary

| Type            | Convention                                             | File Suffix       | Example                                 |
| --------------- | ------------------------------------------------------ | ----------------- | --------------------------------------- |
| **Components**  | PascalCase                                             | `.tsx`            | `TheMainLayout.tsx`                     |
| **Hooks**       | camelCase with `use` prefix                            | `.ts`             | `useUrlQueryState.ts`                   |
| **Services**    | camelCase functions                                    | `.service.ts`     | `category.service.ts`                   |
| **Interfaces**  | PascalCase                                             | `.interface.ts`   | `category.interface.ts`                 |
| **Enums**       | PascalCase name, SCREAMING_SNAKE_CASE values           | `.enum.ts`        | `category.enum.ts`                      |
| **Utils**       | camelCase functions                                    | `.util.ts`        | `collection.util.ts`                    |
| **Constants**   | SCREAMING_SNAKE_CASE                                   | `.constant.ts`    | `config.constant.ts`                    |
| **Style Files** | `ComponentName.style.ts` or `ComponentName.style.scss` | `.style.ts/.scss` | `RichText.style.ts`                     |
| **Collections** | PascalCase                                             | `.collection.ts`  | `product.collection.ts`                 |
| **Pages**       | PascalCase                                             | `.tsx`            | `ProductDetailPage.tsx`                 |
| **Migrations**  | Timestamped                                            | `.ts`             | `20250903_021807_add_example_schema.ts` |

**Note**: Hooks and Components don't require descriptive suffixes because their naming conventions (`use` prefix for hooks, PascalCase for components) already indicate their purpose.

---

### API Interface Naming Convention

| Operation Type  | Request Pattern             | Response Pattern             | Example                     |
| --------------- | --------------------------- | ---------------------------- | --------------------------- |
| **Get List**    | `Get{Entity}ListRequest`    | `Get{Entity}ListResponse`    | `GetCategoryListRequest`    |
| **Get Detail**  | `Get{Entity}DetailRequest`  | `Get{Entity}DetailResponse`  | `GetCategoryDetailRequest`  |
| **Create**      | `Create{Entity}Request`     | `Create{Entity}Response`     | `CreateCategoryRequest`     |
| **Update**      | `Update{Entity}Request`     | `Update{Entity}Response`     | `UpdateCategoryRequest`     |
| **Delete**      | `Delete{Entity}Request`     | `Delete{Entity}Response`     | `DeleteCategoryRequest`     |
| **Bulk Delete** | `BulkDelete{Entity}Request` | `BulkDelete{Entity}Response` | `BulkDeleteCategoryRequest` |

**Additional Examples for Different Entities:**

```typescript
// Product interfaces
export interface GetProductListRequest
  extends BaseAdminRequest<JoinQuery<'products'>, ProductsSelect> {}

export interface GetProductListResponse extends PaginatedDocs<Product> {}

export interface GetProductDetailRequest {
  id: number
  locale?: string
  draft?: boolean
}

export interface GetProductDetailResponse extends Product {}

export interface CreateProductRequest {
  name: string
  slug: string
  price: number
  description?: string
  categoryId: number
  images?: string[]
  locale?: string
}

export interface CreateProductResponse extends Product {}

export interface UpdateProductRequest {
  id: number
  name?: string
  price?: number
  description?: string
  categoryId?: number
  locale?: string
}

export interface UpdateProductResponse extends Product {}

// User interfaces
export interface GetUserListRequest extends BaseAdminRequest<JoinQuery<'users'>, UsersSelect> {}

export interface GetUserListResponse extends PaginatedDocs<User> {}

export interface GetUserDetailRequest {
  id: number
  locale?: string
  draft?: boolean
}

export interface GetUserDetailResponse extends User {}

export interface CreateUserRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
  locale?: string
}

export interface CreateUserResponse extends User {}

export interface UpdateUserRequest {
  id: number
  email?: string
  firstName?: string
  lastName?: string
  role?: 'admin' | 'user'
  locale?: string
}

export interface UpdateUserResponse extends User {}
```
