function createAndFillReadme() {
    let divContent = document.getElementById('divContent');
    let divReadMe = document.createElement('div');

    divContent.innerHTML = '';
    divReadMe.id = 'divReadMe';
    divReadMe.innerHTML =
        '<h1>Readme</h1>' +
        '<p> Hey und Willkommen in meiner ChatWebApp</p>' +
        '<p>Wenn du Links auf das "+" klickst kannst du dir einen neuen Chat erstellen</p>';

    divContent.appendChild(divReadMe);
}

function createAndFillAddChat() {
    let divContent = document.getElementById('divContent');

    divContent.innerHTML = '<div id="divAddChat">' +
        '<h1 > Chat hinzuf&uumlgen</h1 >' +
        '<label class="lblAddChat" > Chat Name:</label > ' +
        '<input type = "text" class="inputAddChat" id = "inputAddChatName" /> <br />' +
        '<label class="lblAddChat" > Topic Name:</label > ' +
        '<input type = "text" class="inputAddChat" id = "inputAddChatTopic" /> <br />' +
        '<button class="bttnAddChat" id = "bttnAddChatCancel" onclick="onClickBttnAddChatCancel()"> Abbrechen</button > ' +
        '<button class="bttnAddChat" id = "bttnAddChatAdd" onclick="onClickBttnAddChat()"> Hinzuf&uumlgen</button > ' +
        '</div >';

}

function createAndFillChat(chatname, chatTopic) {
    let divChat = document.createElement('div');
    let divChatHeader = document.createElement('div');
    let divChatName = document.createElement('div');
    let divChatContent = document.createElement('div');
    let ulChatMessages = document.createElement('ul');
    let liSendChatMessages = document.createElement('li');
    let divChatFooter = document.createElement('div');
    let inputSendMessage = document.createElement('input');
    let lblSendImage = document.createElement('label');
    let inputSendImage = document.createElement('input');
    let bttnSendMessage = document.createElement('button');

    divChat.id = chatname;
    divChat.className = 'Chats'; 
    divChatHeader.className = 'ChatHeader';
    divChatName.id = 'divChatName';
    divChatContent.className = 'ChatContent';
    ulChatMessages.className = 'chatMessages';
    ulChatMessages.id = 'ulChatMessages';
    liSendChatMessages.className = 'sendChatMessages';
    divChatFooter.className = 'ChatFooter';
    inputSendMessage.id = 'sendMessageInput';
    inputSendMessage.type = 'text';
    inputSendImage.id = 'sendImageInput';
    inputSendImage.type = 'file';
    inputSendImage.accept = 'image/*';
    bttnSendMessage.id = 'sendMessageBttn';
    bttnSendMessage.onclick = function () { bttnSendMessageFunction() };

    divChatName.appendChild(document.createTextNode(chatname + '(Topic:' + chatTopic + ')'));
    bttnSendMessage.appendChild(document.createTextNode('Senden'));
    lblSendImage.appendChild(document.createTextNode('Bild hochladen'));

    ulChatMessages.appendChild(liSendChatMessages);
    divChatContent.appendChild(ulChatMessages);
    divChatHeader.appendChild(divChatName);
    divChatFooter.appendChild(inputSendMessage);
    lblSendImage.appendChild(inputSendImage);
    divChatFooter.appendChild(lblSendImage);
    divChatFooter.appendChild(bttnSendMessage);

    divChat.appendChild(divChatHeader);
    divChat.appendChild(divChatContent);
    divChat.appendChild(divChatFooter);

    document.getElementById('divContent').innerHTML = '';
    document.getElementById('divContent').appendChild(divChat);

    let activeMqttClient = getAllMqttClients().find(client => client.getChatName() == chatname);
    activeMqttClient.getAllMessages().forEach(message => createAndFillTextMessage(message, activeMqttClient.getUserName()));
}

