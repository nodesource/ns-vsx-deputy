'use strict'

// setup long + async stack traces
require('trace')

// setup promise hooks
require('./deputy-promise-guard.multi')
require('./deputy-promise-guard.unhandled')
require('./deputy-exception-guard.uncaught')
