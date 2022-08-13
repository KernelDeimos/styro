foam.CLASS({
    package: 'styro.corn',
    name: 'Logger',

    methods: [
        function log(...a) {
            console.log('[styro]', ...a);
        },
        function warn(...a) {
            console.warn('[styro]', ...a);
        }
    ]
});
