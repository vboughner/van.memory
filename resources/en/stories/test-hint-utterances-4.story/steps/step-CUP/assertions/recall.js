/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 */

describe('recall', () => {
  const displayedText = 'Here\'s the best match.'
  const spokenText = 'You told me a few seconds ago: I need to buy potatoes.'

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
