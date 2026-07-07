import { supportsCommand, supportsIs } from 'webuum/supports'
import { supportsTimelineTrigger, supportsInterestFor } from './supports.js'

if (!supportsCommand) {
  import('invokers-polyfill')
}

if (!supportsIs()) {
  import('@webreflection/custom-elements-builtin')
}

if (!supportsInterestFor) {
  import('interestfor/src/interestfor.js')
}

if (!supportsTimelineTrigger) {
  import('./polyfills/timelineTrigger.js')
}
