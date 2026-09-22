import * as migration_20260922_145839_initial from './20260922_145839_initial';
import * as migration_20260922_191449_add_practice_area_order from './20260922_191449_add_practice_area_order';

export const migrations = [
  {
    up: migration_20260922_145839_initial.up,
    down: migration_20260922_145839_initial.down,
    name: '20260922_145839_initial',
  },
  {
    up: migration_20260922_191449_add_practice_area_order.up,
    down: migration_20260922_191449_add_practice_area_order.down,
    name: '20260922_191449_add_practice_area_order'
  },
];
