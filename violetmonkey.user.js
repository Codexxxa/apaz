// ==UserScript==
// @name         UgPhone MQTT Login Helper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Login ke UgPhone menggunakan data JSON UGPHONE-MQTT (Access Token & Login ID)
// @author       Gemini
// @match        https://www.ugphone.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Membuat Tombol UI di Layar
    const btn = document.createElement("button");
    btn.innerText = "Login via MQTT JSON";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";
    btn.style.padding = "10px 20px";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";

    document.body.appendChild(btn);

    // 2. Fungsi untuk menangani Login
    btn.addEventListener("click", function() {
        const input = prompt("Paste JSON UGPHONE-MQTT di sini:");
        
        if (!input) return;

        try {
            // Parsing JSON sesuai struktur di bot.py
            const data = JSON.parse(input);
            
            // Validasi data (mencari access_token dan login_id)
            if (data.access_token && data.login_id) {
                
                console.log("Injecting credentials...");

                // Menyimpan ke LocalStorage (Metode umum SPA seperti UgPhone)
                // Kita set beberapa variasi key yang umum digunakan untuk memastikan website membacanya
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('login_id', data.login_id);
                localStorage.setItem('loginId', data.login_id);
                
                // Opsional: Simpan juga data mentah jika website memerlukannya
                localStorage.setItem('userInfo', JSON.stringify(data));

                // Menyimpan ke Cookie (sebagai cadangan jika website membaca cookie)
                document.cookie = `access_token=${data.access_token}; path=/; domain=.ugphone.com; max-age=86400`;
                document.cookie = `login_id=${data.login_id}; path=/; domain=.ugphone.com; max-age=86400`;

                alert("Token berhasil disuntikkan! Halaman akan dimuat ulang.");
                
                // Refresh halaman agar website membaca token baru
                location.reload();

            } else {
                alert("Format JSON Salah! Harus mengandung 'access_token' dan 'login_id'.");
            }

        } catch (e) {
            console.error(e);
            alert("Error: JSON tidak valid. Pastikan Anda menyalin seluruh teks JSON.");
        }
    });

})();
