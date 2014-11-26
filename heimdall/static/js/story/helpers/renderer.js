
// the forward and reverse map for tag to type
var typeToTag = {
    bold: 'b',
    italic: 'em'
};

var tagToType = {};
for (var key in typeToTag) {
    if (typeToTag.hasOwnProperty(key)) {
        tagToType[typeToTag[key]] = key;
    }
}

var Renderer = {
    /**
     * Takes a model and returns the corrosponding HTML representation
     * as a html string.
     *
     * @param  {object} model The model object
     * @return {string}       The HTML string
     */
    toHTML: function(model) {
        var text = model.text;

        // create a meta operations array
        var metaOps = [];
        model.meta.forEach(function(style) {
            var tagName = typeToTag[style.type] || 'span';

            metaOps.push({
                index: style.selection[0],
                tag: '<' + tagName + '>'
            });

            metaOps.push({
                index: style.selection[1],
                tag: '</' + tagName + '>'
            });
        });

        // sort the ops based on index and tags
        metaOps.sort(function(a, b) {
            var diff = a.index - b.index;
            if (diff !== 0) {
                return diff;
            }

            // if index is same use tag ordering
            // heirarchy = <b><em>
            var table = {
                '<b>': 1,
                '<em>': 2,
                '</em>': 3,
                '</b>': 4
            };

            return table[a.tag] - table[b.tag];
        });

        // apply the ops
        var currentIndex = 0;
        var parts = [];
        metaOps.forEach(function(op) {
            if (currentIndex < op.index) {
                parts.push(text.slice(currentIndex, op.index));
                currentIndex = op.index;
            }

            parts.push(op.tag);
        });
        parts.push(text.slice(currentIndex));

        return parts.join('');
    },

    /**
     * Takes the html string and map it to a model object, the
     * html should be valid innerHTML of a TextView, all tags
     * must be closed (no self closing tags) and balanced properly
     *
     * This function will __not__ operate on arbitrary HTML and assumes
     * alot about the structure of the input
     *
     * @param  {string} html The html text
     * @return {object|null}      The model object, or null on failure
     */
    fromHTML: function(html) {
        html = html.trim();

        var _html = html;

        var textParts = [];
        var ops = [];
        var indexOffset = 0;

        while (true) {
            var tagStart = html.indexOf('<');

            // the text has no more tags
            if (tagStart === -1) {
                textParts.push(html);
                break;
            }

            // push the text till the tag and consume it
            var textPart = html.slice(0, tagStart);
            textParts.push(textPart);
            html = html.slice(tagStart);

            indexOffset += tagStart;

            var tagEnd = html.indexOf('>');

            // add the tag to ops
            var tag = html.match(/<\/?(\w+)/)[1];
            ops.push({
                tagName: tag,
                start: html.charAt(1) !== '/',
                index: indexOffset
            });

            // do tag specific processing here

            // consume the tag
            html = html.slice(tagEnd + 1);
        }

        // build the correct meta objects out of the tags
        // if all the html tags had the correct start and end
        // tags, then the length would be a multiple of 2.
        // and if we start from the middle and traverse to both sides
        // we can build the correct selections provided
        // all tags are correctly matched
        if (ops.length % 2 !== 0) {
            console.log('Unbalanced HTML Tags: ' + _html);
            return null;
        }

        var metaObjs = [];
        var stack = [];
        for (var i = 0; i < ops.length; i++) {
            var opA = ops[i];

            if (opA.start) {
                stack.push(opA);
                continue;
            }

            var opB = stack.pop();

            if (opA.tagName !== opB.tagName) {
                console.log('Invalid HTML: ' + _html);
                return null;
            }

            metaObjs.push({
                type: tagToType[opA.tagName],
                selection: [opB.index, opA.index]
            });
        }

        if (stack.length !== 0) {
            console.log('Unbalanced HTML Tags: ' + _html);
            return null;
        }

        return {
            text: textParts.join(''),
            meta: metaObjs
        };

    }
};

module.exports = Renderer;
