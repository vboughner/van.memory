/**
 * Step assertions documentation
 * https://bixbydevelopers.com/dev/docs/reference/assertions_api/step
 *
 * This is an automatically generated assertion file.
 *
 * This tests the returned node type and dialog mode for a step in any story.
 * The expected values are filled-in automatically below, and no further
 * action is required.
 *
 * If a variable declaration name starts with EXPECTED, 
 * its assignment value might update later when this assertion fails.
 * Those changes only happen when you confirm them in the story editor.
 * Be careful about making manual edits here. If you change one of these
 * variable names, it will no longer be automatically tracked for you.
 */

describe('type and mode tests', () => {
  const EXPECTED_TYPE_NAME = 'DeleteLastMemoryResponse'
  const EXPECTED_DIALOG_MODE = 'Result'

  it(`type name matches "${EXPECTED_TYPE_NAME}"`, () => {
    const actualTypeName = step.currentNode && step.currentNode.typeName || ''
    expect(actualTypeName).toBe(EXPECTED_TYPE_NAME)
  })

  it(`dialog mode matches "${EXPECTED_DIALOG_MODE}"`, () => {
    const dialogs = step.dialogs.length ? step.dialogs : [{ mode: ''}]
    const actualDialogMode = dialogs[dialogs.length - 1].mode
    expect(actualDialogMode).toBe(EXPECTED_DIALOG_MODE)
  })
})
