(function(){var i=(new FlightMonitorBox).getAll(),n,r=[],u,f=(new FlightMonitorBox).getCount();f>0?chrome.browserAction.setBadgeText({text:f+""}):chrome.browserAction.setBadgeText({text:""});for(n in i)try{try{i[n].flight.getData(!0);delete i[n].error}catch(t){if(i[n].error=t,t.name==="QuerySoldOutError"||t.name==="QueryDateError")throw t;}u=Math.floor(Math.random()*120)*1e3;i[n].monitor.lastTime=Util.date.now()-u;(new TimerManager).addTimer(getFlightTimer(n,config.monitor.interval-u));(new TimerManager).getTimer(n).start()}catch(t){t.name==="QuerySoldOutError"?r.push({flightId:n,status:"售罄"}):t.name==="QueryDateError"&&r.push({flightId:n,status:"过期"})}finally{(new FlightMonitorBox).persistenceOne(n)}r.length&&(Storage.set("showStage",{name:"ticketAdvice",data:{errors:r,advice:"请您重新设置"}}),Util.popup())})(),function(){Storage.get(!1)&&(new TimerManager).getTimer("bargain").start()}()