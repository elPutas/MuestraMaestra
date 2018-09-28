package com.linktic.situr.utils

import android.app.Application
import com.linktic.situr.assets.AppPreferences


class SpInitApp : Application() {

    override fun onCreate() {
        super.onCreate()
        AppPreferences.init(this)
    }
}