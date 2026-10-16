// Ranlanka: Rani high jewellery. Entry point.
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import './styles/signature.css';

import { initScroll, lockScroll } from './modules/core.js';
import { initLoader } from './modules/loader.js';
import { initPage } from './modules/page.js';
import { initBridal } from './modules/bridal.js';
import { initOverlays } from './modules/overlays.js';
import { initPointer } from './modules/pointer.js';
import { initSound } from './modules/sound.js';
import { initVisit } from './modules/visit.js';
import { initScale } from './modules/scale.js';
import { initGoldType } from './modules/goldtype.js';
import { initSizer } from './modules/sizer.js';
import { initServices } from './modules/services.js';

const loading = document.documentElement.classList.contains('is-loading');

initScroll();
if (loading) lockScroll(true);
initPage();
initBridal();
initOverlays();
initPointer();
initSound();
initVisit();
initScale();
initSizer();
initServices();
initGoldType();
initLoader(() => { if (loading) lockScroll(false); });
