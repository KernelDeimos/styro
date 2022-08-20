foam.CLASS({
    name: 'styro.foam.ModelRefinement',
    refines: 'foam.core.Model',
    
    properties: [
        {
            class: 'AxiomArray',
            of: 'Method',
            name: 'methods',
            adaptArrayElement: function(o, prop) {
                if ( o === undefined ) {
                    // This happens when loading the Model model, because it takes
                    // a method from "foam.boot.buildClass", which is deleted after
                    // EndBoot. Still not sure of a good solution to this problem.
                    return function () {};
                }
                if ( typeof o === 'function' ) {
                    var name = foam.Function.getName(o);
                    foam.assert(name, 'Method must be named');
                    var m = this.__context__.lookup(prop.of).create();
                    m.name = name;
                    m.code = o;
                    return m;
                }
                if ( this.__context__.lookup(prop.of).isInstance(o) ) return o;
                if ( o.class ) return this.__context__.lookup(o.class).create(o, this);
                return foam.lookup(prop.of).create(o);
            }
        }
    ]
});
