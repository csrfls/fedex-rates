function underscoreToCapitalize(originalString) {
  const withoutUnderscoreLower = originalString.replaceAll("_", " ").toLowerCase()
  return withoutUnderscoreLower.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

module.exports = underscoreToCapitalize