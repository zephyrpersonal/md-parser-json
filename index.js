const headLineRe = /^(#+)\s(\S+)/g
const codeBlockRe = /^\`+(\\n|\w+)([\S\s]+)([^\`]+)/g
const listRe = /(?:\*|\+|\-)\s(\w+?)(?:\w+)/g

exports.parse = mdText => {
  const lines = splitLines(mdText)
  const json = lines.map(processLine)
  return json
}

function splitLines(mdText) {
  const re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g
  const lines = []

  let m

  while ((m = re.exec(mdText)) != null) {
    lines.push(m[1])
  }

  return lines
}

function processLine(line) {
  let m
  if ((m = headLineRe.exec(line)) !== null) {
    return {
      content: m[2],
      type: 'headline',
      level: m[1].length
    }
  }
  if ((m = codeBlockRe.exec(line)) !== null) {
    return {
      content: m[2],
      lang: m[1],
      type: 'code'
    }
  }
  if ((m = listRe.exec(line)) !== null) {
    return {
      content: line.match(listRe).map(s => s.replace(/(\*|\+|\-)\s/, '')),
      type: 'list'
    }
  }
  return {
    content: line,
    type: 'text'
  }
}
