---
layout: post
title: "Command Line Music Setup with Python and mpv"
tags: [Linux,Python,mpv]
---

<!-- $("#toc").toc({ -->
<!--     'headings': 'h2,h3' -->
<!-- }); -->
<!-- anchors.add('h2,h3'); -->
<!-- </script> -->

<!-- <ul id="toc"></ul> -->

<!-- --- -->

This article introduces how I manage my music on the
command line with [cmus][cmus] and [mpv][mpv].
mpv is a fork of [mplayer][mplayer] and adds
bug patches, an improved command-line interface, and
an experimental Lua scripting option.

## Using Python to organize a music directory
This portion introduces a Python script I use to organize my
music directory structure.

__Note that this currently only works for mp3 files,
but the project is open to pull requests to support
other media formats.__

I have a small collection of Python scripts I add to my `PATH`
in the [bamos/python-scripts][python-scripts] GitHub repository,
including [music-organizer.py][music-organizer.py].
`music-organizer.py` organizes my music into the simple directory
structure of `<artist>/<track>`, where `<artist>` and `<track>` are
lower case strings separated by dashes.
I call these lowercase strings `neat` and convert them with the `toNeat`
function below.
Keeping the files as lowercase helps me navigate the music directory
on the command line if I'm trying to synchronize artists between
computers with [unison][unison] or use mpv.

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

### Artist Mode.
In artist mode, all songs from subdirectories will be merged into
the current directory.
For example, suppose a user has the following directory structure
for an artist.

{% highlight bash %}
Album1/Track A.mp3
Album1/Track B.mp3
Album1/Track C.mp3
Album2/Track D.mp3
Album2/Track E.mp3
{% endhighlight %}

Running `music-organizer.py --artist` in this directory will
produce the following.

{% highlight bash %}
track-a.mp3
track-b.mp3
track-c.mp3
track-d.mp3
track-e.mp3
{% endhighlight %}

### Collection Mode.
In collection mode, the artist names will be preserved to allow
the user to override metadata, and only songs in the top level will
be sorted.
For example, suppose a user has the following directory structure
as a collection.

{% highlight bash %}
Alpha 1.mp3 (Artist: Alpha, Title: 1)
Alpha 2.mp3 (Artist: Alpha, Title: 2)
Beta 1.mp3 (Artist: Beta, Title: 1)
KeepThisDir/1.mp3
KeepThisDir/2.mp3
{% endhighlight %}

Running `music-organizer.py --collection` in this directory will
produce the following.

{% highlight bash %}
alpha/1.mp3 (Artist: Alpha, Title: 1)
alpha/2.mp3 (Artist: Alpha, Title: 2)
beta/1.mp3 (Artist: Beta, Title: 1)
KeepThisDir/1.mp3
KeepThisDir/2.mp3
{% endhighlight %}

### Edge cases.
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

### Detailed Usage.
{% highlight bash %}
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
{% endhighlight %}

[cmus]: https://cmus.github.io/
[mpv]: http://mpv.io
[mplayer]: http://www.mplayerhq.hu

[mpv-lua-scripting]: /2014/07/05/mpv-lua-scripting
[mpv-shell-rc]: /2014/07/05/mpv-shell-rc/

[python-scripts]: https://github.com/bamos/python-scripts
[music-organizer.py]: https://github.com/bamos/python-scripts/blob/master/python2.7/music-organizer.py
[picard]: https://musicbrainz.org/doc/MusicBrainz_Picard

[unison]: http://www.cis.upenn.edu/~bcpierce/unison/

## Improving mpv as a music player with Lua scripts
This portion introduces a simple Lua script to
add the following functionality using the mpv build
from the master branch.

+ Delete the current track.
+ Restore the previously deleted track.
+ Move the current track into a new subdirectory.
+ Print an MP3 track's info.
+ Share a track's information using the command-line email client `mutt`.

`mpv` reads all Lua scripts in `~/.mpv/lua` by default.
If you want to store scripts in a different directory,
set them as `lua=<filename>` in [~/.mpv/config][.mpv/config],
where `<filename>` is a comma delimited list of scripts to load.

