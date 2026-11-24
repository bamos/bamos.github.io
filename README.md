[![Build Status](https://travis-ci.org/bamos/bamos.github.io.svg?branch=master)](https://travis-ci.org/bamos/bamos.github.io)

# About
This is the source code for my personal website.
Unless stated otherwise, all content is MIT-licensed,
and some of the CV portions are created with the code
in the [bamos/cv](https://github.com/bamos/cv) repo.

`index.md`, `bio.md`, and `cv.pdf` are generated in that repository. Edit
`about` and `about_formal` in its `cv.yaml` for the biographies, and its Markdown
templates or generator for homepage structure and publication markup. Use
`make stage-md` there to refresh both Markdown pages, or `make stage` for the PDF
as well. Layouts, styles, JavaScript, and photos are maintained in this repository.
The homepage search description uses the generated formal bio automatically.

# w3c compliance continuous integration
Travis CI builds the static website with Jekyll and uses
[validate.rb](validate.rb) to check content for w3c compliance.
Simon Sigurdhsson wrote the
[original validate.rb script](https://github.com/urdh/blog/blob/gh-pages/validate.rb),
available in the public domain by the CC0 license,
and the modifications here are also available in the public domain
by the CC0 license.
