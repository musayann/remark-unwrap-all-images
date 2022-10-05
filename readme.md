# remark-unwrap-all-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

**[remark][]** plugin to remove the wrapping paragraph for images.

## Contents

  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [When should I use this?](#when-should-i-use-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
  - [Types](#types)
  - [Compatibility](#compatibility)
  - [Security](#security)
  - [Related](#related)
  - [Contribute](#contribute)
  - [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin that searches for paragraphs
which contain images (possibly in links) and then moves the images outside
the paragraphs

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

## When should I use this?

This project can make it simpler to style images with CSS, for example
displaying them at the full available width, because paragraph styles no longer
interfere with them.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-unwrap-all-images
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkUnwrapAllImages from 'https://esm.sh/remark-unwrap-all-images@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkUnwrapAllImages from 'https://esm.sh/remark-unwrap-all-images@3?bundle'
</script>
```

## Use

Say we have the following file `example.md`.

```markdown
# Hello world

Lorem ipsum.

![hi](there.png)
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkUnwrapAllImages from 'remark-unwrap-all-images'

main()

async function main() {
  const file = await remark()
    .use(remarkUnwrapAllImages)
    .use(remarkHtml)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```html
<h1>Hello world</h1>
<p>Lorem ipsum.</p>
<img src="there.png" alt="hi">
```

## API

This package exports no identifiers.
The default export is `remarkUnwrapAllImages`.

#### `unified().use(remarkUnwrapAllImages)`

Plugin to remove the wrapping paragraph for images.
There are no options.

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 6+ and `remark` version 7+.

## Security

Use of `remark-unwrap-all-images` does not involve **[rehype][]** (**[hast][]**)
or user content, it only removes some existing nodes, so there
are no openings for[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-unwrap-images`](https://github.com/remarkjs/remark-unwrap-images)
    — a plugin that searches for paragraphs which contain
    only images and nothing else, and then remove those
    surrounding paragraphs.
*   [`remark-images`](https://github.com/remarkjs/remark-images)
    — add a simpler image syntax
*   [`remark-embed-images`](https://github.com/remarkjs/remark-embed-images)
    — embed local images as data URIs, inlining files as base64-encoded values

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © Compositor and Vercel, Inc.

<!-- Definitions -->

[build-badge]: https://github.com/musayann/remark-unwrap-all-images/workflows/main/badge.svg

[build]: https://github.com/musayann/remark-unwrap-all-images/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/musayann/remark-unwrap-all-images.svg

[coverage]: https://codecov.io/github/musayann/remark-unwrap-all-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-unwrap-all-images.svg

[downloads]: https://www.npmjs.com/package/remark-unwrap-all-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-unwrap-all-images.svg

[size]: https://bundlephobia.com/result?p=remark-unwrap-all-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
