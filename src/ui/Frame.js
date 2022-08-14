foam.CLASS({
    package: 'styro.ui',
    name: 'Frame',
    extends: 'foam.u2.Element',
    mixins: [
        'styro.ui.WindowConsumer'
    ],

    documentation: `
        A Frame is a WindowConsumer that only displays one window at a time,
        discarding the old window if given a new one.
    `,

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
                    'min-width': this.basis$.map(v => v === 'auto' ? 0 : v),
                    overflow: 'auto'
                })
                .add(this.slot(function (window) {
                    const el = this.ViewSpec.createView(this.window.view, {
                        data$: this.window.data$
                    }, this, this);
                    return el;
                }))
        },
        function consumeWindow_ (window, predicate) {
            if ( predicate.f(this) ) {
                this.window = window;
                return;
            }

            this.parentConsumeWindow(window, predicate);
        }
    ]
});