From these scripts, `mpv` provides an `mp` class to interface
with the rest of the player, see the [implementation on Github][lua-mp].
I only use `mp.get_property("path")` to get the path to the current track.

The following are snippets from my [music.lua][music.lua] script,
which is in my [dotfiles][dotfiles] repository on Github.
I use the following Lua imports and helper function
to execute a shell command and return the output as a string.

### Includes and helper functions.

{% highlight lua %}
require 'os'
require 'io'
require 'string'


-- Helper function to execute a command and return the output as a string.
-- Reference: http://stackoverflow.com/questions/132397
function os.capture(cmd, raw)
  local f = assert(io.popen(cmd, 'r'))
  local s = assert(f:read('*a'))
  f:close()
  return string.sub(s, 0, -2) -- Use string.sub to trim the trailing newline.
end
{% endhighlight %}

### Delete and restore tracks.
To delete a track, use `mv` to move the track to a temporary location,
and restore the track by copying back from this location.
This only enables one track to be restored, but can be
modified to use a stack to delete and restore an arbitrary number.

{% highlight lua %}
-- Global variables for deleting/restoring the current track.
deleted_tmp = "/tmp/mpv-deleted"
last_deleted_track = ""

-- Delete the current track by moving it to the `deleted_tmp` location.
function delete_current_track()
  last_deleted_track = mp.get_property("path")
  os.execute("mv '" .. last_deleted_track .. "' '" .. deleted_tmp .. "'")
  print("'" .. last_deleted_track .. "' deleted.")
end

-- Restore the last deleted track.
-- This can be done to restore an arbitrary number of tracks by
-- using a queue rather than a single file.
function restore_prev_track()
  if last_deleted_track ~= "" then
    os.execute("mv '" .. deleted_tmp .. "' '" .. last_deleted_track .. "'")
    print("Successfully recovered '" .. last_deleted_track .. "'")
    last_deleted_track = ""
  else
    print("No track to recover.")
  end
end
{% endhighlight %}

### Move the current track into a new subdirectory.
Sometimes I filter through an album and make certain
songs as `good` by placing them in subdirectory entitled `good`.
This is added by making the directory if it doesn't
exist and moving the track into the directory.

{% highlight lua %}
-- Move the current track into a `good` directory.
function mark_good()
  last_deleted_track = mp.get_property("path")
  os.execute("mkdir -p good")
  os.execute("mv '" .. mp.get_property("path") .. "' '" .. "good" .. "'")
  print("Marked '" .. last_deleted_track .. "' as good.")
end
{% endhighlight %}

### Print an MP3 track's info.
The following uses `exiftool` to read exif metadata from an mp3
and concisely print the artist and title.
I disable `mpv`'s messaging by setting
`msg-level=demux=no:ad=no:ffmpeg=no:ao=no` in
[.mpv/config][.mpv/config] and use this instead.

{% highlight lua %}
-- Get a field such as 'Artist' or 'Title' from the current track.
function get_current_track_field(field)
  return os.capture(
    'exiftool -json "' .. mp.get_property("path") ..
    '" | grep \'^ *"' .. field .. '\' ' ..
    ' | sed \'s/^ *"' .. field .. '": "\\(.*\\)",$/\\1/g\'; '
  )
end

-- Print the current track's artist and title in the following format.
--
-- [music] ---------------
-- [music] Title: Marche Slave
-- [music] Artist: Tchaikovsky
-- [music] ---------------
function print_info()
  local artist = get_current_track_field("Artist")
  local title = get_current_track_field("Title")
  print(string.rep("-", 15))
  print('Artist: ' .. artist)
  print('Title: ' .. title)
  print(string.rep("-", 15))
end
{% endhighlight %}

### Share a track's information using the command-line email client `mutt`.
This displays an interface prompting for a user's email or
mutt alias and will send them an email with the song's info.
Prompting the user for input is different between Linux and OSX
and I've included conditionals for both.

