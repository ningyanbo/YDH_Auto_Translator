(new Gallery).addStage("bargainList",{header:{prevStage:"root",backWhole:!0,title:"抢超值旅游"},init:function(){$("#bargainContainer").click(function(n){var t=$(n.target),i,r;n.target.nodeName==="A"?Statistics.trigger(25,"1",encodeURIComponent(t.attr("href")),"location="+encodeURIComponent(t.attr("_location"))):n.target.nodeName==="IMG"&&t.parent().hasClass("bargainAvailable")&&(i=t.siblings("a").attr("href"),r=t.siblings("a").attr("_location"),Statistics.trigger(25,"1",encodeURIComponent(i),"location="+encodeURIComponent(r)),chrome.tabs.create({url:i}))})},prepare:function(){Storage.set("lastCheapPopupTime",Util.date.parse(new Date));(new Gallery).showMask();$("#niceScrollBox").show();$.getJSON(config.urls.cheapTicket+encodeURIComponent(Storage.get("location")),function(n){Filler.loop($("#bargainContainer"),n,{isMiss:function(n,t){n.abandon||n.expirationTime*1e3<Util.date.now()?($(".missBargainMask",t).show(),t.addClass("bargainMiss").removeClass("bargainAvailable")):($(".missBargainMask",t).hide(),t.addClass("bargainAvailable").removeClass("bargainMiss"));t.show()},thumb:function(n,t){return n.thumb?t.show():t.hide(),n.thumb}});(new Gallery).hideMask()})},showed:function(){$("#niceScrollBox").css("height","319px").niceScroll({cursoropacitymin:.2,cursoropacitymax:.4,cursorwidth:"6px"})},gone:function(){$("#niceScrollBox").hide()}})