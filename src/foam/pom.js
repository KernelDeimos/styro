foam.POM({
    name: 'styro-foam',
    version: 1,
    files: [
        'model/POMEntry',
        'model/POM',
        'model/POMFile',
        'SourceLoader',
        'POMLoader',
        'sandbox/Sandbox',
        'sandbox/Globals',
    ].map(name => ({ name, flags: 'js' }))
});