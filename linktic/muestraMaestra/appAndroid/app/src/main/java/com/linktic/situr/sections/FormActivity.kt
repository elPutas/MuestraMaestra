package com.linktic.situr.sections

import android.content.Intent
import android.graphics.Bitmap
import android.media.MediaScannerConnection
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.support.v7.app.AlertDialog
import android.view.View
import android.view.WindowManager
import android.widget.*
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import kotlinx.android.synthetic.main.activity_form.*
import okhttp3.*
import java.io.IOException
import android.widget.AdapterView
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import java.util.*


class FormActivity : BaseActivity(), AdapterView.OnItemSelectedListener
{

    var addresType_arr = arrayOf("Carrera", "Calle", "Transversal", "Avenida", "Avenida carrera", "Avenida calle", "Circular", "Circunvalar", "Diaginal", "Manzana", "Via")
    val cat_arr = arrayOf("AGENCIA DE VIAJES", "ARRENDADORES DE VEHÍCULOS PARA TURISMO NACIONAL E INTERNACIONAL", "CONCESIONARIOS DE SERVICIOS TURÍSTICOS EN PARQUE", "EMPRESA DE TIEMPO COMPARTIDO Y MULTIPROPIEDAD", "EMPRESA DE TRANSPORTE TERRESTRE AUTOMOTOR", "EMPRESAS CAPTADORAS DE AHORRO PARA VIAJES Y DE SERVICIOS TURÍSTICOS", "ESTABLECIMIENTO DE ALOJAMIENTO Y HOSPEDAJE", "ESTABLECIMIENTO DE GASTRONOMÍA Y SIMILARES", "GUIA DE TURISMO", "OFICINA DE REPRESENTACION TURÍSTICA", "OPERADORES PROFESIONALES DE CONGRESOS, FERIAS Y CONVENCIONES", "PARQUES TEMATICOS", "USUARIOS OPERADORES, DESARROLLADORES E INDUSTRIALES EN ZONA FRACA")
    val subcat_arr_1 = arrayOf("AGENCIAS DE VIAJES MAYORISTAS", "AGENCIAS DE VIAJES OPERADORAS", "AGENCIAS DE VIAJES Y DE TURISMO" )
    val subcat_arr_2 = arrayOf("ARRENDADORES DE VEHÍCULOS PARA TURISMO NACIONAL E INTERNACIONAL" )
    val subcat_arr_3 = arrayOf("CONCESIONARIOS DE SERVICIOS TURÍSTICOS EN PARQUE" )
    val subcat_arr_4 = arrayOf("EMPRESA COMERCIALIZADORA DE TIEMPO COMPARTIDO Y MULTIPROPIEDAD", "EMPRESA PROMOTORA DE TIEMPO COMPARTIDO Y MULTIPROPIEDAD", "EMPRESA PROMOTORA Y COMERCIALIZADORA DE TIEMPO COMPARTIDO Y MULTIPROPIEDAD" )
    val subcat_arr_5 = arrayOf("OPERADOR DE CHIVAS" )
    val subcat_arr_6 = arrayOf("EMPRESAS CAPTADORAS DE AHORRO PARA VIAJES Y DE SERVICIOS TURÍSTICOS" )
    val subcat_arr_7 = arrayOf("ALBERGUE (HOSPEDAJE NO PERMANENTE)", "ALOJAMIENTO RURAL (HOSPEDAJE NO PERMANENTE)", "APARTAHOTEL (HOSPEDAJE NO PERMANENTE)", "CENTRO VACACIONAL", "HOSTAL (HOSPEDAJE NO PERMANENTE)", "HOTEL", "REFUGIO (HOSPEDAJE NO PERMANENTE)", "VIVIENDA TURISTICA", "CAMPAMENTO" )
    val subcat_arr_8 = arrayOf("BAR", "BAR Y RESTAURANTE" )
    val subcat_arr_9 = arrayOf("GUIA DE TURISMO" )
    val subcat_arr_10 = arrayOf("OFICINA DE REPRESENTACION TURÍSTICA" )
    val subcat_arr_11 = arrayOf("OPERADORES PROFESIONALES DE CONGRESOS, FERIAS Y CONVENCIONES" )
    val subcat_arr_12 = arrayOf("PARQUE TEMATICO" )
    val subcat_arr_13 = arrayOf("USUARIOS OPERADORES, DESARROLLADORES E INDUSTRIALES EN ZONAS FRANCAS" )

    private var posCat = ""
    private var posSubCat = ""

    private lateinit var spinnerAddress:Spinner
    private lateinit var spinnerCat:Spinner
    private lateinit var spinnerSubCat:Spinner

    val client = OkHttpClient()

