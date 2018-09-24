package com.linktic.situr.sections

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.widget.DrawerLayout
import android.util.Log
import android.view.Gravity
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Klaxon
import com.beust.klaxon.Parser
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.*

import com.linktic.situr.R
import com.linktic.situr.BaseActivity
import okhttp3.*
import java.io.IOException
import android.content.SharedPreferences
import com.google.gson.Gson
import android.R.id.edit






class MapsActivity : BaseActivity(), OnMapReadyCallback, GoogleMap.OnMarkerClickListener {



    private lateinit var mMap: GoogleMap
    lateinit var myDrawer : DrawerLayout

    var savedIS:Bundle? = null

    private var arrPoly:ArrayList<String> = ArrayList()
    private var arrPlaceLat:ArrayList<String> = ArrayList()
    private var arrPlaceLon:ArrayList<String> = ArrayList()
    private var arrNames:ArrayList<String> = ArrayList()
    private var arrRnts:ArrayList<String> = ArrayList()
    private var arrAddres:ArrayList<String> = ArrayList()
    private var arrCity:ArrayList<String> = ArrayList()
    private var arrState:ArrayList<String> = ArrayList()
    private var arrStatus:ArrayList<String> = ArrayList()
    private var arrIds:ArrayList<String> = ArrayList()




