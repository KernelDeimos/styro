foam.CLASS({
    package: 'styro.corn',
    name: 'EasyDAO',
    extends: 'foam.dao.ProxyDAO',

    requires: [
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
