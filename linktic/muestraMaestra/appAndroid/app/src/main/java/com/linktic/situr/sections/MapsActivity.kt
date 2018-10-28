package com.linktic.situr.sections

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import android.support.v4.widget.DrawerLayout
import android.util.Log
import android.view.Gravity
import android.view.View
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.*

import com.linktic.situr.R
import com.linktic.situr.BaseActivity
import okhttp3.*
import java.io.IOException
import android.content.SharedPreferences
import com.google.gson.Gson
import android.content.pm.PackageManager
import android.os.Build
import android.os.Looper
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.widget.*
import com.google.android.gms.location.*
import com.linktic.situr.assets.AppPreferences
import com.linktic.situr.utils.InternetCheck


open class MapsActivity : BaseActivity(), OnMapReadyCallback, GoogleMap.OnMarkerClickListener
{

    protected var mLocationRequest  : LocationRequest? = null
    protected val UPDATE_INTERVAL   = (10 * 1000).toLong()  /* 10 secs */
    protected val FASTEST_INTERVAL  : Long = 2000 /* 2 sec */



    protected  lateinit var mMap    : GoogleMap
    lateinit var myDrawer           : DrawerLayout

    var savedIS                     :Bundle? = null

    private var arrPoly             :ArrayList<String> = ArrayList()
    private var arrPlaceLat         :ArrayList<String> = ArrayList()
    private var arrPlaceLon         :ArrayList<String> = ArrayList()

    private var locationManager     : LocationManager? = null
    private var mPrefs              :SharedPreferences? = null

    private var isGoto              :Boolean = false
    private var gotoWhere           :String = ""

    protected var isCameraFollow    :Boolean = true

    protected var myMarkPos         :MarkerOptions = MarkerOptions()
    protected var mrk               :Marker? = null

    private var _new                = 0
    private var _new2               = 1

    private var numNoPlace          = 0
    private var jsonToShowBlue      :JsonArray<String>? = null

