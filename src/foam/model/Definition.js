foam.CLASS({
    package: 'styro.foam.model',
    name: 'Definition',
    documentation: `
        Definition represents any FOAM definition. This includes class model
        definitions such as calls to foam.CLASS or foam.INTERFACE, and such
        definitions as foam.SCRIPT or foam.LIB.
    `,

    requires: [
        'styro.foam.model.DefinitionType',
        'styro.foam.model.ScriptModel'
    ],

    properties: [
        {
            class: 'String',
            name: 'sourceFile'
        },
        {
            class: 'String',
            name: 'id',
            factory: function () {
                return foam.uuid.randomGUID();
            }
        },
        {
            class: 'Enum',
            of: 'styro.foam.model.DefinitionType',
            name: 'type'
        },
        // {
        //     class: 'Class',
        //     name: 'of',
        //     expression: function (type) {
        //         if ( type == this.DefinitionType.ENUM ) {
        //             return foam.core.EnumModel;
        //         }
        //         if ( type == this.DefinitionType.INTERFACE ) {
        //             return foam.core.InterfaceModel;
        //         }
        //         if ( type == this.DefinitionType.RELATIONSHIP ) {
        //             return foam.dao.Relationship;
        //         }
        //         if ( type == this.DefinitionType.SCRIPT ) {
        //             return this.ScriptModel;
        //         }
        //         return foam.core.Model;
        //     }
        // },
        {
            // class: 'FObjectProperty',
            class: 'RawObject',
            name: 'data'
        }
    ]
});
