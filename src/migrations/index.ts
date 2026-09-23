import * as migration_20260922_145839_initial from './20260922_145839_initial';
import * as migration_20260922_191449_add_practice_area_order from './20260922_191449_add_practice_area_order';
import * as migration_20260923_192527_add_rate_limit_entries from './20260923_192527_add_rate_limit_entries';

export const migrations = [
  {
    up: migration_20260922_145839_initial.up,
    down: migration_20260922_145839_initial.down,
    name: '20260922_145839_initial',
  },
  {
    up: migration_20260922_191449_add_practice_area_order.up,
    down: migration_20260922_191449_add_practice_area_order.down,
    name: '20260922_191449_add_practice_area_order',
  },
  {
    up: migration_20260923_192527_add_rate_limit_entries.up,
    down: migration_20260923_192527_add_rate_limit_entries.down,
    name: '20260923_192527_add_rate_limit_entries'
  },
];
