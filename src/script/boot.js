const path_ = require('path');

require('../../node_modules/foam3/src/foam_node');
globalThis.foam.flags.node = true;

foam.require(path_.join(__dirname, '../../pom'));

foam.CLASS({
    package: 'styro',
    name: 'InstanceController',

    requires: ['styro.StartWindow'],

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
        }
    ];
    
    let xSpec = {};
    for ( const service of services ) {
        value = foam.json.parse(service.value);
        xSpec[service.name] = value;
    }

    let x = foam.__context__.createSubContext(xSpec);

    const setupEvent = styro.corn.SetupEvent.create({
        terminalDAO: foam.dao.MDAO
    });

    for ( const service of services ) {
        const evt = setupEvent.clone();
        evt.serviceName = service.name;
        x[service.name].cmd_(x, evt);
    }

    const ins = styro.InstanceController.create({
        config: {
            services
        }
    }, x);
    ins.execute();
}
