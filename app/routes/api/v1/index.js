import * as express from 'express';
import * as authMiddleware from './../../../middleware/auth.js';
import * as Inflector from 'inflected';

var router = express.Router();

var resources = [ 'floor', 'staff-member', 'resource', 'weekly-win', 'faq', 'readme' ];

var currentAuthMiddleware = (process.env.NODE_ENV === 'development') ? authMiddleware.ensureNothing : authMiddleware.ensureAuthenticated;

resources.forEach((name) => {
	var path = './../../../models/' + name.replace(/-/g, '_') + '.js';
	var Collection = require(path).Collection;

	router.get('/' + Inflector.pluralize(name), currentAuthMiddleware, (req, res) => {
		new Collection()
			.getServerFetchPromise()
			.then((coll) => { res.json(coll.toJSON()); }, () => { res.json([]); });
	});

});

export default router;