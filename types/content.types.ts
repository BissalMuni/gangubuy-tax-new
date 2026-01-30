/**
 * Content metadata types
 * Based on Constitution Principles I & II: MDX-First + Version Control
 */

/**
 * MDX Frontmatter Schema (MANDATORY per Constitution)
 */
export interface ContentFrontmatter {
  version: string                    // Semantic version (e.g., "1.0.0")
  title: string                      // Display title
  effectiveDate: string              // When this version takes legal effect (ISO format)
  lastUpdated: string                // Last edit date (ISO format)
  tags: string[]                     // Categories/tags
  legalBasis: string                 // Legal citation (e.g., "지방세법 제11조")
  deprecated: boolean                // Whether this version is outdated
  supersededBy?: string | null       // If deprecated, path to current version
  description?: string               // Optional summary
  author?: string                    // Content author/reviewer
  reviewedBy?: string                // Legal/expert reviewer
}

/**
 * Version Metadata Schema (MANDATORY per Constitution)
 * Each content directory must include _meta.json with this structure
 */
export interface VersionMetadata {
  versions: VersionInfo[]
  changelog: string                  // Path to changelog file
}

export interface VersionInfo {
  version: string                    // Semantic version
  file: string                       // MDX filename (e.g., "v1.1.0.mdx")
  effectiveDate: string              // ISO date
  description: string                // Change summary
  changes: string[]                  // Detailed list of changes
  isCurrent: boolean                 // Only one version should be true
  author?: string
  reviewedBy?: string
  publishedAt?: string               // When this version was published
}

/**
 * Tax rate data structure
 * Used within MDX content
 */
export interface TaxRate {
  name: string                       // Tax name (e.g., "취득세", "지방교육세")
  rate: string                       // Rate (e.g., "1.0%", "0.1%", "1.0~3.0%")
  description?: string
  legalBasis?: string
  calculationMethod?: string
  examples?: TaxExample[]
}

export interface TaxExample {
  scenario: string
  amount: string
  calculation: string
  result: string
}

/**
 * Content category for organization
 */
export type ContentCategory =
  | "acquisition-tax"
  | "property-tax"
  | "automobile-tax"
  | "general"

/**
 * Content status for workflow management
 */
export type ContentStatus =
  | "draft"           // Being written
  | "review"          // Awaiting legal review
  | "approved"        // Reviewed and approved
  | "published"       // Live on site
  | "deprecated"      // Outdated, superseded by newer version

/**
 * Full content metadata (frontmatter + computed fields)
 */
export interface ContentMetadata extends ContentFrontmatter {
  slug: string                       // URL slug
  path: string                       // Full file path
  category: ContentCategory
  status: ContentStatus
  readingTime?: number               // Estimated reading time in minutes
}
