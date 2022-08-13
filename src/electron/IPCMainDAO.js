foam.LIB({
    name: 'styro.electron.IPCMainDAO',

    methods: [
        function install (x, { ipcMain, serviceName, dao }) {
            ipcMain.handle(`dao.${serviceName}.put_`, async (_evt, _x, obj) => {
                obj = foam.json.parse(obj);
                obj = await dao.put_(x, obj);
                obj = obj && foam.json.objectify(obj);
                return obj;
            });
            ipcMain.handle(`dao.${serviceName}.remove_`, async (_evt, _x, obj) => {
                obj = foam.json.parse(obj);
                obj = await dao.remove_(x, obj);
                obj = obj && foam.json.objectify(obj);
                return obj;
            });
            ipcMain.handle(`dao.${serviceName}.find_`, async (_evt, _x, obj) => {
                obj = foam.json.parse(obj);
                obj = await dao.find_(x, obj);
                obj = obj && foam.json.objectify(obj);
                return obj;
            });
            ipcMain.handle(`dao.${serviceName}.select_`,
                async (_evt, _x, sink, skip, limit, order, predicate) => {
                    sink = sink && foam.json.parse(sink);
                    order = order && foam.json.parse(order);
                    predicate = predicate && foam.json.parse(predicate);

                    sink = await dao.select_(x, sink, skip, limit, order, predicate);
                    sink = foam.json.objectify(sink);

                    return sink;
                });
        }
    ]
});
