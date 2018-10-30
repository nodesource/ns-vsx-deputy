'use strict'

const { Stack, deserializeFrame }  = require('../lib/stack')
const colors = require('ansicolors')
const deputy = colors.brightBlue('[deputy]')
const {
  deputyMultiResolve
, deputyRejectAfterResolve
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
${deputy} Promise multiple resolve detected at:
  ${fullPath}:${line}:${column}
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
${deputy} Promise reject after resolve detected at:
  ${fullPath}:${line}:${column}
${deputy} Error: ${err.message}
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
    deputyMultiResolve(promise, value)
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
    deputyRejectAfterResolve(promise, value)
  }
})
