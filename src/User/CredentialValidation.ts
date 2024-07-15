export const verifyPasswordStrength = (password: string): boolean => {
	if (password.length < 8) {
		return false;
	}

	let hasUpperCase = false;
	let hasLowerCase = false;
	let hasSpecialChar = false;

	const aLower = 'a'.charCodeAt(0);
	const zLower = 'z'.charCodeAt(0);
	const aUpper = 'A'.charCodeAt(0);
	const zUpper = 'Z'.charCodeAt(0);

	for (let i = 0; i < password.length; i++) {
		const ascii = password.charCodeAt(i);
		if (ascii < 32) {
			return false;
		}

		if (ascii >= aLower && ascii <= zLower) {
			hasLowerCase = true;
		} else if (ascii >= aUpper && ascii <= zUpper) {
			hasUpperCase = true;
		} else {
			hasSpecialChar = true;
		}
	}

	if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
		return false;
	}

	return true;
};

function isAlphaLower(char: string) {
	return (char.charCodeAt(0) >= 'a'.charCodeAt(0) && char.charCodeAt(0) <= 'z'.charCodeAt(0));
}

function isNumeric(char: string) {
	return char.charCodeAt(0) >= '0'.charCodeAt(0) && char.charCodeAt(0) <= '9'.charCodeAt(0);
}

function isDot(char: string) {
	return char.charCodeAt(0) === '.'.charCodeAt(0);
}

function isUsernameSpecial(char: string) {
	return char === '-' || char === '_' || char === '.';
}

export const verifyUsername = (username: string): boolean => {
	if (username.length < 3 || username.length > 64) {
		return false;
	}

	const usernameLower: string = username.toLowerCase();

	for (let i = 0; i < usernameLower.length; i++) {
		const ascii = usernameLower.toLowerCase().charAt(i);
		if (!isAlphaLower(ascii) && !isNumeric(ascii) && !isUsernameSpecial(ascii)) {
			return false;
		}
	}

	return true;
};

export const verifyEmailFormat = (email: string): boolean => {
	const split = email.toLowerCase().split('@');
	if (split.length !== 2) {
		return false;
	}

	const [local, domain] = split;

	if (local.length === 0 || domain.length === 0) {
		return false;
	}
	
	let lastPeriodPos: number = -1;
	for (let i = 0; i < local.length; i++) {
		const char = local.charAt(i);
		if (i === 0 || i === (local.length - 1)) {
			if (!isAlphaLower(char)) {
				return false;
			}
		} else {
			if (!isAlphaLower(char) && !isNumeric(char) && !isDot(char)) {
				return false;
			}
			if (char === '.') {
				if (i === (lastPeriodPos + 1)) {
					return false;
				}
				lastPeriodPos = i;
			}
		}
	}

	const domainSplit = domain.split('.');

	if (domainSplit.length !== 2) {
		return false;
	}

	return true;

	// const [domainName, tld] = domainSplit;

	// TODO: verify domain name and tld
	// Note: invalid domain names will just result in no registration
};

