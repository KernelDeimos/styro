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
        'model/SourceFile',
        'model/relationships',
        'window/StartWindow',
        'ui/Controller',
        'ui/facet/BigChoiceView',
        'ui/refine/ManifestBigChoiceView',
        'ui/Placeholder',
        'ui/Flex',
        'ui/Frame',
        'ui/Window',
        'ui/WindowConsumer',
        'scratchpad'
    ].map(name => ({ name, flags: 'js' })),
    projects: [
        { name: 'foam/pom' }
    ]
});
