(new Gallery).addStage("commonSetting",{header:{prevStage:"bargainList",backWhole:!0,title:"消息提醒设置"},init:function(){$("#receiveCheap").change(function(){$(this).is(":checked")?(Statistics.trigger(26,"2"),Storage.set("receiveCheap","true"),chrome.extension.sendRequest({type:"receiveBargain"})):(Statistics.trigger(26,"1"),Storage.set("receiveCheap","false"),chrome.extension.sendRequest({type:"refuseBargain"}))})},prepare:function(){Storage.getWithDefault("receiveCheap","true")=="true"&&$("#receiveCheap").attr("checked",!0)}})