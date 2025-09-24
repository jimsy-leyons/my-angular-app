import { Pipe, PipeTransform } from "@angular/core";
import { IMultiresultMetaData } from "@mis/interfaces/responseobjects.interface";

@Pipe({
  name: "pageResult",
})
export class ResultPagerPipe implements PipeTransform {
  transform(value: IMultiresultMetaData): string {
    let result = "";
    if (value != undefined) {
      const { currentPage, totalRecords, perPage, lastPage } = value;

      const startRecord = parseInt(currentPage!.toString()) * parseInt(perPage!.toString()) + 1;
      const endRecord = Math.min(startRecord + parseInt(perPage!.toString()) - 1, totalRecords);
      result = `Showing ${startRecord}-${endRecord} of ${totalRecords} record(s)`;
    }
    return result;
  }
}
