foam.CLASS({
    package: 'styro.ui.facet',
    name: 'BigChoiceView',
    extends: 'styro.ui.facet.BigChoiceBaseView',

    axioms: [
        foam.pattern.Faceted.create({ inherit: true })
    ]
})

foam.CLASS({
    package: 'styro.ui.facet',
    name: 'BigChoiceBaseView',
    extends: 'foam.u2.View',

    css: `
        ^ {
            border: 1px solid #000;
            border-radius: 5px;
            background-color: #555;
        }
    `,

    methods: [
        function render () {
            this.SUPER();
            this.addClass(this.myClass());
        }
    ]
})