foam.CLASS({
    package: 'styro',
    name: 'StartWindow',

    nodeRequires: [
        'path as path_',
        'electron as e_'
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
                                const fileNames = await self.e_.dialog.showOpenDialog({
                                    filters: [
                                        {
                                            name: 'POM file',
                                            extensions: ['js']
                                        }
                                    ]
                                });
                                // TODO: call POMLoader
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
