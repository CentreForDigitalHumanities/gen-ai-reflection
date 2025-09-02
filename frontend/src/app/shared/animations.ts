import { animate, AnimationTriggerMetadata, style, transition, trigger } from "@angular/animations";

export const expandIn: AnimationTriggerMetadata = trigger("expandIn", [
    transition(":enter", [
        style({
            height: 0,
            opacity: 0,
            "transform-origin": "top",
        }),
        animate(
            "400ms ease-in-out",
            style({
                height: "*",
                opacity: 1,
            })
        ),
    ]),
]);