{% highlight lua %}
-- Display a prompt for user input in Linux or Mac using
-- zenity or CocoaDialog, which must be already installed.
uname = os.capture('uname')
function prompt_input(title)
  local val
  if uname == "Linux" then
    val = os.capture(
      'zenity --entry --title "' .. title .. '" --text ""'
    )
  elseif uname == "Darwin" then
    val = os.capture(
      '/Applications/CocoaDialog.app/Contents/MacOS/CocoaDialog ' ..
      'standard-inputbox ' ..
      '--title "' .. title .. '" ' ..
      '| tail -n 1'
    )
  end
  return val
end

-- Use zenity and mutt to share the current track's information with a friend.
-- This can be modified to send the message with any command-line email client
-- or used to interface directly with an SMTP server.
function share_info()
  local email = prompt_input("Email to share with?")
  if email == "" then
    print("Error: No email input.")
    return
  end
  local content = prompt_input("Optional message body?");
  local artist = get_current_track_field("Artist")
  local title = get_current_track_field("Title")
  local info = 'Hi, check out ' .. title .. ' by ' .. artist .. '.'
  print(email)
  print(info)
  os.capture("echo '" .. content .. "' | " ..
    "mutt -s '" .. info .. "'" .. " -- '" .. email .. "'")
end
{% endhighlight %}

### Registering keybindings.
Lastly, register the keybindings with [mp][lua-mp] by specifying
the key to press, the title, and Lua function.

{% highlight lua %}
-- Set key bindings.
mp.add_key_binding("d", "delete_current_track", delete_current_track)
mp.add_key_binding("r", "restore_prev_track", restore_prev_track)
mp.add_key_binding("g", "mark_good", mark_good)
mp.add_key_binding("i", "print_info", print_info)
mp.add_key_binding("s", "share", share_info)
{% endhighlight %}


[mpv]: http://mpv.io
[mplayer]: http://www.mplayerhq.hu
[lua-mp]: https://github.com/mpv-player/mpv/blob/master/player/lua/defaults.lua

[dotfiles]: https://github.com/bamos/dotfiles
[.mpv/config]: https://github.com/bamos/dotfiles/blob/master/.mpv/config
[music.lua]: https://github.com/bamos/dotfiles/blob/master/.mpv/lua/music.lua

[music-organizer]: /2014/07/05/music-organizer/
[mpv-shell-rc]: /2014/07/05/mpv-shell-rc/

## Improving mpv as a music player with Bash/Zsh shell functions
This portion introduces a simple Lua script to add the following
functionality using the mpv build from the master branch.

I source [mpv/shellrc.sh][mpv/shellrc.sh] in my zshrc and bashrc
files to load the following aliases and functions.
These are all contained in my [dotfiles][dotfiles] repository on Github.

+ `mpvnova` uses `mpv` with no video for audio only.
+ `mpvshuf` uses `mpvnova` and infinitely shuffles.
+ `mpvp` uses `mpvshuf` to read a playlist.
+ `playcurrentdir` or `pcd` will use `mpvshuf` to play all the files in the
   current directory tree.
+ `playdir` or `pd` will use `mpvshuf` to play all the files in the
   directories provided on the command line.

{% highlight bash %}
# shellrc.sc
# Source this to add additional shell features for mpv.

alias mpvnova='mpv --no-video'
alias mpvshuf='mpvnova --shuffle --loop inf'
alias mpvp='mpvshuf --playlist'

playcurrentdir() {
  mpvp <(find "$PWD" -type f -follow)
}
alias pcd='playcurrentdir'

playdir() {
  if [[ $# == 0 ]]; then
    echo "playdir requires one or more directories on input."
  else
    if [[ $(uname) == "Linux" ]]; then READLINK=readlink;
    else READLINK=greadlink; fi
    mpvshuf --playlist <(find "$@" -type f -follow -exec $READLINK -f {} \;)
    unset READLINK
  fi
}
alias pd='playdir'
{% endhighlight %}

[dotfiles]: https://github.com/bamos/dotfiles
[mpv]: http://mpv.io
[mplayer]: http://www.mplayerhq.hu

[mpv-lua-scripting]: /2014/07/05/mpv-lua-scripting
[music-organizer]: /2014/07/05/music-organizer/

[mpv/shellrc.sh]: https://github.com/bamos/dotfiles/blob/master/.mpv/shellrc.sh
