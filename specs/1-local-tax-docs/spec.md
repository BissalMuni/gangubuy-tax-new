# Feature Specification: Local Tax Documentation Site

**Feature Branch**: `1-local-tax-docs`
**Created**: 2026-01-28
**Status**: Draft
**Input**: Local tax information site with MDX content rendering, tree navigation, responsive design, and content versioning

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Tax Information (Priority: P1)

A user visits the site to read tax information. They see a clean layout with the system name in the header, a tree navigation on the left sidebar, and content displayed in the main area. They click on a navigation item (e.g., "취득세 > 세율") and the corresponding content loads in the content area.

**Why this priority**: This is the core functionality - displaying content with navigation. Without this, the site has no value.

**Independent Test**: Navigate to the site, click any navigation item, verify the correct content renders.

**Acceptance Scenarios**:

1. **Given** user is on the homepage, **When** they click "취득세" in the sidebar, **Then** the tree expands to show sub-items (세율, 과세표준, etc.)
2. **Given** user clicks "세율" under "취득세", **When** the page loads, **Then** the MDX content for acquisition tax rates is displayed in the content area
3. **Given** user is viewing content, **When** they look at the sidebar, **Then** the current navigation item is highlighted

---

### User Story 2 - Infinite Scroll Navigation (Priority: P2)

A user is reading tax content and scrolls down. When they reach the end of the current section, the next section in the sequence automatically loads and the URL updates. The sidebar navigation highlights the new current section.

**Why this priority**: Improves reading experience by allowing continuous reading without manual clicks. Builds on P1 foundation.

**Independent Test**: Open a tax info page, scroll to the bottom, verify next content loads and URL/sidebar updates.

**Acceptance Scenarios**:

1. **Given** user is reading "취득세 > 세율", **When** they scroll past the content end, **Then** "취득세 > 과세표준" content loads below
2. **Given** content auto-loads via scroll, **When** the new section becomes visible, **Then** the browser URL updates to reflect the new section
3. **Given** URL updates via scroll, **When** user checks the sidebar, **Then** the highlighted item matches the currently visible section

---

### User Story 3 - Responsive Layout (Priority: P2)

A user accesses the site from their mobile phone. The layout adapts to show a mobile-friendly navigation (hamburger menu or bottom tabs) instead of the sidebar. Content remains readable with appropriate sizing.

**Why this priority**: Many users access tax information on mobile devices. Essential for accessibility.

**Independent Test**: Open the site on a mobile device (or resize browser), verify navigation transforms and content is readable.

**Acceptance Scenarios**:

1. **Given** user opens site on mobile (width < 768px), **When** the page loads, **Then** the sidebar is hidden and a mobile navigation appears
2. **Given** user is on mobile view, **When** they tap the navigation toggle, **Then** a menu appears with the same tree structure as desktop
3. **Given** user is on tablet (768px - 1024px), **When** the page loads, **Then** layout adjusts appropriately (collapsible sidebar)

---

### User Story 4 - Font Size Adjustment (Priority: P3)

A user with visual preferences wants to increase the text size. They find a font size control and adjust it. The content text size changes accordingly, and their preference is remembered for future visits.

**Why this priority**: Improves accessibility for users with visual needs. Enhances user experience but not core functionality.

**Independent Test**: Find font size control, adjust it, verify text size changes, refresh page and verify setting persists.

**Acceptance Scenarios**:

1. **Given** user is viewing content, **When** they click the font size increase button, **Then** content text size increases by one step
2. **Given** user has set a larger font size, **When** they navigate to another page, **Then** the font size preference is maintained
3. **Given** user has set a custom font size, **When** they close and reopen the browser, **Then** their preference is restored

---

### User Story 5 - Content Version History (Priority: P3)

A user wants to see how tax information has changed over time. They find a version selector for the current content and can switch between versions to compare information.

**Why this priority**: Important for transparency and legal compliance (showing historical tax rates), but not required for basic functionality.

**Independent Test**: Navigate to content with multiple versions, use version selector, verify different versions display correctly.

**Acceptance Scenarios**:

1. **Given** user is viewing content that has multiple versions, **When** they look at the content header, **Then** they see a version indicator showing current version and last updated date
2. **Given** content has version history, **When** user clicks the version selector, **Then** a list of available versions appears with dates
3. **Given** user selects a previous version, **When** the selection is made, **Then** the content updates to show that version's information

---

### Edge Cases

