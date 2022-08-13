foam.CLASS({
    package: 'styro.model',
    name: 'Definition',
    documentation: `
        Definition represents any FOAM definition. This includes class model
        definitions such as calls to foam.CLASS or foam.INTERFACE, and such
        definitions as foam.SCRIPT or foam.LIB.
    `,

    properties: [
        {
            class: 'Enum',
            of: 'styro.model.DefinitionType',
            name: 'type'
        }
    ]
});
