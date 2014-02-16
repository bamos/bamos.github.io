---
layout: post
title: Delete current track in mplayer.
tags: [Linux]
---

I use [mplayer][mplayer] to listen to music, which doesn't have
a built-in option to delete the current track.
[This post][delete-post] shows how to add a input hook and
keep a list of deletion candidates, but I wanted the ability
to delete a track and recover it, if possible.

See [bamos/dotfiles][dotfiles-mplayer] for the latest version,
but below shows the additions I made to enable this.
When `Delete` is pressed, `delete.sh` moves
the file and location to `/tmp/mplayer-deleted` and
`/tmp/mplayer-deleted-name`, and when `u` (for undo) is pressed,
`recover.sh` restores the file.
This only recovers one file and can be modified to recover
multiple files, but I don't need to undo more than once.

# [.mplayer/input.conf][input.conf]
{% highlight bash %}
DEL run /home/brandon/.mplayer/delete.sh
u run /home/brandon/.mplayer/recover.sh
{% endhighlight %}

# [.mplayer/delete.sh][delete.sh]
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
    mv "${FILE}" /tmp/mplayer-deleted
    echo "${FILE}" > /tmp/mplayer-deleted-name
    echo "${FILE} deleted."
  fi
done
{% endhighlight %}

# [.mplayer/recover.sh][recover.sh]
{% highlight bash %}
#!/bin/bash

if test -w "/tmp/mplayer-deleted" ; then
  OLD_LOC=$(cat /tmp/mplayer-deleted-name)
  mv /tmp/mplayer-deleted "$OLD_LOC"
  if [[ $? == 0 ]]; then
    echo "Successfully recovered $FILE."
    rm /tmp/mplayer-deleted-name
  fi
else
  echo "Unable to recover file."
fi
{% endhighlight %}

[mplayer]: http://www.mplayerhq.hu
[delete-post]: http://jurjenbokma.com/ApprenticesNotes/listing_files_from_mplayer.html
[dotfiles-mplayer]: https://github.com/bamos/dotfiles/tree/master/.mplayer

[input.conf]: https://github.com/bamos/dotfiles/blob/master/.mplayer/input.conf
[delete.sh]: https://github.com/bamos/dotfiles/blob/master/.mplayer/delete.sh
[recover.sh]: https://github.com/bamos/dotfiles/blob/master/.mplayer/recover.sh
