/**
 * PC2 desktop pack tool
 *
 * @author Yuwei
 */
var fs = require('fs'),
    path = require('path');


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
var grep = function (prefix, mask, exclude) {
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
}

module.exports = (function() {
    return {
        'css' : require('csso'),
        'js' : require('uglify-js'),
        util : {
            regGrep : grep
        }
    }
}());