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
        'corn/Logger',
        'model/Manifest',
        'window/StartWindow',
        'ui/Controller',
    ].map(name => ({ name, flags: 'js' })),
    projects: [
        { name: 'foam/pom' },
        { name: '../includes/wm/pom' }
    ]
});
