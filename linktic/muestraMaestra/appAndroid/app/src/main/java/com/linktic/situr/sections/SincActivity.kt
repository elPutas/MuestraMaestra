package com.linktic.situr.sections

import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.database.Cursor
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
import com.linktic.situr.adapters.RecyclerAdapterSinc
import com.linktic.situr.assets.AppPreferences
import kotlinx.android.synthetic.main.activity_form.*

import kotlinx.android.synthetic.main.activity_sinc.*
import okhttp3.*
import java.util.*
import kotlin.collections.ArrayList
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.ParcelFileDescriptor
import java.io.*


class SincActivity : BaseActivity()
{
    private var linearLayoutManager     :LinearLayoutManager? = null
    private lateinit var loading_pb     : ProgressBar
    val client                          = OkHttpClient()
    private var numSinc                 = 0
    private var totalString             :ArrayList<String> = ArrayList()
    private var totalToSave             :Int = 0
    private lateinit var btn_save       :TextView
    private val GALLERY                 = 1


    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sinc)



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


        if(AppPreferences.spJsonSaved!="")
        {
            totalString = AppPreferences.spJsonSaved.split("|") as ArrayList<String>
            totalToSave = totalString.size
            setTable(visited_places.toString())
        }


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
        var _arr = _str.replace("[", "").replace("]", "").split(",")
        var _arrlist:ArrayList<String> = ArrayList()

        for (i in 0 until _arr.size)
        {
            _arrlist.add("ID:"+_arr[i])

        }


        linearLayoutManager = LinearLayoutManager(this)
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerView) as RecyclerView
        recyclerView.layoutManager = linearLayoutManager

        recyclerView.adapter = RecyclerAdapterSinc(_arrlist, totalString, this)

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

                val wallpaperDirectory = File(
                        (Environment.getExternalStorageDirectory()).toString() + IMAGE_DIRECTORY)
                // have the object build the directory structure, if needed.


                try
                {
                    val bitmap = MediaStore.Images.Media.getBitmap(this.contentResolver, contentURI)
                    //saveImage(bitmap)


                    val uri:Uri = Uri.parse(contentURI.toString())
                    var fileName = ""
                    if (uri.getScheme().equals("file")) {
                        fileName = uri.getLastPathSegment()
                    } else {
                        var cursor: Cursor? = null
                        try {
                            cursor = contentResolver.query(uri, arrayOf(MediaStore.Images.ImageColumns.DISPLAY_NAME), null, null, null)

                            if (cursor != null && cursor!!.moveToFirst()) {
                                fileName = cursor!!.getString(cursor!!.getColumnIndex(MediaStore.Images.ImageColumns.DISPLAY_NAME))
                                Log.d(BaseActivity.TAG, "name is $fileName")
                            }
                        } finally {

                            if (cursor != null) {
                                cursor!!.close()
                            }
                        }
                    }


                    val f = File(bitmapToFile(bitmap, fileName).toString())


                    savePhoto(f, fileName)




                }
                catch (e: IOException) {
                    e.printStackTrace()
                    Toast.makeText(this@SincActivity, "Failed!", Toast.LENGTH_SHORT).show()
                }

            }

        }

    }

    // Method to save an bitmap to a file
    private fun bitmapToFile(bitmap:Bitmap, _name:String): Uri {
        // Get the context wrapper
        val wrapper = ContextWrapper(applicationContext)

        // Initialize a new file instance to save bitmap object
        var file = wrapper.getDir("Images",Context.MODE_PRIVATE)
        file = File(file,"${_name}.jpg")

        try{
            // Compress the bitmap and save in jpg format
            val stream:OutputStream = FileOutputStream(file)
            bitmap.compress(Bitmap.CompressFormat.JPEG,100,stream)
            stream.flush()
            stream.close()
        }catch (e:IOException){
            e.printStackTrace()
        }

        // Return the saved bitmap uri
        return Uri.parse(file.absolutePath)
    }

    private fun savePhoto(_photo:File, _name:String)
    {
        val MEDIA_TYPE_PNG = MediaType.parse("image/jpeg");

        val req =  MultipartBody.Builder().setType(MultipartBody.FORM).addFormDataPart("userid", idUser)
                .addFormDataPart("file",_name, RequestBody.create(MEDIA_TYPE_PNG, _photo)).build();


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