function createAndFillTextMessage(message, userName) {
    let li = document.createElement('li');
    let ul = document.getElementById('ulChatMessages');
    let divRecivedMessage = document.createElement('div');
    let divMessageName = document.createElement('div');
    let divMessageContent = document.createElement('div');
    let divMessageDate = document.createElement('div');
    let image = document.createElement('img');
    console.log(message.picture.pictureContent != undefined);
    if (message.picture.pictureContent != undefined) {
        image.src = message.picture.pictureContent;
        image.className = 'messageImage';
    }

    //apending the Date Name and Text
    divMessageName.appendChild(document.createTextNode(message.nickname));
    divMessageContent.appendChild(document.createTextNode(message.message))
    divMessageDate.appendChild(document.createTextNode(formatDate(message.time)));

    //set the id and classNmae
    message.nickname == userName ? divRecivedMessage.className = 'senderMessage' : divRecivedMessage.className = 'recivedMessage';
    divMessageName.className = 'messagName';
    divMessageContent.className = 'messageContent';
    divMessageDate.className = 'messageDate';

    //appending the Message to the div
    divRecivedMessage.appendChild(divMessageName);
    if (message.picture.pictureContent != undefined) {
        divRecivedMessage.appendChild(image);
    }
    divRecivedMessage.appendChild(divMessageContent);
    divRecivedMessage.appendChild(divMessageDate);

    li.className = 'chatMessagReciver';
    li.appendChild(divRecivedMessage);
    ul.appendChild(li);
}

function createAndFillSettings(hostname = '', clientId = '', nickname = '') {
    let divSettings = document.createElement('div');
    let h1 = document.createElement('h1');
    let lblHostname = document.createElement('label');
    let inputHostname = document.createElement('input');
    let lblClientId = document.createElement('label');
    let inputClientId = document.createElement('input');
    let lblNickname = document.createElement('label');
    let inputNickname = document.createElement('input');
    let bttnSettingCancle = document.createElement('button');
    let bttnSettingSave = document.createElement('button');

    divSettings.id = 'divSettings';
    lblHostname.className = 'lblSettings';
    inputHostname.className = 'inputSettings';
    inputHostname.id = 'inputSettingsHostname';
    inputHostname.type = 'text';
    inputHostname.value = hostname;
    lblClientId.className = 'lblSettings';
    inputClientId.className = 'inputSettings';
    inputClientId.id = 'inputSettingsClientId';
    inputClientId.type = 'text';
    inputClientId.value = clientId;
    lblNickname.className = 'lblSettings';
    inputNickname.className = 'inputSettings';
    inputNickname.id = 'inputSettingsNickname';
    inputNickname.type = 'text';
    inputNickname.value = nickname;
    bttnSettingCancle.className = 'bttnSettings';
    bttnSettingCancle.onclick = function () { onClickBttnSettingsCancel() };
    bttnSettingSave.className = 'bttnSettings';
    bttnSettingSave.onclick = function () { onClickBttnSettingsSave() };

    h1.appendChild(document.createTextNode('Einstellungen'));
    lblHostname.appendChild(document.createTextNode('Hostname: '));
    lblClientId.appendChild(document.createTextNode('ClientId: '));
    lblNickname.appendChild(document.createTextNode('Nickname: '));
    bttnSettingCancle.appendChild(document.createTextNode('Abbrechen'));
    bttnSettingSave.appendChild(document.createTextNode('Speichern'));

    divSettings.appendChild(h1);
    divSettings.appendChild(lblHostname);
    divSettings.appendChild(inputHostname);
    divSettings.appendChild(document.createElement('br'));
    divSettings.appendChild(lblClientId);
    divSettings.appendChild(inputClientId);
    divSettings.appendChild(document.createElement('br'));
    divSettings.appendChild(lblNickname);
    divSettings.appendChild(inputNickname);
    divSettings.appendChild(document.createElement('br'));
    divSettings.appendChild(bttnSettingCancle);
    divSettings.appendChild(bttnSettingSave);

    document.getElementById('divContent').innerHTML = '';
    document.getElementById('divContent').appendChild(divSettings);
}