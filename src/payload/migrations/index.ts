import * as migration_20250903_021807_add_example_schema from './20250903_021807_add_example_schema'
import * as migration_20250903_041444_update_config_schema from './20250903_041444_update_config_schema'

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
]
