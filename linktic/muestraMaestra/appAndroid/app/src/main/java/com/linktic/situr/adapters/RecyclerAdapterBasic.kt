package com.linktic.situr.adapters

import android.content.Context
import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.sections.FormActivity
import java.util.*
import kotlin.collections.ArrayList

/**
 * Created by Gio on 13/06/18.
 */
class RecyclerAdapterBasic(
        val _names:ArrayList<String>,
        val _rnts:ArrayList<String>,
        val _ids:ArrayList<String>,
        val _address:ArrayList<String>,
        val _cats:ArrayList<String>,
        val _subcats:ArrayList<String>,
        val _cities:ArrayList<String>,
        val _states:ArrayList<String>,
        val _status:ArrayList<String>,

        val _context: Context) : RecyclerView.Adapter<RecyclerAdapterBasic.MyHolder>()
{
    
    //Passing Values to Local Variables

    var arrNames    = _names
    var arrRnts     = _rnts
    var arrIds      = _ids
    var arrAddress  = _address
    var arrCat      = _cats
    var arrSubcat   = _subcats
    var arrCities   = _cities
    var arrState    = _states
    var arrStatus   = _status
    var context     = _context

    //Store image and arraylist in Temp Array List we Required it later
    var tempName    = ArrayList(arrNames)
    var tempRnt     = ArrayList(arrRnts)
    var tempId      = ArrayList(arrIds)
    var tempAddress = ArrayList(arrAddress)
    var tempCat     = ArrayList(arrCat)
    var tempSubcat = ArrayList(arrSubcat)
    var tempCity = ArrayList(arrCities)
    var tempState = ArrayList(arrState)
    var tempStatus = ArrayList(arrStatus)



    override fun onBindViewHolder(holder: MyHolder, position: Int)
    {
        val idNum = _ids.get(position) as Int
        holder._nameSelected    = _names.get(position)
        holder._rntSelected     = _rnts.get(position)
        holder._idSelected      = idNum.toString()
        holder._addressSelected = _address.get(position)
        holder._catSelected     = _cats.get(position)
        holder._subcatSelected  = _subcats.get(position)
        holder._citySelected    = _cities.get(position)
        holder._stateSelected   = _states.get(position)
        holder._statusSelected  = _status.get(position)

        holder.name_txt?.text = holder._nameSelected


        var _visited = false
        for (j in 0 until BaseActivity.visited_places.size)
        {
            if(idNum.toString()== BaseActivity.visited_places[j])
                _visited = true
        }

        if(_visited)
            holder.icon_place?.setImageResource(R.drawable.ic_place_blue)
        else
            holder.icon_place?.setImageResource(R.drawable.ic_place_red)



    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerAdapterBasic.MyHolder
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
        _rnts.clear()
        _ids.clear()
        _address.clear()
        _cats.clear()
        _subcats.clear()
        _cities.clear()
        _states.clear()
        _status.clear()


        if (text.length == 0) {

            /*If Search query is Empty than we add all temp data into our main ArrayList

            We store Value in temp in Starting of Program.

            */

            _names.addAll(tempName)
            _rnts.addAll(tempRnt)
            _ids.addAll(tempId)
            _address.addAll(tempAddress)
            _cats.addAll(tempCat)
            _subcats.addAll(tempSubcat)
            _cities.addAll(tempCity)
            _states.addAll(tempState)
            _status.addAll(tempStatus)



        } else {


            for (i in 0..tempName.size - 1) {

                /*
                If our Search query is not empty than we Check Our search keyword in Temp ArrayList.
                if our Search Keyword in Temp ArrayList than we add to our Main ArrayList
                */

                if (tempName.get(i)!!.toLowerCase(Locale.getDefault()).contains(text)) {

                    arrNames.add(tempName.get(i))
                    arrRnts.add(tempRnt.get(i))
                    arrIds.add(tempId.get(i))
                    arrAddress.add(tempAddress.get(i))
                    arrCat.add(tempCat.get(i))
                    arrSubcat.add(tempSubcat.get(i))
                    arrCities.add(tempCity.get(i))
                    arrState.add(tempState.get(i))
                    arrStatus.add(tempStatus.get(i))

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

        var _nameSelected   :String = ""
        var _rntSelected    :String = ""
        var _idSelected     :String = ""
        var _addressSelected:String = ""
        var _catSelected    :String = ""
        var _subcatSelected :String = ""
        var _citySelected   :String = ""
        var _stateSelected  :String = ""
        var _statusSelected :String = ""

        init {
            v.setOnClickListener(this)
        }


        override fun onClick(_view: View?)
        {
            BaseActivity.updateSelected     = "0"
            BaseActivity.nameSelected       = _nameSelected
            BaseActivity.rntSelected        = _rntSelected
            BaseActivity.idSelected         = _idSelected
            BaseActivity.addressSelected    = _addressSelected
            BaseActivity.catSelected        = _catSelected
            BaseActivity.subCatSelected     = _subcatSelected
            BaseActivity.citySelected       = _citySelected
            BaseActivity.stateSelected      = _stateSelected
            BaseActivity.statusSelected     = _statusSelected

            //BaseActivity.numBlock = this.position
            var i = Intent(_view!!.context, FormActivity::class.java)
            i.putExtra("isNew", false)

            _view!!.context.startActivity(i)
        }

        companion object {
            private val NUM = "num"
        }

    }
}