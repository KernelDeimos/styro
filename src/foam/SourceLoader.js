foam.CLASS({
    package: 'styro.foam',
    name: 'SourceLoader',

    imports: [
        'sourceFileDAO'
    ],

    nodeRequires: [
        'path as path_',
        'fs as fs_'
    ],

    requires: [
        'styro.foam.sandbox.Sandbox',
        'styro.model.SourceFile'
    ],

    methods: [
        async function load (path) {
            const sandbox = this.Sandbox.create();
            return this.load_(sandbox, path);
        },
        async function load_ (sandbox, path) {
            const definitions = await sandbox.eval(path);
            // TODO
        }
    ]
});