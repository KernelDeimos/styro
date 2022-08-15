foam.CLASS({
    package: 'styro.corn',
    name: 'EasyDAO',
    extends: 'foam.dao.ProxyDAO',

    requires: [
        'foam.dao.ProxyDAO',
        'styro.corn.SetupEvent'
    ],

    properties: [
        {
            class: 'Class',
            name: 'of'
        },
        {
            class: 'foam.dao.DAOProperty',
            name: 'delegate'
        },
        {
            class: 'foam.dao.DAOProperty',
            name: 'proxy',
            factory: function () {
                return this.ProxyDAO.create({ of: this.of });
            }
        }
    ],

    methods: [
        function cmd_(x, obj) {
            if ( this.SetupEvent.isInstance(obj) ) {
                this.delegate = obj.terminalDAO.create({
                    of: this.of,
                    serviceName: obj.serviceName
                }, this.__subContext__);
                return;
            }
            if ( this.delegate ) this.SUPER(x, obj);
        }
    ]
});
