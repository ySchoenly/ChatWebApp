let mqttClients = [];
let activeMqttClientName;
let hostname = 'broker.hivemq.com';
let clientId = 'yannik';
let nickname = 'Yannik';

document.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
    //createAndFillReadme();
}

function bttnSendMessageFunction() {
    let activeMqttClient = mqttClients.find(client => client.getChatName() == activeMqttClientName);
    mqttCreator.bttnSendMessageFunction(activeMqttClient);
}

function onClickBttnAddChatCancel() {
    let divContent = document.getElementById('divContent').innerHTML = '';
    createAndFillReadme();
}

function onClickBttnSettingsCancel() {
    let divContent = document.getElementById('divContent').innerHTML = '';
    createAndFillReadme();
}

function onClickBttnSettingsSave() {
    let inputHostname = document.getElementById('inputSettingsHostname');
    let inputClientId = document.getElementById('inputSettingsClientId');
    let inputNickname = document.getElementById('inputSettingsNickname');
    if (inputHostname.value == '' || inputClientId.value == '' || inputNickname.value == '') {
        if (inputHostname.value == '') {
            inputHostname.style.border = '2px solid red';
        }
        if (inputClientId.value == '') {
            inputClientId.style.border = '2px solid red';
        }
        if (inputNickname.value == '') {
            inputNickname.style.border = '2px solid red';
        }
    } else {
        hostname = inputHostname.value;
        clientId = inputClientId.value;
        nickname = inputNickname.value;
        createAndFillReadme();
    }
}

function onClickBttnAddChat() {
    let inputName = document.getElementById('inputAddChatName');
    let inputTopic = document.getElementById('inputAddChatTopic');
    if (inputName.value == '' || inputTopic.value == '') {
        if (inputName.value == '') {
            inputName.style.border = '2px solid red';
        }
        if (inputTopic.value == '') {
            inputTopic.style.border = '2px solid red';
        }
    } else {
        mqttClients.push(new mqttCreator.createMqttClient(nickname, inputTopic.value, clientId, inputName.value, hostname));   
        let ul = document.getElementById('ulMenueChats');

        let li = document.createElement('li');
        let bttn = document.createElement('button');

        li.className = 'liMenue';
        bttn.id = 'bttn' + inputName.value;
        bttn.onclick = function () { createAndFillChat(inputName.value, inputTopic.value); activeMqttClientName = inputName.value};
        activeMqttClientName = inputName.value;

        bttn.appendChild(document.createTextNode(inputName.value));

        li.appendChild(bttn);
        ul.appendChild(li);
        createAndFillChat(inputName.value, inputTopic.value);
    }
}

function getAllMqttClients() {
    return mqttClients;
}

function openSettings() {
    createAndFillSettings(hostname, clientId, nickname);
}
