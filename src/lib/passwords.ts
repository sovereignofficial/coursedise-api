const crypto = require('crypto');
const util = require("util");

const hashPassword = util.promisify(crypto.pbkdf2);

export const encryptPassword = async (input:string, passwordSalt:string) => {
    const passwordHash =  await hashPassword(
        input,
        passwordSalt,
        1000,
        64,
        "sha512"
    );

    return passwordHash.toString("hex");
}
