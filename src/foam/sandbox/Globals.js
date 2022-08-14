foam.LIB({
    name: 'styro.foam.sandbox.Globals',

    documentation: `
        When loading FOAM models in the sandbox, sometimes properties are
        accessed on the FOAM global or other globals that were created by
        foam.SCRIPT or foam.LIB definitions. SCRIPTs and LIBs are not run for
        real because we want to process everything as statically as possible.

        This lib provides methods to create a recursive proxy, which is
        indexable and callable, and tracks the chain of evaluation.

        For example, suppose a model definition contains the following:

        {
            name: foam.Function.memoize1(function () {})
        }

        since this 'foam' was created using Globals.getProxy, 'name' will
        contain a proxy object. Accessing __STYRO_NODE__ on this proxy will
        return the chain of evaluation; for example: ...

        o.name.__STYRO_NODE__

        ...will return an object that looks like this:

        Call(Dot(Dot(Global(foam), 'Function'), 'memoize1'), function () {...})
    `,

    methods: [
        function getProxy(node, opt_target) {
            const target = opt_target || function (...args) {
                return styro.foam.sandbox.Globals.getProxy(
                    styro.foam.sandbox.Call.create({ node, args })
                );
            };
            target.__STYRO_NODE__ = node;
            const cache = {};
            return new Proxy(target, {
                get (target, prop, accessorThis) {
                    if ( target.hasOwnProperty(prop) ) {
                        return Reflect.get(...arguments);
                    }
                    if ( ! cache[prop] ) {
                        cache[prop] = styro.foam.sandbox.Globals.getProxy(
                            styro.foam.sandbox.Dot.create({ node, prop })
                        );
                    }
                    return cache[prop];
                }
            })
        },
        // based on foam.util.path, but creates proxies
        function ensure(root, node, path) {
            const a = path.split('.');

            for ( let i = 0 ; i < a.length ; i++ ) {
                let nextRoot = root[a[i]];
                let nextNode = styro.foam.sandbox.Dot.create({
                    node, prop: a[i] });
                if ( nextRoot === undefined ) {
                    nextRoot = root[a[i]] = this.getProxy(nextNode);
                }

                root = nextRoot;
                node = nextNode;
            }

            return { root, node };
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
