foam.CLASS({
    package: 'styro.ui',
    name: 'Controller',
    extends: 'foam.u2.Controller',

    css: `
        :root {
            font-size: 10px;
        }
        * {
            box-sizing: border-box;
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
            const x = await styro.corn.Client.createContext(this.__subContext__);
            this.setPrivate_('__subContext__', x);
            this.__subSubContext__ = x;
            this.clientLoaded = true;
        },
        function render () {
            const self = this;
            this.add(this.slot(function (clientLoaded) {
                if ( ! clientLoaded ) return this.E();
                return this.E()
                    .call(function () {
                        // TODO: not sure why this is necessary
                        this.__subSubContext__ = self.__subContext__;
                    })
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
                                        class: 'styro.ui.Placeholder'
                                    }
                                }
                            }
                        ]
                    })
            }));
        }
    ]
});
