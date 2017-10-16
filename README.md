

Software required.  
 Node.js is required . (https://nodejs.org/en/)

Start the application
======
In the command-line, please give the following commands.
npm install     - To install all NPM dependencies only for first time
npm start       - To start the application (client side)  
cd server       - change directory to "server"
node app.js     -  Command to start the server which keeps sending the cpu load to server

Open http://localhost:3000/ in browser to see the output. Screen shots attached.

I have used "Server Sent Events" instead of client side polling .  
UI creates a event source and keep watching if any data from server .

Created a custom RealtimeChart component using d3.
Tried to use D3 API only for calculation , but the d3 v4 is tightly coupled.

Please note , I did not use Redux as there is not much state to manage.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
