foam.CLASS({
    package: 'styro.ui',
    name: 'TestEl',
    extends: 'foam.u2.Element',

    imports: [
        'consumeWindow'
    ],

    requires: [
        'styro.ui.Window'
    ],

    css: `
        ^ {
            display: flex;
            flex-direction: column;
        }
        ^ > button {
            display: block;
        }
    `,

    properties: [
        {
            name: 'selection',
            postSet: function () {
                console.log('i was set');
            }
        },
        {
            class: 'String',
            name: 'testSearch',
            view: {
                class: 'foam.u2.SearchField',
                onKey: true,
                ariaLabel: 'Test Search',
                autocomplete: false
            },
            value: ''
        },
    ],

    methods: [
        function render () {
            this
                .addClass()
                .start('button')
                    .add('test file prompt')
                    .on('click', () => {
                        this.consumeWindow(this.Window.create({
                            view: {
                                class: 'foam.u2.view.SuggestedTextField',
                                daoKey: 'sourceFileDAO',
                                onSelect: this.rowClick.bind(this)
                            }
                        }))
                    })
                .end()
                .start('button')
                    .add('test pom file list')
                    .on('click', () => {
                        this.consumeWindow(this.Window.create({
                            view: {
                                class: 'foam.u2.DAOList',
                                selection: this.selection$,
                                rowView: {
                                    class: 'styro.ui.facet.BigChoiceView',
                                    of: 'styro.model.Manifest'
                                }
                            },
                            data: this.__subContext__.manifestDAO
                        }))
                    })
                .end()
                .start('button')
                    .add('test project tree')
                    .on('click', () => {
                        this.consumeWindow(this.Window.create({
                            view: {
                                class: 'foam.u2.view.TreeView',
                                relationship:
                                    styro.model.ManifestManifestDependanciesRelationship,
                                startExpanded: true,
                                query: this.testSearch$
                            },
                            data: this.__subContext__.manifestDAO
                        }))
                    })
                .end()
        }
    ],

    listeners: [
        function rowClick (obj) {
            this.consumeWindow(this.Window.create({
                view: {
                    class: 'foam.u2.DetailView',
                },
                data: obj
            }))
        }
    ]
});
