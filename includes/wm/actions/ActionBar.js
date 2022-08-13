foam.CLASS({
    package: 'com.ericdube.wm.actions',
    name: 'KeyboardKeyElem',
    extends: 'foam.u2.Element',

    properties: [
        { class: 'Int', name: 'size' },
        { class: 'String', name: 'unit', value: 'pt' },
        { class: 'String', name: 'key' }
    ],

    css: `
        ^ {
        }
        ^, ^ * {
            box-sizing: border-box;
        }
        ^inner {
            border-style: solid;
            border-color: #837878;
            background-color: rgba(255,255,255,0.9);
            color: #000;
            text-align: center;
            padding: 0 2px;
        }
    `,

    methods: [
        function render () {
            const sz = n => '' + n + this.unit;
            this.addClass()
                .style({
                    height: sz(this.size),
                    padding: sz(this.size * 4 / 24)
                })
                .start()
                    .addClass(this.myClass('inner'))
                    .add(this.key)
                    .style({
                        'font-size': sz(this.size * 8 / 24),
                        height: sz(this.size * 16 / 24),
                        'border-width': sz(this.size * 2 / 24),
                        'border-radius': sz(this.size * 3 / 24),
                        'line-height': sz(this.size * 12 / 24),
                    })
                .end()
                ;
        }
    ]
});
// foam.CLASS({
//     package: 'com.ericdube.wm.actions',
//     name: 'KeyboardDPad',
// });

foam.CLASS({
    package: 'com.ericdube.wm.actions',
    name: 'ActionBar',
    extends: 'foam.u2.Element',

    css: `
        ^ {
            height: 24pt;
        }
    `,

    requires: [
        'com.ericdube.wm.actions.KeyboardKeyElem',
    ],

    methods: [
        function render () {
            this
                .addClass()
                .tag(this.KeyboardKeyElem, {
                    key: 'Q',
                    size: 24
                })
        }
    ]
})

// foam.CLASS({
//     package: 'com.ericdube.wm.actions',
//     name: 'DPadAction',
// })
