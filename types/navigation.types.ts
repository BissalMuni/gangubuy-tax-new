/**
 * Navigation structure type definitions
 * Based on Constitution Principle III: Tree Navigation Architecture
 */

export interface NavigationNode {
  id: string
  label: string
  description?: string
  icon?: string
  path?: string
  children?: Record<string, NavigationNode>
  metadata?: {
    order?: number
    isNew?: boolean
    badge?: string
    hidden?: boolean
  }
}

export interface NavigationTree {
  [key: string]: NavigationNode
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface ActiveSection {
  id: string
  label: string
  level: number
}
