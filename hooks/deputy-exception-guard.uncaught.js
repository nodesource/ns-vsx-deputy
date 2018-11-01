'use strict'

'use strict'

const { Stack, deserializeFrame }  = require('../lib/stack')
const { header } = require('../lib/logging')
const { deputyUnhandledException } = require('../lib/deputy-debugger')

function logUnhandledException({
    err
  , fullPath
  , line
  , column
  , stackTable }) {
  console.warn(`
${header} An Exception went unhandled!
  at ${fullPath}:${line}:${column}
${header} Reject error: ${err.message}
${header} Please tick 'Uncaught Exceptions' inside the 'Breakpoints' section
         of the Debugger pane in the sidebar to break on the line of the exception.'
${header} The origin of the exception is printed below.

${stackTable}
`)
}

function onuncaughtException(err) {
  // current stack is cut off here even with async stack traces turned on,
  // Therefore we use the stack of the rejection
  // TODO: need to handle case when err is no Error object

  const stack = new Stack(err.stack)
  const { frame } = stack.topFrame()
  const { fullPath, line, column } = deserializeFrame(frame)

  logUnhandledException({
      err
    , fullPath
    , line
    , column
    , stackTable: stack.framesTable().tbl
  })

  deputyUnhandledException(err)
}
// setUncaughtExceptionCaptureCallback added in v9.3.0 and is better
// for our task since it bypasses any flags like --abort-on-uncaught-exception
// and thus avoids a core dump which most likely is undesired in a local
// scenario.
// https://nodejs.org/api/process.html#process_process_setuncaughtexceptioncapturecallback_fn
if (typeof process.setUncaughtExceptionCaptureCallback === 'function') {
  process.setUncaughtExceptionCaptureCallback(onuncaughtException)
} else {
  process.on('uncaughtException', onuncaughtException)
}
