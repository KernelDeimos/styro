foam.CLASS({
    package: 'styro.ui',
    name: 'Controller',
    extends: 'foam.u2.Controller',

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
            this.add(this.slot(function (clientLoaded) {
                if ( ! clientLoaded ) return this.E();
                return this.E()
                    .tag({
                        class: 'com.ericdube.wm.TWMView',
                        data: {
                            class: 'com.ericdube.wm.TWMModel',
                            rootContainer: {
                                class: 'com.ericdube.wm.Container',
                                wmNodes: [
                                    {
                                        class: 'com.ericdube.wm.Window',
                                        view: {
                                            class: 'foam.u2.DAOList',
                                            rowView: 'foam.u2.CitationView'
                                        },
                                        data: this.__subContext__.manifestDAO
                                    }
                                ]
                            }
                        }
                    })
            }));
        }
    ]
});
