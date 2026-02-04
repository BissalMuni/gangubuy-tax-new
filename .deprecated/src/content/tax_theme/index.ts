import FamilyTrade, { meta as familyTradeMeta } from './family-trade.mdx';
import FamilyGift, { meta as familyGiftMeta } from './family-gift.mdx';
import Reconstruction, { meta as reconstructionMeta } from './reconstruction.mdx';
import TaxStandard, { meta as taxStandardMeta } from './tax-standard.mdx';
import HouseholdStandard, { meta as householdStandardMeta } from './household-standard.mdx';
import HouseStandard, { meta as houseStandardMeta } from './house-standard.mdx';

export const taxThemeContent = {
  'family-trade': {
    Component: FamilyTrade,
    meta: familyTradeMeta,
  },
  'family-gift': {
    Component: FamilyGift,
    meta: familyGiftMeta,
  },
  'reconstruction': {
    Component: Reconstruction,
    meta: reconstructionMeta,
  },
  'tax-standard': {
    Component: TaxStandard,
    meta: taxStandardMeta,
  },
  'household-standard': {
    Component: HouseholdStandard,
    meta: householdStandardMeta,
  },
  'house-standard': {
    Component: HouseStandard,
    meta: houseStandardMeta,
  },
};

export type TaxThemeKey = keyof typeof taxThemeContent;
