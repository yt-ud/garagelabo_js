(function() {
    "use strict";
   
    var events = [
    "app.record.create.show", "app.record.edit.show", "app.record.index.edit.show",
    "app.record.create.change.position", "app.record.edit.change.position", "app.record.index.edit.change.position",
    "app.record.create.change.overnight_or_not", "app.record.edit.change.overnight_or_not", "app.record.index.edit.change.overnight_or_not",
    "app.record.create.change.destination_prefecture", "app.record.edit.change.destination_prefecture", "app.record.index.edit.change.destination_prefecture",
    "app.record.create.change.allowance", "app.record.edit.change.allowance", "app.record.index.edit.change.allowance"
    ];
    kintone.events.on(events, function(event) {
    var record = event.record;
    record['allowance']['disabled'] = true;
    record['destination_prefecture']['disabled'] = true;

    if (record['overnight_or_not'].value === '日帰り（山梨）') {
        record['destination_prefecture'] = '山梨';
        record['allowance'].value = 0;
    }
    else if (record['overnight_or_not'].value === '日帰り（県外）' && record['position'].value === '社員') {
        record['allowance'].value = 2000;
    }
    else if (record['overnight_or_not'].value === '日帰り（県外）' && record['position'].value === '役員') {
        record['allowance'].value = 2500;
    }
    else {
        record['allowance'].value = 0;
    }
    return event;
    });
   })();