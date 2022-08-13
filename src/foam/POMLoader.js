foam.CLASS({
    package: 'styro.foam',
    name: 'POMLoader',

    imports: [
        'logger',
        'manifestDAO'
    ],

    nodeRequires: [
        'path as path_',
        'fs as fs_'
    ],

    requires: [
        'styro.foam.sandbox.Sandbox',
        'styro.foam.model.POM',
        'styro.foam.model.POMFile'
    ],

    methods: [
        async function load (path) {
            const sandbox = this.Sandbox.create();
            return this.load_(sandbox, path);
        },
        async function load_ (sandbox, path) {
            const definitions = await sandbox.eval(path);

            for ( let i = 0 ; i < definitions.length ; i++ ) {
                const def = definitions[i];

                if ( def.method !== 'POM' ) {
                    this.logger.warn(
                        `unexpected call to foam.${def.method} in POM file: ` +
                        path);
                    continue;
                }

                // console.log('loading pom', path, def.value);
                const pom = this.POM.create(def.value);
                const pomFile = this.POMFile.create({
                    id: i == 0 ? path : path + ':' + i,
                    basePath: this.path_.dirname(path),
                    contents: pom
                });

                this.manifestDAO.put(pomFile);

                await this.loadProjects_(sandbox, pomFile);
                await this.loadFiles_(sandbox, pomFile);
            }
        },
        async function loadFiles_ (sandbox, pomFile) {
            //
        },
        async function loadProjects_ (sandbox, pomFile) {
            if ( ! pomFile.contents.projects ) return;
            for ( const entry of pomFile.contents.projects ) {
                const entryPath = this.path_.join(pomFile.basePath, entry.name + '.js');
                await this.load_(sandbox, entryPath);
                // ???: maybe add relationship between POM files
            }
        }
    ]
});