- What happens when MDX content file is missing or corrupted? Display a friendly error message with navigation to other content.
- What happens when user navigates to a non-existent route? Show a 404 page with navigation options.
- What happens when user has JavaScript disabled? Core content should still be readable (SSR/SSG).
- What happens when scrolling very fast through infinite scroll? Debounce URL updates to prevent excessive history entries.
- What happens when a content version is deleted? Redirect to the latest version with a notice.

## Requirements *(mandatory)*

### Functional Requirements

**Layout & Structure**
- **FR-001**: System MUST display a header containing only the system name "GanguBuy Tax"
- **FR-002**: System MUST display a left sidebar with tree-structured navigation
- **FR-003**: System MUST display a content area that renders MDX files corresponding to the selected navigation item
- **FR-004**: Layout MUST consist of exactly three sections: header, navigation (sidebar), and content area

**Navigation**
- **FR-005**: Navigation tree MUST be defined in a separate configuration file, not embedded in components
- **FR-006**: Navigation MUST include these top-level categories in order: Home (홈), Acquisition Tax (취득세), Property Tax (재산세), Vehicle Tax (자동차세), Search (검색)
- **FR-007**: Each tax category MUST support multiple levels of sub-items (tree structure)
- **FR-008**: Currently active navigation item MUST be visually highlighted
- **FR-009**: Navigation tree state (expanded/collapsed nodes) MUST persist during the session

**Infinite Scroll**
- **FR-010**: System MUST load the next content section when user scrolls to the end of current content
- **FR-011**: System MUST update the browser URL when a new section becomes the primary visible content
- **FR-012**: System MUST synchronize the sidebar highlight with the currently visible content during scroll

**Responsive Design**
- **FR-013**: System MUST provide a mobile-optimized layout for screens narrower than 768px
- **FR-014**: System MUST hide the sidebar and show alternative navigation on mobile
- **FR-015**: System MUST adjust content width appropriately for each screen size

**Font Size**
- **FR-016**: System MUST provide controls to increase and decrease content font size
- **FR-017**: System MUST persist font size preference in local storage
- **FR-018**: Navigation items MUST display with font sizes reflecting their hierarchy level (larger for parent, smaller for children)

**Content Versioning**
- **FR-019**: System MUST support multiple versions of the same content (stored as separate MDX files with version in filename, e.g., `content-name-v1.0.mdx`)
- **FR-020**: System MUST display the current version number and last updated date for each content
- **FR-021**: System MUST allow users to view and switch between available content versions
- **FR-022**: System MUST display the latest version by default

**Search**
- **FR-023**: System MUST provide a search page accessible from the navigation
- **FR-024**: Search MUST query content titles, headings, and body text
- **FR-025**: Search results MUST display matching content items with highlighted keywords
- **FR-026**: Clicking a search result MUST navigate to the corresponding content

### Key Entities

- **Navigation Node**: Represents a single item in the navigation tree. Has label, path, icon (optional), and children (for nested items).
- **Navigation Config**: The complete navigation tree structure defined in a separate configuration file.
- **Content Item**: An MDX file containing tax information. Has title, category, version, lastUpdated date, and body content.
- **Content Version**: A specific version of a content item. Multiple versions can exist for the same navigation path.
- **User Preference**: Stored settings including font size preference.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find and view any tax information within 3 clicks from the homepage
- **SC-002**: Page content loads and becomes interactive within 2 seconds on standard connections
- **SC-003**: Mobile users can navigate and read content without horizontal scrolling
- **SC-004**: 95% of content sections have clearly defined navigation paths
- **SC-005**: Users can adjust font size and see changes immediately (under 100ms perceived delay)
- **SC-006**: Content version history is accessible for all content items that have multiple versions
- **SC-007**: Infinite scroll transitions feel seamless with no visible loading delays for pre-cached content

## Clarifications

### Session 2026-01-28

- Q: How should versioned MDX files be organized? → A: Filename includes version (e.g., `acquisition-rates-v1.0.mdx`)
- Q: Is authentication required? → A: Fully public - no login required for any content
- Q: Should the site include search? → A: Yes, as a top-level navigation item at the end (after 자동차세)

## Assumptions

- Tax categories are limited to: Home, Acquisition Tax, Property Tax, and Vehicle Tax (as specified)
- Navigation structure will reference the existing `.deprecated` structure as a starting point
- MDX format will be used for content (confirmed by user)
- Navigation configuration will use TypeScript for type safety (standard approach)
- Default font size range: 3 levels (small, medium, large) with medium as default
- Content versions follow a simple versioning scheme: v1.0, v1.1, v2.0, etc.
- Mobile breakpoint at 768px follows common responsive design standards
- Site is fully public with no authentication required
