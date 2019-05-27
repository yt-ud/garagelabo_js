(function() {
    "use strict";
    
    var events = [
        'app.record.index.show', 'app.record.detail.show', 'app.record.create.show', 
        'app.record.edit.show', 'app.record.index.edit.show', 'app.record.create.change.allowance', 
        'app.record.edit.change.allowance',  'app.record.index.edit.change.allowance',
        'app.record.create.change.position',  'app.record.edit.change.position', 'app.record.index.edit.change.position',       
        'app.record.create.change.overnight_or_not', 'app.record.edit.change.overnight_or_not', 'app.record.index.edit.change.overnight_or_not',
        'app.record.create.change.period_start', 'app.record.edit.change.period_start', 'app.record.index.edit.change.period_start',
        'app.record.create.change.period_end', 'app.record.edit.change.period_end', 'app.record.index.edit.change.period_end'
    ];
 
    kintone.events.on(events, function(event) {
        var record = event.record;
//        record['position']['disabled'] = true;
        if (record['position'].value == "役員") {
            if (record['overnight_or_not'].value == "日帰り（山梨）") {
                record['allowance'].value = 0;
            } else if (record['overnight_or_not'].value == "日帰り（県外）") {
                record['allowance'].value = 2500;
            } else if (record['overnight_or_not'].value == "宿泊（国内パックなし）") {
                record['allowance'].value = 15000;
            } else if (record['overnight_or_not'].value == "宿泊（国内パックあり）") {
                record['allowance'].value = 4000;
            } else if (record['overnight_or_not'].value == "宿泊（国外）") {
                record['allowance'].value = 5000;
            }
        } else if (record['position'].value == "社員") {
            if (record['overnight_or_not'].value == "日帰り（山梨）") {
                record['allowance'].value = 0;
            } else if (record['overnight_or_not'].value == "日帰り（県外）") {
                record['allowance'].value = 2000;
            } else if (record['overnight_or_not'].value == "宿泊（国内パックなし）") {
                record['allowance'].value = 12000;
            } else if (record['overnight_or_not'].value == "宿泊（国内パックあり）") {
                record['allowance'].value = 3000;
            } else if (record['overnight_or_not'].value == "宿泊（国外）") {
                record['allowance'].value = 4000;
            }
        }

        return event;
    });
})();