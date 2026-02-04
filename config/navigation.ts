/**
 * Main Navigation Structure
 *
 * Constitution Principle III: Tree Navigation Architecture
 * - External config (NOT hardcoded in components)
 * - Schema-driven navigation
 * - Content path mapping for each leaf node
 * - Supports dynamic expansion
 */

import type { NavigationTree, NavigationNode } from '@/types/navigation.types'

export const navigationTree: NavigationTree = {
  "홈": {
    id: "home",
    label: "홈",
    description: "세금 정보 시스템 메인 페이지",
    icon: "Home",
    path: "/",
    metadata: {
      order: 1
    }
  },

  "취득세": {
    id: "acquisition-tax",
    label: "취득세",
    description: "부동산, 차량 등 취득 시 부과되는 지방세",
    icon: "Building",
    metadata: {
      order: 2
    },
    children: {
      "유상취득": {
        id: "paid-acquisition",
        label: "유상취득",
        description: "매매, 교환, 경매 등 대가를 지불하고 취득하는 경우",
        children: {
          "주택 매매": {
            id: "house-purchase",
            label: "주택 매매",
            children: {
              "1주택 취득": {
                id: "one-house",
                label: "1주택 취득",
                path: "/content/acquisition-tax/paid/house/one-house",
                description: "생애 첫 주택 또는 1주택 보유 시 추가 취득"
              },
              "2주택 취득": {
                id: "two-house",
                label: "2주택 취득",
                path: "/content/acquisition-tax/paid/house/two-house",
                description: "2주택 보유 상태에서 추가 취득"
              },
              "3주택 취득": {
                id: "three-house",
                label: "3주택 취득",
                path: "/content/acquisition-tax/paid/house/three-house",
                description: "3주택 보유 상태에서 추가 취득"
              },
              "4주택 이상": {
                id: "four-plus-house",
                label: "4주택 이상",
                path: "/content/acquisition-tax/paid/house/four-plus-house",
                description: "4주택 이상 보유 시 중과세율 적용"
              }
            }
          },
          "토지 매매": {
            id: "land-purchase",
            label: "토지 매매",
            children: {
              "농지 취득": {
                id: "farmland",
                label: "농지 취득",
                path: "/content/acquisition-tax/paid/land/farmland",
                description: "농지 매매 시 취득세율"
              },
              "임야 취득": {
                id: "forest-land",
                label: "임야 취득",
                path: "/content/acquisition-tax/paid/land/forest",
                description: "임야 매매 시 취득세율"
              },
              "기타 토지": {
                id: "other-land",
                label: "기타 토지",
                path: "/content/acquisition-tax/paid/land/other",
                description: "농지, 임야 외 토지 취득"
              }
            }
          }
        }
      },

      "무상취득": {
        id: "free-acquisition",
        label: "무상취득",
        description: "상속, 증여 등 대가 없이 취득하는 경우",
        children: {
          "상속": {
            id: "inheritance",
            label: "상속",
            children: {
              "1가구 1주택 상속": {
                id: "inheritance-one-house",
                label: "1가구 1주택 상속",
                path: "/content/acquisition-tax/free/inheritance/one-house",
                description: "1가구 1주택 특례 적용 (감면)"
              },
              "농지 상속": {
                id: "inheritance-farmland",
                label: "농지 상속",
                path: "/content/acquisition-tax/free/inheritance/farmland",
                description: "농지 상속 시 취득세율"
              },
              "기타 재산 상속": {
                id: "inheritance-other",
                label: "기타 재산 상속",
                path: "/content/acquisition-tax/free/inheritance/other",
                description: "주택, 농지 외 재산 상속"
              }
            }
          },
          "증여": {
            id: "gift",
            label: "증여",
            children: {
              "조정대상지역 주택": {
                id: "gift-regulated-area",
                label: "조정대상지역 주택",
                path: "/content/acquisition-tax/free/gift/regulated-area",
                description: "강남구, 서초구 등 조정지역 주택 증여",
                metadata: {
                  badge: "중과"
                }
              },
              "1세대 1주택자 증여": {
                id: "gift-one-house-owner",
                label: "1세대 1주택자 증여",
                path: "/content/acquisition-tax/free/gift/one-house-owner",
                description: "1세대 1주택자가 배우자/직계존비속에게 증여"
              },
              "일반 증여": {
                id: "gift-general",
                label: "일반 증여",
                path: "/content/acquisition-tax/free/gift/general",
                description: "기타 증여 (시가표준 3억 이상 주택)"
              }
            }
          },
          "재산분할": {
            id: "division",
            label: "재산분할",
            children: {
              "이혼 재산분할": {
                id: "divorce-division",
                label: "이혼 재산분할",
                path: "/content/acquisition-tax/free/division/divorce",
                description: "이혼으로 인한 재산분할 취득"
              },
              "공유물 분할": {
                id: "common-division",
                label: "공유물 분할",
                path: "/content/acquisition-tax/free/division/common",
                description: "공유물, 합유물, 총유물 분할"
              }
            }
          }
        }
      },

      "원시취득": {
        id: "original-acquisition",
        label: "원시취득",
        description: "신축, 개축, 증축, 대수선 등으로 최초 취득",
        children: {
          "건축물 신축": {
            id: "new-construction",
            label: "건축물 신축",
            path: "/content/acquisition-tax/original/new-construction",
            description: "건축물을 신축하여 취득"
          },
          "개축/증축": {
            id: "reconstruction",
            label: "개축/증축",
            path: "/content/acquisition-tax/original/reconstruction",
            description: "기존 건축물 개축, 증축"
          }
        }
      }
    }
  },

  "재산세": {
    id: "property-tax",
    label: "재산세",
    description: "매년 6월 1일 기준 부동산 소유자에게 부과되는 지방세",
    icon: "Home",
    metadata: {
      order: 3,
      badge: "준비중"
    },
    children: {
      "주택 재산세": {
        id: "house-property-tax",
        label: "주택 재산세",
        path: "/content/property-tax/house",
        description: "주택에 대한 재산세 (건물 + 토지 통합 과세)"
      },
      "토지 재산세": {
        id: "land-property-tax",
        label: "토지 재산세",
        path: "/content/property-tax/land",
        description: "나대지, 농지 등 토지 재산세"
      },
      "건축물 재산세": {
        id: "building-property-tax",
        label: "건축물 재산세",
        path: "/content/property-tax/building",
        description: "주택 외 건축물 재산세 (상가, 공장 등)"
      }
    }
  },

  "자동차세": {
    id: "automobile-tax",
    label: "자동차세",
    description: "자동차 소유에 대한 지방세 (연 2회 부과)",
    icon: "Car",
    metadata: {
      order: 4,
      badge: "준비중"
    },
    children: {
      "승용차": {
        id: "passenger-car",
        label: "승용차",
        path: "/content/automobile-tax/passenger-car",
        description: "비영업용 승용차 자동차세"
      },
      "승합차": {
        id: "van",
        label: "승합차",
        path: "/content/automobile-tax/van",
        description: "승합차 자동차세 (영업용/비영업용)"
      },
      "화물차": {
        id: "truck",
        label: "화물차",
        path: "/content/automobile-tax/truck",
        description: "화물차 자동차세"
      },
      "이륜차": {
        id: "motorcycle",
        label: "이륜차",
        path: "/content/acquisition-tax/motorcycle",
        description: "오토바이, 이륜차 자동차세"
      }
    }
  },

  "검색": {
    id: "search",
    label: "검색",
    description: "세금 정보 통합 검색",
    icon: "Search",
    path: "/search",
    metadata: {
      order: 5
    }
  }
}

