module.exports = exports = function() {

    var crypto = require('crypto');


    /*
     * Default encoding alphabets
     * URL-friendly base-64 encoding is chosen.  Base-32 is best suited
     * for tiny-URL like applications, because I and 1 can't be confused
     * and the upper-case characters are more easily remembered by a human.
     *
     * Where "native", we use the bignum native encoding routine.
     */
    var defaultAlphabets = {
        10: "0123456789",
        16: "0123456789ABCDEF",
        32: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        36: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        62: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
    };


    return function(options, cb) {
        var len = options.len || 7;
        // if an alphabet was specified it takes priorty
        // otherwise use the default alphabet for the given base
        var base = options.alphabet ? options.alphabet.length : (options.base || 64);
        var alphabet = options.alphabet || defaultAlphabets[base];

        if (!alphabet) {
            var err = new Error(
                "Only base " +
                Object.keys(alphabets).join(", ") +
                " supported if an alphabet is not provided."
            );
            cb(err, null);
            return;
        }

        // Randomize alphabet (http://stackoverflow.com/a/13365977/1160800)
        var id = alphabet.split('').sort(function(){return 0.5-Math.random()}).join('');

        // Get a random cut start for the final id
        var maxCutStart = alphabet.length - len;
        var cutStart = Math.floor(Math.random() * maxCutStart);

        // Cut a part of the random alphabet to get the id
        id = id.substring(cutStart, cutStart+len);

        cb(null, id);
    };
}();
