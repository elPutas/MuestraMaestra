package com.linktic.situr.sections

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.TextView
import com.beust.klaxon.*
import com.linktic.situr.BaseActivity
import com.linktic.situr.R
import com.linktic.situr.assets.AppPreferences
import okhttp3.*
import java.io.IOException
import okhttp3.MultipartBody
import android.R.string.cancel
import android.content.DialogInterface
import android.text.InputType
import android.util.Log


class LoginActivity : BaseActivity()
{

    private val serviceForgotPass   :String = "admin/users/enviaremail"
    private val serviceLogin        :String = "admin/users/loginapi"
    private val client              = OkHttpClient()
    private lateinit var loading_pb :ProgressBar
    private var m_Text              :String = ""

    override fun onCreate(savedInstanceState: Bundle?)
    {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        AppPreferences.init(this)


        val btn_login = findViewById<TextView>(R.id.btn_login)
        val btn_forgot = findViewById<TextView>(R.id.btn_forgot)

        val onClickListener : View.OnClickListener = View.OnClickListener { view ->
            when(view.id)
            {
                R.id.btn_login -> sendLog()
                R.id.btn_forgot -> forgotPass()

            }
        }

        btn_login.setOnClickListener( onClickListener )
        btn_forgot.setOnClickListener( onClickListener )
    }

    private fun LogMe(_url: String, _user:String, _pass:String)
    {

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
                    openAlert("Algo salió mal","El usuario y contraseña no coinciden")
                }
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
        })
    }

    private fun sendLog()
    {
        val user_txt = findViewById<EditText>(R.id.user_txt)
        val pass_txt = findViewById<EditText>(R.id.pass_txt)

        if(user_txt.text.toString() != "" && pass_txt.text.toString() != "")
            LogMe(path+serviceLogin, user_txt.text.toString(), pass_txt.text.toString())
            //LogMe("http://beta.citur.linktic.com/admin/users/loginapi", user_txt.text.toString(), pass_txt.text.toString())
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
            fullnameUser = realData["fullname"].toString()
            usernameUser = realData["username"].toString()
            stateUser = realData["department"].toString()
            imgUser = realData["image"].toString()
            groupUser = realData["group_id"].toString()

            val _cityUser = realData["cities"] as JsonArray<*>

            cityUser = _cityUser["title"].toList() as ArrayList<String>

            //set session
            AppPreferences.spDataLogin = _str
            AppPreferences.isLog = true

            gotoMap()
        }else{
            openAlert("Algo salió mal", "Este usuario ya no existe")
        }


    }


    private fun forgotPass()
    {


        val builder = AlertDialog.Builder(this)
        builder.setTitle("Ingresa tu e-mail")

// Set up the input
        val input = EditText(this)
// Specify the type of input expected; this, for example, sets the input as a password, and will mask the text

        builder.setView(input)

// Set up the buttons
        builder.setPositiveButton("OK") { dialog, _ -> sendmeNewPass(dialog) }
        builder.setNegativeButton("Cancel") { dialog, which ->  m_Text = input.text.toString() }

        builder.show()
    }

    private fun sendmeNewPass(_diag:DialogInterface)
    {
        _diag.cancel()

        val _email = m_Text.toString()

        val requestBody = MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("email", _email)
                .build()

        val request = Request.Builder()
                .url(path+serviceForgotPass)
                .post(requestBody)
                .build()

        loading_pb = findViewById<ProgressBar>(R.id.loading)
        loading_pb.visibility = View.VISIBLE

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                println(e)
                runOnUiThread {
                    openAlert("Algo salió mal", "Revisa tu conexión a internet")
                }
            }
            override fun onResponse(call: Call?, response: Response) {
                if (!response.isSuccessful) {
                    runOnUiThread {
                        loading_pb.visibility = View.GONE
                        openAlert("Algo salió mal", "Parece que este email no existe")
                    }
                    System.err.println("Response not successful")
                    return
                }


                runOnUiThread {
                    openAlert("¡Perfecto!", "Se ha enviado un email al correo ingresado")
                }
            }
        })


        Log.d(TAG, m_Text.toString())
    }

    private fun gotoMap()
    {
        val i = Intent(this, MapsActivity::class.java)
        startActivity(i)
        finish()

    }

    private fun openAlert(_tit:String, _subT:String)
    {
        loading_pb.visibility = View.GONE
        val builder = AlertDialog.Builder(this@LoginActivity)
        builder.setTitle(_tit)
        builder.setMessage(_subT)

        val dialog: AlertDialog = builder.create()
        dialog.show()
    }


}





