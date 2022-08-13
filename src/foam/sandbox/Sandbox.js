foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'Sandbox',
    documentation: `
        Sandbox loads FOAM source files using a mock FOAM environment.

        node:vm is used to prevent files loaded from accessing editor variables
        or manipulating static values of required modules. This also ensures
        that projects with broken code can still be loaded.
    `,

    nodeRequires: [
        'path as path_',
        'fs as fs_',
        'node:vm as vm_'
    ],

    requires: [
        'styro.foam.sandbox.Dot',
        'styro.foam.sandbox.Global',
    ],

    properties: [
        {
            class: 'Object',
            name: 'vmContext',
            factory: function () {
                const self = this;

                const ctx = {};
                this.addWarningGlobals_(ctx);

                const styro_ = {};
                styro_.methods = [
                    'POM', 'SCRIPT', 'LIB',
                    'CLASS', 'INTERFACE', 'ENUM',
                    'RELATIONSHIP'
                ];
                styro_.results = [];
                styro_.register = function (method, value) {
                    styro_.results.push({ method, value });
                };

                let ctxFoam = {};

                for ( const method of styro_.methods ) {
                    ctxFoam[method] =
                        styro_.register.bind(styro_, method);
                }
                ctxFoam.styro_ = styro_;

                const foamMask = [
                    ...styro_.methods,
                    'styro_'
                ];
                
                ctxFoam = new Proxy(ctxFoam, {
                    get (target, prop, accessorThis) {
                        if ( foamMask.includes(prop) ) {
                            return Reflect.get(...arguments);
                        }
                        console.log('TRIED TO GET', prop)
                        return styro.foam.sandbox.Globals.getProxy(
                            self.Dot.create({
                                node: self.Global.create({ prop: 'foam' }),
                                prop
                            })
                        )
                    },
                    set (target, prop, value, accessorThis) {
                        console.log('TRIED TO SET', prop)
                        return true;
                    }
                });

                ctx.foam = ctxFoam;

                this.vm_.createContext(ctx);
                return ctx;
            }
        }
    ],

    methods: [
        async function eval (path) {
            this.vmContext.foam.styro_.results = [];

            path = this.path_.resolve(path);
            let scriptText = await this.fs_.promises.readFile(path);

            const script = new this.vm_.Script(scriptText);
            script.runInContext(this.vmContext);
            return this.vmContext.foam.styro_.results;
        },
        function addWarningGlobals_ (ctx) {
            ctx.require = function (...a) {
                console.warn('[sandbox] Attempt to call require' +
                    ' - returning undefined');
            }
        }
    ]
});