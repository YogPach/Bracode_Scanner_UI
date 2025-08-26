import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent {
  scannedBarcode = signal<string>('');
  menuData = signal<any>(null);
  apiUrl = 'https://localhost:44349/ScanBarcode'; // Update with your API URL

  constructor(private http: HttpClient) {}

  onCodeResult(result: string) {
    this.scannedBarcode.set(result);
    this.http.get(`${this.apiUrl}/${result}`).subscribe(response => {
      this.menuData.set(response);
    });
  }
}
