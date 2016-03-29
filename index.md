---
layout: index
---

I am a second-year Computer Science Ph.D. student
at Carnegie Mellon University, where I am supported
by an NSF graduate research fellowship.

{% include cv.md %}

# Recent Blog Posts

<ul>
  {% for post in site.posts limit:5 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> &mdash; <span>{{ post.date | date_to_string }}</span>
    </li>
  {% endfor %}
</ul>
<h4><a href="/blog">View all</a></h4>

# Fun Side Projects
+ [CS conference tracker](https://github.com/bamos/conference-tracker).
+ [SnowGlobe](https://github.com/bamos/snowglobe):
  Haskell-driven, small-scale web analytics with minimal configuration.
+ [My reading list](http://bamos.github.io/reading-list/):
  YAML data and hosted on GitHub pages.
+ [dotfiles](https://github.com/bamos/dotfiles):
  &hearts;
  [Arch Linux](https://www.archlinux.org/),
  OSX,
  [mutt](http://www.mutt.org/),
  [xmonad](http://xmonad.org/),
  [i3](https://i3wm.org/),
  [vim](http://www.vim.org/),
  [emacs](https://www.gnu.org/software/emacs/),
  [zsh](http://www.zsh.org/),
  [mpv](http://mpv.io/),
  [cmus](https://cmus.github.io/).
+ [girl](https://github.com/bamos/girl):
  Scala program to find broken links in GitHub projects.
+ [zsh-history-analysis](https://github.com/bamos/zsh-history-analysis):
  Analyze shell usage patterns with Python and R.
+ [python-scripts](https://github.com/bamos/python-scripts):
  Short and fun Python scripts.
+ [This website](https://github.com/bamos/bamos.github.io):
  Built with Jekyll and hosted on GitHub pages.
+ [cv](https://github.com/bamos/cv):
  Python-driven resume-curriculum vitae with Jinja templates.
+ [yaml-mailer](https://github.com/bamos/yaml-mailer):
  Email many people different messages.
+ [latex-templates](https://github.com/bamos/latex-templates)
  and [beamer-snippets](https://github.com/bamos/beamer-snippets):
  Personal collection and previewing of LaTeX and Beamer snippets.
  Admittedly, I now use Keynote for presentations.

---

Last updated on {% include last-updated.txt %}
