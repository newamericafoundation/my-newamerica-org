import React from 'react';
import EditBase from './../../../crud/edit_base.js';

import readme from './../../../../models/readme.js';

class Edit extends EditBase {

	/*
	 *
	 *
	 */
	getResourceConstructor() {
		return readme.Model;
	}

}

export default Edit;