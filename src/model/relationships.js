foam.RELATIONSHIP({
    sourceModel: 'styro.model.Manifest',
    targetModel: 'styro.model.SourceFile',
    cardinality: '*:*',
    forwardName: 'files',
    inverseName: 'projects'
});

foam.RELATIONSHIP({
    sourceModel: 'styro.model.Manifest',
    targetModel: 'styro.model.Manifest',
    cardinality: '*:*',
    forwardName: 'dependancies',
    inverseName: 'dependants'
});
