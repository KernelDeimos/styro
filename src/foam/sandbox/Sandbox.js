foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'Sandbox',
    documentation: `
        Sandbox loads FOAM source files using a mock FOAM environment.

        node:vm is used to prevent files loaded from accessing editor variables
        or manipulating static values of required modules. This also ensures
        that projects with broken code can still be loaded.
    `,

    imports: [
        'logger'
    ],

    nodeRequires: [
        'path as path_',
        'fs as fs_',
        'node:vm as vm_',
        'verror as verror_'
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

                    // TODO: maybe we run it here
                    if ( method === 'SCRIPT' ) return;

                    const id = (({ id, package, name }) =>
                        id || (package ? package + '.' + name : name)
                    )(value);

                    if ( ! id ) {
                        // TODO: why does this happen?
                        // console.error(method, id)
                        // if ( method == 'RELATIONSHIP' ) throw new Error('what')
                        return;
                    }

                    // const root = value.package.split('.')[0];
                    const { root } = styro.foam.sandbox.Globals.ensure(
                        ctx, self.Global.create(), id);

                    // Constants can be evaluated inside the sandbox
                    if ( value?.constants ) {
                        if ( Array.isArray(value.constants) ) {
                            for ( const spec of value.constants ) {
                                const value = spec.factory
                                    ? spec.factory.call(root)
                                    : spec.value;
                                root[spec.name] = value;
                                const parts = id.split('.');
                                let asdf = ctx;
                                for ( let i = 0 ; i < parts.length ; i++ ) {
                                    asdf = asdf[parts[i]];
                                }
                            }
                        } else {
                            for ( const k in value.constants ) {
                                root[k] = value.constants[k];
                            }
                        }
                    }
                };

                let ctxFoam = styro.foam.sandbox.Globals.getProxy(
                    self.Global.create({ prop: 'foam' })
                );

                for ( const method of styro_.methods ) {
                    ctxFoam[method] =
                        styro_.register.bind(styro_, method);
                }
                ctxFoam.styro_ = styro_;
                ctxFoam.String = foam.String;

                const foamMask = [
                    ...styro_.methods,
                    'String',
                    'styro_'
                ];
                
                ctxFoam = new Proxy(ctxFoam, {
                    set (target, prop, value, accessorThis) {
                        self.logger.log(`tried to set ${prop} on foam; ` +
                            "this is expected if we're loading foam.core")
                        return true;
                    }
                });

                ctx.foam = ctxFoam;

                ctx.console = console;

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
            try {
                script.runInContext(this.vmContext);
            } catch (e) {
                console.error(e);
                throw new this.verror_(e, 'processing: %s', path);
            }
            return this.vmContext.foam.styro_.results;
        },
        function addWarningGlobals_ (ctx) {
            ctx.require = function (...a) {
                console.warn('[sandbox] Attempt to call require' +
                    ' - returning undefined');
            }
            ctx.document = styro.foam.sandbox.Globals.getProxy(
                this.Global.create({ prop: 'document' })
            )
        }
    ]
});