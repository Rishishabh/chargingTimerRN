
package com.nativewebapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.nativewebapp.R;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
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
