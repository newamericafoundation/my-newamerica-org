// This is a collection of batch update operations applied on Atlas' database.
// As many of these were used to change the data structure, they may not be applicable.
// Use as templates for new operations, and feel free to modify. Nothing to break here :).
export default {

	// Method used to test the batch update workflow.
	testMethod: function(prj) {
		return {
			$set: { 'puppies': true }
		};
	},

	addMailTo: function(res) {
		return {
			$set: {
				'url': 'mailto:' + res.url
			}
		}
	}

}