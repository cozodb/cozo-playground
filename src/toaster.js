import {Position, OverlayToaster} from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = OverlayToaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
});