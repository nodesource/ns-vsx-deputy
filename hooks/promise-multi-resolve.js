'use strict'

const { Stack, deserializeFrame }  = require('../lib/stack')
const colors = require('ansicolors')
const deputy = colors.brightBlue('[deputy]')

process.on('multipleResolves', (type, promise, val) => {
  const value = val
  const stack = new Stack(new Error().stack)
  const { frame, idx } = stack.find(/^at Promise/)
  const { fullPath, line, column } = deserializeFrame(frame)
  const { tbl, start, end } = stack.framesTable({ highlightIdx: idx })

  console.warn(`
${deputy} Promise multipleResolve detected at:
  ${fullPath}:${line}:${column}
${deputy} Resolved value: ${value} 
${deputy} Call Stack around problem origin (frames ${start}-${end}):
${tbl}
`)
  debugger // eslint-disable-line
})
