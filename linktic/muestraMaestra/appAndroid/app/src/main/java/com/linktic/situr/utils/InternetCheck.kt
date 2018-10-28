package com.linktic.situr.utils

import android.os.AsyncTask.execute
import android.os.AsyncTask
import android.view.View
import com.linktic.situr.BaseActivity
import okhttp3.*
import okhttp3.Response
import java.io.IOException
import java.net.InetSocketAddress
import java.net.Socket


internal class InternetCheck(private val mConsumer: Consumer) : AsyncTask<Void, Void, Boolean>() {
    interface Consumer {
        fun accept(internet: Boolean?)
    }

    init {
        execute()
    }

    override fun doInBackground(vararg voids: Void): Boolean? {
        try {
            val sock = Socket()
            sock.connect(InetSocketAddress("8.8.8.8", 53), 1500)
            sock.close()
            return true
        } catch (e: IOException) {
            checkByPing(BaseActivity.path + BaseActivity.servicePing)
            return false
        }

    }

    override fun onPostExecute(internet: Boolean?) {
        mConsumer.accept(internet)
    }

    private fun checkByPing(_url:String)
    {
        val request = Request.Builder()
                .url(_url)
                .build()

        val client = OkHttpClient()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException)
            {
                println(e)
                mConsumer.accept(false)
            }
            override fun onResponse(call: Call?, response: Response)
            {
                mConsumer.accept(true)


            }
        })
    }
}