import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IModule} from '../../interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {
  form: FormGroup;
  newTag: string;

  constructor(private dialogRef: MatDialogRef<EditModuleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Partial<IModule>) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(this.data.label, [Validators.required, Validators.min(4)]),
      description: new FormControl(this.data.description, [Validators.required])
    });
  }

  save() {
    this.dialogRef.close({...this.data, ...this.form.value});
  }

  deleteTag(tagDel: string) {
    this.data.tags = this.data.tags.filter(tag => tag !== tagDel);
  }

  addNewTag() {
    if (this.newTag) {
      this.data.tags.push(this.newTag);
      this.newTag = null;
    }
  }
}
