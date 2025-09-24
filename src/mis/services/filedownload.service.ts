import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MisFileService {
    constructor(private http: HttpClient) { }

    public download(fileUrl: string, fileName: string = "") {
        if (fileName == "") {
            fileName = this.getFileNameFromUrl(fileUrl);
        }
        this.http.get(fileUrl, { responseType: 'blob' }).subscribe((data) => {
            // Create a Blob object from the response data.
            const blob = new Blob([data], { type: 'application/octet-stream' });

            const fileName = this.getFileNameFromUrl(fileUrl);
            // Create a temporary URL for the Blob.
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download.
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // You can specify the filename.
            a.click();

            // Clean up the temporary URL and anchor element.
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }

    private getFileNameFromUrl(url: string): string {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1];
        return fileName;
    }
}