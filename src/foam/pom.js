foam.POM({
    name: 'styro-foam',
    version: 1,
    files: [
        'model/POMEntry',
        'model/POM',
        'model/POMFile',
        'POMLoader',
        'Sandbox',
    ].map(name => ({ name, flags: 'js' }))
});