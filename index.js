const lineRe = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g
const headLineRe = /^(#+)\s(\S+)/g
const codeBlockRe = /`+(\w+)?([^`]*)`+/g
const listRe = /(?:\*|\+|\-)\s(\w+)/g
const linkRe = /\[(.*)\]\((.*)\)/g

exports.parse = mdText => {
  return splitLines(mdText).map(processLine)
}

function splitLines(mdText) {
  const lines = []
  let m

  while ((m = lineRe.exec(mdText)) != null) {
    lines.push(m[1])
  }

  return lines
}

function processLine(line) {
  let m
  if ((m = linkRe.exec(line)) !== null) {
    return {
      label: m[1],
      href: m[2],
      type: 'link'
    }
  }
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
    const listCache = [m[1]]
    while ((m = listRe.exec(line)) !== null) {
      listCache.push(m[1])
    }
    return {
      content: listCache,
      type: 'list'
    }
  }
  return {
    content: line,
    type: 'text'
  }
}
