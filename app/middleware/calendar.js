import * as gcal from 'google-calendar';

export default {
	queryCalendar: function(req, res, next) {
	    if (req.session.accessToken) {
	    	let cal = new gcal.GoogleCalendar(req.session.accessToken);
	    	cal.calendarList.list((err, calendarList) => {
	    		if (err) { return console.dir(err); }
	    		calendarList.items.forEach((item) => {
	    			// console.log(item.id);
	    		});
	    	});
	    	cal.events.list('szerzo@newamerica.org', (err, events) => {
	    		if (err) { return console.dir(err); }
	    		events.forEach((event) => {
	    			console.log(event.start);
	    		});
	    	});
	    } else {
	        console.log('no access token');
	    }
	    next();
	}
};