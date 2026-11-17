import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './pdf-generator.html',
  styleUrl: './pdf-generator.css'
})
export class PdfGenerator {

  private fb = inject(FormBuilder);

  invoiceForm = this.fb.group({
    invoiceNumber: ['INV-001', Validators.required],
    invoiceDate: [new Date().toISOString().substring(0, 10), Validators.required],
    dueDate: [''],

    sellerName: ['', Validators.required],
    sellerAddress: ['', Validators.required],
    sellerGstin: ['', [Validators.required, Validators.pattern(/^[0-9A-Z]{15}$/)]],
    sellerState: ['', Validators.required],

    buyerName: ['', Validators.required],
    buyerAddress: ['', Validators.required],
    buyerGstin: [''],
    placeOfSupply: ['', Validators.required],

    supplyType: ['intra', Validators.required],
    reverseCharge: ['No'],

    items: this.fb.array([this.createItem()])
  });

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      hsn: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0)]],
      gstRate: [18, Validators.required]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  getItemTaxableAmount(item: any): number {
    const quantity = Number(item.get('quantity')?.value || 0);
    const rate = Number(item.get('rate')?.value || 0);
    const discount = Number(item.get('discount')?.value || 0);

    return Math.max(0, quantity * rate - discount);
  }

  getItemGst(item: any): number {
    const taxable = this.getItemTaxableAmount(item);
    const gstRate = Number(item.get('gstRate')?.value || 0);

    return taxable * gstRate / 100;
  }

  get subtotal(): number {
    return this.items.controls.reduce(
      (total, item) => total + this.getItemTaxableAmount(item),
      0
    );
  }

  get totalDiscount(): number {
    return this.items.controls.reduce(
      (total, item) => total + Number(item.get('discount')?.value || 0),
      0
    );
  }

  get totalGst(): number {
    return this.items.controls.reduce(
      (total, item) => total + this.getItemGst(item),
      0
    );
  }

  get cgst(): number {
    return this.invoiceForm.get('supplyType')?.value === 'intra'
      ? this.totalGst / 2
      : 0;
  }

  get sgst(): number {
    return this.invoiceForm.get('supplyType')?.value === 'intra'
      ? this.totalGst / 2
      : 0;
  }

  get igst(): number {
    return this.invoiceForm.get('supplyType')?.value === 'inter'
      ? this.totalGst
      : 0;
  }

  get grandTotal(): number {
    return Math.round((this.subtotal + this.totalGst) * 100) / 100;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  }

  generatePDF(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      alert('Please fill in all required invoice details correctly.');
      return;
    }

    const data = this.invoiceForm.getRawValue();
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // Invoice heading
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', pageWidth / 2, 18, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Original for Recipient', pageWidth / 2, 24, { align: 'center' });

    // Seller details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Supplier Details', 14, 36);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    const sellerLines = [
      data.sellerName || '',
      data.sellerAddress || '',
      `GSTIN: ${data.sellerGstin || ''}`,
      `State: ${data.sellerState || ''}`
    ];

    doc.text(sellerLines, 14, 43);

    // Invoice details
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Details', 125, 36);

    doc.setFont('helvetica', 'normal');
    doc.text([
      `Invoice No: ${data.invoiceNumber}`,
      `Invoice Date: ${data.invoiceDate}`,
      `Due Date: ${data.dueDate || 'N/A'}`,
      `Reverse Charge: ${data.reverseCharge}`
    ], 125, 43);

    // Buyer details
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To / Recipient Details', 14, 75);

    doc.setFont('helvetica', 'normal');
    doc.text([
      data.buyerName || '',
      data.buyerAddress || '',
      `GSTIN: ${data.buyerGstin || 'Unregistered'}`,
      `Place of Supply: ${data.placeOfSupply || ''}`
    ], 14, 82);

    doc.text(
      `Supply Type: ${data.supplyType === 'intra' ? 'Intra-State' : 'Inter-State'}`,
      125,
      82
    );

    // Items table
    const rows = this.items.controls.map((item, index) => {
      const taxable = this.getItemTaxableAmount(item);
      const gstRate = Number(item.get('gstRate')?.value || 0);
      const gstAmount = this.getItemGst(item);

      return [
        index + 1,
        item.get('description')?.value,
        item.get('hsn')?.value,
        item.get('quantity')?.value,
        this.formatCurrency(Number(item.get('rate')?.value || 0)),
        this.formatCurrency(Number(item.get('discount')?.value || 0)),
        this.formatCurrency(taxable),
        `${gstRate}%`,
        this.formatCurrency(gstAmount)
      ];
    });

    autoTable(doc, {
      startY: 105,
      head: [[
        'No.',
        'Description',
        'HSN/SAC',
        'Qty',
        'Rate',
        'Discount',
        'Taxable Value',
        'GST%',
        'GST Amount'
      ]],
      body: rows,
      theme: 'grid',
      styles: {
        fontSize: 7,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [20, 50, 80]
      }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Tax summary
    autoTable(doc, {
      startY: finalY,
      margin: { left: 105 },
      head: [['Tax Summary', 'Amount (INR)']],
      body: [
        ['Taxable Amount', this.formatCurrency(this.subtotal)],
        ['Total Discount', this.formatCurrency(this.totalDiscount)],
        ...(data.supplyType === 'intra'
          ? [
              ['CGST', this.formatCurrency(this.cgst)],
              ['SGST', this.formatCurrency(this.sgst)]
            ]
          : [
              ['IGST', this.formatCurrency(this.igst)]
            ]),
        ['Total GST', this.formatCurrency(this.totalGst)],
        ['Grand Total', this.formatCurrency(this.grandTotal)]
      ],
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [20, 50, 80] },
      didParseCell: (hookData) => {
        if (hookData.row.index === hookData.table.body.length - 1) {
          hookData.cell.styles.fontStyle = 'bold';
        }
      }
    });

    const summaryEndY = (doc as any).lastAutoTable.finalY + 12;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Amount in Words:', 14, summaryEndY);

    doc.setFont('helvetica', 'normal');
    doc.text(
      this.amountInWords(this.grandTotal),
      14,
      summaryEndY + 6,
      { maxWidth: 180 }
    );

    const footerY = Math.max(summaryEndY + 22, 260);

    doc.setFont('helvetica', 'bold');
    doc.text('Declaration', 14, footerY);

    doc.setFont('helvetica', 'normal');
    doc.text(
      'We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.',
      14,
      footerY + 6,
      { maxWidth: 180 }
    );

    doc.text('Authorised Signatory', 150, footerY + 25, {
      align: 'center'
    });

    doc.save(`${data.invoiceNumber || 'GST-Invoice'}.pdf`);
  }

  private amountInWords(amount: number): string {
    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
      'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen',
      'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
      'Nineteen'
    ];

    const tens = [
      '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
      'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    const twoDigits = (n: number): string => {
      if (n < 20) return ones[n];
      return `${tens[Math.floor(n / 10)]} ${ones[n % 10]}`.trim();
    };

    const threeDigits = (n: number): string => {
      const hundred = Math.floor(n / 100);
      const remainder = n % 100;

      return [
        hundred ? `${ones[hundred]} Hundred` : '',
        remainder ? twoDigits(remainder) : ''
      ].filter(Boolean).join(' ');
    };

    let rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);

    if (paise === 100) {
      rupees++;
    }

    const parts: string[] = [];

    const crore = Math.floor(rupees / 10000000);
    rupees %= 10000000;

    const lakh = Math.floor(rupees / 100000);
    rupees %= 100000;

    const thousand = Math.floor(rupees / 1000);
    rupees %= 1000;

    if (crore) parts.push(`${threeDigits(crore)} Crore`);
    if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
    if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
    if (rupees) parts.push(threeDigits(rupees));

    let result = parts.join(' ') || 'Zero';
    result += ' Rupees';

    if (paise > 0) {
      result += ` and ${twoDigits(paise)} Paise`;
    }

    return `${result} Only`;
  }

  resetForm(): void {
    this.invoiceForm.reset({
      invoiceNumber: 'INV-001',
      invoiceDate: new Date().toISOString().substring(0, 10),
      dueDate: '',
      sellerName: '',
      sellerAddress: '',
      sellerGstin: '',
      sellerState: '',
      buyerName: '',
      buyerAddress: '',
      buyerGstin: '',
      placeOfSupply: '',
      supplyType: 'intra',
      reverseCharge: 'No'
    });

    this.items.clear();
    this.items.push(this.createItem());
  }

}
