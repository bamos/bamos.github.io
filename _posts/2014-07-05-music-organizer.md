---
layout: post
title: Using Python to organize a music directory.
tags: [Linux,Python]
---

This is part of a 3-post series on using mpv and Python
for music organization and playing in Linux and OSX.

+ [Improving mpv as a music player with Lua scripts.][mpv-lua-scripting]
+ [Improving mpv as a music player with Bash/Zsh shell functions.][mpv-shell-rc]

This article introduces a Python script I use to organize my
mp3 music directory structure for iTunes and [mpv][mpv].
mpv is a fork of [mplayer][mplayer] and adds
bug patches, an improved command-line interface, and
an experimental Lua scripting option.

__Note that this currently only works for mp3 files,
but the project is open to pull requests to support
other media formats.__

I have a small collection of Python scripts I add to my `PATH`
in the [bamos/python-scripts][python-scripts] GitHub repository,
including [music-organizer.py][music-organizer.py].
Please star the repository if you like the project!

`music-organizer.py` organizes my music into the simple directory
structure of `<artist>/<track>`, where `<artist>` and `<track>` are
lower case strings separated by dashes.
I call these lowercase strings `neat` and convert them with the `toNeat`
function below.
I have mostly switched to iTunes for music, but keeping the files
as lowercase helps me navigate my music directory easily on the command
line if I'm trying to synchronize artists between computers or
use mpv.

{% highlight Python %}
# Maps a string such as 'The Beatles' to 'the-beatles'.
def toNeat(s):
  s = s.lower().replace("&","and")
  s = re.sub(r"[()\[\],.'\"\\\?\#/\!\$\:]", "", s)
  s = re.sub(r"[ \*\_]", "-", s)
  s = re.sub("-+", "-", s)
  search = re.search("[^0-9a-z\-\=]", s)
  if search:
    print("Error: Unrecognized character in '" + s + "'")
    sys.exit(-42)
  return s
{% endhighlight %}

`music-organizer.py` can be run on an entire music collection to
create subdirectories, or within an artist directory to only
organize the songs.

## Artist Mode.
In artist mode, all songs from subdirectories will be merged into
the current directory.
For example, suppose a user has the following directory structure
for an artist.

<pre>
Album1/Track A.mp3
Album1/Track B.mp3
Album1/Track C.mp3
Album2/Track D.mp3
Album2/Track E.mp3
</pre>

Running `music-organizer.py --artist` in this directory will
produce the following.

<pre>
track-a.mp3
track-b.mp3
track-c.mp3
track-d.mp3
track-e.mp3
</pre>

## Collection Mode.
In collection mode, the artist names will be preserved to allow
the user to override metadata, and only songs in the top level will
be sorted.
For example, suppose a user has the following directory structure
as a collection.

<pre>
Alpha 1.mp3 (Artist: Alpha, Title: 1)
Alpha 2.mp3 (Artist: Alpha, Title: 2)
Beta 1.mp3 (Artist: Beta, Title: 1)
KeepThisDir/1.mp3
KeepThisDir/2.mp3
</pre>

Running `music-organizer.py --collection` in this directory will
produce the following.

<pre>
alpha/1.mp3 (Artist: Alpha, Title: 1)
alpha/2.mp3 (Artist: Alpha, Title: 2)
beta/1.mp3 (Artist: Beta, Title: 1)
KeepThisDir/1.mp3
KeepThisDir/2.mp3
</pre>

## Edge cases.
I've encountered two edge cases when running `music-organizer.py` on
my full music directory. Please try running music-organizer on
a copy or subset of your music directory first to ensure you don't
run into any others!

**Case 1.** When two separate files share the same metadata, I will either
change the metadata with a tool like [Picard][picard] or
use `music-organizer.py` to delete the conflicts with `--delete-conflicts`.

**Case 2.** When the metadata in some artist directory indicates the
tracks have different names, `music-organizer.py` will halt
and suggest this to be changed.
Use `--ignore-multiple-artists` to allow this.

## Detailed Usage.
<pre>
> music-organizer.py -h
usage: music-organizer.py [-h] [--delete-conflicts]
                          [--ignore-multiple-artists] [--collection]
                          [--artist]

Organizes a music collection using tag information. The directory format is
that the music collection consists of artist subdirectories, and there are 2
modes to operate on the entire collection or a single artist. All names are
made lowercase and separated by dashes for easier navigation in a Linux
filesystem.

optional arguments:
  -h, --help            show this help message and exit
  --delete-conflicts    If an artist has duplicate tracks with the same name,
                        delete them. Note this might always be best in case an
                        artist has multiple versions. To keep multiple
                        versions, fix the tag information.
  --ignore-multiple-artists
                        This script will prompt for confirmation if an artist
                        directory has songs with more than 2 different tags.
                        This flag disables the confirmation and won't perform
                        this check.
  --collection          Operate in 'collection' mode and run 'artist' mode on
                        every subdirectory.
  --artist              Operate in 'artist' mode and copy all songs to the
                        root of the directory and cleanly format the names to
                        be easily typed and navigated in a shell.
</pre>

[mpv]: http://mpv.io
[mplayer]: http://www.mplayerhq.hu

[mpv-lua-scripting]: http://bamos.io/2014/07/05/mpv-lua-scripting
[mpv-shell-rc]: http://bamos.io/2014/07/05/mpv-shell-rc/

[python-scripts]: https://github.com/bamos/python-scripts
[music-organizer.py]: https://github.com/bamos/python-scripts/blob/master/python2.7/music-organizer.py
[picard]: https://musicbrainz.org/doc/MusicBrainz_Picard
