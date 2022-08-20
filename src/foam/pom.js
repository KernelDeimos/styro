foam.POM({
    name: 'styro-foam',
    version: 1,
    files: [
        'refinements',
        'model/POMEntry',
        'model/POM',
        'model/POMFile',
        'model/DefinitionType',
        'model/Definition',
        'model/ScriptModel',
        'model/relationships',
        'SourceLoader',
        'POMLoader',
        'sandbox/RawDefinition',
        'sandbox/Sandbox',
        'sandbox/Globals',
        'sandbox/Resolver',
        'patch/RawObject'
    ].map(name => ({ name, flags: 'js' }))
});