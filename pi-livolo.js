var ffi = require("ffi")

var libwiringPi = ffi.Library('/usr/local/lib/libwiringPi', {
                              'wiringPiSetup' : [ 'int', [] ],
                              'digitalWrite' : [ 'void', ['int', 'int'] ],
                              'pinMode': [ 'void', ['int', 'int'] ],
                              'delayMicroseconds' :  [ 'void', ['int', 'int'] ]
                              });

var libLivolo = ffi.Library('libLivoloWrapper', {
                            'newLivolo' : ['pointer', ['char'] ],
                            'Livolo_SendButton': ['void', [ 'pointer', 'int', 'char' ] ],
                            'deleteLivolo': ['void', [ 'pointer' ] ]
                            });

var pinMapping = {
    "3": 8,
    "5": 9,
    "7": 7,
    "8": 15,
    "10": 16,
    "11": 0,
    "12": 1,
    "13": 2,
    "15": 3,
    "16": 4,
    "18": 5,
    "19": 12,
    "21": 13,
    "22": 6,
    "23": 14,
    "24": 10,
    "26": 11,
    "29": 21,
    "31": 22,
    "32": 26,
    "33": 23,
    "35": 24,
    "36": 27,
    "37": 25,
    "38": 28,
    "40": 29
};

function isNumber(number) {
    return !isNaN(parseInt(number, 10));
}

function sanitizeNumber(pinNumber) {
    if (!isNumber(pinNumber)) {
        throw new Error("Invalid number.");
    }
    
    return parseInt(pinNumber, 10);
}

function sanitizePinNumber(pinNumber) {
    if (!isNumber(pinNumber) || !isNumber(pinMapping[pinNumber])) {
        throw new Error("Pin number isn't valid");
    }
    
    return parseInt(pinMapping[pinNumber], 10);
}

var livolo = {

mySwitch: null,
    
open: function(pinNumber, callback) {
    pinNumber = sanitizePinNumber(pinNumber);
    
    mySwitch = libLivolo.newLivolo(pinNumber);
    
    if (libwiringPi.wiringPiSetup() == -1){
        throw new Error("Error initialising WiringPi");
    }
    
    if (mySwitch.isNull()) {
        throw new Error("Error initialising Livolo");
    }
},

    
close: function(pinNumber, callback) {
    pinNumber = sanitizePinNumber(pinNumber);
    
    libLivolo.deleteLivolo(mySwitch);
},
    
read: function(groupId, deviceId, callback) {
    groupId = sanitizeNumber(groupId);
    deviceId = sanitizeNumber(deviceId);
},
    
write: function(groupId, deviceId, callback) {
    groupId = sanitizeNumber(groupId);
    deviceId = sanitizeNumber(deviceId);
    console.log("write: groupId: " + groupId + " deviceId: " + deviceId)

    libLivolo.Livolo_SendButton(mySwitch, groupId, deviceId);
},

toggle: function(pinNumber, groupId, deviceId) {
    pinNumber = sanitizePinNumber(pinNumber);
    groupId = sanitizeNumber(groupId);
    deviceId = sanitizeNumber(deviceId);

    console.log("Toogle: pinNumber: " + pinNumber + " groupId: " + groupId + " deviceId: " + deviceId)
	
    toggleSwitch = libLivolo.newLivolo(pinNumber);
    
    if (libwiringPi.wiringPiSetup() == -1){
        throw new Error("Error initialising WiringPi");
    }
    
    if (toggleSwitch.isNull()) {
        throw new Error("Error initialising Livolo");
    }
    else {
    	libLivolo.Livolo_SendButton(toggleSwitch, groupId, deviceId);
    }
}
};

livolo.export = livolo.open;
livolo.unexport = livolo.close;

module.exports = livolo;