'use strict'

const path = require('path')
const table = require('text-table')
const ansiRegex = require('ansi-regex')
const colors = require('ansicolors')

function deserializeFrame(frame) {
  const empty = {
      fn: '?'
    , fullPath: '<not found>'
    , file: '<not found>'
    , line: -1
    , column: -1
  }

  if (frame == null) return empty

  // i.e. 'at Promise (/Volumes/d/vsc-ext/ns-vsx-deputy.samples/promises/multi-resolve.js:5:7)'
  // fn: Promise
  // fullPath: /Volumes/d/vsc-ext/ns-vsx-deputy.samples/promises/multi-resolve.js
  // line: 5
  // column: 7
  const m = frame.match(/at ([^ ]+).+\(([^:]+)[:](\d+)[:](\d+)\)/)
  if (m == null) return empty
  const [ fn, fullPath, line, column ] = m.slice(1)
  const file = path.basename(fullPath)
  return { fn, fullPath, file, line, column }
}

class Stack {
  constructor(stack) {
    this._frames = stack
      .split('\n')
      // Loose 'Error' line
      .slice(1)
      .map(x => x.trim())
  }

  find(rx) {
    for (var i = 0; i < this._frames.length; i++) {
      const frame = this._frames[i]
      if (rx.test(frame)) return { frame, idx: i }
    }
    return { frame: null, idx: -1 }
  }

  dump(highlightFrame) {
    console.error(this._frames.join('\n'))
  }

  framesTable({
      highlightIdx = -1
    , maxFramesBefore = 3
    , maxFramesAfter = 3
  } = {}) {
    const framesLen = this._frames.length
    const rows = []
    const start = (
        highlightIdx > 0 ? Math.max(0, highlightIdx - maxFramesBefore - 1)
      : 0
    )
    const end = (
        highlightIdx > 0 ? Math.min(framesLen, highlightIdx + maxFramesAfter + 2)
      : framesLen
    )
    for (let i = start; i < end; i++) {
      const frame = this._frames[i]
      const { file, fn, line, column } = deserializeFrame(frame)
      if (fn === '?') continue

      let row = [ `  ${fn}`, file, colors.bgBlack(`${line}:${column}`) ]
      if (i === highlightIdx) row = row.map(colors.brightRed)
      rows.push(row)
    }
    const tbl = table(rows, {
        stringLength: x => String(x).replace(ansiRegex(), '').length
      , align: [ 'l', 'r', 'r' ]
    })
    return { tbl, start, end }
  }
}

module.exports = {
    Stack
  , deserializeFrame
}
