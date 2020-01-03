/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 */

describe('no-delete', () => {
  const dialogText = 'Okay, I won’t delete it.'

  it(`matches "${dialogText}"`, () => {
    // get the dialog from the `step` global
    // this gets all dialogs from execution
    // not just for the `currentNode`
    const { dialogs } = step
    expect(dialogs.length).toBeGreaterThan(0)
    const [ { text } ] = step.dialogs.slice(-1)
    expect(text).toBe(dialogText)
  })
})
