import * as migration_20241213_104537 from './20241213_104537';
import * as migration_20250109_094018 from './20250109_094018';
import * as migration_20250109_094458 from './20250109_094458';
import * as migration_20250109_094646 from './20250109_094646';
import * as migration_20250109_094847 from './20250109_094847';

export const migrations = [
  {
    up: migration_20241213_104537.up,
    down: migration_20241213_104537.down,
    name: '20241213_104537',
  },
  {
    up: migration_20250109_094018.up,
    down: migration_20250109_094018.down,
    name: '20250109_094018',
  },
  {
    up: migration_20250109_094458.up,
    down: migration_20250109_094458.down,
    name: '20250109_094458',
  },
  {
    up: migration_20250109_094646.up,
    down: migration_20250109_094646.down,
    name: '20250109_094646',
  },
  {
    up: migration_20250109_094847.up,
    down: migration_20250109_094847.down,
    name: '20250109_094847'
  },
];
