package com.linktic.situr.adapters

import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.sections.MapsActivity

/**
 * Created by Gio on 13/06/18.
 */
class RecyclerAdapter(val _names:ArrayList<String>, val context: Context) : RecyclerView.Adapter<RecyclerAdapter.MyHolder>()
{
    override fun onBindViewHolder(holder: MyHolder, position: Int)
    {
        holder.name_txt?.text = _names.get(position)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerAdapter.MyHolder
    {
        return MyHolder(LayoutInflater.from(context).inflate(R.layout.item_custom, parent, false))
    }


    override fun getItemCount(): Int {
        return _names.size
    }


    class MyHolder(v: View): RecyclerView.ViewHolder(v), View.OnClickListener
    {
        val name_txt = v.findViewById<TextView>(R.id.name_txt)


        init {
            v.setOnClickListener(this)
        }

        @Suppress("DEPRECATION")
        override fun onClick(_view: View?) {
            BaseActivity.numBlock = this.position
            var i = Intent(_view!!.context, MapsActivity::class.java)
            i.putExtra("key", "gotoBlock")
            _view!!.context.startActivity(i)
        }

        companion object {
            private val NUM = "num"
        }

    }
}