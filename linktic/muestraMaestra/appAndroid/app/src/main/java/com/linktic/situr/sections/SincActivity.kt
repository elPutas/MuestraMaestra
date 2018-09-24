package com.linktic.situr.sections

import android.content.Intent
import android.os.Bundle
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.View
import android.widget.ImageView
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.adapters.RecyclerAdapter

import kotlinx.android.synthetic.main.activity_sinc.*

class SincActivity : BaseActivity()
{
    private var linearLayoutManager:LinearLayoutManager? = null

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sinc)

        setTable(visited_places.toString())


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
        var _arr = _str.split(",")
        var _arrlist:ArrayList<String> = ArrayList()

        for (i in 0 until _arr.size)
        {
            _arrlist.add("RNT: "+_arr[i])

        }


        linearLayoutManager = LinearLayoutManager(this)
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView) as RecyclerView
        recyclerView.layoutManager = linearLayoutManager

        recyclerView.adapter = RecyclerAdapter(_arrlist, this)

    }

}
