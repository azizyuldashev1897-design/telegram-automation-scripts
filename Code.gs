/**
 * Telegram Bot Webhook & Google Sheets Integration
 * Open-source automation script for webhook event handling.
 */

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    
    if (contents.message) {
      const chatId = contents.message.chat.id;
      const text = contents.message.text || "";
      
      handleIncomingMessage(chatId, text);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleIncomingMessage(chatId, text) {
  if (text === "/start") {
    sendTelegramMessage(chatId, "Assalomu alaykum! Xush kelibsiz. Bot xizmatga tayyor.");
  }
}

function sendTelegramMessage(chatId, message) {
  const token = PropertiesService.getScriptProperties().getProperty("BOT_TOKEN");
  if (!token) return;

  const url = "https://api.telegram.org/bot" + token + "/sendMessage";
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML"
  };

  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}
