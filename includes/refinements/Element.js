foam.CLASS({
    package: 'com.ericdube.lang',
    name: 'ElementRefinement',
    refines: 'foam.u2.Element',

    documentation: `
        Add this.clss(this, ...) shorthand for this.addClass(this.myClass(...))
    `,

    methods: [
        function clss(instance, ...clses) {
            for ( const cls of clses ) {
                this.addClass(instance.myClass(cls));
            }
            return this;
        }
    ]
});
