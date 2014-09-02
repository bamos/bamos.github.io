---
layout: post
title: Improving mpv as a music player with Lua scripts.
tags: [Linux,Lua,mpv]
---

This is part of a 3-post series on using mpv and Python
for music organization and playing in Linux and OSX.

+ [Using Python to organize a music directory.][music-organizer]
+ [Improving mpv as a music player with Bash/Zsh shell functions.][mpv-shell-rc]

[mpv][mpv] is a fork of [mplayer][mplayer] and adds
bug patches, an improved command-line interface, and
an experimental Lua scripting option.
This article introduces a simple Lua script to
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

## Includes and helper functions.

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

## Delete and restore tracks.
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

## Move the current track into a new subdirectory.
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

## Print an MP3 track's info.
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

## Share a track's information using the command-line email client `mutt`.
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

## Registering keybindings.
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

[music-organizer]: http://bamos.io/2014/07/05/music-organizer/
[mpv-shell-rc]: http://bamos.io/2014/07/05/mpv-shell-rc/
