---
layout: post
title: Re-Signing an Android APK with a shell script
tags: [Android]
---

I'm currently writing [Robotium](http://code.google.com/p/robotium)
applications to test Android APK files that I didn't write. To do this,
the application needs to be re-signed with a debug certificate. I was able to
find many sources for doing this.
However, nothing I found met my needs of doing this to an
entire directory of apk files via the command line.
The script that I posted at
[bamos/simple-shell-scripts](https://github.com/bamos/simple-shell-scripts/blob/master/resigner.sh)
takes the name of the apk as a parameter and
automatically resigns the application.

# Usage
{% highlight bash %}
$ ./re-signer.sh foo.apk
Moving the original apk to a temporary location
Unzipping and removing META-INF
Archive:  foo-temp.apk
  inflating: foo/META-INF/MANIFEST.MF
  inflating: foo/META-INF/ANDROID.SF
  inflating: foo/META-INF/ANDROID.RSA
  inflating: foo/assets/exploid
  inflating: foo/assets/profile
  inflating: foo/assets/rageagainstthecage
 extracting: foo/assets/sqlite.db
  inflating: foo/lib/armeabi/libandroidterm.so
 extracting: foo/res/drawable/icon.png
 extracting: foo/res/drawable/minispiral.png
  inflating: foo/res/layout/main.xml
  inflating: foo/AndroidManifest.xml
  inflating: foo/classes.dex
  inflating: foo/resources.arsc
Zipping and removing the directory
  adding: AndroidManifest.xml (deflated 68%)
  adding: assets/ (stored 0%)
  adding: assets/exploid (deflated 56%)
  adding: assets/profile (deflated 59%)
  adding: assets/rageagainstthecage (deflated 60%)
  adding: assets/sqlite.db (deflated 2%)
  adding: classes.dex (deflated 47%)
  adding: lib/ (stored 0%)
  adding: lib/armeabi/ (stored 0%)
  adding: lib/armeabi/libandroidterm.so (deflated 54%)
  adding: res/ (stored 0%)
  adding: res/drawable/ (stored 0%)
  adding: res/drawable/icon.png (stored 0%)
  adding: res/drawable/minispiral.png (deflated 0%)
  adding: res/layout/ (stored 0%)
  adding: res/layout/main.xml (deflated 57%)
  adding: resources.arsc (deflated 69%)
Aligning the zip
Verifying alignment of foo.apk (4)...
      77 AndroidManifest.xml (OK - compressed)
    1000 assets/ (OK)
    1072 assets/exploid (OK - compressed)
    7950 assets/profile (OK - compressed)
    9637 assets/rageagainstthecage (OK - compressed)
   11882 assets/sqlite.db (OK - compressed)
   25706 classes.dex (OK - compressed)
   46180 lib/ (OK)
   46252 lib/armeabi/ (OK)
   46339 lib/armeabi/libandroidterm.so (OK - compressed)
   54664 res/ (OK)
   54736 res/drawable/ (OK)
   54816 res/drawable/icon.png (OK)
   58267 res/drawable/minispiral.png (OK - compressed)
   64308 res/layout/ (OK)
   64385 res/layout/main.xml (OK - compressed)
   64733 resources.arsc (OK - compressed)
Verification successful
Signing the apk
Cleaning up
{% endhighlight %}

# Prerequisites
Before running the script, ensure:

 1. You have created a debug key with `keytool`.
    The command for this is found in the script.
 2. The `JARSIGNER` and `KEYSTORE` variables have been
    updated to your specific configuration.
    At the time of writing this (March 2013), `JARSIGNER` needs JDK6
    because JDK7 handles certificates differently.

# Script Overview
First, move the apk to a temporary location.
{% highlight bash %}
NAME=$(echo $1 | sed s'/\.apk$//')
mv $NAME.apk $NAME-temp.apk
{% endhighlight %}

Then, unzip the apk, remove META-INF, and zip and align the contents.
{% highlight bash %}
unzip $NAME-temp.apk -d $NAME
cd $NAME
rm -rf META-INF
zip -r ../$NAME-nometa.apk *
cd ..
rm -rf $NAME
zipalign -v 4 $NAME-nometa.apk $NAME.apk
{% endhighlight %}

Lastly, sign the apk and remove excess files.
{% highlight bash %}
$JARSIGNER -keystore $KEYSTORE-storepass android \
    -keypass android $NAME.apk androiddebugkey
rm $NAME-temp.apk $NAME-nometa.apk
{% endhighlight %}

