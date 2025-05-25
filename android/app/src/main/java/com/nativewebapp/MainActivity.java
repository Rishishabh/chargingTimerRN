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

        // Set a layout if you have one, or leave it out for React Native
        // setContentView(R.layout.activity_main); // optional
    }
}
