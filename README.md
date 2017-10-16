

Software required.  
 Node.js, git are required . (https://nodejs.org/en/)

Install the application
======================
Please clone the project first using git clone command.

git clone https://github.com/jegan-a/cpu-load.git

cd cpu-load

npm install     - To install all NPM dependencies only for first time


Run the application
======================
In the command-line, please give the following commands.


npm start       - To start the application (client side)

To run the server , open a new terminal window and change directory to the project directory
==================================================================================

node server/app.js     -  Command to start the server which keeps sending the cpu load to server


Open http://localhost:3000/ in browser to see the output. Screen shots attached.

* Please note , since the cpu load is showing almost a constant value, I added a random value (in sse.js) along with the actual cpu load.It helps to show the progress. 

Details
======

I have used "Server Sent Events" instead of client side polling .  
UI creates a event source and keep watching if any data from server .

Created a custom RealtimeChart component using d3.
Tried to use D3 API only for calculation , but the d3 v4 is tightly coupled.

Please note , I did not use Redux as there is not much state to manage.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
