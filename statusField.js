/* プロセス管理のステータスが変わると、レコードのステータスフィールドの値も変わる　*/
var ardpp_value_conversion = ['app.record.detail.process.proceed'];
kintone.events.on(ardpp_value_conversion, function(event) {

    var record = event['record'];
    var appId = kintone.app.getId();
    var recordId = kintone.app.record.getId();

    var nStatus = event.nextStatus.value

    if (nStatus === '承認待ち') {
        record['status']['value'] = '承認待ち'
        return event;
    } else if (nStatus === '完了') {
        record['status']['value'] = '完了'
        return event;
    } else if (nStatus === 'さしもどし') {
        var reason = prompt('差し戻し理由', '');
        var body = {
            "app": appId,
            "record": recordId,
            "comment": {
                "text": '【差し戻し理由】' + '\n' + reason
            }
        }
        kintone.api(kintone.api.url('/k/v1/record/comment', true), 'POST', body, function(resp) {
            //success
            console.log(resp);
        }, function(error) {
            //error
            console.log(error);
        });
        record['status']['value'] = '未申請'
        return event;
    }

    });