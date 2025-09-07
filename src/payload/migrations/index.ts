import * as migration_20250903_021807_add_example_schema from './20250903_021807_add_example_schema';
import * as migration_20250903_041444_update_config_schema from './20250903_041444_update_config_schema';
import * as migration_20250903_090844_add_category_status from './20250903_090844_add_category_status';
import * as migration_20250904_062642_add_updated_by_field_to_product from './20250904_062642_add_updated_by_field_to_product';
import * as migration_20250907_144110_remove_user_session from './20250907_144110_remove_user_session';
import * as migration_20250907_151843_add_soft_delete_to_category from './20250907_151843_add_soft_delete_to_category';

export const migrations = [
  {
    up: migration_20250903_021807_add_example_schema.up,
    down: migration_20250903_021807_add_example_schema.down,
    name: '20250903_021807_add_example_schema',
  },
  {
    up: migration_20250903_041444_update_config_schema.up,
    down: migration_20250903_041444_update_config_schema.down,
    name: '20250903_041444_update_config_schema',
  },
  {
    up: migration_20250903_090844_add_category_status.up,
    down: migration_20250903_090844_add_category_status.down,
    name: '20250903_090844_add_category_status',
  },
  {
    up: migration_20250904_062642_add_updated_by_field_to_product.up,
    down: migration_20250904_062642_add_updated_by_field_to_product.down,
    name: '20250904_062642_add_updated_by_field_to_product',
  },
  {
    up: migration_20250907_144110_remove_user_session.up,
    down: migration_20250907_144110_remove_user_session.down,
    name: '20250907_144110_remove_user_session',
  },
  {
    up: migration_20250907_151843_add_soft_delete_to_category.up,
    down: migration_20250907_151843_add_soft_delete_to_category.down,
    name: '20250907_151843_add_soft_delete_to_category'
  },
];
