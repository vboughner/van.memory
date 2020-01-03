/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 */

describe('match', () => {
  const displayedText = 'Here’s the best match.'
  const spokenText = 'You told me a few seconds ago: my mother\'s birthday is January 22nd'
  const endCharCount = -30 // just test these characters at the end, the beginning may differ

  it(`matches the displayed and spoken text`, () => {
    // get the dialog from the `step` global
    // this gets all dialogs from execution
    // not just for the `currentNode`
    const { dialogs } = step
    console.log(dialogs)
    expect(dialogs.length).toBeGreaterThan(0)
    const [ { text: lastText } ] = step.dialogs.slice(-1)
    expect(lastText.slice(endCharCount)).toBe(spokenText.slice(endCharCount))
    const [ { text: penultimateText } ] = step.dialogs.slice(-2)
    expect(penultimateText).toBe(displayedText)
  })
})

