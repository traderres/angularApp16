/*
 * This class holds the routes (that are visible to the user)
 *   1) If you wish to change the routes, then you *MUST* change the routes in the V1.1__security.sql
 *   2) Each route must start with 'page/' so that the backend knows to load the entire page (if a route is bookmarked)
 */
export enum Constants {
  FORBIDDEN_ROUTE                            = "page/403",

  SAMPLE_PAGE_ROUTE                          = "page/sample-page",
  SAMPLE_PAGE_ROUTE_2                        = "page/sample-page-2",
  USER_SETTINGS_ROUTE                        = "page/user-settings",
  LIST_EXCEPTIONS_ROUTE                      = "page/admin/list-exceptions",
  USER_ADMIN_ROUTE                           = "page/admin/user-admin",
  GRID_PAGE_WITH_TOO_MANY_ROWS_ROUTE         = "page/grid-page-too-many-rows",
  GRID_PAGE_WITH_CUSTOM_FILTER_ROUTE         = "page/grid-page-with-custom-filter",
  TAB_GROUP_PAGE_ROUTE                       = "page/tab-group-page",
  DASHBOARD_PAGE_ROUTE                       = "page/dashboard",
  PIE_CHART_PAGE_ROUTE                       = "page/dashboard/pie-chart",
  COLUMN_CHART_DRILL_DOWN_PAGE_ROUTE         = "page/dashboard/column-chart-drill-down",
  LINE_CHART_ZOMMABLE_TIME_SERIES_ROUTE      = "page/dashboard/zommable-times-series",
  LARGE_USA_MAP_PAGE_ROUTE                   = "page/dashboard/usa-map",
  LARGE_GAUGE_PAGE_ROUTE                     = "page/dashboard/gauge",
  CHIPS_WITH_TEXTBOX_PAGE_ROUTE              = "page/chips-with-textbox",
  CHIPS_WITH_AUTOCOMPLETE_PAGE_ROUTE         = "page/chips-with-autocomplete",
  GRID_PAGE_WITH_CHIP_SELECTION_ROUTE        = "page/grid-page-with-chip-selection",

  // Preference Names
  NAVBAR_EXTENDED_STATE_PREFERENCE_NAME      = "navbar_extended_state", // Preference name for navbar mode (extended/collapsed)
  HEADER_THEME_PREFERENCE_NAME               = "header_theme_state",
  COLUMN_STATE_PREFERENCE_NAME               = "column_state",
  EXCEPTION_FILTER_PREFERENCE_NAME           = "exceptions_filter",
}
