import * as migration_20250828_145410_initial_collection from './20250828_145410_initial_collection';
import * as migration_20250829_065519_add_category_product_collection from './20250829_065519_add_category_product_collection';
import * as migration_20250901_053626_support_localization from './20250901_053626_support_localization';
import * as migration_20250901_065422_add_locale_to_category from './20250901_065422_add_locale_to_category';
import * as migration_20250901_150330_add_seo_collection from './20250901_150330_add_seo_collection';
import * as migration_20250902_032258_add_configs_collection from './20250902_032258_add_configs_collection';

export const migrations = [
  {
    up: migration_20250828_145410_initial_collection.up,
    down: migration_20250828_145410_initial_collection.down,
    name: '20250828_145410_initial_collection',
  },
  {
    up: migration_20250829_065519_add_category_product_collection.up,
    down: migration_20250829_065519_add_category_product_collection.down,
    name: '20250829_065519_add_category_product_collection',
  },
  {
    up: migration_20250901_053626_support_localization.up,
    down: migration_20250901_053626_support_localization.down,
    name: '20250901_053626_support_localization',
  },
  {
    up: migration_20250901_065422_add_locale_to_category.up,
    down: migration_20250901_065422_add_locale_to_category.down,
    name: '20250901_065422_add_locale_to_category',
  },
  {
    up: migration_20250901_150330_add_seo_collection.up,
    down: migration_20250901_150330_add_seo_collection.down,
    name: '20250901_150330_add_seo_collection',
  },
  {
    up: migration_20250902_032258_add_configs_collection.up,
    down: migration_20250902_032258_add_configs_collection.down,
    name: '20250902_032258_add_configs_collection'
  },
];
