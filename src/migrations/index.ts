import * as migration_20250828_145410_initial_collection from './20250828_145410_initial_collection';
import * as migration_20250829_065519_add_category_product_collection from './20250829_065519_add_category_product_collection';

export const migrations = [
  {
    up: migration_20250828_145410_initial_collection.up,
    down: migration_20250828_145410_initial_collection.down,
    name: '20250828_145410_initial_collection',
  },
  {
    up: migration_20250829_065519_add_category_product_collection.up,
    down: migration_20250829_065519_add_category_product_collection.down,
    name: '20250829_065519_add_category_product_collection'
  },
];
