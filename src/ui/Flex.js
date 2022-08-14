foam.CLASS({
    package: 'styro.ui',
    name: 'Flex',
    extends: 'foam.u2.Element',
    implements: [
        'foam.mlang.Expressions'
    ],
    mixins: [
        'styro.ui.WindowConsumer',
    ],

    requires: [
        'styro.ui.WindowConsumer'
    ],

    properties: [
        'views',
        { class: 'Boolean', name: 'vertical' },
        ['basis', 'auto'],
        ['grow', 1]
    ],

    methods: [
        function consumeWindow_(window, predicate) {
            for ( const child of this.children ) {
                if ( ! predicate.f(child) ) continue;

                child.consumeWindow(window, predicate);
                return;
            }
            if ( ! this.parentConsumeWindow ) {
                console.groupCollapsed('window lost!');
                console.log('window that was lost', window);
                console.log('highest node checked', this);
                console.log('predicate as object', predicate);
                console.log('predicate as string', predicate.toString())
                console.groupEnd()
                return;
            }
            this.parentConsumeWindow(window, predicate);
        },
        function render () {
            this
                .style({
                    display: 'flex',
                    'flex-direction': this.vertical$.map(v => v ? 'column' : 'row'),
                    'flex-basis': this.basis$,
                    'flex-grow': this.grow$,
                    'justify-contents': 'stretch',
                    'align-items': 'stretch'
                })
                .forEach(this.views, function (view) {
                    this.tag(view);
                })
        }
    ]
});
