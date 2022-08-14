foam.CLASS({
    package: 'styro.ui',
    name: 'Flex',
    extends: 'foam.u2.Element',

    properties: [
        'views',
        { class: 'Boolean', name: 'vertical' },
        ['basis', 'auto'],
        ['grow', 1]
    ],

    methods: [
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
