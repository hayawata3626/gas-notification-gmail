declare var global: any;

global.notifificationSlackGmail = (): void => {
  const postUrl = process.env.SLACK_URL;
  const username = 'hoge';
  const icon = ':ramen:';
  const channel = '#gas_test';
  var date = new Date();
  const query = 'is:unread from:notifications@m.teachable.com';
  var myThreads = GmailApp.search(query, 0, 60); //条件にマッチしたスレッドを取得
  var myMsgs = GmailApp.getMessagesForThreads(myThreads); //スレッドからメールを取得する　→二次元配列で格納
  for (var i = 0; i < myMsgs.length; i++) {
    var targetMessage = myMsgs[i][0].getPlainBody();
    myThreads[i].markRead();
    var jsonData = {
      username: username,
      channel: channel,
      icon_emoji: icon,
      text: targetMessage
    };
    var payload: string = JSON.stringify(jsonData);
    var options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'post',
      contentType: 'application/json',
      payload: payload
    };
    UrlFetchApp.fetch(postUrl, options);
  }
};
