Hi there! I am Harshit. 

Here's the step by step guide to run the app. 

Gdrive link for APK and working demo of the application: 
https://drive.google.com/drive/u/1/folders/1ru2lLfOE8q8kIDcU3RHbtJOZ83PuIpZ0

Method: 1 (Installing the attached APK)

- Just transfer the .apk file to your physical device (android) or drag the file directly to your running emulator. 
And click to install the file and it will launch the app automatically.

Method: 2 (Manual Installation via project zip file)

- Make sure to extract the project file to your computer.
- Run your android emulator/ attach a USB cable to your computer (for physical device testing).
- open VS-Code terminal , cd <app_folder>, and run `npm install` (to install the dependencies) and then run `npm run android`.
- After building of application and files is completed, and metro is started successfully.
- The app will be launched to your emulator or device.

Note: If switching from emulator to physical device: 
Make sure to restart the metro , and hit `adb reverse tcp:8081 tcp:8081` inside the terminal.
Then you will be able to see the app run on your physical device.

