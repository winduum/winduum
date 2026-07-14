import { supportsTimelineTrigger, supportsInterestFor, supportsScrollSnapEvents } from './supports.js'

if (!supportsInterestFor) {
  import('interestfor/src/interestfor.js')
}

if (!supportsTimelineTrigger) {
  import('./polyfills/timelineTrigger.js')
}

if (!supportsScrollSnapEvents) {
  import('./polyfills/scrollSnapChanging.js')
}
