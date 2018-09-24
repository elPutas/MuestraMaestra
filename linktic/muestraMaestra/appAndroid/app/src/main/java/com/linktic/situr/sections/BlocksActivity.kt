package com.linktic.situr.sections

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.View
import android.widget.ImageView
import android.widget.ProgressBar
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.google.android.gms.maps.MapView
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.adapters.RecyclerAdapter
import okhttp3.*
import java.io.IOException

class BlocksActivity : BaseActivity()
{

    private var linearLayoutManager:LinearLayoutManager? = null
    private val client = OkHttpClient()



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_blocks)

        //start("http://beta.citur.linktic.com/api/bibliotecaapi/poligonos/"+idUser)
        setTable(jsonStr)


        val btn_back = findViewById<ImageView>(R.id.btn_back)
        val onClickListener : View.OnClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.btn_back -> gotoBack()
            }
        }

        btn_back.setOnClickListener( onClickListener )

    }

    private fun gotoBack()
    {
        val i = Intent(this, MapsActivity::class.java)
        startActivity(i)
        finish()
    }



    private fun setTable(_str:String)
    {
        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonArray<*>


        val _arrNames:ArrayList<String> = ArrayList()

        for (i in 0 until json.size)
        {
            var _id:Int = ((json[i] as JsonObject).map["poligono"] as JsonObject).get("id") as Int

            _arrNames.add("Bloque " + _id.toString())
        }

        linearLayoutManager = LinearLayoutManager(this)
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView) as RecyclerView
        recyclerView.layoutManager = linearLayoutManager

        recyclerView.adapter = RecyclerAdapter(_arrNames, this)

    }
}
