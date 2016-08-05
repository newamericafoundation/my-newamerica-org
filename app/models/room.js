import * as base from './base.js'

/*
 *
 *
 */
export class Model extends base.Model {

	get resourceName() { return 'room' }

	/*
	 * Returns whether the room is a public space.
	 *
	 */
	isPublic() {
		return (this.get('capacity') != null)
	}

}


/*
 *
 *
 */
export class Collection extends base.Collection {
	get model() { return Model }
}