package com.linktic.situr.sections

import android.content.Intent
import android.graphics.Bitmap
import android.media.MediaScannerConnection
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.support.design.widget.Snackbar
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.View
import android.widget.*
import com.beust.klaxon.JsonArray
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.adapters.RecyclerAdapter
import com.linktic.situr.assets.AppPreferences
import kotlinx.android.synthetic.main.activity_form.*

import kotlinx.android.synthetic.main.activity_sinc.*
import okhttp3.*
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.util.*

class SincActivity : BaseActivity()
{
    private var linearLayoutManager     :LinearLayoutManager? = null
    private lateinit var loading_pb     : ProgressBar
    val client                          = OkHttpClient()
    private var numSinc                 = 0
    private lateinit var totalString    :ArrayList<String>
    private var totalToSave             :Int = 0
    private lateinit var btn_save        :TextView
    private val GALLERY                 = 1


    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sinc)

        setTable(visited_places.toString())

        loading_pb = findViewById(R.id.loading)

        val btn_back = findViewById<ImageView>(R.id.btn_back)
        val btn_savePhoto = findViewById<TextView>(R.id.btn_savePhoto)

        btn_save = findViewById<TextView>(R.id.btn_save)

        val onClickListener : View.OnClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.btn_back -> gotoBack()
                R.id.btn_save -> saveAll()
                R.id.btn_savePhoto -> saveAllPhotos()
            }
        }

        btn_back.setOnClickListener( onClickListener )
        btn_save.setOnClickListener( onClickListener )
        btn_savePhoto.setOnClickListener( onClickListener )


        totalString = AppPreferences.spJsonSaved.split("|") as ArrayList<String>
        totalToSave = totalString.size

    }

    private fun saveAllPhotos()
    {
        val galleryIntent = Intent(Intent.ACTION_PICK,
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI)

        startActivityForResult(galleryIntent, GALLERY)


    }

    private fun saveAll()
    {
        btn_save.visibility = View.GONE
        if(AppPreferences.spJsonSaved != "")
        {
            saveMe(totalString[numSinc])
        }
    }


    private fun saveMe(json:String)
    {
        loading_pb.visibility = View.VISIBLE


        val body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), json)
        val request = Request.Builder()
                .url(path + serviceSaveForm + idUser)
                .post(body)
                .build()


        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                //loading_pb.visibility = View.GONE
                println(e)
                runOnUiThread {
                    openAlert("Un momento", "Todavía no tienes internet")
                }
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
        })


    }

    private fun infoLog(_str:String)
    {
        loading_pb.visibility = View.GONE
        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonObject

        if(json["status"].toString() == "Successful")
        {
            numSinc++
            if(numSinc < totalToSave-1)
            {
                saveMe(totalString[numSinc])
            }
            else
            {
                openAlert("Perfecto", "Todos los formularios fueron sincronizados con éxito")
                AppPreferences.spJsonSaved = ""
                AppPreferences.spPlaceVisited = ""
            }
        }
        else
        {


        }

    }

    private fun openAlert(_tit:String, _msg:String)
    {
        loading_pb.visibility = View.GONE

        val builder = android.app.AlertDialog.Builder(this@SincActivity)
        builder.setTitle(_tit)
        builder.setMessage(_msg)

        val dialog: android.app.AlertDialog = builder.create()
        dialog.show()
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
            _arrlist.add("ID: "+_arr[i])

        }


        linearLayoutManager = LinearLayoutManager(this)
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView) as RecyclerView
        recyclerView.layoutManager = linearLayoutManager

        recyclerView.adapter = RecyclerAdapter(_arrlist, this)

    }


    public override fun onActivityResult(requestCode:Int, resultCode:Int, data: Intent?)
    {

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
                    saveImage(bitmap)




                }
                catch (e: IOException) {
                    e.printStackTrace()
                    Toast.makeText(this@SincActivity, "Failed!", Toast.LENGTH_SHORT).show()
                }

            }

        }

    }


    private fun savePhoto(_photo:File, _name:String)
    {
        val MEDIA_TYPE_PNG = MediaType.parse("image/png");

        val req =  MultipartBody.Builder().setType(MultipartBody.FORM).addFormDataPart("userid", idUser)
                .addFormDataPart("file",_name+".png", RequestBody.create(MEDIA_TYPE_PNG, _photo)).build();


        val request = Request.Builder()
                .url(path + serviceSavePhoto)
                .post(req)
                .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                //loading_pb.visibility = View.GONE
                println(e)
                runOnUiThread {
                    openAlert("Espera", "Hubo un problema, intenta de nuevo")
                }
            }
            override fun onResponse(call: Call?, response: Response) {
                if (!response.isSuccessful) {
                    System.err.println("Response not successful")
                    runOnUiThread {
                        openAlert("Espera", "Hubo un problema, intenta de nuevo")
                    }
                    return
                }


                val json = response.body()!!.string()
                runOnUiThread {
                    openAlert("Perfecto", "foto guardada con éxito")
                }
            }
            //override fun onResponse(call: Call, response: Response) = gotoLog(response)
        })


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

            var imgToSave = (Calendar.getInstance().getTimeInMillis()).toString() + ".jpg"

            val f = File(wallpaperDirectory, imgToSave)
            f.createNewFile()
            val fo = FileOutputStream(f)
            fo.write(bytes.toByteArray())
            MediaScannerConnection.scanFile(this,
                    arrayOf(f.getPath()),
                    arrayOf("image/jpeg"), null)
            fo.close()
            savePhoto(f, imgToSave)

            return f.getAbsolutePath()
        }
        catch (e1: IOException) {
            e1.printStackTrace()
        }

        return ""
    }



    companion object {
        private val IMAGE_DIRECTORY = "/MuestraMaestra"
    }


}
