//Support functions for COMP1812 and COMP1345
//version2 - Works for Windows only
module.exports = {


    output : function (theText)
    {
        var fs = require('fs');
        fs.writeSync(1, theText + "\n");
    },

    input : function (theText)
    {
        var fs = require('fs');
        fs.writeSync(1, theText);
        process.stdin.resume();
        var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
        process.stdin.pause();
        return response[0].trim();
    },

    inputText : function (theText)
    {
        var fs = require('fs');
        fs.writeSync(1, theText);
        process.stdin.resume();
        var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
        process.stdin.pause();
        return response[0].trim();
    },

    inputInteger : function (theText)
    {
        var fs = require('fs');
        fs.writeSync(1, theText);
        process.stdin.resume();
        var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
        process.stdin.pause();
        return parseInt(response[0].trim());
    },

    inputBoolean : function (theText)
    {
        var fs = require('fs');
        fs.writeSync(1, theText);
        process.stdin.resume();
        var response = fs.readSync(process.stdin.fd, 100, 0, "utf8");
        process.stdin.pause();
        var value = response[0].trim();
        return  (value == true || value === "yes" || value == "true");
    }

};
