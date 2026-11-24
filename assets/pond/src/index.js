import {initExtraAttractors} from './attractors.js';
import { initPond } from './scene.js';
import { initNavigation } from './navigation.js';
import { initLorenz } from './lorenz.js';

// This is the only entry point used by the homepage. Review tools import the
// individual modules; they never ship in the visitor's execution path.
initPond();
initNavigation();
initLorenz();
initExtraAttractors();
