// uses local storage
chrome.storage.local.set({ key: value }, function () {
	console.log("Value is set to " + value);
});


// to retrieve the data, use 'sync' instead of 'local' if using sync
chrome.storage.local.get(["key"], function (result) {
	console.log("Value currently is " + result.key);
});
const TOKENKEY="ujwt"
async function login(){
    let result=chrome.storage.local.get([TOKENKEY]);
    if(result[TOKENKEY]){
        
    }
    await chrome.storage.local.set({
        TOKENKEY:null
    })
}
async function logout(){
    await chrome.storage.local.set({
        TOKENKEY:null
    })
}