    private var numTotal            = 0
    private var numDone             = 0
    private var numLeft             = 0





    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_maps)
        savedIS = savedInstanceState
        myDrawer = findViewById(R.id.drawer_container)

        AppPreferences.init(this)
        mPrefs = getPreferences(Context.MODE_PRIVATE)


        //check internet
        InternetCheck(object : InternetCheck.Consumer
        {
            override fun accept(internet: Boolean?)
            {
                isModeOnline = internet!!
            }
        })



        val user_txt = findViewById (R.id.user_txt) as TextView


        val btn_menu = findViewById(R.id.btn_menu) as ImageView
        val btn_new = findViewById<ImageView>(R.id.btn_new)
        val btn_logout = findViewById<LinearLayout>(R.id.btn_logout)
        val btn_blocks = findViewById<LinearLayout>(R.id.btn_blocks)
        val btn_sinc = findViewById<LinearLayout>(R.id.btn_sinc)
        val btn_search = findViewById<LinearLayout>(R.id.btn_search)
        val btn_pstNoPlace = findViewById<LinearLayout>(R.id.btn_pstNoPlace)

        val user_txt_menu = findViewById<TextView>(R.id.user_txt_menu)

        //println("idUser: $idUser")


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
                R.id.btn_search -> openSearch()
                R.id.btn_pstNoPlace -> openPSTNoPlace()
            }
        }

        user_txt.text = fullnameUser
        user_txt_menu.text = fullnameUser

        user_txt.setOnClickListener(onClickListener)
        btn_menu.setOnClickListener(onClickListener)
        btn_new.setOnClickListener(onClickListener)
        btn_logout.setOnClickListener(onClickListener)
        btn_blocks.setOnClickListener(onClickListener)
        btn_sinc.setOnClickListener(onClickListener)
        btn_search.setOnClickListener(onClickListener)
        btn_pstNoPlace.setOnClickListener(onClickListener)

        // Create persistent LocationManager reference
        locationManager = getSystemService(LOCATION_SERVICE) as LocationManager?;
            try {
                // Request location updates
                locationManager?.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0L, 0f, locationListener);
            } catch(e: SecurityException) {
                Log.d(TAG, "Security Exception, no location available");
            }




        //MY POS OR BLOCK
        isGoto = intent.hasExtra("key")
        if(isGoto)
            gotoWhere = intent.getStringExtra("key")



        //MODE
        if(isModeOnline)
        {
            checkNoPlacePST(path + servicePSTNoPlace + idUser) // call no place service
            start(path + serviceMaps + idUser) //call map service
        }
        else{
            if(AppPreferences.spSptNoPlace != "")
                getNoPlace(AppPreferences.spSptNoPlace)
            setMap(AppPreferences.spData)
        }

    }





    //GET NO PLACE SPT JUST FOR PERCENT VALUE
    private fun checkNoPlacePST(_url:String)
    {
        val request = Request.Builder()
                .url(_url)
                .build()

            val client = OkHttpClient()
            client.newCall(request).enqueue(object : Callback
            {
                override fun onFailure(call: Call, e: IOException)
                {
                    println(e)
                }
                override fun onResponse(call: Call?, response: Response)
                {
                    if (!response.isSuccessful) {
                        System.err.println("Response not successful")
                        return
                    }

                    val json = response.body()!!.string()
                    runOnUiThread {
                        getNoPlace(json)
                    }
                }
            })

    }

    private fun getNoPlace(_str:String)
    {

        AppPreferences.spSptNoPlace = _str
        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonArray<*>
        numNoPlace = json["prestadores"].size

        numTotal += numNoPlace
    }





    //MAP READY
    override fun onMapReady(googleMap: GoogleMap)
    {
        mMap = googleMap

        mMap.setOnMarkerClickListener(this)

        startLocationUpdates()


        // SET SERVICE POINTS INTO THE MAP
        for (i in 0 until arrPlaceLatAll.size)
        {
            if(arrPlaceLatAll[i]!="")
            {
                val _lat = arrPlaceLatAll[i].toDouble()
                val _lon = arrPlaceLonAll[i].toDouble()
                val pl = LatLng(_lat, _lon)
                val _title = arrNamePlaces[i]


                var _icon = R.drawable.ic_place_black_sm

                if(visited_places.isEmpty())
                {
                    if(arrUpdateAll[i]=="1")
                        _icon = R.drawable.ic_place_green_sm
                }

                var _visited = false
                for (j in 0 until visited_places.size)
                {
                    if(arrIdsAll[i].toString() == visited_places[j].toString().replace(" ",""))
                        _visited = true
                }

                if(arrUpdateAll[i]=="1")
                {
                    _icon = R.drawable.ic_place_green_sm
                }

                else
                {
                    _icon = R.drawable.ic_place_black_sm

                    if(_visited)
                        _icon = R.drawable.ic_place_blue_sm_alpha

                }

                mMap.addMarker(MarkerOptions().icon(BitmapDescriptorFactory.fromResource(_icon)).position(pl).title(_title).snippet(arrNamePlaces[i]+"|"+i.toString()+"|"+_visited.toString() ))

            }

        }



        //SET POLY
        val po = PolylineOptions()

        for(i in 0 until arrPoly.size/2)
        {
            po.add(LatLng(arrPoly[_new].toDouble(), arrPoly[_new2].toDouble()))
            //_arrPos.add(LatLng(arrPoly[i].toDouble(), arrPoly[i+1].toDouble()))
            _new = _new2+1
            _new2 = _new+1

            _new %= arrPoly.size-1
            _new2 %= arrPoly.size
        }

        if(arrPoly.size>1)
            po.add(LatLng(arrPoly[0].toDouble(), arrPoly[1].toDouble()))



        po.color(Color.BLACK).width(5f)
        mMap.addPolyline(po)




        //SET CAMERA POSITION
        var cameraPosition:CameraPosition

        if(isGoto)
        {
            isCameraFollow = false

            if(gotoWhere == "gotoBlock" )
            {
                if(arrPlaceLat.size > 0)
                    cameraPosition = CameraPosition.Builder()
                            .target(LatLng(arrPlaceLat[0].toDouble(), arrPlaceLon[0].toDouble()))      // Sets the center of the map to location user
                            //.target(LatLng(myLat, myLon))
                            .zoom(14f)
                            .build()
                else
                    cameraPosition = CameraPosition.Builder()
                            //.target(LatLng(arrPlaceLat[0].toDouble(), arrPlaceLon[0].toDouble()))      // Sets the center of the map to location user
                            .target(LatLng(myLat, myLon))
                            .zoom(16f)
                            .build()

            }else{
                val gotoPlaceLat = intent.getStringExtra("lat")
                val gotoPlaceLon = intent.getStringExtra("lon")

                cameraPosition = CameraPosition.Builder()
                        .target(LatLng(gotoPlaceLat.toDouble(), gotoPlaceLon.toDouble()))      // Sets the center of the map to location user
                        //.target(LatLng(myLat, myLon))
                        .zoom(16f)
                        .build()
            }

        }
        else
        {
            cameraPosition = CameraPosition.Builder()
                    //.target(LatLng(arrPlaceLat[0].toDouble(), arrPlaceLon[0].toDouble()))      // Sets the center of the map to location user
                    .target(LatLng(myLat, myLon))
                    .zoom(16f)
                    .build()
        }

        //SET BLUE PST
        offLinePST()

        mMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
    }


    //set blue points into the map
    private fun offLinePST()
    {
        if(AppPreferences.spJsonSaved != "")
        {
            val totalString = AppPreferences.spJsonSaved.split("|") as ArrayList<String>
            val totalToSave = totalString.size-1

            val jsonString = StringBuilder("[" + AppPreferences.spJsonSaved.replace("|", ",").substring(0, AppPreferences.spJsonSaved.length-1) + "]")

            val parser = Parser()
            val json = parser.parse(jsonString) as JsonArray<String>




            jsonToShowBlue = json


            val _arrLats    = json["latitud"]
            val _arrLons    = json["longitud"]
            val _arrName    = json["nombre"]

            for (i in 0 until totalToSave)
            {

                val _lat = _arrLats[i].toString().toDouble()
                val _lon = _arrLons[i].toString().toDouble()
                val pl = LatLng(_lat, _lon)
                val _title = _arrName[i].toString()

                mMap.addMarker(MarkerOptions().icon(BitmapDescriptorFactory.fromResource(R.drawable.ic_place_blue_sm)).position(pl).title(_title).snippet(_title+"|"+i.toString() ))
            }
        }
    }





    //MARKER CLICK
    override fun onMarkerClick(_mark: Marker?):Boolean
    {
        //check is a PST or my location
        if(_mark?.snippet != null)
        {

            var _arr:ArrayList<String> =  _mark?.snippet.split("|") as ArrayList<String>

            val num:Int = _arr[1].toInt()
            var idToString = ""
            if(arrIdsAll.size > num)
                idToString = arrIdsAll[num].toString()

            var isToUpdate = false


            var jsonSavedToShow: JsonObject? = null

            if(_arr.size == 2)
            {
                val _arrState   = jsonToShowBlue!!["departamento"]
                val _arrStatus  = jsonToShowBlue!!["estado"]
                val _arrCity    = jsonToShowBlue!!["ciudad"]
                val _arrAddress = jsonToShowBlue!!["direccion"]
                val _arrId      = jsonToShowBlue!!["idanterior"]
                val _arrName    = jsonToShowBlue!!["nombre"]
                val _arrCat     = jsonToShowBlue!!["categoria"]
                val _arrSubCat  = jsonToShowBlue!!["subcategoria"]
                val _arrNews    = jsonToShowBlue!!["novedad"]
                val _arrRnt     = jsonToShowBlue!!["rnt"]
                val _arrImg     = jsonToShowBlue!!["foto"]

                rntSelected     = _arrRnt[num].toString()
                stateSelected   = _arrState[num].toString()
                citySelected    = _arrCity[num].toString()
                addressSelected = _arrAddress[num].toString()
                statusSelected  = _arrStatus[num].toString()
                nameSelected    = _arrName[num].toString()
                idSelected      = _arrId[num].toString()
                imgSelected     = _arrImg[num].toString()
                updateSelected  = "1"
                catSelected     = _arrCat[num].toString()
                subCatSelected  = _arrSubCat[num].toString()
                newsSelected    = _arrNews[num].toString()

            }else{
                //is a PST to update?
                if(_arr[2] == "true")
                {
                    if(AppPreferences.spJsonSaved != "")
                    {
                        val totalString = AppPreferences.spJsonSaved.split("|") as ArrayList<String>
                        val totalToSave = totalString.size


                        for (i in 0 until totalToSave-1)
                        {
                            val _contains = arrIdsAll[num].toString()
                            val _strJsonSaved = totalString[i].toString()
                            val isBlue = _strJsonSaved.contains(_contains)
                            isToUpdate = isBlue

                            if(isToUpdate)
                            {
                                val jsonString = StringBuilder(_strJsonSaved)

                                val parser = Parser()
                                val json = parser.parse(jsonString) as JsonObject
                                jsonSavedToShow = json
                            }


                        }


                    }
                }

                if(isToUpdate)
                {
                    rntSelected     = jsonSavedToShow!!["rnt"].toString()
                    stateSelected   = jsonSavedToShow!!["departamento"].toString()
                    citySelected    = jsonSavedToShow!!["ciudad"].toString()
                    addressSelected = jsonSavedToShow!!["direccion"].toString()
                    statusSelected  = jsonSavedToShow!!["estado"].toString()
                    nameSelected    = jsonSavedToShow!!["nombre"].toString()
                    idSelected      = jsonSavedToShow!!["idanterior"].toString()
                    imgSelected     = jsonSavedToShow!!["foto"].toString()
                    updateSelected  = "1"
                    catSelected     = jsonSavedToShow["categoria"].toString()
                    subCatSelected  = jsonSavedToShow["subcategoria"].toString()
                    newsSelected    = jsonSavedToShow["novedad"].toString()
                }else{
                    rntSelected     = arrRntsAll[num]
                    stateSelected   = arrStateAll[num]
                    citySelected    = arrCityAll[num]
                    addressSelected = arrAddresAll[num]
                    statusSelected  = arrStatusAll[num]
                    nameSelected    = arrNamesAll[num]
                    idSelected      = idToString.toString()
                    imgSelected     = arrImgAll[num]
                    updateSelected  = arrUpdateAll[num]
                    catSelected     = arrCatAll[num]
                    subCatSelected  = arrSubCatAll[num]
                    newsSelected    = arrNewsAll[num]
                }
            }



            //goto form
            val i = Intent(this, FormActivity::class.java)
            i.putExtra("isNew", false)
            startActivity(i)
            finish()
        }


        return false
    }



    //START
    private fun start(_url:String)
    {

        val request = Request.Builder()
                .url(_url)
                .build()

        //val loading = findViewById<ProgressBar>(R.id.loading)
        //loading.visibility = View.VISIBLE

        if(isModeOnline)
        {
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
                    }

                    val json = response.body()!!.string()
                    runOnUiThread {
                        setMap(json)
                    }
                }
            })
        }else{
            setMap(AppPreferences.spData)
        }
    }

    private fun callJustMap()
    {
        //map
        val mapFragment = findViewById<MapView>(R.id.map)
        mapFragment.onCreate(savedIS)
        mapFragment.onResume()
        mapFragment.getMapAsync(this)

        setMap(AppPreferences.spData)
    }




    private fun setMap(_str:String)
    {


        if(_str!="")
        {
            jsonStr = _str
            AppPreferences.spData = _str

            val jsonString = StringBuilder(_str)

            val parser = Parser()
            val json = parser.parse(jsonString) as JsonArray<*>

            //save json in sharedPreference
            /*
            val prefsEditor = mPrefs?.edit()
            val gson = Gson()
            val jsonSave = gson.toJson(json)
            prefsEditor?.putString("MyObject", jsonSave)
            prefsEditor?.commit()
            */

            if(json.size > 0)
            {
                var _strPoly:String = ((json[numBlock] as JsonObject).map["poligono"] as JsonObject).get("geometry") as String
                _strPoly = _strPoly.replace("[","")
                _strPoly = _strPoly.replace("]","")

                arrPoly = _strPoly.split(",") as ArrayList<String>
            }


            if(json["prestadores"].size > 0 && (json["prestadores"][0] as JsonArray<*>).size > 0)
            {

                arrPlaceLatAll  = ArrayList(json["prestadores"].get("LATITUD")) as ArrayList<String>
                arrPlaceLonAll  = ArrayList(json["prestadores"].get("LONGITUD")) as ArrayList<String>
                arrRntsAll      = ArrayList(json["prestadores"].get("rnt")) as ArrayList<String>
                arrAddresAll    = ArrayList(json["prestadores"].get("direccion")) as ArrayList<String>
                arrCityAll      = ArrayList(json["prestadores"].get("ciudad")) as ArrayList<String>
                arrStateAll     = ArrayList(json["prestadores"].get("departamento")) as ArrayList<String>
                arrStatusAll    = ArrayList(json["prestadores"].get("estado")) as ArrayList<String>
                arrIdsAll       = ArrayList(json["prestadores"].get("id")) as ArrayList<Int>
                arrImgAll       = ArrayList(json["prestadores"].get("foto")) as ArrayList<String>
                arrUpdateAll    = ArrayList(json["prestadores"].get("actualizado")) as ArrayList<String>
                arrCatAll       = ArrayList(json["prestadores"].get("categoria")) as ArrayList<String>
                arrSubCatAll    = ArrayList(json["prestadores"].get("subcategoria")) as ArrayList<String>
                arrNewsAll      = ArrayList(json["prestadores"].get("novedad")) as ArrayList<String>



                numDone += json["prestadores"].get("actualizado").filter { s -> s == "1" }.size
                numTotal += json["prestadores"].get("actualizado").toList().size
                //numTotal += json["prestadores"].get("actualizado").filter { s -> s == "0" }.size





                arrPlaceLat = ((json[numBlock] as JsonObject).map["prestadores"] as JsonArray<*>).get("LATITUD").value as ArrayList<String>
                arrPlaceLon = ((json[numBlock] as JsonObject).map["prestadores"] as JsonArray<*>).get("LONGITUD").value as ArrayList<String>


                //array to search by names
                val _temparr = json["prestadores"]["nombre"]
                arrNamePlaces = ArrayList(_temparr) as ArrayList<String>
                arrNamesAll = arrNamePlaces
            }
        }

        if(AppPreferences.spJsonSaved!="")
        {


            val totalString = AppPreferences.spJsonSaved.split("|") as ArrayList<String>
            val totalToSave = totalString.size -1

            val jsonString = StringBuilder(totalString.toString())

            val parser = Parser()
            val json = parser.parse(jsonString) as JsonArray<*>

            // plus to Sinc forms
            numDone += totalToSave
            numTotal += json["idanterior"].filter { s -> s == "" }.size
            numLeft += json["idanterior"].filter { s -> s == "" }.size
        }

        //plus no place PST
        numLeft += numNoPlace

        if( numTotal > 0)
        {
            formsDone = ((numDone/numTotal.toDouble()) * 100)
            formsLeft = (formsDone - 100) *-1

            if(formsLeft == -0.00)
                formsLeft = 0.00
        }

        //show percent
        val done_percent = findViewById<TextView>(R.id.done_percent)
        val left_percent = findViewById<TextView>(R.id.left_percent)

        left_percent.text = "%.2f".format(formsLeft) + "%"
        done_percent.text = "%.2f".format(formsDone) + "%"

        //map
        val mapFragment = findViewById<MapView>(R.id.map)
        mapFragment.onCreate(savedIS)
        mapFragment.onResume()
        mapFragment.getMapAsync(this)
    }


    //OPEN'S

    private fun openSearch()
    {
        val i = Intent(this, SearchActivity::class.java)
        startActivity(i)
    }

    private fun openLogout()
    {

        AppPreferences.spData = ""
        AppPreferences.spDataLogin = ""
        AppPreferences.isLog = false
        AppPreferences.spJsonSaved = ""
        AppPreferences.spPlaceVisited = ""
        AppPreferences.spSptNoPlace = ""

        val settings = this.getSharedPreferences("MuestraMaestra", Context.MODE_PRIVATE)
        settings.edit().clear().commit()


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

    private fun openPSTNoPlace()
    {
        val i = Intent(this, PSTNoPlaceActivity::class.java)
        startActivity(i)

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
        i.putExtra("isNew", true)

        startActivity(i)
    }








    //define the listener location
    val locationListener: LocationListener = object : LocationListener {
        override fun onLocationChanged(location: Location) {
            //thetext.setText("" + location.longitude + ":" + location.latitude);
            myLat = location.latitude
            myLon = location.longitude
        }
        override fun onStatusChanged(provider: String, status: Int, extras: Bundle) {}
        override fun onProviderEnabled(provider: String) {}
        override fun onProviderDisabled(provider: String) {}
    }


    fun startLocationUpdates() {
        // initialize location request object
        mLocationRequest = LocationRequest.create()
        mLocationRequest!!.run {
            setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY)
            setInterval(UPDATE_INTERVAL)
            setFastestInterval(FASTEST_INTERVAL)
        }

        // initialize location setting request builder object
        val builder = LocationSettingsRequest.Builder()
        builder.addLocationRequest(mLocationRequest!!)
        val locationSettingsRequest = builder.build()

        // initialize location service object
        val settingsClient = LocationServices.getSettingsClient(this)
        settingsClient!!.checkLocationSettings(locationSettingsRequest)

        // call register location listener
        registerLocationListner()
    }

    private fun registerLocationListner() {
        // initialize location callback object
        val locationCallback = object : LocationCallback()
        {
            override fun onLocationResult(locationResult: LocationResult?) {
                onLocationChanged(locationResult!!.getLastLocation())
            }
        }
        // add permission if android version is greater then 23
        if(Build.VERSION.SDK_INT >= 23 && checkPermission()) {
            LocationServices.getFusedLocationProviderClient(this).requestLocationUpdates(mLocationRequest, locationCallback, Looper.myLooper())
        }
    }


    private fun onLocationChanged(location: Location) {
        // create message for toast with updated latitude and longitudefa
        var msg = "Updated Location: " + location.latitude  + " , " +location.longitude
        //Toast.makeText(this,msg, Toast.LENGTH_LONG).show()
        val location = LatLng(location.latitude, location.longitude)

        myMarkPos.position(location)



        if(mMap != null)
        {
            if(isCameraFollow)
            {

                val cameraPosition = CameraPosition.Builder()
                        //.target(LatLng(arrPlaceLat[0].toDouble(), arrPlaceLon[0].toDouble()))      // Sets the center of the map to location user
                        .target(location)
                        .zoom(16f)
                        .build()
                mMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
                isCameraFollow = false
            }

            if(mrk != null)
                mrk!!.remove()
            mrk = mMap.addMarker(myMarkPos)
        }
    }

    private fun checkPermission() : Boolean {
        if (ContextCompat.checkSelfPermission(this , android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            return true
        } else {
            requestPermissions()
            return false
        }
    }
    private fun requestPermissions() {
        ActivityCompat.requestPermissions(this, arrayOf("Manifest.permission.ACCESS_FINE_LOCATION"),1)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if(requestCode == 1) {
            if (permissions[0] == android.Manifest.permission.ACCESS_FINE_LOCATION ) {
                registerLocationListner()
            }
        }
    }
}
