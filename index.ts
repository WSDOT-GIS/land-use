/**
 * Defines the land use codes.
 * @see https://apps.leg.wa.gov/wac/default.aspx?cite=458-53-030
 * | start | end  | category
 * | ----: | ---: | :---
 * | 11    | 19   | residential
 * | 21    | 39   | manufacturing
 * | 41    | 49   | commercial
 * | 51    | 59   | trade
 * | 61    | 69   | services
 * | 71    | 79   | cultural, entertainment and recreational
 * | 81    | 89   | resource production and extraction
 * | 91    | 99   | undeveloped land and water areas
 */
export const landUseCodes = {
  residential: [
    [11, "Household, single family units"],
    [12, "Household, 2-4 units"],
    [13, "Household, multiunits (5 or more)"],
    [14, "Residential condominiums"],
    [15, "Mobile home parks or courts"],
    [16, "Hotels/motels"],
    [17, "Institutional lodging"],
    [18, "All other residential not elsewhere coded"],
    [19, "Vacation and cabin"],
  ],
  manufacturing: [
    [21, "Food and kindred products"],
    [22, "Textile mill products"],
    [
      23,
      "Apparel and other finished products made from fabrics, leather, and similar materials",
    ],
    [24, "Lumber and wood products (except furniture)"],
    [25, "Furniture and fixtures"],
    [26, "Paper and allied products"],
    [27, "Printing and publishing"],
    [28, "Chemicals"],
    [29, "Petroleum refining and related industries"],
    [30, "Rubber and miscellaneous plastic products"],
    [31, "Leather and leather products"],
    [32, "Stone, clay and glass products"],
    [33, "Primary metal industries"],
    [34, "Fabricated metal products"],
    [
      35,
      "Professional scientific, and controlling instruments; photographic and optical goods; watches and clocks-manufacturing",
    ],
    [36, "Not presently assigned"],
    [37, "Not presently assigned"],
    [38, "Not presently assigned"],
    [39, "Miscellaneous manufacturing"],
  ],
  "transportation, communication, and utilities": [
    [41, "Railroad/transit transportation"],
    [42, "Motor vehicle transportation"],
    [43, "Aircraft transportation"],
    [44, "Marine craft transportation"],
    [45, "Highway and street right of way"],
    [46, "Automobile parking"],
    [47, "Communication"],
    [48, "Utilities"],
    [
      49,
      "Other transportation, communication, and utilities not classified elsewhere",
    ],
  ],
  trade: [
    [50, "Condominiums - Other than residential condominiums"],
    [51, "Wholesale trade"],
    [52, "Retail trade - Building materials, hardware, and farm equipment"],
    [53, "Retail trade - General merchandise"],
    [54, "Retail trade - Food"],
    [55, "Retail trade - Automotive, marine craft, aircraft, and accessories"],
    [56, "Retail trade - Apparel and accessories"],
    [57, "Retail trade - Furniture, home furnishings and equipment"],
    [58, "Retail trade - Eating and drinking"],
    [59, "Other retail trade"],
  ],
  services: [
    [61, "Finance, insurance, and real estate services"],
    [62, "Personal services"],
    [63, "Business services"],
    [64, "Repair services"],
    [65, "Professional services"],
    [66, "Contract construction services"],
    [67, "Governmental services"],
    [68, "Educational services"],
    [69, "Miscellaneous services"],
  ],
  "cultural, entertainment and recreational": [
    [71, "Cultural activities and nature exhibitions"],
    [72, "Public assembly"],
    [73, "Amusements"],
    [74, "Recreational activities"],
    [75, "Resorts and group camps"],
    [76, "Parks"],
    [77, "Not presently assigned"],
    [78, "Not presently assigned"],
    [79, "Other cultural, entertainment, and recreational"],
  ],
  "resource production and extraction": [
    [81, "Agriculture (not classified under current use law)"],
    [82, "Agriculture related activities"],
    [83, "Agriculture classified under current use chapter 84.34 RCW"],
    [84, "Fishing activities and related services"],
    [85, "Mining activities and related services"],
    [86, "Cannabis grow operations"],
    [87, "Not presently assigned"],
    [88, "Designated forest land under chapter 84.33 RCW"],
    [89, "Other resource production"],
  ],
  "undeveloped land and water areas": [
    [91, "Undeveloped land"],
    [92, "Noncommercial forest"],
    [93, "Water areas"],
    [94, "Open space land classified under chapter 84.34 RCW"],
    [95, "Timberland classified under chapter 84.34 RCW"],
    [96, "Not presently assigned"],
    [97, "Not presently assigned"],
    [98, "Not presently assigned"],
    [99, "Other undeveloped land"],
  ],
} as const;

/**
 * Land use category name
 */
export type LandUseCategory = keyof typeof landUseCodes;

/**
 * An array of arrays containing a land use code
 * and a land use description, respectively.
 */
type LandUseCodeDescriptionTuples = (typeof landUseCodes)[LandUseCategory];

const createRangeDomainProperties = ([category, items]: [
  LandUseCategory,
  LandUseCodeDescriptionTuples,
]) => {
  // Get all of the code integer values.
  const codes = items.map(([code]) => code);
  // Sort the codes to ensure they're in order.
  codes.sort((a, b) => a - b);
  // Get the minimum and maximum values.
  const minValue = codes[0];
  const maxValue = codes[codes.length - 1];
  const name = category;
  return {
    type: "range",
    maxValue,
    minValue,
    name,
  } as const;
};
/**
 * An array of {@link __esri.RangeDomainProperties objects} that can be used
 * to create a {@link __esri.RangeDomain RangeDomain}
 */
export const rangeDomainProperties = (
  Object.entries(landUseCodes) as [
    LandUseCategory,
    LandUseCodeDescriptionTuples,
  ][]
).map(createRangeDomainProperties);

const lucMapValues = Object.values(landUseCodes).flat();

export const landUseCodesMap = new Map(lucMapValues);
