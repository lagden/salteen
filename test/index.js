const test = require('tape');
const lib = require('../dist/salteen');

test('exports', t => {
	t.is(typeof lib, 'object', 'exports a object');
	t.is(typeof lib.encrypt, 'function', '~> has "encrypt" function');
	t.is(typeof lib.decrypt, 'function', '~> has "decrypt" function');
	t.end();
});

test('encrypt()', t => {
	let key = 'foobar';

	let foo = lib.encrypt(key);
	t.is(typeof foo, 'function', 'returns a new function');

	let val1 = foo('hello');
	t.is(typeof val1, 'string', '~> factory produces a string');

	let val2 = foo('world');
	t.is(typeof val2, 'string', '~> factory produces a string');

	t.isNot(val1, val2, 'hashed-values are not the same');
	t.is(val1, '0007f000720007b0007b00078', '~> 1st value is correct');
	t.is(val2, '0006000078000650007b00073', '~> 2nd value is correct');

	let val3 = lib.encrypt('hello')('hello');
	t.isNot(val1, val3, 'result is different w/ new key');
	t.is(val3, '0000a000070000e0000e0000d', '~> 3rd value is correct');

	t.end();
});

test('decrypt()', t => {
	let key = 'foobar';

	let foo = lib.decrypt(key);
	t.is(typeof foo, 'function', 'returns a new function');

	let val1 = foo('0007f000720007b0007b00078');
	t.is(typeof val1, 'string', '~> factory produces a string');

	let val2 = foo('0006000078000650007b00073');
	t.is(typeof val2, 'string', '~> factory produces a string');

	t.isNot(val1, val2, 'real-values are not the same');
	t.is(val1, 'hello', '~> 1st value is correct');
	t.is(val2, 'world', '~> 2nd value is correct');

	let val3 = lib.decrypt('hello')('0000a000070000e0000e0000d');
	t.is(val3, 'hello', '~> 3rd value is correct');

	t.end();
});

test('emoji', t => {
	let key = 'foobar';
	let val = 'Hello 🌔';

	let encryptVal = lib.encrypt(key)(val);
	let decryptVal = lib.decrypt(key)(encryptVal);

	t.is(encryptVal, '0005f000720007b0007b00078000370d82b0df03', '~> 1st value is correct');
	t.is(decryptVal, val, '~> 2nd value is correct');

	t.end();
})
