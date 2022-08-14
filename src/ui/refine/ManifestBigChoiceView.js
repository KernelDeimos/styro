foam.CLASS({
    package: 'styro.model',
    name: 'ManifestBigChoiceView',
    extends: 'styro.ui.facet.BigChoiceBaseView',

    css: `
        ^ {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            padding: 1rem;
        }
        ^row {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        ^name {
            font-family: 'Helvetica';
            font-size: 1.8rem;
        }
        ^version {
            font-family: 'Helvetica';
            font-size: 1.4rem;
            opacity: 0.7;
        }
        ^path {
            font-family: 'Helvetica';
            font-size: 1.2rem;
        }
    `,

    methods: [
        function render () {
            this.SUPER();
            this
                .addClass(this.myClass())
                .start()
                    .addClass(this.myClass('row'))
                    .start()
                        .addClass(this.myClass('name'))
                        .add(this.data.name)
                    .end()
                    .start()
                        .addClass(this.myClass('version'))
                        .add('(version ' + this.data.version + ')')
                    .end()
                .end()
                .start()
                    .addClass(this.myClass('path'))
                    .add(this.data.id)
                .end()
        }
    ]
});