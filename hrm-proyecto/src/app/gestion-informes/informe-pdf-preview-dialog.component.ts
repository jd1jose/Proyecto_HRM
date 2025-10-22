import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface InformePdfDialogData {
  blob: Blob;
  filename: string;
}

@Component({
  selector: 'app-informe-pdf-preview-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Previsualización del informe</h2>
        <button type="button" class="btn-close" (click)="cerrar()">×</button>
      </div>
      <div class="dialog-content" *ngIf="pdfUrl; else loading">
        <iframe [src]="pdfUrl" frameborder="0"></iframe>
      </div>
      <ng-template #loading>
        <div class="loading">Generando PDF...</div>
      </ng-template>
      <div class="dialog-actions">
        <button type="button" class="btn-cancelar" (click)="cerrar()">Cancelar</button>
        <button type="button" class="btn-guardar" (click)="descargar()">Guardar</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        --color-primary: #6dbe45;
        --color-primary-dark: #4a9531;
        --color-accent: #f47721;
        --color-dark: #111418;
        --color-darker: #1a1d23;
        --color-header: #333333;
        --color-text: #f5f5f5;
      }
      .dialog-container {
        display: flex;
        flex-direction: column;
        width: min(950px, 95vw);
        height: min(720px, 95vh);
        background: var(--color-dark);
        color: var(--color-text);
        border-radius: 14px;
        box-shadow: 0 22px 48px rgba(0, 0, 0, 0.55);
        overflow: hidden;
      }
      .dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 24px;
        background: var(--color-header);
        color: #ffffff;
      }
      .dialog-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
      .btn-close {
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      .btn-close:hover {
        transform: scale(1.15);
      }
      .dialog-content {
        flex: 1;
        background: var(--color-darker);
        padding: 12px;
      }
      .dialog-content iframe {
        width: 100%;
        height: 100%;
        border: none;
        background: #ffffff;
        border-radius: 8px;
      }
      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        padding: 16px 24px;
        background: var(--color-darker);
      }
      button {
        min-width: 120px;
        padding: 10px 20px;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      button:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 3px;
      }
      .btn-guardar {
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
        color: #ffffff;
        box-shadow: 0 10px 22px rgba(109, 190, 69, 0.4);
      }
      .btn-guardar:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 28px rgba(109, 190, 69, 0.5);
      }
      .btn-cancelar {
        background: transparent;
        color: var(--color-accent);
        border: 1px solid rgba(244, 119, 33, 0.7);
      }
      .btn-cancelar:hover {
        transform: translateY(-1px);
        border-color: var(--color-accent);
      }
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 16px;
        color: var(--color-accent);
      }
    `
  ]
})
export class InformePdfPreviewDialogComponent implements OnDestroy {
  pdfUrl: SafeResourceUrl | null = null;
  private objectUrl: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: InformePdfDialogData,
    private readonly dialogRef: MatDialogRef<InformePdfPreviewDialogComponent>,
    private readonly sanitizer: DomSanitizer
  ) {
    this.objectUrl = URL.createObjectURL(data.blob);
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);
  }

  descargar(): void {
    if (!this.objectUrl) {
      return;
    }
    const link = document.createElement('a');
    link.href = this.objectUrl;
    link.download = this.data.filename;
    link.click();
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
