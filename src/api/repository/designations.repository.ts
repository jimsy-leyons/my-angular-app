import { Injectable } from "@angular/core";

export const DESIGNATIONS = [
    {
        code: "MR",
        name: "MR",
        mgender_id: 1
    },
    {
        code: "MSTR",
        name: "MSTR",
        mgender_id: 1
    },
    {
        code: "MS",
        name: "MS",
        mgender_id: 2
    },
    {
        code: "MRS",
        name: "MRS",
        mgender_id: 2
    },
    {
        code: "DR",
        name: "DR",
        mgender_id: 0
    },
];

@Injectable({
    providedIn: 'root'
})
export class DesignationsRepository {

    getDetails(designation = "") {
        let filter = null;
        if (designation.length > 0) {
            for (let i = 0; i < DESIGNATIONS.length; i++) {
                if (DESIGNATIONS[i].code == designation) {
                    filter = DESIGNATIONS[i];
                }
            }
        }
        return filter;

    }
}