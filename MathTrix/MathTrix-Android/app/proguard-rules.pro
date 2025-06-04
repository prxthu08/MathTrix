# Keep WebView related classes
-keepclassmembers class * extends android.webkit.WebView {
    public *;
}

# Keep JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep custom application class
-keep class com.mathtrix.app.** { *; }

# Keep WebViewClient
-keep class android.webkit.WebViewClient { *; }
-keep class android.webkit.WebView { *; }
-keep class android.webkit.WebSettings { *; } 