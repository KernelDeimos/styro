foam.CLASS({
    package: 'styro.electron',
    name: 'IPCRendererDAO',
    extends: 'foam.dao.AbstractDAO',

    imports: [
        'ipcLinks'
    ],

    properties: [
        {
            class: 'String',
            name: 'serviceName'
        }
    ],

    methods: [
        async function put_(x, obj) {
            const result = await this.ipcLinks[this.serviceName].put_(
                x, foam.json.objectify(obj));
            return foam.json.parse(result);
        },
        async function find_(x, obj) {
            const result = await this.ipcLinks[this.serviceName].find_(
                x, foam.json.objectify(obj));
            return foam.json.parse(result);
        },
        async function remove_(x, obj) {
            const result = await this.ipcLinks[this.serviceName].find_(
                x, foam.json.objectify(obj));
            return foam.json.parse(result);
        },
        async function select_(x, sink, skip, limit, order, predicate) {
            sink = sink && foam.json.objectify(sink);
            order = order && foam.json.objectify(order);
            predicate = predicate && foam.json.objectify(predicate);
            const result = await this.ipcLinks[this.serviceName].select_(
                x, sink, skip, limit, order, predicate);
            return foam.json.parse(result);
        },
    ]
});
