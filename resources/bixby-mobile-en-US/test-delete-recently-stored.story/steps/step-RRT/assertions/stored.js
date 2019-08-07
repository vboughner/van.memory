/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 */

describe('stored', () => {
  const displayedText = 'Here\'s the most recent memory.'
  const spokenText = 'You stored the most recent memory a few seconds ago. You told me: I stored this memory just a moment ago.'

  it(`matches the displayed and spoken text`, () => {
    // get the dialog from the `step` global
    // this gets all dialogs from execution
    // not just for the `currentNode`
    const { dialogs } = step
    console.log(dialogs)
    expect(dialogs.length).toBeGreaterThan(0)
    const [ { text: lastText } ] = step.dialogs.slice(-1)
    expect(lastText).toBe(spokenText)
    const [ { text: penultimateText } ] = step.dialogs.slice(-2)
    expect(penultimateText).toBe(displayedText)
  })
})