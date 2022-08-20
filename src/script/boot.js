const path_ = require('path');

require('../../node_modules/foam3/src/foam_node');
globalThis.foam.flags.node = true;

foam.require(path_.join(__dirname, '../../pom'));

(() => {
    const backupConsole = console;
    const backupConsoleLog = console.log;

    globalThis.HELP_ME = (...args) => {
        const messages = [];
        if ( console !== backupConsole ) {
            messages.push('[ALERT] console has been replaced');
        }
        if ( backupConsole.log != backupConsoleLog ) {
            messages.push('[ALERT] .log member of console has been replaced');
        }

        for ( const msg of messages ) {
            process.stdout.write(msg + '\n');
        }
        process.stdout.write('PROVIDED ARGS: [START]' + args.join('[D]') + '[END]\n');
    }
})();

foam.CLASS({
    package: 'styro',
    name: 'InstanceController',

    requires: [
        'styro.StartWindow',
        'styro.electron.IPCMainDAO'
    ],

    nodeRequires: [
        'electron as e_',
        'path as path_'
    ],

    properties: [
        'config'
    ],

    methods: [
        function init () {
        },
        async function execute () {
            const self = this;
            const e_ = this.e_;

            await e_.app.whenReady();

            e_.ipcMain.handle('getConfig', () => this.config);

            // Add IPC handlers for DAO operations
            for ( const service of this.config.services ) {
                styro.electron.IPCMainDAO.install(this.__subContext__, {
                    ipcMain: e_.ipcMain,
                    serviceName: service.name,
                    dao: this.__subContext__[service.name]
                });
            }

            this.StartWindow.create().execute();
        }
    ]
});

if ( module === require.main ) {
    const services = [
        {
            name: 'manifestDAO',
            value: {
                class: 'styro.corn.EasyDAO',
                of: 'styro.model.Manifest'
            }
        },
        {
            name: 'sourceFileDAO',
            value: {
                class: 'styro.corn.EasyDAO',
                of: 'styro.model.SourceFile'
            }
        },
        {
            name: 'manifestSourceFileJunctionDAO',
            value: {
                class: 'styro.corn.EasyDAO',
                of: 'styro.model.ManifestSourceFileJunction'
            }
        },
        {
            name: 'manifestManifestJunctionDAO',
            value: {
                class: 'styro.corn.EasyDAO',
                of: 'styro.model.ManifestManifestJunction'
            }
        },
        {
            name: 'definitionDAO',
            value: {
                class: 'styro.corn.EasyDAO',
                of: 'styro.foam.model.Definition'
            }
        }
    ];

    // let x = foam.box.Context.create().__subContext__;
    x = foam.__context__;
    
    let xSpec = {};
    for ( const service of services ) {
        value = foam.json.parse(service.value, undefined, x);
        xSpec[service.name] = value;
    }

    x = x.createSubContext(xSpec);

    const setupEvent = styro.corn.SetupEvent.create({
        terminalDAO: foam.dao.MDAO
    });

    for ( const service of services ) {
        const evt = setupEvent.clone();
        evt.serviceName = service.name;
        x[service.name].cmd_(x, evt);
    }

    x = x.createSubContext({
        logger: styro.corn.Logger.create()
    });

    const ins = styro.InstanceController.create({
        config: {
            services
        }
    }, x);
    ins.execute();
}
