foam.LIB({
    name: 'styro.electron.IPCMainDAO',

    methods: [
        function install (x, { ipcMain, serviceName, dao }) {
            ipcMain.handle(`dao.${serviceName}.put_`, async (_evt, _x, obj) => {
                obj = styro.electron.IPCJSON.deserialize(obj, x);
                obj = await dao.put_(x, obj);
                obj = obj && styro.electron.IPCJSON.serialize(obj);
                return obj;
            });
            ipcMain.handle(`dao.${serviceName}.remove_`, async (_evt, _x, obj) => {
                obj = styro.electron.IPCJSON.deserialize(obj, x);
                obj = await dao.remove_(x, obj);
                obj = obj && styro.electron.IPCJSON.serialize(obj);
                return obj;
            });
            ipcMain.handle(`dao.${serviceName}.find_`, async (_evt, _x, obj) => {
                obj = styro.electron.IPCJSON.deserialize(obj, x);
                obj = await dao.find_(x, obj);
                obj = obj && styro.electron.IPCJSON.serialize(obj);
                return obj;
            });
            ipcMain.handle(`dao.${serviceName}.select_`,
                async (_evt, _x, sink, skip, limit, order, predicate) => {
                    sink = sink && styro.electron.IPCJSON.deserialize(sink, x);
                    order = order && styro.electron.IPCJSON.deserialize(order, x);
                    predicate = predicate && styro.electron.IPCJSON.deserialize(predicate, x);

                    sink = await dao.select_(x, sink, skip, limit, order, predicate);

                    sink = styro.electron.IPCJSON.serialize(sink);

                    return sink;
                });
        }
    ]
});
