foam.POM({
    name: 'styro-foam',
    version: 1,
    files: [
        'model/POMEntry',
        'model/POM',
        'model/POMFile',
        'POMLoader',
    ].map(name => ({ name, flags: 'js' }))
});