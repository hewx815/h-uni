import { startDev, startBuild } from './cli/index.js';

if (process.env.NODE_ENV === 'production') {
  startBuild();
} else if (process.env.NODE_ENV === 'development') {
  startDev();
}
