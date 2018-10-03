package com.linktic.situr.sections

import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import com.beust.klaxon.JsonArray
import com.beust.klaxon.Parser
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.adapters.RecyclerAdapterSearch
import com.linktic.situr.assets.AppPreferences
import okhttp3.*
import java.io.IOException

class PSTNoPlaceActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_pstno_place)


        val btn_back = findViewById<ImageView>(R.id.btn_back)
        val onClickListener : View.OnClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.btn_back -> gotoBack()
            }
        }

        btn_back.setOnClickListener( onClickListener )


        start(path + servicePSTNoPlace + idUser)

    }

    //START
    private fun start(_url:String)
    {

        val request = Request.Builder()
                .url(_url)
                .build()

        //val loading = findViewById<ProgressBar>(R.id.loading)
        //loading.visibility = View.VISIBLE

        if(AppPreferences.spSptNoPlace == "")
        {
            val client = OkHttpClient()
            client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException)
                {
                    runOnUiThread {

                    }
                    println(e)
                    // loading.visibility = View.GONE
                }
                override fun onResponse(call: Call?, response: Response)
                {
                    if (!response.isSuccessful) {
                        //loading.visibility = View.GONE
                        System.err.println("Response not successful")
                        return
                    }

                    val json = response.body()!!.string()
                    runOnUiThread {
                        setTable(json)
                    }
                }
            })
        }
        else{
            setTable(AppPreferences.spSptNoPlace)
        }
    }


    private fun gotoBack()
    {
        finish()
    }

    private fun setTable(_str:String)
    {
        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonArray<*>


        val linearLayoutManager = LinearLayoutManager(this)

        val adapter = RecyclerAdapterSearch(arrNamePlaces, arrUpdateAll, arrPlaceLatAll, arrPlaceLonAll, this)
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView)
        recyclerView.layoutManager = linearLayoutManager

        recyclerView.adapter = adapter


        val search_txt : EditText = findViewById(R.id.search_txt)
        search_txt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

            }

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                //SEARCH FILTER
                adapter.filter(charSequence.toString())
            }

            override fun afterTextChanged(editable: Editable) {

            }
        })

    }
}