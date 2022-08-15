const { contextBridge, ipcRenderer } = require('electron');
// require('../../node_modules/foam3/src/foam_node.js');

(async () => {
    const config = await ipcRenderer.invoke('getConfig');
    contextBridge.exposeInMainWorld('config', config);

    const daoOperationFn = async function (serviceName, method, _, ...a) {
        return await ipcRenderer.invoke(`dao.${serviceName}.${method}`, null, ...a);
    }

    const ipcLinks = {};
    for ( const service of config.services ) {
        ipcLinks[service.name] = {};
        const methods = ['put_', 'select_', 'remove_', 'find_'];
        for ( const method of methods ) {
            ipcLinks[service.name][method] =
                daoOperationFn.bind({}, service.name, method);
        }
    }
    contextBridge.exposeInMainWorld('ipcLinks', ipcLinks);
})();
