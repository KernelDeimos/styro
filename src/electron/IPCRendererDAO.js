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
                x, styro.electron.IPCJSON.serialize(obj));
            return styro.electron.IPCJSON.deserialize(result, x);
        },
        async function find_(x, obj) {
            const result = await this.ipcLinks[this.serviceName].find_(
                x, styro.electron.IPCJSON.serialize(obj));
            return styro.electron.IPCJSON.deserialize(result, x);
        },
        async function remove_(x, obj) {
            const result = await this.ipcLinks[this.serviceName].find_(
                x, styro.electron.IPCJSON.serialize(obj));
            return styro.electron.IPCJSON.deserialize(result, x);
        },
        async function select_(x, sink, skip, limit, order, predicate) {
            sink = sink && styro.electron.IPCJSON.serialize(sink);
            order = order && styro.electron.IPCJSON.serialize(order);
            predicate = predicate && styro.electron.IPCJSON.serialize(predicate);
            const result = await this.ipcLinks[this.serviceName].select_(
                x, sink, skip, limit, order, predicate);
            return styro.electron.IPCJSON.deserialize(result, x);
        },
    ]
});
