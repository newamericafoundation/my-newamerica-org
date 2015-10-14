import React from 'react';
import NewBase from './../../../crud/new_base.js';

import resource from './../../../../models/resource.js';

class New extends NewBase {

	/*
	 *
	 *
	 */
	getResourceConstructor() {
		return resource.Model;
	}

}

export default New;