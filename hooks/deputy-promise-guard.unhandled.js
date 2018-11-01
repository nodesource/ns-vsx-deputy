'use strict'

const { Stack, deserializeFrame }  = require('../lib/stack')
const { header } = require('../lib/logging')
const { deputyRejectionUnhandled } = require('../lib/deputy-debugger')

function logUnhandledRejection({
    promise
  , err
  , fullPath
  , line
  , column
  , stackTable }) {
  console.warn(`
${header} Promise rejection went unhandled!
  at ${fullPath}:${line}:${column}
${header} Reject error: ${err.message}
${header} Please tick 'All Exceptions' inside the 'Breakpoints' section
         of the Debugger pane in the sidebar to break on the line of the rejection.'
${header} The origin of the exception is printed below.

${stackTable}
`)
}

process.on('unhandledRejection', function deputyPromiseGuard(err, promise) {
  // current stack is cut off here even with async stack traces turned on,
  // Therefore we use the stack of the rejection
  // TODO: need to handle case when err is no Error object

  const stack = new Stack(err.stack)
  const { frame } = stack.topFrame()
  const { fullPath, line, column } = deserializeFrame(frame)

  logUnhandledRejection({
      promise
    , err
    , fullPath
    , line
    , column
    , stackTable: stack.framesTable().tbl
  })

  deputyRejectionUnhandled(promise, err)
})
