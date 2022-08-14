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
        'ui/facet/BigChoiceView',
        'ui/refine/ManifestBigChoiceView'
    ].map(name => ({ name, flags: 'js' })),
    projects: [
        { name: 'foam/pom' },
        { name: '../includes/wm/pom' }
    ]
});
