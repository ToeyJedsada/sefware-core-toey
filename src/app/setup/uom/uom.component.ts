import { Component, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef, MatDialog, MatSnackBar} from '@angular/material';
import {Page} from '../../shared/model/page';
import {Upload} from '../../shared/model/upload';
import {UploadService} from '../../services/upload.service';
import {Language} from 'angular-l10n';
import {TdLoadingService, TdMediaService} from '@covalent/core';
import {SelectionModel} from '@angular/cdk/collections';
import {UomService} from "./uom.service";
import {UomDialogComponent} from "./uom-dialog/uom-dialog.component";
import {uom} from "./uom";


@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss'],
  providers: [UomService]
})
export class UomComponent implements OnInit {

  @Language() lang: string;
  @ViewChild('dataTable') table: any;

  loading: boolean = true;

  page = new Page();
  cache: any = {};
  expanded: any = {};

  rows: any[] = [];
  temp = [];

  constructor(private _itemtypeService: UomService,
              public media: TdMediaService,
              public snackBar: MatSnackBar,
              private dialog: MatDialog) {

    this.page.size = 50;
    this.page.pageNumber = 0;

  }
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this._itemtypeService.requestData().subscribe((snapshot) => {
      this._itemtypeService.rows = [];
      snapshot.forEach((s) => {

        const _row = new uom(s.val());
        this._itemtypeService.rows.push(_row);

      });

      this.temp = [...this._itemtypeService.rows];
      this.loading = false;
      this.setPage(null);
    });
  }

  setPage(pageInfo) {

    if (pageInfo) {
      this.page.pageNumber = pageInfo.pageIndex;
      this.page.size = pageInfo.pageSize;
    }

    this._itemtypeService.getResults(this.page).subscribe((pagedData) => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });

  }

  addData() {
    const dialogRef = this.dialog.open(UomDialogComponent, {
      disableClose: true,
      width: '350px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // this.msgs = [];
        // this.msgs.push({severity: 'success', detail: 'Data updated'});
      }
    });
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }

}
