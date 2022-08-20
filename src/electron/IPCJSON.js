foam.LIB({
    name: 'styro.electron.IPCJSON',

    methods: [
        function deserialize (obj, x) {
            try {
                return foam.json.parse(eval('(' + obj + ')'), undefined, x);
            } catch (e) {
                console.log(obj);
                throw e;
            }
        },
        function serialize (obj) {
            obj = foam.json.objectify(obj);
            obj = foam.json.stringify(obj);
            return obj;
        }
    ]
});