import * as migration_20260922_145839_initial from './20260922_145839_initial';

export const migrations = [
  {
    up: migration_20260922_145839_initial.up,
    down: migration_20260922_145839_initial.down,
    name: '20260922_145839_initial'
  },
];
