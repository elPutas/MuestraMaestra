package com.linktic.situr.sections

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.adapters.RecyclerAdapter
import com.linktic.situr.adapters.RecyclerAdapterSearch

class SearchActivity : BaseActivity() {

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)

        setTable(BaseActivity.visited_places.toString())


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


        val linearLayoutManager = LinearLayoutManager(this)

        val adapter = RecyclerAdapterSearch(arrNamePlaces, this)
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
