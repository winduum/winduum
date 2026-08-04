import { supportsTimelineTrigger, supportsInterestFor } from './supports.js'

if (!supportsInterestFor) {
  import('interestfor/src/interestfor.js')
}

if (!supportsTimelineTrigger) {
  import('./polyfills/timelineTrigger.js')
}
