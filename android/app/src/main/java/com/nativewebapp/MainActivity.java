
package com.nativewebapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import androidx.appcompat.R;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Set theme before super.onCreate
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
    }
    
    @Override
    protected String getMainComponentName() {
        return "nativewebapp";
    }
}
