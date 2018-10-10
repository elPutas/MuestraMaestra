package com.linktic.situr.adapters

import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.sections.FormActivity
import com.linktic.situr.sections.MapsActivity

/**
 * Created by Gio on 13/06/18.
 */
class RecyclerAdapterSinc(val _names:ArrayList<String>, val _json:ArrayList<String>, val context: Context) : RecyclerView.Adapter<RecyclerAdapterSinc.MyHolder>()
{
    override fun onBindViewHolder(holder: MyHolder, position: Int)
    {

        val _jsonFinal = _json.get(position)
        val _str = _names.get(position).replace(" ", "")


        val jsonString = StringBuilder(_jsonFinal)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonObject


        holder._nameSelected    = json["nombre"] as String
        holder._rntSelected     = json["rnt"] as String

        holder._addressSelected = json["direccion"] as String
        holder._catSelected     = json["categoria"] as String
        holder._subcatSelected  = json["subcategoria"] as String
        holder._citySelected    = json["ciudad"] as String
        holder._stateSelected   = json["departamento"] as String
        holder._newsSelected    = json["novedad"] as String
        holder._statusSelected  = ""

        holder.name_txt?.text = holder._nameSelected




        if(_str != "ID:")
            holder.name_txt?.text = _str
        else
            holder.name_txt?.text = "Nuevo PST"


    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerAdapterSinc.MyHolder
    {
        return MyHolder(LayoutInflater.from(context).inflate(R.layout.item_custom, parent, false))
    }


    override fun getItemCount(): Int {
        return _names.size
    }


    class MyHolder(v: View): RecyclerView.ViewHolder(v), View.OnClickListener
    {
        val name_txt = v.findViewById<TextView>(R.id.name_txt)

        var _nameSelected   :String = ""
        var _rntSelected    :String = ""
        var _idSelected     :String = ""
        var _addressSelected:String = ""
        var _catSelected    :String = ""
        var _subcatSelected :String = ""
        var _citySelected   :String = ""
        var _stateSelected  :String = ""
        var _statusSelected :String = ""
        var _newsSelected   :String = ""

        init {
            v.setOnClickListener(this)
        }


        override fun onClick(_view: View?)
        {
            BaseActivity.updateSelected     = "1"
            BaseActivity.nameSelected       = _nameSelected
            BaseActivity.rntSelected        = _rntSelected
            BaseActivity.idSelected         = ""
            BaseActivity.addressSelected    = _addressSelected
            BaseActivity.catSelected        = _catSelected
            BaseActivity.subCatSelected     = _subcatSelected
            BaseActivity.citySelected       = _citySelected
            BaseActivity.stateSelected      = _stateSelected
            BaseActivity.statusSelected     = _statusSelected
            BaseActivity.newsSelected       = _newsSelected

            var i = Intent(_view!!.context, FormActivity::class.java)
            i.putExtra("isNew", false)

            _view!!.context.startActivity(i)
        }

        companion object {
            private val NUM = "num"
        }

    }
}