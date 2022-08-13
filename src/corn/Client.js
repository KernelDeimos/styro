foam.LIB({
    name: 'styro.corn.Client',

    documentation: `
        Node.js counterpart to NANOS' ClientBuilder.

        Instead of building a client model we only build a context.
    `,

    methods: [
        function createContext (x) {
            // The 'config' global is provided by the 'main' process
            const { services } = globalThis.config;

            x = x.createSubContext({
                ipcLinks: globalThis.ipcLinks
            })

            const xSpec = {};
            for ( const service of services ) {
                xSpec[service.name] = foam.json.parse(service.value, undefined, x);
            }

            x = x.createSubContext(xSpec);

            const setupEvent = styro.corn.SetupEvent.create({
                terminalDAO: styro.electron.IPCRendererDAO
            });
            
            for ( const service of services ) {
                let evt = setupEvent.clone();
                evt.serviceName = service.name;
                x[service.name].cmd_(x, evt);
            }

            return x;
        }
    ]
});