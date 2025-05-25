package com.nativewebapp;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.nativewebapp.R;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Apply the AppCompat theme before the activity is created
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);

        WebView webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true); // if needed
        webView.setWebViewClient(new WebViewClient());

        // Load index.html from assets
        webView.loadUrl("file:///android_asset/web/index.html");

        setContentView(webView);
    }
}