    private val GALLERY = 1
    private val CAMERA = 2

    private var isChecked = false

    private lateinit var name_field:EditText
    private lateinit var address_field:EditText
    private lateinit var info_addres:EditText
    private lateinit var address_field_1:EditText
    private lateinit var address_field_2:EditText
    private lateinit var address_field_3:EditText


    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_form)

        spinnerAddress = findViewById(R.id.spinnerAddress)//this.spinnerAddress
        spinnerCat = findViewById(R.id.spinnerCat)//this.spinnerCat
        spinnerSubCat = findViewById(R.id.spinnerSubCat)//this.spinnerCat
        //this.spinnerCat

        spinnerCat!!.setOnItemSelectedListener(this)

        window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN)


        val aaAddress = ArrayAdapter(this, R.layout.custom_spinner_text, addresType_arr)
        aaAddress.setDropDownViewResource(R.layout.custom_spinner_dropdpwn_item)

        val aaCat = ArrayAdapter(this, R.layout.custom_spinner_text, cat_arr)
        aaCat.setDropDownViewResource(R.layout.custom_spinner_dropdpwn_item)

        spinnerAddress!!.setAdapter(aaAddress)
        spinnerCat!!.setAdapter(aaCat)



        val btnSave = findViewById<TextView>(R.id.btnSave)
        val btn_back = findViewById<ImageView>(R.id.btn_back)
        val btn_cam = findViewById<ImageView>(R.id.btn_cam)
        val check = findViewById<CheckBox>(R.id.check)

        name_field = findViewById(R.id.name_field)
        address_field = findViewById(R.id.address_field)
        info_addres = findViewById(R.id.info_addres)
        address_field_1 = findViewById(R.id.address_field_1)
        address_field_2 = findViewById(R.id.address_field_2)
        address_field_3 = findViewById(R.id.address_field_3)


        //LISTENER CHECK
        check.setOnClickListener(View.OnClickListener { view ->
            toogleEnabled()

        })

        val onClickListener : View.OnClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.btn_back -> gotoBack()
                R.id.btnSave -> saveMe()
            }
        }



        btn_back.setOnClickListener( onClickListener )
        btnSave.setOnClickListener( onClickListener )


        //ALERT PHOTO
        val onTakePhotos:View.OnClickListener = View.OnClickListener { view ->
            val pictureDialog = AlertDialog.Builder(this)
            pictureDialog.setTitle("Subir imagen")
            val pictureDialogItems = arrayOf("Desde la galería", "Desde la cámara")
            pictureDialog.setItems(pictureDialogItems
            ) { dialog, which ->
                when (which) {
                    0 -> choosePhotoFromGallary()
                    1 -> takePhotoFromCamera()
                }
            }
            pictureDialog.show()
        }

        btn_cam.setOnClickListener(onTakePhotos)

        val allInfo_txt:TextView = findViewById(R.id.allInfo_txt)
        allInfo_txt.text =
                rntSelected+"\n"+
                statusSelected +"\n"+
                stateSelected +"\n"+
                citySelected

        val name_field:EditText = findViewById(R.id.name_field)
        val address_field:EditText = findViewById(R.id.address_field)

        name_field.setText(nameSelected)
        address_field.setText(addressSelected)

    }


    private fun toogleEnabled()
    {
        isChecked = !isChecked

        name_field.isEnabled=isChecked
        info_addres.isEnabled=isChecked
        address_field_1.isEnabled=isChecked
        address_field_2.isEnabled=isChecked
        address_field_3.isEnabled=isChecked
        spinnerAddress.isEnabled=isChecked
        spinnerCat.isEnabled=isChecked
        spinnerSubCat.isEnabled=isChecked

    }



    //TAKE PHOTO


    fun choosePhotoFromGallary() {
        val galleryIntent = Intent(Intent.ACTION_PICK,
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI)

        startActivityForResult(galleryIntent, GALLERY)
    }

    private fun takePhotoFromCamera() {
        val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        startActivityForResult(intent, CAMERA)
    }

    public override fun onActivityResult(requestCode:Int, resultCode:Int, data: Intent?) {

        super.onActivityResult(requestCode, resultCode, data)
        /* if (resultCode == this.RESULT_CANCELED)
         {
         return
         }*/
        if (requestCode == GALLERY)
        {
            if (data != null)
            {
                val contentURI = data!!.data
                try
                {
                    val bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, contentURI)
                    val path = saveImage(bitmap)
                    Toast.makeText(this, "Image Saved!", Toast.LENGTH_SHORT).show()


                }
                catch (e: IOException) {
                    e.printStackTrace()
                    Toast.makeText(this, "Failed!", Toast.LENGTH_SHORT).show()
                }

            }

        }
        else if (requestCode == CAMERA)
        {

            val thumbnail = data!!.extras!!.get("data") as Bitmap
            saveImage(thumbnail)
            Toast.makeText(this, "Image Saved!", Toast.LENGTH_SHORT).show()
        }
    }

    fun saveImage(myBitmap: Bitmap):String {
        val bytes = ByteArrayOutputStream()
        myBitmap.compress(Bitmap.CompressFormat.JPEG, 90, bytes)
        val wallpaperDirectory = File(
                (Environment.getExternalStorageDirectory()).toString() + IMAGE_DIRECTORY)
        // have the object build the directory structure, if needed.

        if (!wallpaperDirectory.exists())
        {

            wallpaperDirectory.mkdirs()
        }

        try
        {

            val f = File(wallpaperDirectory, ((Calendar.getInstance()
                    .getTimeInMillis()).toString() + ".jpg"))
            f.createNewFile()
            val fo = FileOutputStream(f)
            fo.write(bytes.toByteArray())
            MediaScannerConnection.scanFile(this,
                    arrayOf(f.getPath()),
                    arrayOf("image/jpeg"), null)
            fo.close()


            return f.getAbsolutePath()
        }
        catch (e1: IOException) {
            e1.printStackTrace()
        }

        return ""
    }

    companion object {
        private val IMAGE_DIRECTORY = "/demonuts"
    }



    private fun saveMe()
    {
        visited_places.add(rntSelected)

        val news_txt:EditText = findViewById(R.id.news_txt)
        val newsInfo = news_txt.text

        var isCheckNum:String
        if(isChecked)
            isCheckNum = "1"
        else
            isCheckNum = "0"


        val json = """
            {
                "idanterior":"${idSelected}",
                "rnt":"${rntSelected}",
                "nombre":"${nameSelected}",
                "direccion":"${addressSelected}",
                "categoria":"${posCat}",
                "subcategoria":"${posSubCat}",
                "latitud":"${myLat}",
                "longitud":"${myLon}",
                "departamento":"${stateSelected}",
                "ciudad":"${citySelected}",
                "novedad":"${newsInfo}",
                "correcto":"${isCheckNum}",
                "foto":"${"token.jpg"}",
                "fecha_censo":"${"2018-11-10"}"

            }
            """.trimIndent()

        val body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), json)
        val request = Request.Builder()
                .url(" http://beta.citur.linktic.com/api/bibliotecaapi/save/41")
                .post(body)
                .build()


        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                println(e)
                // loading.visibility = View.GONE
            }
            override fun onResponse(call: Call?, response: Response) {
                if (!response.isSuccessful) {
                    System.err.println("Response not successful")
                    return
                }


                val json = response.body()!!.string()
                runOnUiThread {
                    infoLog(json)
                }
            }
            //override fun onResponse(call: Call, response: Response) = gotoLog(response)
        })



        val i = Intent(this, MapsActivity::class.java)
        //startActivity(i)

        //finish()
    }

    private fun infoLog(_str:String)
    {

        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonObject


        val i = Intent(this, MapsActivity::class.java)
        startActivity(i)

        finish()

    }

    private fun gotoBack()
    {
        val i = Intent(this, MapsActivity::class.java)
        startActivity(i)

        finish()
    }

    override fun onItemSelected(arg0: AdapterView<*>, arg1: View, position: Int, id: Long)
    {

        posCat = (position+1).toString()


        var useIt = arrayOf("")
        if(position==0)
            useIt = subcat_arr_1
        if(position==1)
            useIt = subcat_arr_2
        if(position==2)
            useIt = subcat_arr_3
        if(position==3)
            useIt = subcat_arr_4
        if(position==4)
            useIt = subcat_arr_5
        if(position==5)
            useIt = subcat_arr_6
        if(position==6)
            useIt = subcat_arr_7
        if(position==7)
            useIt = subcat_arr_8
        if(position==8)
            useIt = subcat_arr_9
        if(position==9)
            useIt = subcat_arr_10
        if(position==10)
            useIt = subcat_arr_11
        if(position==11)
            useIt = subcat_arr_12
        if(position==12)
            useIt = subcat_arr_13


        val aaSubCat = ArrayAdapter(this, R.layout.custom_spinner_text, useIt)
        aaSubCat.setDropDownViewResource(R.layout.custom_spinner_dropdpwn_item)

        spinnerSubCat!!.setAdapter(aaSubCat)
        spinnerSubCat!!.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View, position: Int, id: Long) {
                posSubCat = posCat +"-"+(position+1)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {

            }
        }

    }

    override fun onNothingSelected(arg0: AdapterView<*>) {

    }
}
