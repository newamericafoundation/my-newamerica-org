import React from 'react';
import NewBase from './../../../crud/new_base.js';

import readme from './../../../../models/readme.js';

class New extends NewBase {

	/*
	 *
	 *
	 */
	getResourceConstructor() {
		return readme.Model;
	}

}

export default New;