import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {FormService} from "./services/form.service";

export const toolStartedGuard: CanActivateFn = (route, state) => {
    const formService = inject(FormService);
    return !!formService.form.controls.department.value;
};
