foam.RELATIONSHIP({
    sourceModel: 'styro.model.Manifest',
    targetModel: 'styro.model.SourceFile',
    cardinality: '*:*',
    forwardName: 'files',
    inverseName: 'projects'
});
