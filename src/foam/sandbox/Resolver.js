foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'Resolver',

    properties: [
        {
            class: 'Map',
            name: 'resolutions'
        }
    ],

    methods: [
        function resolve(value) {
            if ( ! value?.__STYRO_NODE__ ) {
                throw new Error('tried to resolve a non-node');
            }
            return this.resolve_(value.__STYRO_NODE__);
        },
        function resolve_(node) {
            const name = node.cls_.name;
            return this.resolutions[name](
                node,
                this.resolve_.bind(this)
            );
        }
    ]
});