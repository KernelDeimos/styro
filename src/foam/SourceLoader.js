foam.CLASS({
    package: 'styro.foam',
    name: 'SourceLoader',

    imports: [
        'definitionDAO',
        'sourceFileDAO',
        'manifestSourceFileJunctionDAO'
    ],

    nodeRequires: [
        'path as path_',
        'fs as fs_'
    ],

    requires: [
        'styro.foam.model.Definition',
        'styro.foam.model.DefinitionType',
        'styro.foam.sandbox.Resolver',
        'styro.foam.sandbox.Sandbox',
        'styro.model.ManifestSourceFileJunction',
        'styro.model.SourceFile'
    ],

    methods: [
        async function load (path) {
            const sandbox = this.Sandbox.create();
            return this.load_(sandbox, path);
        },
        async function load_ (sandbox, path, opt_pom) {
            const definitions = await sandbox.eval(path);

            const sourceFile = this.SourceFile.create({
                id: path,
                type: 'application/javascript'
            });

            await this.sourceFileDAO.put(sourceFile);

            if ( opt_pom ) {
                const junction = this.ManifestSourceFileJunction.create({
                    sourceId: opt_pom.id,
                    targetId: sourceFile.id
                });
                await this.manifestSourceFileJunctionDAO.put(junction);
            }

            const tasks = [];
            for ( const rawDef of definitions ) {
                let definitionType = rawDef.method;
                if ( rawDef.value.refines ) {
                    definitionType = this.DefinitionType.REFINEMENT;
                }
                const definition = this.Definition.create({
                    type: definitionType
                });
                definition.id = (m => {
                    return m.id ||
                        ( m.package
                            ? ( m.package + '.' + m.name )
                            : m.name
                        ) ||
                        foam.uuid.randomGUID()
                        ;
                })(rawDef.value)
                definition.sourceFile = path;
                // definition.data = rawDef.value;
                const value = this.resolveDynamicValues(rawDef.value);
                // console.log('value?', value)
                // definition.data = definition.of.create(value);
                definition.data = value;

                tasks.push(this.definitionDAO.put(definition));
            }

            await Promise.all(tasks);
        },

        function resolveDynamicValues(value, clone) {
            if ( foam.Array.isInstance(value) ) {
                if ( clone ) value = [ ...value ];

                for ( let i = 0 ; i < value.length ; i++ ) {
                    value[i] = this.resolveDynamicValues(value[i], clone);
                }
                return value;
            }

            if ( foam.Object.isInstance(value) ) {
                if ( value.__STYRO_NOT_RESOLVABLE__ ) return undefined;
                if ( clone ) value = { ...value };

                for ( const k of Object.keys(value) ) {
                    value[k] = this.resolveDynamicValues(value[k], clone);
                }
                return value;
            }

            const needToResolve =  value &&
                value.__STYRO_NODE__;
            
            if ( ! needToResolve ) return value;

            const resolver = this.Resolver.create({
                resolutions: {
                    Global: node => {
                        if ( node.prop == 'foam' ) return foam;
                        return undefined;
                    },
                    Dot: (node, resolve) => {
                        const lhs = resolve(node.node);
                        if ( ! lhs ) return undefined;
                        if ( node.prop === 'PHONE_NUMBER_REGEX' ) {
                            console.log('whaaaat')
                        }
                        return lhs[node.prop];
                    },
                    Call: (node, resolve) => {
                        // console.log(foam.json.stringify(node))
                        // console.log('???', foam.nanos)
                        let instance, method;
                        if ( ! node.node ) return undefined;
                        if ( node.node.cls_.name === 'Dot' ) {
                            instance = resolve(node.node.node);
                            if ( ! instance ) {
                                return undefined;
                            }
                            method = instance[node.node.prop];
                        } else {
                            instance = {};
                            method = resolve(node.node);
                        }
                        if ( ! typeof method === 'function' ) {
                            console.error('unexpected non-function');
                            throw new Error('unexpected non-function');
                        }

                        const args = node.args.map(v => {
                            return this.resolveDynamicValues(v, true);
                        })

                        if ( method === foam.mmethod ) {
                            v = { $: '__eval__', node };
                            return v;
                        }
                        
                        // console.log('instance?', instance, "method?", method, 'args?', args)
                        // console.log('method???', method.toString())
                        return method.call(instance, ...args);
                    }
                }
            });

            const result = resolver.resolve(value);
            console.log(value.__STYRO_NODE__.toString())
            console.log('resolved it to:', result)
            return result;
        }
    ]
});
