import { Pipe, PipeTransform } from "@angular/core";
import { isEmpty } from "@mis/utils";

@Pipe({
  name: "isEmpty",
})
export class CheckEmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    let canShow = isEmpty(value);
    return canShow;
  }
}
