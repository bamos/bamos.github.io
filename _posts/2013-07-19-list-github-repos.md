---
layout: post
title: Obtaining a (LaTeX) list of GitHub repos with Python 3.
tags: [Python, LaTeX]
---

In my [vitae](http://bamos.github.io/cv/), I use a Python script to
generate a list of GitHub repos I've created and forked.
This script is my first exposure to REST and the GitHub API,
which is remarkably simple to use in this case.

The script is available from
[bamos/list-github-repos](https://github.com/bamos/list-github-repos),
and available below for reference.

# Usage.

{% highlight bash %}
./list-github-repos.py <user>
{% endhighlight %}

This outputs the list of repos and their descriptions to
stdout and creates a LaTeX snippet `projects-github.tex`
with the same information.

Add the snippet to your LaTeX document with
`\input{projects-github.tex}`.

# Script.

{% highlight python %}
#!/usr/bin/env python3
#
# list-github-repos.py
# Obtain a pretty list of all of a user's public Github repos.
#
# Brandon Amos <http://bamos.github.io>
# 2013.07.18

import urllib.request
import json
import argparse

def getRepos(user):
  url = 'https://api.github.com/users/' + user + '/repos'
  try:
    request = urllib.request.Request(url)
    handler = urllib.request.urlopen(request)
    reposJson = json.loads(handler.read().decode('utf8'))
    handler.close()
    return reposJson
  except:
    print('Failed to get repos.')
    return None

# Sanitize a string for LaTeX.
def sanitize(str):
  str = str.replace('_', '\\_')
  return str

if __name__=="__main__":
  parser = argparse.ArgumentParser(
    description="Obtain a pretty list of all of a user's public Github repos.")
  parser.add_argument('user', type=str)
  args = parser.parse_args()

  repos = getRepos(args.user)
  if repos is None:
    sys.exit(42)

  f = open('projects-github.tex', 'w')

  # Reference: http://developer.github.com/v3/repos/
  f.write('{\\bf Original repositories.}\n')
  print("Original repositories.")

  f.write('\\begin{itemize}\n')
  for repo in repos:
    if (not repo['fork']):
      f.write('  \\item {\\bf ' + sanitize(repo['name']) + '} - \n')
      f.write('    ' + sanitize(repo['description']) + '\n')

      print('+ ' + repo['name'])
      print('  + ' + repo['description'])
  f.write('\\end{itemize}\n')


  f.write('{\\bf Forked repositories.}\n')
  print("\nForked repositories.")

  f.write('\\begin{itemize}\n')
  for repo in repos:
    if (repo['fork']):
      f.write('  \\item {\\bf ' + sanitize(repo['name']) + '} - \n')
      f.write('    ' + sanitize(repo['description']) + '\n')

      print('+ ' + repo['name'])
      print('  + ' + repo['description'])
  f.write('\\end{itemize}\n')

  f.close()

{% endhighlight %}
