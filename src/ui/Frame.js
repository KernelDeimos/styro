foam.CLASS({
    package: 'styro.ui',
    name: 'Frame',
    extends: 'foam.u2.Element',

    properties: [
        ['basis', 'auto'],
        ['grow', 0],
        {
            class: 'FObjectProperty',
            of: 'styro.ui.Window',
            name: 'window'
        }
    ],

    css: `
        ^ {
            display: flex;
        }
        ^ > * {
            flex-grow: 1;
        }
    `,

    methods: [
        function render () {
            this
                .addClass(this.myClass())
                .style({
                    'flex-basis': this.basis$,
                    'flex-grow': this.grow$,
                    overflow: 'auto'
                })
                .tag(this.window.view, { data$: this.window$.dot('data') })
        }
    ]
});