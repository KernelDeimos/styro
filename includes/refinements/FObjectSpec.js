foam.CLASS({
    package: 'com.ericdube.refinements',
    name: 'FObjectSpecRefinement',
    refines: 'foam.util.FObjectSpec',

    methods: [
        function installInProto(proto) {
            this.SUPER(proto);
            const self = this;
            Object.defineProperty(proto, self.name + '$create', {
                get: function fObjectSpecCreateGetter() {
                    return function fObjectSpecCreate(args, ctx) {
                        const val = this[self.name];
                        return foam.json.parse({
                            ...val, ...args
                        }, undefined, ctx);
                    }
                }
            })
        }
    ]
});
