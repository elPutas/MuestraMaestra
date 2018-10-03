package com.linktic.situr.assets

import android.content.Context
import android.content.SharedPreferences

object AppPreferences {
    private const val NAME              = "MuestraMaestra"
    private const val MODE              = Context.MODE_PRIVATE
    private lateinit var preferences    : SharedPreferences

    // list of app specific preferences
    private val IS_LOG                  = Pair("is_log", false)
    private val SP_DATA_LOGIN           = Pair("sp_data_login", "")
    private val SP_DATA                 = Pair("sp_data", "")
    private val SP_JSON_SAVED           = Pair("sp_json_saved", "")
    private val SP_PLACE_SAVED          = Pair("sp_place_saved", "")
    private val SP_SPT_NO_PLACE         = Pair("sp_spt_no_place", "")

    fun init(context: Context) {
        preferences = context.getSharedPreferences(NAME, MODE)
    }

    /**
     * SharedPreferences extension function, so we won't need to call edit() and apply()
     * ourselves on every SharedPreferences operation.
     */
    private inline fun SharedPreferences.edit(operation: (SharedPreferences.Editor) -> Unit) {
        val editor = edit()
        operation(editor)
        editor.apply()
    }

    var spSptNoPlace:String
        get() = preferences.getString(SP_SPT_NO_PLACE.first, SP_SPT_NO_PLACE.second)
        set(value) = preferences.edit {
            it.putString(SP_SPT_NO_PLACE.first, value)
        }


    var spPlaceVisited:String
        get() = preferences.getString(SP_PLACE_SAVED.first, SP_PLACE_SAVED.second)
        set(value) = preferences.edit {
            it.putString(SP_PLACE_SAVED.first, value)
        }

    var spDataLogin:String
        get() = preferences.getString(SP_DATA_LOGIN.first, SP_DATA_LOGIN.second)
        set(value) = preferences.edit {
            it.putString(SP_DATA_LOGIN.first, value)
        }

    var spData:String
        get() = preferences.getString(SP_DATA.first, SP_DATA.second)
        set(value) = preferences.edit {
            it.putString(SP_DATA.first, value)
        }


    var isLog: Boolean
        get() = preferences.getBoolean(IS_LOG.first, IS_LOG.second)
        set(value) = preferences.edit {
            it.putBoolean(IS_LOG.first, value)
        }
    
    var spJsonSaved:String
        get() = preferences.getString(SP_JSON_SAVED.first, SP_JSON_SAVED.second)
        set(value) = preferences.edit {
            it.putString(SP_JSON_SAVED.first, value)
        }

}