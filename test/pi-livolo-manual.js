var ffi = require("ffi")

var libwiringPi = ffi.Library('/usr/local/lib/libwiringPi', {
                              'wiringPiSetup' : [ 'int', [] ],
                              'digitalWrite' : [ 'void', ['int', 'int'] ],
                              'pinMode': [ 'void', ['int', 'int'] ],
                              'delayMicroseconds' :  [ 'void', ['int', 'int'] ]
                              })

var libLivolo = ffi.Library('../build/Release/livolo', {
                            'setPin' : ['void', ['char'] ],
                            'sendButton': ['void', [ 'int', 'char' ] ]
                            })

if (process.argv.length < 5) {
    console.log('Arguments: Livolo Switch Code')
    process.exit()
}

var PIN = parseInt(process.argv[2]);
var remoteId = parseInt(process.argv[3]);
var keyCode = parseInt(process.argv[4]);
libLivolo.setPin(PIN);

console.log("PIN: " + PIN);
console.log("remoteId: " + remoteId);
console.log("keyCode: " + keyCode);

if (libwiringPi.wiringPiSetup() == -1){
    return 1;
    printf("Error initialising WiringPi");
}

libLivolo.sendButton(mySwitch, remoteId, keyCode);