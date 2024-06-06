'use server'
import bcrypt from 'bcryptjs';
export async function generateUUID() {
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
export async  function customEncrypt(plaintext:string) {
    return bcrypt.hashSync(plaintext, 10)
}
export async  function customEncryptCompare(plaintext:string,hashed:string) {
    return bcrypt.compareSync(plaintext, hashed)
}
export async function getPublicIP(){
    const pc = new RTCPeerConnection({ iceServers: [ {urls: 'stun:stun.l.google.com:19302'} ] });
    pc.createDataChannel('');
    pc.createOffer().then(offer => pc.setLocalDescription(offer))
    pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
            console.log("all done.");
            pc.close();   
            return;
        }
        let split = ice.candidate.candidate.split(" ");
        if (split[7] === "host") {
            console.log(`Local IP : ${split[4]}`);
        } else {
            console.log(`External IP : ${split[4]}`);
            return split[4]
        }
    };
}