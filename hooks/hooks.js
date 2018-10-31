'use strict'

// setup long + async stack traces
const v8 = require('v8')
require('trace')
v8.setFlagsFromString('--stack_trace_limit=100')

// setup promise hooks
require('./deputy-promise-guard')
