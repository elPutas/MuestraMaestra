package com.linktic.situr

import android.content.Intent
import android.os.Bundle
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.crashlytics.android.Crashlytics
import com.linktic.situr.sections.LoginActivity
import com.linktic.situr.sections.MapsActivity
import com.linktic.situr.assets.AppPreferences
import com.linktic.situr.utils.InternetCheck
import io.fabric.sdk.android.Fabric

class MainActivity : BaseActivity()
{

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Fabric.with(this, Crashlytics())

        AppPreferences.init(this)

        InternetCheck(object : InternetCheck.Consumer
        {
            override fun accept(internet: Boolean?)
            {
                isModeOnline = internet!!

                if (AppPreferences.isLog)
                {
                    val jsonString = StringBuilder(AppPreferences.spDataLogin)

                    val parser = Parser()
                    val json = parser.parse(jsonString) as JsonObject

                    val realData:JsonObject = json["data"] as JsonObject
                    println("Data = $realData")

                    idUser = realData["id"].toString()
                    fullnameUser = realData["fullname"].toString()
                    usernameUser = realData["username"].toString()
                    stateUser = realData["department"].toString()
                    imgUser = realData["image"].toString()
                    groupUser = realData["group_id"].toString()

                    var _strArr:ArrayList<String> = ArrayList()
                    if(AppPreferences.spPlaceVisited!="")
                        if(AppPreferences.spPlaceVisited.replace("[", "").replace("]", "").split(",").size>1)
                            _strArr = AppPreferences.spPlaceVisited.replace("[", "").replace("]", "").split(",") as ArrayList<String>
                        else
                            _strArr.add(AppPreferences.spPlaceVisited.replace("[", "").replace("]", "").toString())


                    visited_places = _strArr

                    val _cityUser = realData["cities"] as JsonArray<*>

                    cityUser = _cityUser["title"].toList() as ArrayList<String>


                    //goto maps
                    val i = Intent(this@MainActivity, MapsActivity::class.java)
                    startActivity(i)
                    finish()
                }else{
                    //goto log
                    val i = Intent(this@MainActivity, LoginActivity::class.java)
                    startActivity(i)
                    finish()
                }

            }
        })


    }
}
