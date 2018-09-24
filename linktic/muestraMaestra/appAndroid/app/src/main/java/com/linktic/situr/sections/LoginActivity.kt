package com.linktic.situr.sections

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import com.beust.klaxon.*
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import okhttp3.*
import java.io.IOException
import okhttp3.MultipartBody
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType


class LoginActivity : BaseActivity()
{


    val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val btn_login:TextView = findViewById<TextView>(R.id.btn_login)

        val onClickListener : View.OnClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.btn_login -> sendLog()

            }
        }

        btn_login.setOnClickListener( onClickListener )
    }

    private fun LogMe(_url: String, _user:String, _pass:String) {
        val requestBody = MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("username", _user)
                .addFormDataPart("password", _pass)
                .build()

        val request = Request.Builder()
                .url(_url)
                .post(requestBody)
                .build()

        val loading = findViewById<ProgressBar>(R.id.loading)
        loading.visibility = View.VISIBLE

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                println(e)
               // loading.visibility = View.GONE
            }
            override fun onResponse(call: Call?, response: Response) {
                if (!response.isSuccessful) {
                    loading.visibility = View.GONE
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
    }

    private fun sendLog()
    {
        val user_txt = findViewById<EditText>(R.id.user_txt)
        val pass_txt = findViewById<EditText>(R.id.pass_txt)
        LogMe("http://beta.citur.linktic.com/admin/users/loginapi", user_txt.text.toString(), pass_txt.text.toString())
        //LogMe("http://muestramaestra.linktic.co/admin/users/loginapi", user_txt.text.toString(), pass_txt.text.toString())
    }

    private fun infoLog(_str:String)
    {

        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonObject



        if(json["estado"] == 1)
        {
            val realData:JsonObject = json["data"] as JsonObject
            println("Data = $realData")

            idUser = realData["id"].toString()
            gotoMap()
        }


    }

    private fun gotoMap()
    {
        val i = Intent(this, MapsActivity::class.java)
        startActivity(i)
        finish()

    }

    private fun openAlert()
    {
        // Initialize a new instance of
        val builder = AlertDialog.Builder(this@LoginActivity)

        // Set the alert dialog title
        builder.setTitle("App background color")

        // Display a message on alert dialog
        builder.setMessage("Are you want to set the app background color to RED?")

        // Set a positive button and its click listener on alert dialog
        builder.setPositiveButton("OK"){dialog, which ->
            // Do something when user press the positive button

        }



        // Finally, make the alert dialog using builder
        val dialog: AlertDialog = builder.create()

        // Display the alert dialog on app interface
        dialog.show()
    }


}