    private var locationManager : LocationManager? = null
    private var mPrefs:SharedPreferences? = null


    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)
        savedIS = savedInstanceState
        myDrawer = findViewById(R.id.drawer_container)

        mPrefs = getPreferences(Context.MODE_PRIVATE)

        val user_txt = findViewById (R.id.user_txt) as TextView
        val btn_menu = findViewById(R.id.btn_menu) as ImageView
        val btn_new = findViewById<ImageView>(R.id.btn_new)
        val btn_logout = findViewById<LinearLayout>(R.id.btn_logout)
        val btn_blocks = findViewById<LinearLayout>(R.id.btn_blocks)
        val btn_sinc = findViewById<LinearLayout>(R.id.btn_sinc)

        println("idUser: $idUser")



        //listeners
        val onClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.user_txt -> openMenu()
                R.id.btn_menu -> openMenu()
                R.id.btn_new -> openForm()
                R.id.btn_logout -> openLogout()
                R.id.btn_blocks -> openBlocks()
                R.id.btn_sinc -> openSinc()
            }
        }

        user_txt.text = usernameUser

        user_txt.setOnClickListener(onClickListener)
        btn_menu.setOnClickListener(onClickListener)
        btn_new.setOnClickListener(onClickListener)
        btn_logout.setOnClickListener(onClickListener)
        btn_blocks.setOnClickListener(onClickListener)
        btn_sinc.setOnClickListener(onClickListener)

        // Create persistent LocationManager reference
        locationManager = getSystemService(LOCATION_SERVICE) as LocationManager?;


            try {
                // Request location updates
                locationManager?.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0L, 0f, locationListener);
            } catch(ex: SecurityException) {
                Log.d(TAG, "Security Exception, no location available");
            }

        start("http://beta.citur.linktic.com/api/bibliotecaapi/poligonos/"+idUser)

    }


    //define the listener
    private val locationListener: LocationListener = object : LocationListener {
        override fun onLocationChanged(location: Location) {
            //thetext.setText("" + location.longitude + ":" + location.latitude);
            myLat = location.latitude
            myLon = location.longitude
        }
        override fun onStatusChanged(provider: String, status: Int, extras: Bundle) {}
        override fun onProviderEnabled(provider: String) {}
        override fun onProviderDisabled(provider: String) {}
    }


    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        mMap.setOnMarkerClickListener(this)

        for (i in 0 until arrPlaceLat.size)
        {
            if(arrPlaceLat[i]!="")
            {
                val _lat = arrPlaceLat[i].toDouble()
                val _lon = arrPlaceLon[i].toDouble()
                val pl = LatLng(_lat, _lon)
                val _title = arrNames[i]


                if(visited_places.isEmpty())
                {
                    mMap.addMarker(MarkerOptions().icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_place_black)).position(pl).title(_title).snippet(arrRnts[i]+"|"+arrState[i]+"|"+arrCity[i]+"|"+arrAddres[i]+"|"+arrStatus[i]+"|"+arrNames[i]+"|"+arrIds[i]))
                }
                for (j in 0 until visited_places.size)
                {
                    if(arrRnts[i]== visited_places[j])
                    {

                        mMap.addMarker(MarkerOptions().icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_place_blue)).position(pl).title(_title).snippet(arrRnts[i]+"|"+arrState[i]+"|"+arrCity[i]+"|"+arrAddres[i]+"|"+arrStatus[i]+"|"+arrNames[i]+"|"+arrIds[i]))
                    }else{
                        mMap.addMarker(MarkerOptions().icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_place_black)).position(pl).title(_title).snippet(arrRnts[i]+"|"+arrState[i]+"|"+arrCity[i]+"|"+arrAddres[i]+"|"+arrStatus[i]+"|"+arrNames[i]+"|"+arrIds[i]))
                    }
                }


            }

        }

        val po = PolylineOptions()
                .add(LatLng(arrPoly[0].toDouble(), arrPoly[1].toDouble()))
                .add(LatLng(arrPoly[2].toDouble(), arrPoly[3].toDouble()))
                .add(LatLng(arrPoly[4].toDouble(), arrPoly[5].toDouble()))
                .add(LatLng(arrPoly[6].toDouble(), arrPoly[7].toDouble()))
                .add(LatLng(arrPoly[0].toDouble(), arrPoly[1].toDouble()))

        po.color(Color.BLACK).width(5f)
        mMap.addPolyline(po)



        val cameraPosition = CameraPosition.Builder()
                //.target(LatLng(arrPlaceLat[0].toDouble(), arrPlaceLon[0].toDouble()))      // Sets the center of the map to location user
                .target(LatLng(myLat, myLon))      // Sets the center of the map to location user
                .zoom(16f)                   // Sets the zoom
                //.bearing(90f)                // Sets the orientation of the camera to east
                //.tilt(40f)                   // Sets the tilt of the camera to 30 degrees
                .build()

        mMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
    }

    override fun onMarkerClick(_mark: Marker?):Boolean
    {
        var _arr:ArrayList<String> =  _mark?.snippet.toString().split("|") as ArrayList<String>

        rntSelected = _arr[0]
        stateSelected = _arr[1]
        citySelected = _arr[2]
        addressSelected = _arr[3]
        statusSelected = _arr[4]
        nameSelected = _arr[5]
        idSelected = _arr[6]


        //goto form
        val i = Intent(this, FormActivity::class.java)
        startActivity(i)
        finish()
        println("click $_mark")

        return false
    }



    private fun start(_url:String)
    {

        val request = Request.Builder()
                .url(_url)
                .build()

        //val loading = findViewById<ProgressBar>(R.id.loading)
        //loading.visibility = View.VISIBLE

        val client = OkHttpClient()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                runOnUiThread {
                    callJustMap()
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
                }else{


                }
                val json = response.body()!!.string()
                runOnUiThread {
                    setMap(json)
                }



            }

            //override fun onResponse(call: Call, response: Response) = gotoLog(response)
        })
    }

    private fun callJustMap()
    {
        //map
        val mapFragment = findViewById<MapView>(R.id.map)
        mapFragment.onCreate(savedIS)
        mapFragment.onResume()
        mapFragment.getMapAsync(this)
    }

    private fun setMap(_str:String)
    {
        jsonStr = _str

        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonArray<*>

        var _strPoly:String = ((json[numBlock] as JsonObject).map["poligono"] as JsonObject).get("geometry") as String


        //save json in sharedPreference
        val prefsEditor = mPrefs?.edit()
        val gson = Gson()
        val jsonSave = gson.toJson(json)
        prefsEditor?.putString("MyObject", jsonSave)
        prefsEditor?.commit()



        _strPoly = _strPoly.replace("[","")
        _strPoly = _strPoly.replace("]","")

        arrPoly = _strPoly.split(",") as ArrayList<String>



        val jArrayLat = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("LATITUD")
        val jArrayLon = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("LONGITUD")
        val jArrayName = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("nombre")
        val jArrayRnt = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("rnt")
        val jArrayAddres = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("direccion")
        val jArrayCity = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("ciudad")
        val jArrayState = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("departamento")
        val jArrayStatus = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("estado")
        val jArrayId = ((json[numBlock] as JsonObject).get("prestadores") as JsonArray<*>).get("id")


        for (i in 0 until jArrayLat.size)
        {
            var strPlaceLat:String = jArrayLat[i] as String
            var strPlaceLon:String = jArrayLon[i] as String
            var strPlaceName:String = jArrayName[i] as String
            var strPlaceRnt:String = jArrayRnt[i] as String
            var strPlaceAddress:String = jArrayAddres[i] as String
            var strPlaceCity:String = jArrayCity[i] as String
            var strPlaceState:String = jArrayState[i] as String
            var strPlaceStatus:String = jArrayStatus[i] as String
            var strPlaceId:String = jArrayId[i].toString()

            arrPlaceLat.add(strPlaceLat)
            arrPlaceLon.add(strPlaceLon)
            arrNames.add(strPlaceName)
            arrRnts.add(strPlaceRnt)
            arrAddres.add(strPlaceAddress)
            arrCity.add(strPlaceCity)
            arrState.add(strPlaceState)
            arrStatus.add(strPlaceStatus)
            arrIds.add(strPlaceId)
        }

        //map
        val mapFragment = findViewById<MapView>(R.id.map)
        mapFragment.onCreate(savedIS)
        mapFragment.onResume()
        mapFragment.getMapAsync(this)
    }

    private fun openLogout()
    {
        //goto log
        val i = Intent(this, LoginActivity::class.java)
        startActivity(i)
    }

    private fun openBlocks()
    {
        val i = Intent(this, BlocksActivity::class.java)
        startActivity(i)
        finish()
    }

    private fun openSinc()
    {
        val i = Intent(this, SincActivity::class.java)
        startActivity(i)
        finish()
    }

    private fun openMenu()
    {
        if (myDrawer.isDrawerVisible(Gravity.RIGHT)) {
            myDrawer.closeDrawer(Gravity.RIGHT)
        } else {
            myDrawer.openDrawer(Gravity.RIGHT)
        }
    }

    private fun openForm()
    {
        //goto form
        val i = Intent(this, FormActivity::class.java)
        startActivity(i)
    }
}
