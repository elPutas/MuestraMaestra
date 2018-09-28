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
        val path            = "http://35.168.2.170/citur_2016/"


        //user
        var idUser          = ""
        var numBlock        = 0
        var numPosition     = 0
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
        var idSelected      = ""
        var rntSelected     = ""
        var stateSelected   = ""
        var citySelected    = ""
        var nameSelected    = ""
        var addressSelected = ""
        var statusSelected  = ""
        var imgSelected     = ""
        var updateSelected  = ""

        var myLat           :Double = 0.0
        var myLon           :Double = 0.0

        var visited_places  :ArrayList<String> = ArrayList()
        var visited_placeStr= ""

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
        var arrIdsAll       :ArrayList<Int> = ArrayList()
        var arrImgAll       :ArrayList<String> = ArrayList()
        var arrUpdateAll    :ArrayList<String> = ArrayList()

        //percent todoForm
        var formsDone       :Int = 0
        var formsLeft       :Int = 0

        //offline
        var isModeOnline   :Boolean = true


    }

}
