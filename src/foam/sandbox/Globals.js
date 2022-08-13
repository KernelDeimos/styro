foam.LIB({
    name: 'styro.foam.sandbox.Globals',

    methods: [
        function getProxy(node) {
            const fn = function (...args) {
                return styro.foam.sandbox.Call.create({ node, args })
            };
            return new Proxy(fn, {
                get (target, prop, accessorThis) {
                    return styro.foam.sandbox.Globals.getProxy(
                        styro.foam.sandbox.Dot.create({ node, prop })
                    );
                }
            })
        }
    ]
});

foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'Dot',

    properties: [
        'node',
        'prop'
    ]
});

foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'Call',

    properties: [
        'node',
        'args'
    ]
});

foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'Global',

    properties: [
        'prop'
    ]
})
