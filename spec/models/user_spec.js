import assert from 'assert';
import mocha from 'mocha';
import { Model, Collection } from './../../app/models/user.js'; 

describe('Model', () => {

	describe('encryption', () => {

		it('encrypts a four-digit password into a more than 20-digit encrypted password', () => {
			var model = new Model();
			model.setEncryptedFieldSync('password', '1357');
			var encryptedPasswordLength = model.get('encrypted_password').length;
			assert.equal(encryptedPasswordLength > 20, true);
		});

		it('encrypts and successfully compares a sensitive field containing special characters', () => {
			var model = new Model();
			model.setEncryptedFieldSync('password', 'adfjasdkAAA__||@@324lnj(fsaga}}df adfadsf11__$$l');
			model.compareEncryptedFieldSync('password', 'adfjasdkAAA__||@@324lnj(fsaga}}df adfadsf11__$$l');
		});

	});

});