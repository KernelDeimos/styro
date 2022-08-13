foam.POM({
    name: 'untitled-src',
    version: 1,
    files: [
        'NodeRequires',
        'corn/EasyDAO',
        'corn/SetupEvent',
        'electron/IPCRendererDAO',
        'electron/IPCMainDAO',
        'corn/Client',
        'model/Manifest',
        'window/StartWindow'
    ].map(name => ({ name, flags: 'js' })),
    projects: [
        { name: 'foam/pom' }
    ]
});
