foam.CLASS({
    package: 'styro.ui',
    name: 'Controller',
    extends: 'foam.u2.Controller',

    css: `
        :root {
            font-size: 10px;
        }
        BODY {
            margin: 0;
            padding: 0;
        }
        ^contents {
            display: flex;
            width: 100vw;
            height: 100vh;
        }
    `,

    properties: [
        { class: 'Boolean', name: 'clientLoaded' }
    ],

    methods: [
        function init () {
            this.asyncInit();
        },
        async function asyncInit() {
            this.setPrivate_('__subContext__',
                await styro.corn.Client.createContext(this.__subContext__));
            this.clientLoaded = true;
        },
        function render () {
            const self = this;
            this.add(this.slot(function (clientLoaded) {
                if ( ! clientLoaded ) return this.E();
                return this.E()
                    .addClass(self.myClass('contents'))
                    .tag({
                        class: 'styro.ui.Flex',
                        views: [
                            {
                                class: 'styro.ui.Frame',
                                basis: '18rem',
                                window: {
                                    class: 'styro.ui.Window',
                                    view: 'styro.ui.TestEl'
                                }
                            },
                            {
                                class: 'styro.ui.Frame',
                                receives: ['default', 'main'],
                                grow: 1,
                                window: {
                                    class: 'styro.ui.Window',
                                    view: {
                                        class: 'foam.u2.DAOList',
                                        rowView: {
                                            class: 'foam.u2.DetailView',
                                            // class: 'styro.ui.facet.BigChoiceView',
                                            // of: 'styro.model.Manifest'
                                        }
                                    },
                                    data: this.__subContext__.sourceFileDAO
                                }
                            }
                        ]
                    })
            }));
        }
    ]
});
