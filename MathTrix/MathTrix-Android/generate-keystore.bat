@echo off
keytool -genkey -v -keystore mathtrix.keystore -alias mathtrix -keyalg RSA -keysize 2048 -validity 10000 