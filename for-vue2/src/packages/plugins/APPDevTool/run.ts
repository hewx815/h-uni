import { filterArgs } from './utils.js';
import start from './start.js';

const argvs = filterArgs(process.argv);

await start(argvs);
