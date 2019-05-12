/* レコードの追加保存に成功すると、申請ボタンが実行される */
(function() {

    "use strict";

    //レコード追加画面の保存成功後イベント
    kintone.events.on('app.record.create.submit.success', function(event) {
        var record = event.record;
        var appId = event.appId;
        var recordId = event.recordId;
        /* var authorizer = record.authorizer.value[0].code; */
        var authorizer = kintone.getLoginUser().code;


        //レコードのステータス更新API
        var body = {
            "app": appId,
            "id": recordId,
            "action": "申請する",
            "assignee": authorizer,
            "revision": 1
        };
        return kintone.api(kintone.api.url('/k/v1/record/status', true), 'PUT', body).then(function(resp) {
            alert("申請しました！");
            return event;
        }, function(error) {
            alert(error.message);
            return event;
        });
    });
})();