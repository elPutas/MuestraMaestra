package com.linktic.situr

import android.os.Bundle
import android.os.PersistableBundle
import android.support.v7.app.AppCompatActivity
import java.util.*
import kotlin.collections.ArrayList

/**
 * Created by Gio on 13/06/18.
 */
open class BaseActivity : AppCompatActivity()
{
    companion object {
        val TAG = "GIO"
        //user
        var idUser = ""
        var numBlock = 1
        var jsonStr = ""
        var usernameUser = ""
        var fullnameUser = ""
        var groupUser = ""
        var imgUser = ""

        //selected
        var idSelected = ""
        var rntSelected = ""
        var stateSelected = ""
        var citySelected = ""
        var nameSelected = ""
        var addressSelected = ""
        var statusSelected = ""

        var myLat:Double = 4.62
        var myLon:Double = -74.06

        var visited_places:ArrayList<String> = ArrayList()
        var saved_places = arrayOf("")


    }

}
