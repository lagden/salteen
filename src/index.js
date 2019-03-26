function toChars(str) {
	const arr = [];
	let i = 0;
	while (i < str.length) {
		arr.push(str.charCodeAt(i++));
	}
	return arr;
}

function reduce(hasher, base, value) {
	let i = 0;
	let str = '';
	const chars = base ? value.match(/.{1,5}/ug) : toChars(value);
	while (i < chars.length) {
		let tmp = base ? parseInt(chars[i++], 16) : chars[i++];
		for (let j=0; j < hasher.length;) {
			tmp ^= hasher[j++];
		}
		str += base ? String.fromCharCode(tmp) : tmp.toString(16).padStart(5, '0');
	}
	return str;
}

export function encrypt(key) {
	return reduce.bind(reduce, toChars(key), 0);
}

export function decrypt(key) {
	return reduce.bind(reduce, toChars(key), 1);
}
