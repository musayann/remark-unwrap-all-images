/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Paragraph} Paragraph
 * @typedef {import('mdast').Link} Link
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 */

import {whitespace} from 'hast-util-whitespace'
import {SKIP, visit} from 'unist-util-visit'

const unknown = 1
const containsImage = 2
const containsOther = 3

/**
 * Plugin to remove the wrapping paragraph for images.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkUnwrapImages() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {

      /**
       * @type {(Paragraph | PhrasingContent)[] }
       */
      const items = [];

      /**
       * @type {PhrasingContent[] }
       */
      let children = [];

      const appendChildren = ()=> {
        if(!children.length) return;
        if(children.length === 1 && whitespace(children[0])) return
        items.push({
          type: node.type,
          children: children,
          position: node.position,
        })
      }

      let i = -1

      while (++i < node.children.length) {
        const child = node.children[i]
        if (!applicable(child)) {
          children.push(child)
          continue
        }
        appendChildren()
        children = []
        items.push(child)
      }

      appendChildren();

      if (!items.length || !parent) return

      parent.children.splice(index || 0, 1, ...items)
    })
  }
}

/**
 * @param {PhrasingContent} child
 * @param {boolean} [inLink]
 * @returns {boolean}
 */
function applicable(child, inLink) {
  let image = unknown

  if (whitespace(child)) {
    // White space is fine.
  } else if (child.type === 'image' || child.type === 'imageReference') {
    image = containsImage
  } else if (
    !inLink &&
    (child.type === 'link' || child.type === 'linkReference')
  ) {
    const images = child.children.filter((subChild)=> applicable(subChild, true));
    const other = child.children.filter((subChild)=> !applicable(subChild, true));
    const linkResult = images.length && !other.length ? containsImage : containsOther

    if (linkResult === containsOther) {
      return false
    }

    if (linkResult === containsImage) {
      image = containsImage
    }
  }
  return image === containsImage;
}
