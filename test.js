const { readFileSync } = require('fs')
const { resolve } = require('path')
const { parse } = require('./index')

const testMd = readFileSync(resolve(__dirname, './test-doc.md'), {
  encoding: 'utf8'
})

const mdJson = parse(testMd)

console.log(mdJson)
