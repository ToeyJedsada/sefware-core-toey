import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatFormFieldModule} from '@angular/material';
// import {DriverService} from "../driver.service";
import {Upload} from '../../../../shared/model/upload';
import {UploadService} from '../../../../services/upload.service';
import {Language} from 'angular-l10n';
import {uomService} from "../uom.service";
import {uom} from "../uom";
import {TdLoadingService} from '@covalent/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-uom-dialog',
  templateUrl: './uom-dialog.component.html',
  styleUrls: ['./uom-dialog.component.scss'],
  providers: [uomService]

})
export class UomDialogComponent implements OnInit {
  error: any;
  public data: uom = new uom ({});
  constructor(@Inject(MAT_DIALOG_DATA) public md_data: uom,
              private UnitService: uomService,
              private _loadingService: TdLoadingService,
              public dialogRef: MatDialogRef<UomDialogComponent>) { }
  @Language() lang: string;
  private dialog: MatDialog;
  ngOnInit(): void {
  }
  saveData(form) {

    if (form.valid) {

      this.error = false;
      this._loadingService.register();

      this.data.name1 = form.value.name1 ? form.value.name1 : null;
      this.data.name2 = form.value.name2 ? form.value.name2 : null;
      if (this.md_data) {

        if (_.isEqual(this.data, this.md_data)) {
          this.dialogRef.close(false);
        } else {
          this.UnitService.updateData(this.data).then(() => {
            this.dialogRef.close(true);
            this._loadingService.resolve();
          }).catch(err => {
            this.error = err.message;
            this._loadingService.resolve();
          });
        }
      } else {
        this.UnitService.addData(this.data).then(() => {
          this.dialogRef.close(true);
          this._loadingService.resolve();
        }).catch(err => {
          this.error = err.message;
          this._loadingService.resolve();
        });
      }
    }
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }

}
