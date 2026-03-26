# Path -- Testing

AI tools are exceptionally good at writing tests -- often better than at writing application code. This path is about using AI to improve your test coverage, try TDD, and write tests that actually catch bugs.

## The Core Idea

Testing is where AI gives you the biggest time savings with the lowest risk. A test either passes or fails -- you know immediately if the AI did a good job. And the cost of a bad test is low (you just delete it), unlike the cost of bad application code.

## Exercise 1 -- TDD with AI (5 min)

Try test-driven development where the AI writes the tests and you write the implementation (or vice versa):

1. Describe a small feature in plain language
2. Ask the AI to write a failing test for it
3. Read the test -- does it actually test the right thing?
4. Implement the code to make it pass (or ask the AI to)
5. Run the tests

The discipline here is: test first, code second. Even if you never do TDD normally, try it once to feel the difference.

## Exercise 2 -- Cover the Gaps (5 min)

Pick a file in your codebase that has low or no test coverage:

1. Point your AI tool at the file
2. Ask: "What are the most important behaviors in this file that are not tested?"
3. Ask it to write tests for the top 3

Run the tests. Do they pass? Do they test meaningful behavior or just call functions?

The quality check: would these tests catch a real bug if someone made a mistake in this code?

## Exercise 3 -- Break It to Prove It (5 min)

Test your tests by introducing a bug:

1. Pick a function with tests
2. Ask the AI to introduce a subtle bug (change a boundary condition, swap a comparison, off-by-one)
3. Run the tests
4. Did they catch it?

If the tests pass with the bug in place, they are not testing what matters. Ask the AI to write a better test that would catch the specific mutation.

## What to Notice

- Was the AI better at writing tests than application code?
- Did the generated tests test behavior or just implementation details?
- Did "break it to prove it" reveal gaps in existing tests?
- How much faster was writing tests with AI compared to writing them by hand?

## Going Deeper

- Try generating tests from a PR diff: "write tests that cover the new behavior in this change"
- Experiment with different test styles: ask for unit tests, then integration tests, then property-based tests for the same code
- Use AI to convert tests between frameworks (e.g., Jest to Vitest, Enzyme to React Testing Library)
- Practice the mutation testing loop: introduce bug, verify test catches it, repeat until the test suite is robust
