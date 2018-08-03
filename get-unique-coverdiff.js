const fs = require('fs')
const path = require('path')
var uniq = require('lodash.uniq');

const toJsonOrNull = el => {
  try {
    return JSON.parse(el).coverDifferences
  } catch (e) {
    return null
  }
}

var args = process.argv.slice(2)
var filePath = null

if (args.length) filePath = args[0]
if (!filePath) {
  console.log('need a file path to be able to process')
  process.exit(1)
}
console.log('filepath: ', filePath)

var fileContents = fs.readFileSync(path.resolve(filePath), 'utf-8').split('\n')

var result = uniq(
  fileContents
    .map(el => toJsonOrNull(el))
    .filter(el => el !== null)
)

console.log('uniq cover differences:\n\n', JSON.stringify(result, null, 2))
