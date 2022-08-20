foam.CLASS({
    package: 'styro.foam.sandbox',
    name: 'RawDefinition',

    properties: [
        {
            class: 'Enum',
            of: 'styro.foam.model.DefinitionType',
            name: 'method'
        },
        {
            class: 'Object',
            name: 'value'
        }
    ]
})