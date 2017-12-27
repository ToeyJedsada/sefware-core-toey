import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatFormFieldModule} from '@angular/material';
// import {DriverService} from "../driver.service";
import {Upload} from '../../../../shared/model/upload';
import {UploadService} from '../../../../services/upload.service';
import {Language} from 'angular-l10n';
import {TdLoadingService} from '@covalent/core';

@Component({
  selector: 'app-uom-dialog',
  templateUrl: './uom-dialog.component.html',
  styleUrls: ['./uom-dialog.component.scss']
})
export class UomDialogComponent implements OnInit {

  constructor() { }
  @Language() lang: string;
  private dialog: MatDialog;
  ngOnInit(): void {
  }
  saveData() {
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }

}
