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
        { class: 'Boolean', name: 'clientLoaded' },
        {
            class: 'foam.u2.ViewSpec',
            name: 'appMainView',
            factory: () => ({
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
        }
    ],

    methods: [
        function init () {
            this.asyncInit();
        },
        async function asyncInit() {
            const x = await styro.corn.Client.createContext(this.__subContext__);
            this.setPrivate_('__subContext__', x);
            this.__subSubContext__ = x;

            // TODO: determine why foam.__context__ is used when
            //       relationship DAOs are accessed
            foam.__context__ = this.__subContext__;

            this.clientLoaded = true;
        },
        function render () {
            const self = this;
            this.addClass(self.myClass('contents'));
            this.add(this.slot(function (clientLoaded) {
                if ( ! clientLoaded ) return self.E();
                return foam.u2.ViewSpec.createView(
                    self.appMainView, {}, self, self.__subContext__
                );
            }));
        }
    ]
});
