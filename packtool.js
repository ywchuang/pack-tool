/**
 * pack tool
 *
 * @author Yuwei
 */
var fs = require('fs'),
    path = require('path');



var
    /**
     * custom functions
     * grep files in specific folder with prefix and have the ability to filter by regexp
     *
     * @param prefix String
     * @param mask String
     * @param exclude String
     *
     * @return Array
     */
    grep = function (prefix, mask, exclude) {
        var matchRegex = new RegExp(mask),
            excludeRegex = new RegExp(exclude),
            output = [], input = [],
            i;

        try {
            input = fs.readdirSync(prefix);
        } catch (err) { }

        for (i in input) {
            if (input.hasOwnProperty(i)) {
                if ((typeof exclude !== 'undefined') && (input[i].match(excludeRegex))) {
                    //logger.log('skip ' + input[i]);
                    continue;
                }
                if (input[i].match(matchRegex)) {
                    output.push(path.join(prefix, input[i]));
                }
            }
        }
        return output.sort();
    },
    /**
     * cope file from fPath to tPath
     *
     * @param fPath String
     * @param tPath String
     */
    cp = function (fPath, tPath) {
        try {
            fs.createReadStream(fPath).pipe(fs.createWriteStream(tPath));
        } catch (err) {
            console.log(err);
        }
    };

module.exports = (function() {
    return {
        'css' : require('csso'),
        'js' : require('uglify-js'),
        util : {
            regGrep : grep,
            cp : cp
        }
    }
}());