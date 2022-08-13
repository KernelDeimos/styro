foam.CLASS({
    package: 'styro',
    name: 'StartWindow',

    nodeRequires: [
        'path as path_',
        'electron as e_'
    ],

    requires: [
        'styro.foam.POMLoader',
        'styro.foam.Sandbox'
    ],

    methods: [
        async function execute() {
            const self = this;
            const win = new this.e_.BrowserWindow({
                transparent: true,
                width: 800,
                height: 800,
                autoHideMenuBar: true,
                webPreferences: {
                    preload: this.path_.join(__dirname, '../script/preload.js'),
                }
            });
            win.loadFile(this.path_.join(__dirname, '../resources/start.html'));
            win.webContents.openDevTools();
            const menuTemplate = [
                {
                    label: 'File',
                    submenu: [
                        {
                            label: 'Open',
                            async click () {
                                const result = await self.e_.dialog.showOpenDialog({
                                    filters: [
                                        {
                                            name: 'POM file',
                                            extensions: ['js']
                                        }
                                    ]
                                });
                                // TODO: call POMLoader
                                const loader = self.POMLoader.create();
                                for ( const path of result.filePaths ) {
                                    await loader.load(path);
                                }
                            }
                        },
                        {
                            role: 'close'
                        }
                    ]
                }
            ];
            const menu = this.e_.Menu.buildFromTemplate(menuTemplate);
            win.setMenu(menu);
        } 
    ]
});
