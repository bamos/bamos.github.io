---
layout: post
title: Redirect libav's log to Android's logcat when using NDK/JNI
tags: [Android]
---

I'm using [libav][libav] with the [Android NDK][ndk] to
encode video frames in an Android application.
`stdout` from the C code from the native call in Java
isn't output to Android's logcat.
The following import and define's provide ways to print a string
to logcat.

{% highlight c %}
#include <android/log.h>
#define TAG "AV_EXAMPLE"
#define LOG_INFO(STR) __android_log_write(ANDROID_LOG_INFO, TAG, STR);
#define LOG_ERROR(STR) __android_log_write(ANDROID_LOG_ERROR, TAG, STR);
{% endhighlight %}

A callback can be set for `libav`'s log, and the following
snippets are used to write the formatted string to a buffer
and output to logcat.

{% highlight c %}
void av_log_android(void *avctx, int level, const char *fmt, va_list args) {
  char str[1024*16];
  vsprintf(str, fmt, args);
  va_end(args);
  LOG_INFO(str);
}
{% endhighlight %}

The callback can be set before `libav` is registered in your application.

{% highlight c %}
av_log_set_level(AV_LOG_DEBUG);
av_log_set_callback(av_log_android);
av_register_all();
{% endhighlight %}

[libav]: https://libav.org/
[ndk]: https://developer.android.com/tools/sdk/ndk/index.html
