import bcrypt from 'bcryptjs';
export function generateUUID() {
    let u = new Uint8Array(16);
    crypto.getRandomValues(u);
    // 0x40 is reserved variant from RFC 4122
    u[8] = (u[8] | 0x40) & 0x7F;
    // Set the four most significant bits (bits 12 through 15) of the
    // time_hi_and_version field to the 4-bit version number.
    u[6] = (u[6] & 0x0F) | 0x40;

    // Convert byte array to hex string
    function byteArrayToHexString(arr:Uint8Array) {
        return Array.from(arr, function(byte:number) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    }

    return [
        byteArrayToHexString(u.subarray(0, 4)),
        byteArrayToHexString(u.subarray(4, 6)),
        byteArrayToHexString(u.subarray(6, 8)),
        byteArrayToHexString(u.subarray(8, 10)),
        byteArrayToHexString(u.subarray(10))
    ].join('-');
}
export function customEncrypt(plaintext:string) {
    return bcrypt.hashSync(plaintext, 10)
}
export function customEncryptCompare(plaintext:string,hashed:string) {
    return bcrypt.compareSync(plaintext, hashed)
}