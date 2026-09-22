import * as migration_20260922_134849_initial from './20260922_134849_initial';

export const migrations = [
  {
    up: migration_20260922_134849_initial.up,
    down: migration_20260922_134849_initial.down,
    name: '20260922_134849_initial'
  },
];
