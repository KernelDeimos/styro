foam.POM({
    name: 'com-ericdube-refinements',
    version: 1,
    files: [
        'Element',
        'FObjectHistory',
        'FObjectSpec',
        'String'
    ].map(name => ({ name, flags: 'js' }))
});
