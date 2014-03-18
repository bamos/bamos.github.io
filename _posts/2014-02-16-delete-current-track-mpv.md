---
layout: post
title: Delete current track in mpv.
tags: [Linux]
---

I use [mpv][mpv] to listen to music, which doesn't have
a built-in option to delete the current track.
[This post][delete-post] shows how to add a input hook and
keep a list of deletion candidates with `mplayer`,
but I wanted the ability to delete a track and recover it, if possible.

See [bamos/dotfiles][dotfiles-mpv] for the latest version,
but below shows the additions I made to enable this.
When `Delete` is pressed, `delete.sh` moves
the file and location to `/tmp/mpv-deleted` and
`/tmp/mpv-deleted-name`, and when `u` (for undo) is pressed,
`recover.sh` restores the file.
This only recovers one file and can be modified to recover
multiple files, but I don't need to undo more than once.

# [.mpv/input.conf][input.conf]
{% highlight bash %}
DEL run /home/brandon/.mpv/delete.sh
u run /home/brandon/.mpv/recover.sh
{% endhighlight %}

# [.mpv/delete.sh][delete.sh]
{% highlight bash %}
#!/bin/bash

# On multiuser machines, output and grep on $USER too
MYPID=$(ps axo '%p %c'|grep [m]player$|awk '{print $1}')

if [ "$(echo ${MYPID}|wc -w)" -ne 1 ] ; then
  echo "#no safe output: too many PIDs: \"${MYPID}\" ($(echo ${MYPID}|wc -c))"
  exit 1
fi

IFS='
'
for FILE in $(lsof -p ${MYPID} -Ftn |grep -A1 ^tREG|grep ^n|sed 's/^n//g'); do
  if test -w "${FILE}" ; then
    mv "${FILE}" /tmp/mpv-deleted
    echo "${FILE}" > /tmp/mpv-deleted-name
    echo "${FILE} deleted."
  fi
done
{% endhighlight %}

# [.mpv/recover.sh][recover.sh]
{% highlight bash %}
#!/bin/bash

if test -w "/tmp/mpv-deleted" ; then
  OLD_LOC=$(cat /tmp/mpv-deleted-name)
  mv /tmp/mpv-deleted "$OLD_LOC"
  if [[ $? == 0 ]]; then
    echo "Successfully recovered $FILE."
    rm /tmp/mpv-deleted-name
  fi
else
  echo "Unable to recover file."
fi
{% endhighlight %}

[mpv]: http://www.mpv.io
[delete-post]: http://jurjenbokma.com/ApprenticesNotes/listing_files_from_mplayer.html
[dotfiles-mpv]: https://github.com/bamos/dotfiles/tree/master/.mpv

[input.conf]: https://github.com/bamos/dotfiles/blob/master/.mpv/input.conf
[delete.sh]: https://github.com/bamos/dotfiles/blob/master/.mpv/delete.sh
[recover.sh]: https://github.com/bamos/dotfiles/blob/master/.mpv/recover.sh
