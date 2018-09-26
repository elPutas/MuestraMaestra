package com.linktic.situr

import android.os.Bundle
import android.os.PersistableBundle
import android.support.v7.app.AppCompatActivity
import com.beust.klaxon.Json
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import java.util.*
import kotlin.collections.ArrayList

/**
 * Created by Gio on 13/06/18.
 */
open class BaseActivity : AppCompatActivity()
{
    companion object {
        val TAG             = "GIO"
        //user
        var idUser          = ""
        var numBlock        = 0
        var jsonStr         = ""
        var usernameUser    = ""
        var fullnameUser    = ""
        var emailUser       = ""
        var cityUser        : ArrayList<String> = ArrayList()
        var stateUser       = ""
        var groupUser       = ""
        var imgUser         = ""
        var ccUser          = ""

        //selected
        var idSelected      = 0
        var rntSelected     = ""
        var stateSelected   = ""
        var citySelected    = ""
        var nameSelected    = ""
        var addressSelected = ""
        var statusSelected  = ""
        var imgSelected     = ""
        var updateSelected  = ""

        var myLat           :Double = 4.62
        var myLon           :Double = -74.06

        var visited_places  :ArrayList<String> = ArrayList()
        var saved_places    = arrayOf("")

        var arrNamePlaces   :ArrayList<String> = ArrayList()


        //
        var arrPolyAll      :ArrayList<String> = ArrayList()
        var arrPlaceLatAll  :ArrayList<String> = ArrayList()
        var arrPlaceLonAll  :ArrayList<String> = ArrayList()
        var arrNamesAll     :ArrayList<String> = ArrayList()
        var arrRntsAll      :ArrayList<String> = ArrayList()
        var arrAddresAll    :ArrayList<String> = ArrayList()
        var arrCityAll      :ArrayList<String> = ArrayList()
        var arrStateAll     :ArrayList<String> = ArrayList()
        var arrStatusAll    :ArrayList<String> = ArrayList()
        var arrIdsAll       :ArrayList<String> = ArrayList()
        var arrImgAll       :ArrayList<String> = ArrayList()
        var arrUpdateAll    :ArrayList<String> = ArrayList()

        //percent todo
        var formsDone       :Int = 0
        var formsLeft       :Int = 0


    }

}
