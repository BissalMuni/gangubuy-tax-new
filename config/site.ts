/**
 * Site-wide configuration
 * Based on Constitution requirements
 */

export const siteConfig = {
  name: "세금 정보 시스템",
  shortName: "세금정보",
  description: "한국의 각종 세금 정보를 체계적으로 관리하고 조회할 수 있는 시스템",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Legal disclaimer (Constitution Principle IV)
  legalDisclaimer: "이 시스템은 정보 제공 목적으로만 사용되며, 실제 세무 상담이나 법적 조언을 대체할 수 없습니다. 정확한 세무 정보는 전문가와 상담하시기 바랍니다.",

  // Version info
  version: "1.0.0",
  lastUpdated: "2026-01-29",

  // Content versioning (Constitution Principle II)
  contentVersioning: {
    enabled: true,
    displayHistoricalVersions: true,
    defaultVersion: "current"
  },

  // UI Layout (per user requirements)
  layout: {
    header: {
      showVersion: true,
      showSearch: true,
      height: "64px"
    },
    navigation: {
      width: "280px",
      collapsible: true,
      defaultExpanded: true,
      scrollSpy: true  // Auto-highlight on scroll
    },
    content: {
      maxWidth: "1200px",
      padding: "2rem"
    }
  },

  // Performance budgets (Constitution Principle V)
  performance: {
    targetFCP: 1500,  // First Contentful Paint (ms)
    targetLCP: 2500,  // Largest Contentful Paint (ms)
    targetTTI: 3000,  // Time to Interactive (ms)
    target3G: 3000    // Total load time on 3G (ms)
  },

  // Links
  links: {
    github: "https://github.com/your-username/gangubuy-tax-new",
    support: "mailto:support@example.com",
    nts: "https://www.nts.go.kr",  // 국세청
    wetax: "https://www.wetax.go.kr"  // 위택스 (지방세)
  },

  // Features
  features: {
    search: true,
    darkMode: false,  // Phase 2
    i18n: false,      // Phase 3
    userAuth: false,  // Phase 4
    calculator: false // Phase 5
  }
} as const

export type SiteConfig = typeof siteConfig
