/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Paragraph} Paragraph
 * @typedef {import('mdast').Link} Link
 * @typedef {import('mdast').LinkReference} LinkReference
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 */

import {whitespace} from 'hast-util-whitespace'
import {visit} from 'unist-util-visit'

/**
 * Plugin to remove the wrapping paragraph for images.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkUnwrapImages() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {

      if(!node.children || !node.children.length || !parent) return;

      /**
       * @type {(Paragraph | PhrasingContent)[] }
       */
      const items = []

      /**
       * @type {PhrasingContent[] }
       */
      let children = []

      const appendChildren = () => {
        if (!children.length) return
        if (children.length === 1 && whitespace(children[0])) return
        items.push({
          type: node.type,
          children,
          position: node.position
        })
      }

      for (const child of node.children) {
        if (!applicable(child)) {
          children.push(child)
          continue
        }

        appendChildren()
        children = []
        items.push(child)
      }

      appendChildren();

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

  if (child.type === 'image' || child.type === 'imageReference') {
    return true
  }

  if (inLink) return false

  if (child.type !== 'link' && child.type !== 'linkReference') {
    return false
  }

  if(!child.children || !child.children.length) return false

  const images = child.children.filter((subChild) => applicable(subChild, true))
  const other = child.children.filter((subChild) => !applicable(subChild, true))

  if (images.length && !other.length) {
    return true
  }
  return false
}
