
const mqttCreator = {
    bttnSendMessageFunction: function (mqttClient) {
        var selectedfile = document.getElementById("sendImageInput").files;
        let imagePath = document.getElementById("sendImageInput").value;
        let imageName = imagePath.split('\\')[imagePath.split('\\').length - 1];
        let image = new Object();
        if (selectedfile.length > 0) {
            var imageFile = selectedfile[0];
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result;
                image.srcData = srcData;
                image.imageName = imageName;
                sendMessage(mqttClient, image);
            }
            fileReader.readAsDataURL(imageFile);
        }
        else{
            sendMessage(mqttClient);
        }

        function sendMessage(mqttClient, image = null) {
            var jsonMessage = {
                nickname: mqttClient.getUserName(),
                message: document.getElementById('sendMessageInput').value,
                picture: {
                    pictureName: image == null ? undefined : image.imageName,
                    pictureContent: image == null ? undefined : image.srcData,
                }
            }
            let message = new Paho.MQTT.Message(JSON.stringify(jsonMessage));
            message.destinationName = mqttClient.getTopic();
            mqttClient.getMqttClient().send(message);
            document.getElementById('sendMessageInput').value = '';
            document.getElementById('sendImageInput').value = '';
        }
    },
    createMqttClient: function (userNameIncome, topicIncome, clientIdIncome, chatNameIncome, hostnameIncome) {
        let clientId = clientIdIncome;
        let topic = topicIncome;
        let userName = userNameIncome;
        let hostname = hostnameIncome;
        let chatName = chatNameIncome;
        let allMessages = [];

        clientId += new Date().getUTCMilliseconds();
        mqttClient = new Paho.MQTT.Client(hostname, 8000, clientId);
        mqttClient.connect({
            onSuccess: function () {
                console.log("Connected");
                mqttClient.subscribe(topic);
            },
            onFailure: function (res) {
                console.log("Connect failed:" + res.errorMessage);
            },
            keepAliveInterval: 10
        });
        mqttClient.onMessageArrived = function (message) {
            try {
                let objMessage = JSON.parse(message.payloadString);
                objMessage.time = new Date();
                allMessages.push(objMessage);
                createAndFillTextMessage(objMessage, userName);
            } catch (ex) {
                console.log(ex.message);
            }
        };
       mqttClient.onConnectionLost = function ConnectionLost(res) {
            if (res.errorCode != 0) {
                console.log("Connection lost:" + res.errorMessage);
                Connect();
            }
        };

        this.getTopic = function () {
            return topic;
        },

        this.getUserName = function () {
            return userName;
        },

        this.getMqttClient = function () {
            return mqttClient;
        },

        this.getChatName = function () {
            return chatName;
        },

        this.getAllMessages = function () {
            return allMessages;
        }

        return this;
    }
}
