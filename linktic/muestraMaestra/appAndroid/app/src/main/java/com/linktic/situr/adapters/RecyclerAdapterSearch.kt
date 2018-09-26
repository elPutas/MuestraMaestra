package com.linktic.situr.adapters

import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.sections.MapsActivity
import java.util.*

/**
 * Created by Gio on 13/06/18.
 */
class RecyclerAdapterSearch(val _names:ArrayList<String>, val _update:ArrayList<String>, val _context: Context) : RecyclerView.Adapter<RecyclerAdapterSearch.MyHolder>()
{
    //Passing Values to Local Variables

    var arrayList = _names
    var arrUpdate = _update
    var context = _context

    //Store image and arraylist in Temp Array List we Required it later
    var tempNameList = ArrayList(arrayList)
    var tempUpdateList = ArrayList(arrUpdate)



    override fun onBindViewHolder(holder: MyHolder, position: Int)
    {
        holder.name_txt?.text = _names.get(position)
        if(_update.get(position)=="1")
            holder.icon_place?.setImageResource(R.drawable.ic_place_green)
        else
            holder.icon_place?.setImageResource(R.drawable.ic_place_black)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerAdapterSearch.MyHolder
    {
        return MyHolder(LayoutInflater.from(context).inflate(R.layout.item_custom_places, parent, false))
    }


    override fun getItemCount(): Int {
        return _names.size
    }

    //Function to set data according to Search Keyword in ListView
    fun filter(text: String?) {


        //Our Search text
        val text = text!!.toLowerCase(Locale.getDefault())


        //Here We Clear Both ArrayList because We update according to Search query.
        _names.clear()
        _update.clear()


        if (text.length == 0) {

            /*If Search query is Empty than we add all temp data into our main ArrayList

            We store Value in temp in Starting of Program.

            */

            _names.addAll(tempNameList)
            _update.addAll(tempUpdateList)



        } else {


            for (i in 0..tempNameList.size - 1) {

                /*
                If our Search query is not empty than we Check Our search keyword in Temp ArrayList.
                if our Search Keyword in Temp ArrayList than we add to our Main ArrayList
                */

                if (tempNameList.get(i)!!.toLowerCase(Locale.getDefault()).contains(text)) {

                    arrayList.add(tempNameList.get(i))
                    arrUpdate.add(tempUpdateList.get(i))

                }

            }
        }

        //This is to notify that data change in Adapter and Reflect the changes.
        notifyDataSetChanged()


    }


    class MyHolder(v: View): RecyclerView.ViewHolder(v), View.OnClickListener
    {
        val name_txt = v.findViewById<TextView>(R.id.name_txt)
        val icon_place = v.findViewById<ImageView>(R.id.icon_place)


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