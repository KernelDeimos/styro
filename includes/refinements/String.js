foam.LIB({
    name: 'foam.String',

    methods: [
        function dedent (str) {
            const lines = str.split('\n');

            let mindent = Number.MAX_SAFE_INTEGER;

            // first pass: get minimum indent amount
            for ( const line of lines ) {
                if ( line.trim() == '' ) continue;
                const indentMatch = line.match(/^\s+/);
                const indentCount = indentMatch == null ? 0 : indentMatch[0].length;
                mindent = Math.min(mindent, indentCount);
            }

            console.log('mindent', mindent);

            // second pass: dedent each line
            for ( let i = 0 ; i < lines.length ; i++ ) {
                lines[i] = lines[i].slice(mindent);
            }

            return lines.join('\n');
        }
    ]
});
