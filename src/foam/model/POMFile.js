foam.CLASS({
    package: 'styro.foam.model',
    name: 'POMFile',
    extends: 'styro.model.Manifest',
    documentation: 'represents a real physical pom.js file',

    properties: [
        {
            class: 'Boolean',
            name: 'loaded'
        },
        {
            class: 'FObjectProperty',
            of: 'styro.foam.model.POM',
            name: 'contents'
        },
        {
            class: 'String',
            name: 'basePath'
        },
        {
            name: 'name',
            expression: function (contents$name) {
                return contents$name;
            }
        },
        {
            name: 'version',
            expression: function (contents$version) {
                return contents$version;
            }
        }
    ],
});
