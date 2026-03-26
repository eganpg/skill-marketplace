# Path -- Image Generation

By the end of this path, you will have generated a useful image using AI -- not art for fun, but something you would actually use in your work.

## The Goal

Generate one image that solves a real need: a diagram, a mockup, an icon, a slide visual, or a documentation illustration.

## Exercise 1 -- Generate a Diagram (5 min)

Ask your AI tool to create a diagram you actually need:

> "Create a system architecture diagram showing [your system]. Include [service A], [service B], and [database]. Show the data flow between them."

Depending on your tool:

- **Tools that generate images directly** (Claude with artifacts, ChatGPT, Gemini): Ask for a visual diagram
- **Tools that generate code**: Ask for a Mermaid diagram, PlantUML, or SVG that you can render
- **CLI tools**: Ask for a Mermaid diagram in a `.md` file and render it in your editor or browser

Example for Mermaid:

> "Create a Mermaid sequence diagram showing how a user login request flows from the frontend through the API gateway to the auth service and back."

Render it. Does it accurately represent your system?

## Exercise 2 -- Generate a UI Mockup (5 min)

Ask for a quick mockup of a feature:

> "Create a simple wireframe for a settings page with: a profile section (name, email, avatar), a notifications section (toggle switches for email and SMS), and a save button. Make it an HTML file I can open in a browser."

Open the HTML file. Iterate:

> "Make it look more like our app -- use a sidebar nav, muted colors, and more whitespace."

This is not about replacing a designer. It is about communicating ideas faster.

## Exercise 3 -- Generate a Visual for a Presentation (5 min)

If you did the Slides Generation path, you already have a deck. Now add a visual:

> "Create a simple visual metaphor for [concept]. Something I can use on a slide. Keep it clean and minimal."

Or generate a custom icon, a comparison chart, or a before/after illustration.

## What You Built

A diagram, mockup, or visual you can actually use in your next PR description, presentation, or documentation.

## Going Deeper

- Generate architecture diagrams from your actual codebase: "Read my project structure and create a diagram of the module dependencies"
- Create a visual changelog: "Show the before/after of this refactor as a diagram"
- Generate SVG icons for your application
- Experiment with generating diagrams as code (Mermaid, D2, PlantUML) vs as images -- code-based diagrams are versionable and editable
