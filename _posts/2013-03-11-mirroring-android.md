---
layout: post
title: Configuring Gerrit Code Review to mirror the Android repository
tags: [Android]
---

This documentation can also be found on
[GitHub](https://github.com/bamos/mirror-android-repo/blob/master/install-gerrit.md)

Some groups or organizations that work with modified versions of Android
might find it useful to mirror the repository and manage commits with
Gerrit. I was in the need of this a few days ago when I started
researching this.  However, there was a lack of documentation giving step
by step instructions of doing this. I hope for the documentation that I
made to serve as a skeleton for people doing this to save them time. I
welcome any comments on it; I'm still trying to learn how everything
works.

**DISCLAIMER: This is still experimental and being reviewed! Proceed at your
own risk!**

Limitations
-----------

+ Git has to be used to push to the server. Uploading with `repo` doesn't
work.

Trackbacks
----------

+ https://help.ubuntu.com/10.04/serverguide/mysql.html
+ http://gerrit.googlecode.com/svn/documentation/2.2.1/install.html
+ http://source.android.com/source/using-repo.html
+ http://groups.google.com/group/repo-discuss
+ http://source.android.com/source/version-control.html

Preconditions
-------------------
This was all done on a nearly clean Ubuntu 10.04 LTS VM with Gerrit 2.2.1.
Also, perhaps you should start screen now if you're connected via ssh.

{% highlight bash %}
$ screen
{% endhighlight %}

Download and Install Software
-----------------------------

Also, verify MySQL automatically started

{% highlight bash %}
$ sudo apt-get install git-core mysql-server openjdk-6-jre
$ wget https://dl-ssl.google.com/dl/googlesource/git-repo/repo -O /usr/bin/repo
$ sudo netstat -tap | grep mysqudo netstat -tap | grep mysql
tcp        0      0 localhost:mysql         *:*                     LISTEN      5136/mysqld 
{% endhighlight %}

Prepare Gerrit
--------------

Create a Unix account for Gerrit and change to it's shell.

{% highlight bash %}
$ sudo adduser --system --shell /bin/bash --gecos 'Gerrit Code Review User' --group --disabled-password --home /home/gerrit2 gerrit2
$ sudo su gerrit2
gerrit2 $ cd ~
{% endhighlight %}

Make a directory for Android's source and initialize and sync the mirror.
Lower the jobs used if you don't have bandwidth to spare.

{% highlight bash %}
gerrit2 $ mkdir android && cd android

gerrit2 $ repo init -u https://android.googlesource.com/mirror/manifest --mirror
repo mirror initialized in /home/gerrit2/androidtest

gerrit2 $ repo sync -j 40
Fetching projects: 100% (388/388), done.
{% endhighlight %}

Crease a Gerrit specific user within MySQL and give it full rights.
Replace &lt;gerritPW&gt; appropriately.

{% highlight bash %}
$ mysql -u root -p
mysql> CREATE USER 'gerrit2'@'localhost' IDENTIFIED BY '<gerritPW>';
mysql> CREATE DATABASE reviewdb;
mysql> ALTER DATABASE reviewdb charset=latin1;
mysql> GRANT ALL ON reviewdb.* TO 'gerrit2'@'localhost';
mysql> FLUSH PRIVILEGES;
{% endhighlight %}

Download the latest version of Gerrit from
[http://code.google.com/p/gerrit/downloads/list](http://code.google.com/p/gerrit/downloads/list)

{% highlight bash %}
gerrit2 $ cd ~
gerrit2 $ wget http://gerrit.googlecode.com/files/gerrit-2.4.2.war -O gerrit.war
{% endhighlight %}

Download and install the OpenJDK jre and initialize the site directory.
For this, gmail was used as the SMTP server.

{% highlight bash %}
gerrit2 $ java -jar gerrit.war init -d review_site
Create '/home/gerrit2/review_site' [Y/n]? <Enter>
Location of Git repositories [git]: <Enter>

# Database
Database server type [H2/?]: MySQL
Gerrit Code Review is not shipped with MySQL.
Download and install it now [Y/n]? Y
Server hostname [localhost]: <Enter>
Server port [(MYSQL default)]: <Enter>
Database name [reviewdb]: <Enter>
Database username [gerrit2]: <Enter>
gerrit2's password: <gerritPW>

# Authentication
Authentication method [OPENID/?]:<Enter>

SMTP server hostname [localhost]: smtp.google.com
SMTP server port [(default)]: 465
SMTP encryption [NONE/?]: SSL
SMTP username [gerrit2]: <user@gmail.com>
password: <gmailPW>

# Process
Run as [gerrit2]: <Enter>
Java runtime [/usr/lib/jvm/java-6-openjdk/jre]: <Enter>
Copy gerrit.war [Y/n]? Y

# SSH Daemon
Listen on address [*]: <Enter>
Listen on port [29418]: 2323 (Or another port &lt;sshPort&gt;,
referred to later)

Download and install Bouncy Castle Crypto [Y/n]? Y

# HTTP Daemon
Behind reverse proxy [y/N]? N
Use SSL [y/N]? N
Listen on address [*]: <Enter>
Listen on port [8080]: 8888 (Or another port <webPort>, referred to later)
Canonical URL [<url>]: http://<host>:<port>

Initialized /home/gerrit2/review_site
Executing /home/gerrit2/review_site/bin/gerrit.sh start
Starting Gerrit Code Review: OK
{% endhighlight %}

If Gerrit doesn't automatically start, go into the site directory and start
it manually.

{% highlight bash %}
gerrit2 $ cd review_site
gerrit2 $ ./bin/gerrit.sh start
Starting Gerrit Code Review: OK
{% endhighlight %}

(Optional) Delete the war file that was copied to the site directory.

{% highlight bash %}
gerrit2  $ rm ~gerrit2/gerrit.war
{% endhighlight %}

Configure Gerrit
----------------
Load the site in a browser and register an account.
( *Note:* repo makes it difficult to upload to a repository if your
username differs from the first section (before the @) of your email.
You can save some trouble here by making your username on gerrit the
same as the first part of your email. `foo` should be the username of 
`foo@bar.baz`)
The first user to register an account is automatically placed into the
Administrators group.
Add your public key to the account.
Also, add the public key of the gerrit2 account for adding Android to the
repo. that you can save some trouble by making your username the first part
of your email.

Create a new group with the name 'android' through Gerrit's web interface.

**NOTE** I am very new to both Gerrit and git and would like feedback on
the security of doing this. (Feedback on anything else would be appreciated,
too) I only want specified users put in the android groud to read and
commit. I only want the administrator to approve the changes.

Make the Access for All-Projects:

+ Global Capabilities

  + Administrate Server: Administrators

+ Reference: refs/\*

  + Read: android
  + Create Reference: android
  + Forge Author Identity: android
  + Forge Committer Identity: android
  + Push: android
  + Force Push: android
  + Push Annotated Tag: android
  + Push Merge Commit: android
  + Submit: Submitters

+ Reference: refs/for/refs/\*

  + Push: android

+ Reference: refs/heads/\*

  + Label Code-Review: -2/+2 android
  + Label Verified: -1/+1 android

+ Reference: refs/meta/config

  + Read: Project Owners

Add Android to Gerrit
---------------------
Verify that everything is working thus far by accessing your Gerrit server
via ssh:

{% highlight bash %}
gerrit2 $ ssh -p <gerritPort> <gerritName>@<serverName>

****    Welcome to Gerrit Code Review    ****
Hi Brandon Amos, you have successfully connected over SSH.
{% endhighlight %}

Go back to $ANDROID\_ROOT and add the projects and push the data to Gerrit.
$REPO_PATH will be dynamically set when executing `repo -forall`.
Single quotes are important here. Also note that &lt;sshPort&gt; is the ssh port
of the internal daemon running within Gerrit, not the regular ssh port.

{% highlight bash %}
gerrit2 $ repo forall -c 'echo $REPO_PATH; ssh -p <sshPort> <gerritUser>@<host> gerrit create-project --name android/$REPO_PATH --owner android;' 
gerrit2 $ repo forall -c 'echo $REPO_PATH; git push ssh://<gerritUser@<host>:<sshPort>/android/$REPO_PATH +refs/heads/* +refs/tags/*;' 
{% endhighlight %}

Daemon Configuration
--------------------
Exit the gerrit2 account.
Create a configuration file for gerrit by setting the GERRIT_SITE variable
in a config file. Make the Gerrit daemon start on boot.

{% highlight bash %}
gerrit2 $ exit
$ echo "GERRIT_SITE=~gerrit2/review_site/" >> /etc/default/gerritcodereview
$ sudo ln -s ~gerrit2/review_site/bin/gerrit.sh /etc/init.d/gerrit
$ update-rc.d gerrit defaults
{% endhighlight %}

Set Up the Manifest
-------------------
Check out the manifest and modify `default.xml` to point to your server by
creating a new remote tag and pointing default to it:

{% highlight bash %}
$ git clone ssh://<gerritUser>@<host>:<sshPort>/android/platform/manifest.git
$ cd manifest
$ git checkout -b local
$ vim default.xml

[...]
<remote  name="<arbitraryName>"
       fetch=".."
       review="http://<host>:<gerritPort>/" />
<default revision="master"
       remote="<arbitraryName>"
[...]

$ git checkout master
$ git commit -am "Adding local gerrit server"
$ git push origin master
$ cd ..; rm -rf manifest/;
{% endhighlight %}


Sync a Client
-------------
At this point, the server is *hopefully* configured and setup properly.
After verifying that a user and public key exist on Gerrit,
make a new directory for the source and initialize the repo.
After verifing that the manifest has your server information, sync the repo.

{% highlight bash %}
$ mkdir android-source; cd android-source;
$ repo init -u ssh://<gerritUser>@<host>:<sshPort>/android/platform/manifest
$ cat .repo/manifest.xml | grep <host>
review="http://<host>:gerritPort/" />

$ repo sync -j 40
{% endhighlight %}


Upload to the Server
--------------------
I did this mainly for my reference; I kept it for testing convenience.
Suppose you want to work on the project at the path &lt;path&gt; on the branch
&lt;branch&gt;, starting in the android root directory.
A list of project paths is given by: `repo list`

{% highlight bash %}
$ cd <path>
$ git checkout -b <branch>
{% endhighlight %}

After you're done working, commit the files with the message &lt;msg&gt;,
and then push them to the master branch for review.
&lt;gerritPath&gt; corresponds to the path of the project on Gerrit.

{% highlight bash %}
$ git commit -am <msg>
$ git push ssh://<gerritUser>@<host>:<sshPort>/<serverPath> HEAD:refs/for/master
{% endhighlight %}

Upload to the Server without Review
-----------------------------------
To bypass review, a user must be in a group that has the "Push Branch" permission.

{% highlight bash %}
$ git push ssh://<gerritUser>@<host>:<sshPort>/<serverPath> HEAD:refs/heads/master
{% endhighlight %}

Rewriting Git's History
-----------------------

Check out the Android repository and use `checklog.sh` to check the git logs
for the desired author and email. The results will be written to
`git-projects.txt` and also displayed.

{% highlight bash %}
$ cd android-repo
$ ./checklog.sh
device/samsung/crespo
platform/frameworks/base
platform/packages/apps/Calculator
platform/packages/apps/Camera
platform/packages/apps/Email
platform/packages/apps/Nfc
platform/packages/providers/ContactsProvider
{% endhighlight %}

Next, go to each repository in the gerrit server and run `change-author.sh`
to change the author of each directory.
I have this script in my home directory.
Following is an example of rewriting the log for `device/samsung/crespo`

{% highlight bash %}
$ cd ~gerrit2/review-site/git/android/device/samsung/crespo.git
$ ~/change-author.sh
{% endhighlight %}

I also had a problem with the manifest checking out a different branch than
the current HEAD is pointing to.
To fix this, I temporarily changed HEAD to the branch being checked out by
the manifest.

{% highlight bash %}
$ cd ~gerrit2/review-site/git/android/device/samsung/crespo.git
$ cat HEAD
ref: refs/heads/<oldHead>
$ mv HEAD HEAD-old
$ echo "ref: refs/heads/<newHead>" > HEAD
$ ~/change-author.sh
$ mv HEAD-old HEAD
{% endhighlight %}


Gerrit Tips
-----------

+ Remove a project by deleting the Git repository from the filesystem in
`~gerrit2/review_site/git` then flush the cache with
`ssh -p <sshPort> <gerritUser>@<host> gerrit flush-caches --all`
+ Conversely, a project can be added by copying a Git repository (not cloning)
to `~gerrit2/review_site/git`.
+ To view the current users, the database needs to be queried via ssh:
`ssh -p <sshPort>://<gerritUser>@<host> 'gerrit gsql --format PRETTY -c "select full_name,preferred_email from accounts"'`
