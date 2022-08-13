foam.CLASS({
    package: 'com.ericdube.wm',
    name: 'TWMController',

    properties: [
        {
            name: 'activeWindow',
            postSet: function (o, n) {
                if ( ! n ) debugger;
                let i;
                this.removeFromActiveStack_(n);
                this.activeStack$push(n);
            }
        },
        {
            name: 'activeNode'
        },
        {
            class: 'FObjectArray',
            of: 'com.ericdube.wm.Window',
            name: 'activeStack'
        },
        'rootContainer'
    ]
});