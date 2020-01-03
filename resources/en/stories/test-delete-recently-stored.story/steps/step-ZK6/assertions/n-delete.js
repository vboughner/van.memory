/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 */

describe('n-delete', () => {
  const dialogText = 'Okay, I won\'t.' // single-quote instead of apostrophe, comes from viv.core

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
