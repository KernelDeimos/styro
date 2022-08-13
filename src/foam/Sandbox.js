foam.CLASS({
    package: 'styro.foam',
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

    properties: [
        {
            class: 'Object',
            name: 'vmContext',
            factory: function () {
                const ctx = { foam: {} };
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
                for ( const method of styro_.methods ) {
                    ctx.foam[method] =
                        styro_.register.bind(styro_, method);
                }
                ctx.foam.styro_ = styro_;

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