import React from 'react';
import NewBase from './../../../crud/new_base.js';

import staffMember from './../../../../models/staff_member.js';

class New extends NewBase {

	/*
	 *
	 *
	 */
	getResourceConstructor() {
		return staffMember.Model;
	}

}

export default New;