package com.linktic.situr

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.crashlytics.android.Crashlytics
import com.linktic.situr.sections.LoginActivity
import com.linktic.situr.sections.MapsActivity
import io.fabric.sdk.android.Fabric

class MainActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Fabric.with(this, Crashlytics())

        idUser = "41"
        //goto log
        val i = Intent(this, LoginActivity::class.java)
        startActivity(i)



        finish()
    }
}
