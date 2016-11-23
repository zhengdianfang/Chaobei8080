package com.chaobei8080;

import com.facebook.react.ReactActivity;
import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.view.View;
import android.widget.TextView;
import android.support.annotation.Nullable;

public class LoadingActivity extends Activity {

    @Override
       protected void onCreate(@Nullable Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
           setContentView(R.layout.activity_loading);
            TextView Btn1 = (TextView)findViewById(R.id.clickme);//获取按钮资源
        Btn1.setOnClickListener(new View.OnClickListener(){//创建监听
            public void onClick(View v) {
              startActivity(new Intent(LoadingActivity.this, MainActivity.class));
            }

        });

       }


}
