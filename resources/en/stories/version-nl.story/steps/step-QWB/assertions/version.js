/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 *
 * TODO: Replace `__TEXT__` with step dialog output
 */

describe('version', () => {
  const dialogText = 'My Brain lambda version is'

  it(`starts with "${dialogText}"`, () => {
    // get the dialog from the `step` global
    // this gets all dialogs from execution
    // not just for the `currentNode`
    const { dialogs } = step
    expect(dialogs.length).toBeGreaterThan(0)
    const [ { text } ] = step.dialogs.slice(-1)
    expect(text.substring(0, dialogText.length)).toBe(dialogText)
  })
})