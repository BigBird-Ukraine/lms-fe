import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {IUser} from "../../interfaces";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: IUser,
    private dialogRef: MatDialogRef<DeleteUserComponent>
  ) {
  }

  ngOnInit() {
  }

}