/**
 * Helper function to get all navigation paths
 * Used for sitemap generation and route validation
 */
export function getAllPaths(tree: NavigationTree = navigationTree): string[] {
  const paths: string[] = []

  function traverse(node: NavigationNode) {
    if (node.path) {
      paths.push(node.path)
    }
    if (node.children) {
      Object.values(node.children).forEach(traverse)
    }
  }

  Object.values(tree).forEach(traverse)
  return paths
}

/**
 * Helper function to find node by ID
 */
export function findNodeById(
  id: string,
  tree: NavigationTree = navigationTree
): NavigationNode | null {
  function search(nodes: Record<string, NavigationNode>): NavigationNode | null {
    for (const node of Object.values(nodes)) {
      if (node.id === id) return node
      if (node.children) {
        const found = search(node.children)
        if (found) return found
      }
    }
    return null
  }

  return search(tree)
}

/**
 * Helper function to get breadcrumb trail
 */
export function getBreadcrumbs(
  nodeId: string,
  tree: NavigationTree = navigationTree
): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = []

  function findPath(
    nodes: Record<string, NavigationNode>,
    targetId: string,
    currentPath: BreadcrumbItem[]
  ): boolean {
    for (const node of Object.values(nodes)) {
      const newPath = [...currentPath, { label: node.label, path: node.path }]

      if (node.id === targetId) {
        breadcrumbs.push(...newPath)
        return true
      }

      if (node.children && findPath(node.children, targetId, newPath)) {
        return true
      }
    }
    return false
  }

  findPath(tree, nodeId, [])
  return breadcrumbs
}

interface BreadcrumbItem {
  label: string
  path?: string
}
