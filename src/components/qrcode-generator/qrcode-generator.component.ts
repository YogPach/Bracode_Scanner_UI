import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qrcode-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qrcode-generator.component.html',
  styleUrls: ['./qrcode-generator.component.css']
})
export class QrCodeGeneratorComponent {
  apiUrl = 'https://localhost:44349/GenerateQRCode'; // Update with your API URL
  qrCodeUrl = signal<string | null>(null);
  menuData = signal<any>(null);
  scannedData = signal<any[]>([]);

  qrText = '';
  barcode = '';

  constructor(private http: HttpClient) { }

  // Generate QR Code
  generateQRCode() {
    this.http.get(this.apiUrl, { responseType: 'blob' }).subscribe(response => {
      this.qrCodeUrl.set(URL.createObjectURL(response));
    });
  }

  // Scan Barcode
  scanBarcode() {
    if (!this.barcode) return;
    this.http.get(`https://localhost:44349/ScanBarcode/${this.barcode}`).subscribe(response => {
      this.menuData.set(response);
    });
  }

  // Get Scanned History
  getHistory() {
    this.http.get<string[]>(`https://localhost:44349/GetScannedHistory`).subscribe(response => {
      this.scannedData.set(response);
    });
  }

  // Download QR Code
  downloadQRCode() {
    if (this.qrCodeUrl()) {
      const link = document.createElement('a');
      link.href = this.qrCodeUrl()!;
      link.download = 'QRCode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
