import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarcodeScannerComponent } from "../components/barcode-scanner/barcode-scanner.component";
import { QrCodeGeneratorComponent } from "../components/qrcode-generator/qrcode-generator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarcodeScannerComponent, QrCodeGeneratorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BarcodeScannerUI';
}
