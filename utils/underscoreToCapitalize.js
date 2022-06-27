function underscoreToCapitalize(originalString) {
  const withoutUnderscoreLower = originalString.replace(/_/g, ' ').toLowerCase()
  
  return withoutUnderscoreLower.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

module.exports = underscoreToCapitalize