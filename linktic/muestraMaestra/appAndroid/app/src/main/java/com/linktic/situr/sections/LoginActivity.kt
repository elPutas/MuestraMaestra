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
    private lateinit var loading_pb:ProgressBar

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

        loading_pb = findViewById<ProgressBar>(R.id.loading)
        loading_pb.visibility = View.VISIBLE

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                println(e)
                runOnUiThread {
                    openAlert()
                }

               // loading.visibility = View.GONE
            }
            override fun onResponse(call: Call?, response: Response) {
                if (!response.isSuccessful) {
                    loading_pb.visibility = View.GONE
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

        if(user_txt.text.toString() != "" && pass_txt.text.toString() != "")
            LogMe("http://beta.citur.linktic.com/admin/users/loginapi", user_txt.text.toString(), pass_txt.text.toString())
        //LogMe("http://muestramaestra.linktic.co/admin/users/loginapi", user_txt.text.toString(), pass_txt.text.toString())
    }

    private fun infoLog(_str:String)
    {

        val jsonString = StringBuilder(_str)

        val parser = Parser()
        val json = parser.parse(jsonString) as JsonObject
        val jsonCities = parser.parse(jsonString) as JsonObject



        if(json["estado"] == 1)
        {
            val realData:JsonObject = json["data"] as JsonObject
            println("Data = $realData")

            idUser = realData["id"].toString()
            fullnameUser = realData["fullname"].toString()
            usernameUser = realData["username"].toString()
            stateUser = realData["department"].toString()
            imgUser = realData["image"].toString()
            groupUser = realData["group_id"].toString()

            val _cityUser = realData["cities"] as JsonArray<*>

            cityUser = _cityUser["title"].toList() as ArrayList<String>

            gotoMap()
        }else{
            openAlert()
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
        loading_pb.visibility = View.GONE
        val builder = AlertDialog.Builder(this@LoginActivity)
        builder.setTitle("Algo salió mal")
        builder.setMessage("El usuario y contraseña no coinciden")

        val dialog: AlertDialog = builder.create()
        dialog.show()
    }


}



