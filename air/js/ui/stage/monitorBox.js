(new Gallery).addStage("monitorBox",{header:{prevStage:"root",backWhole:!0,title:"抢飞机票"},init:function(){var n;$("#confirmDelete").click(function(n){n.stopPropagation()});$("#addMonitorBtn").click(function(){if((new FlightMonitorBox).getCount()>=config.monitor.limit){$(".errorInfo",$(".monitorBox")).show();Statistics.trigger(34,1);return}Statistics.trigger(34,0);(new Gallery).goTo("flightSetting",!1)});$("#confirmDeleteOK").click(function(n){Statistics.trigger(32,1);var t=$(this).parent().parent();n.stopPropagation();chrome.extension.sendRequest({type:"removeMonitor",flightId:t.attr("_id")},function(n){n.status===0&&((new FlightMonitorBox).init(),t.slideUp("fast",function(){(new FlightMonitorBox).getCount()<=0&&($("#emptyMonitorBox").show(),$("#monitorBoxWrap").hide());(new FlightMonitorBox).getCount()>=config.monitor.limit?$("#addMonitorBtn").hide():$("#addMonitorBtn").show()}),$(".errorInfo",$(".monitorBox")).hide())})});$("#confirmDeleteCancel").click(function(n){Statistics.trigger(32,2);n.stopPropagation();$(this).parent().slideUp("fast",function(){$(this).insertAfter($("#monitorBox"))})});$("#monitorExceptionRetry a").click(function(){var t=[];return n===undefined&&(n=chrome.extension.connect({name:"retryMonitor"}),n.onMessage.addListener(function(n){var i="";if(n.error){switch(n.error.name){case"QuerySoldOutError":i="售罄";break;case"QueryDateError":i="过期";break;default:i="异常"}$(".ticketRetryStatus",$('li[_id="'+n.flightId+'"]')).hide();t.splice($.inArray(n.flightId,t),1)}else $(".ticketRetryStatus",$('li[_id="'+n.flightId+'"]')).removeClass("running").addClass("success").show(),$('li[_id="'+n.flightId+'"]').removeClass("invalid").addClass("available"),setTimeout(function(){$(".ticketRetryStatus",$('li[_id="'+n.flightId+'"]')).fadeOut("slow")},1e3);$(".ticketException",$('li[_id="'+n.flightId+'"]')).text(i).show();t.length===0&&$("#monitorExceptionRetry").show()})),$.each(Object.keys((new FlightMonitorBox).getAll()),function(i,r){(new FlightMonitorBox).get(r).error&&(new FlightMonitorBox).get(r).error.name!=="QuerySoldOutError"&&(new FlightMonitorBox).get(r).error.name!=="QueryDateError"&&($("#monitorExceptionRetry").hide(),$(".ticketException",$('li[_id="'+r+'"]')).hide(),$(".ticketRetryStatus",$('li[_id="'+r+'"]')).removeClass("success").addClass("running").show(),n.postMessage({flightId:r}),t.push(r))}),!1})},prepare:function(n){var t=!1;Statistics.trigger(31,(new FlightMonitorBox).getCount());$(".errorInfo",$(".monitorBox")).hide();$("#confirmDelete").hide().insertAfter($("#monitorBox"));(new FlightMonitorBox).getCount()<=0?($("#emptyMonitorBox").show(),$("#monitorBoxWrap").hide()):($("#emptyMonitorBox").hide(),$("#monitorBoxWrap").show());(new FlightMonitorBox).getCount()>=config.monitor.limit?$("#addMonitorBtn").hide():$("#addMonitorBtn").show();Filler.loop($("#monitorBox"),(new FlightMonitorBox).getAll(),{dateExpression:function(n){var t=n.flight.query.date;return t[0]==t[1]?Util.date.formatToShort(t[0]):Util.date.formatToShort(t[0])+" ~ "+Util.date.formatToShort(t[1])},exception:function(n,i){if(n.error!==undefined){i.parent().removeClass("available").addClass("invalid");switch(n.error.name){case"QuerySoldOutError":return"售罄";case"QueryDateError":return"过期";default:return t=!0,"异常"}}else return i.parent().removeClass("invalid").addClass("available"),""}});t?$("#monitorExceptionRetry").show():$("#monitorExceptionRetry").hide();n!==undefined&&$("#confirmDelete").appendTo($('li[_id="'+n+'"]')).slideDown("fast");$(".deleteMe").click(function(n){Statistics.trigger(32,0);$("#confirmDelete").hide().appendTo($(this).parent()).slideDown("fast");n.stopPropagation()});$("li",$("#monitorBox")).show().hover(function(){$(".deleteMe",$(this)).show()},function(){$(".deleteMe",$(this)).hide()}).click(function(){Statistics.trigger(33);$(this).hasClass("available")&&(new Gallery).goTo("ticketDetail",!1,$(this).attr("_id"))})}})