(new Gallery).addStage("intro12306",{header:{prevStage:"root",backWhole:!0,title:"抢火车票"},init:function(){$("div.intro12306 li[data-targeturl]").click(function(){var n=this.dataset.targeturl;chrome.tabs.create({url:n})})},prepare:function(){Statistics.trigger(5)}})