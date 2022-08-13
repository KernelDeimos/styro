foam.CLASS({
    package: 'styro.foam.model',
    name: 'POM',

    properties: [
        {
            class: 'String',
            name: 'name'
        },
        {
            class: 'Int', // TODO: try string
            name: 'version'
        },
        {
            class: 'FObjectArray',
            of: 'styro.foam.model.POMEntry',
            name: 'projects'
        },
        {
            class: 'FObjectArray',
            of: 'styro.foam.model.POMEntry',
            name: 'files'
        }
    ]
});
