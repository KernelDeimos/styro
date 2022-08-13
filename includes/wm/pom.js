foam.POM({
    name: 'com-ericdube-wm',
    version: 1,
    files: [
        'api',
        'keyboard',
        'Window',
        'Container',
        'TileWindowManager',
        'TWMModel',
        'TWMView',
        'actions/ActionBar'
    ].map(name => ({ name, flags: 'js' })),
    projects: [
        { name: '../refinements/pom' },
        { name: '../command/pom' }
    ]
});
