import { pbkdf2 } from "node:crypto";

const hashPwConfig = {
	iterations: 50000,
	keylen: 64,
	digest: "sha512",
};

// Promise based, pre-configured pbkdf2 function
export function hashPassword(password: string, salt: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		pbkdf2(
			password,
			salt,
			hashPwConfig.iterations,
			hashPwConfig.keylen,
			hashPwConfig.digest,
			(err, key) => {
				if (err) {
					reject(err);
				} else {
					resolve(key);
				}
			}
		);
	});
}
