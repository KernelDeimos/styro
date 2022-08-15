foam.CLASS({
    package: 'styro.foam',
    name: 'SourceLoader',

    imports: [
        'sourceFileDAO',
        'manifestSourceFileJunctionDAO'
    ],

    nodeRequires: [
        'path as path_',
        'fs as fs_'
    ],

    requires: [
        'styro.foam.sandbox.Sandbox',
        'styro.model.ManifestSourceFileJunction',
        'styro.model.SourceFile'
    ],

    methods: [
        async function load (path) {
            const sandbox = this.Sandbox.create();
            return this.load_(sandbox, path);
        },
        async function load_ (sandbox, path, opt_pom) {
            const definitions = await sandbox.eval(path);
            // TODO

            const sourceFile = this.SourceFile.create({
                id: path,
                type: 'application/javascript'
            });

            await this.sourceFileDAO.put(sourceFile);

            if ( opt_pom ) {
                const junction = this.ManifestSourceFileJunction.create({
                    sourceId: opt_pom.id,
                    targetId: sourceFile.id
                });
                await this.manifestSourceFileJunctionDAO.put(junction);
            }
        }
    ]
});
