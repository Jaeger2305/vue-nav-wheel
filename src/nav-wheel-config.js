export default {
  constants: {
    padAngle: 0.04,
    spaceBetweenParentChild: 10,
    shrinkRouteScale: 5,
    scale: 1,
    cornerSharpness: 100,
    startRadius: 100,
    childAngleSpread: 0.04,
    defaultTransition: "fade",
    isPanOnSelectEnabled: true, // For touch, should the touched route be panned into focus.
    isPanOnMouseMoveEnabled: true, // Pan according to the currently mouse position.
    hierarchyLevelsDisplayLimit: 3, // The limit of levels of hierarchy to display at once.
    hierarchyLevelFocus: 2 // The limit at which routes stop displaying the parent's hierarchy.
  }
};
