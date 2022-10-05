import test from 'tape'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkUnwrapImages from './index.js'

test('remarkUnwrapImages', (t) => {
  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('![hi](there.png)')
      .toString(),
    '<img src="there.png" alt="hi">\n',
    'should unwrap images'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('![alpha](alpha.png) ![bravo](bravo.png)')
      .toString(),
    '<img src="alpha.png" alt="alpha">\n<img src="bravo.png" alt="bravo">\n',
    'should unwrap multiple images'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('some text ![and](and.png) an image')
      .toString(),
      '<p>some text </p>\n<img src="and.png" alt="and">\n<p> an image</p>\n',
    'should unwrap images next to other content'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('some text')
      .toString(),
    '<p>some text</p>\n',
    'should not unwrap if there are no images'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[](#remark)')
      .toString(),
    '<p><a href="#remark"></a></p>\n',
    'should not unwrap if there are no images in links'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[![hi](there.png)](#remark)')
      .toString(),
    '<a href="#remark"><img src="there.png" alt="hi"></a>\n',
    'should supports links'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[![hi](there.png)](#remark)!')
      .toString(),
    '<a href="#remark"><img src="there.png" alt="hi"></a>\n<p>!</p>\n',
    'should not unwrap links next to other content'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('[![Hello](there.png), world](#remark)')
      .toString(),
    '<p><a href="#remark"><img src="there.png" alt="Hello">, world</a></p>\n',
    'should not unwrap links with other content'
  )

  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('![hi][image]\n\n[image]: kitten.png')
      .toString(),
    '<img src="kitten.png" alt="hi">\n',
    'should supports image references'
  )
 
  t.equal(
    remark()
      .use(remarkUnwrapImages)
      .use(remarkHtml)
      .processSync('Some text ![alpha](alpha.png), some other text ![bravo](bravo.png) some more text!')
      .toString(),
      '<p>Some text </p>\n<img src="alpha.png" alt="alpha">\n<p>, some other text </p>\n<img src="bravo.png" alt="bravo">\n<p> some more text!</p>\n',
    'should unwrap images in respective to the text order'
  )

  t.end()
})
