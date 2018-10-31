'use strict'

const { Stack, deserializeFrame }  = require('../lib/stack')
const colors = require('ansicolors')
const deputy = colors.brightBlue('[deputy]')
const {
  deputyInvalidPromiseResolve
, deputyInvalidPromiseReject
} = require('../lib/deputy-debugger')

function logMultiResolve({
    resolvedValue
  , fullPath
  , line
  , column
  , stackTable
  , stackStart
  , stackEnd
}) {
  console.warn(`
${deputy} Invalid Promise#resolve detected (was resolved or rejected before):
  at ${fullPath}:${line}:${column}
${deputy} Resolved value: ${resolvedValue}
${deputy} Call Stack around problem origin (frames ${stackStart}-${stackEnd}):
${stackTable}
`)
}

function logRejectAfterResolve({
    err
  , fullPath
  , line
  , column
  , stackTable
  , stackStart
  , stackEnd
}) {
  console.warn(`
${deputy} Invalid Promise#reject detected (was resolved or rejected before):
  at ${fullPath}:${line}:${column}
${deputy} Reject error: ${err.message}
${deputy} Call Stack around problem origin (frames ${stackStart}-${stackEnd}):
${stackTable}
`)
}

process.on('multipleResolves', function deputyPromiseGuard(type, promise, value) {
  const stack = new Stack(new Error().stack)
  const { frame, idx } = stack.find(/^at Promise/)
  const { fullPath, line, column } = deserializeFrame(frame)
  const { tbl, start, end } = stack.framesTable({ highlightIdx: idx })

  if (type === 'resolve') {
    logMultiResolve({
        resolvedValue: value
      , fullPath
      , line
      , column
      , stackTable: tbl
      , stackStart: start
      , stackEnd: end
    })
    deputyInvalidPromiseResolve(promise, value)
  } else if (type === 'reject') {
      logRejectAfterResolve({
        err: value
      , fullPath
      , line
      , column
      , stackTable: tbl
      , stackStart: start
      , stackEnd: end
    })
    deputyInvalidPromiseReject(promise, value)
  }
})
