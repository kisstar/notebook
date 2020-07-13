/**
 * When a user runs `git cz`, prompter will be executed.
 * We pass you cz, which currently is just an instance of inquirer.js.
 * Using this you can ask questions and get answers.
 *
 * Fortunately, cz-conventional-changelog has provided a friendly prompter.
 * But a `type` does not support `improvement` in `@commitlint/config-conventional`.
 * so it needs to be removed.
 */

/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
const officialAdapter = require('cz-conventional-changelog')

/**
 * Here, we did nothing.
 * @param {*} adapter
 */
function createPrompter(adapter) {
  return {
    prompter: function prompter(cz, originCommit) {
      // The commit callback will be executed when
      // you're ready to send back a commit template to git.
      function commit(str) {
        originCommit(str)
      }

      // See inquirer.js docs for specifics.
      const originPrompt = cz.prompt
      cz.prompt = function prompt(questions) {
        return originPrompt.call(cz, questions)
      }

      adapter.prompter(cz, commit)
    },
  }
}

module.exports = createPrompter(officialAdapter)
