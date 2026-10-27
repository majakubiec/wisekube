---
title: The Markdown Kitchen Sink
description: "A long test post that exercises every piece of Markdown the renderer should handle: headings, code, tables, lists, quotes and more."
pubDate: 2026-10-26
author: Mateusz J.
category: Test
image: https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=800&auto=format&fit=crop&q=80
---

This post exists to stress-test the renderer. If everything here looks right, real posts will too. It covers **bold**, *italic*, ***both***, ~~strikethrough~~, `inline code`, and [a link to Astro](https://astro.build).

## Headings

The post title is the only `h1`. Everything inside a post starts at `h2`.

### A third-level heading

Text under an `h3`. Headings should have clear spacing above them and tighter spacing below, so they visually belong to the section they introduce.

#### A fourth-level heading

Text under an `h4`. This is about as deep as a blog post should ever go.

##### Fifth level

###### Sixth level

## Paragraphs and line length

A good reading column is somewhere between 60 and 75 characters wide. Longer lines make it hard for the eye to find the start of the next line; shorter lines break the rhythm of reading. This paragraph is intentionally long so you can judge the measure, the line height, and how the text color sits against the background. It should feel calm and easy to read, not cramped and not floaty.

A second paragraph, to check the spacing between paragraphs. It should be noticeable but not so large that the text feels disconnected.  
This line follows a hard line break (two trailing spaces).

## Lists

### Unordered

- Walls keep things in
- Doors decide what comes out
  - Nested item one
  - Nested item two
    - Even deeper
- Windows are optional

### Ordered

1. Open the kube
2. Write something down
3. Close the kube
   1. Nested step a
   2. Nested step b
4. Repeat tomorrow

### Task list

- [x] Set up Astro
- [x] Add a blog
- [ ] Write a real first post
- [ ] Decide whether to write about k8s

## Blockquotes

> The walls of a kube are not there to keep the world out. They are there to keep what matters in.

> Quotes can span multiple paragraphs.
>
> And they can contain **formatting**, `code`, and lists:
>
> - one
> - two
>
> > Nested quotes too.

## Code

Inline code like `const kube = new Cube("k")` should be visually distinct but not loud.

### TypeScript

```ts
interface Kube {
  walls: number;
  contents: string[];
  isSafe(): boolean;
}

export function createKube(contents: string[] = []): Kube {
  return {
    walls: 6,
    contents,
    isSafe() {
      return this.walls === 6;
    },
  };
}
```

### Shell

```bash
# create and run the site
npm create astro@latest kube
cd kube && npm run dev
```

### Python

```python
from dataclasses import dataclass, field

@dataclass
class Kube:
    walls: int = 6
    contents: list[str] = field(default_factory=list)

    def keep(self, thought: str) -> None:
        self.contents.append(thought)
```

### JSON

```json
{
  "name": "kube",
  "walls": 6,
  "safe": true,
  "contents": ["thoughts", "code", "half-ideas"]
}
```

### YAML

```yaml
kube:
  walls: 6
  doors:
    - name: front
      open: false
```

### Plain block with no language

```
+-------+
|       |
| kube  |
|       |
+-------+
```

### A long line, to test horizontal scrolling

```js
const veryLongLine = "This line is deliberately long so that the code block has to scroll horizontally instead of breaking the page layout on small screens.";
```

## Tables

| Wall   | Faces      | Purpose               |
| :----- | :--------: | --------------------: |
| Top    | Up         | Keeps the rain out    |
| Bottom | Down       | Something to stand on |
| Front  | Forward    | Where the door goes   |
| Back   | Backward   | Holds the shelves     |

## Images

![A circuit board, standing in for any image in a post](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=700&auto=format&fit=crop&q=80)

## Horizontal rule

Above the line.

---

Below the line.

## Footnotes

Footnotes should render at the bottom of the post.[^1] Here is a second one.[^walls]

[^1]: This is the first footnote.
[^walls]: A kube has six walls, if you count the floor and the ceiling.

## Raw HTML

<details>
<summary>Click to expand</summary>

Hidden content inside a `<details>` element. Useful for long asides.

</details>

Keyboard keys: <kbd>Cmd</kbd> + <kbd>K</kbd>. Highlighted text: <mark>marked</mark>. Small print: <small>this is small</small>.

## Closing

If all of the above looks good, the renderer is in shape. Delete this post when you no longer need it.
