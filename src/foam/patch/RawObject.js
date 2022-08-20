foam.CLASS({
    package: 'foam.core',
    name: 'RawObject',
    extends: 'foam.core.Object',

    properties: [
        {
            name: 'fromJSON',
            value: function (json, ctx, prop) {
                let ret = undefined;
                try {
                    ret = eval('(' + json + ')');
                } catch (e) {
                    console.error('fromJSON error', e, json)
                    ret = JSON.stringify(json);
                }
                return ret;
            }
        },
        {
            name: 'toJSON',
            value: function (value, outputter) {
                return foam.json.stringify(value);
            }
        }
    ]
});