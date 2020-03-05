# DonkeySignage-Client
Client for [Donkey Signage Server](https://github.com/imerir/DonkeySignage-Server)
## Installation Script (Raspberry)
```sh
curl -sL https://raw.githubusercontent.com/imerir/DonkeySignage-Client/master/piInstallScript | sudo -E bash - 
```

## Start the project locally (On the same computer as the Server)
- Open Terminal inside the folder of the project
- Type ```sudo npm install``` and wait for the install to finish
- Edit the file package.json : replace line 6 : ```"start": "node ./bin/www/donkeysignage.imerir.org"```
by ```localhost:PORT YOU USE```
- Go to tools/ and edit the file serverTools : replace line 3-4 
```exports.serverAddr = 'https://' + process.argv[2];
exports.webSocketAddr = 'wss://'+process.argv[2]+'/ws';```
by
```
exports.serverAddr = 'http://' + process.argv[2];
exports.webSocketAddr = 'ws://'+process.argv[2]+'/ws';```
- Enter ```sudo npm start``` inside the terminal
- The client should start now, open your web browser and enter this web link: ```localhost:3000```

