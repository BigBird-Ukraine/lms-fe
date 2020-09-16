import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {UserService} from '../../../services/user';
import {InfoHelperService} from '../../../services/questions';
import {AuthService} from '../../../services/auth';
import {RoomsService} from '../../../services/rooms';
import {UserRolesEnum} from '../../../../shared/enums';
import {IRoom} from '../../../interface';
import {CreateRoomComponent} from '../create-room/create-room.component';
import {EditRoomComponent} from '../edit-room/edit-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  token = this.authService.getAccessToken();
  isTeacher: boolean;
  userID: string;

  roomsForAutocomplete: string[] = [];
  filterRoomForm: FormGroup;
  isFiltered = false;

  roomsList: IRoom[];
  isMyRoom = false;


  constructor(private dialog: MatDialog,
              private userService: UserService,
              private roomService: RoomsService,
              private fb: FormBuilder,
              private infoService: InfoHelperService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userService.getUserInfoByToken(this.token)
      .subscribe(() => {
        if (this.userService.userInfo.subscribe()) {
          this.userService.userInfo.subscribe(user => {
            this.isTeacher = user.role_id === UserRolesEnum.TEACHER;
            this.userID = user._id;
          });
        }
      });

    this.getRooms();
    this.filterForm();
  }

  filterForm() {
    this.filterRoomForm = this.fb.group({
      label: this.fb.control(null)
    });
  }

  openForm() {
    this.dialog.open(CreateRoomComponent, {width: '100vw', height: '100vh'}
    ).afterClosed().subscribe(res => res && this.ngOnInit());
  }

  myRooms() {
    this.isMyRoom = true;

    this.roomService.getMyRooms().subscribe((rooms: IRoom[]) => {
      if (rooms) {
        this.roomsList = rooms;
        this.roomsForAutocomplete = rooms.map((room: IRoom) => room.label);
      } else {
        this.roomsList = [];
      }
    });
  }

  getRooms() {
    this.isMyRoom = false;
    this.isFiltered = false;

    this.activatedRoute.data.subscribe(
      res => {
        this.roomsList = res.allRoomsResolverService;
        this.roomsForAutocomplete = this.roomsList.map((room: IRoom) => room.label);
      });

    this.router.navigate(['/rooms']);
  }


  showFiltered() {
    this.isFiltered = true;
    const keys = Object.keys(this.filterRoomForm.value);

    keys.forEach(key => {
      if (!this.filterRoomForm.value[key]) {
        delete this.filterRoomForm.value[key];
      }
    });

    this.router.navigate(['/rooms'], {
      queryParams: {
        ...this.filterRoomForm.value
      }
    });

    this.activatedRoute.queryParams.subscribe((params: object) => {
      this.roomService.getRoomsByParams(params).subscribe((roomsData: IRoom[]) => {
        if (roomsData) {
          this.roomsList = roomsData;
        } else {
          this.roomsList = [];
        }
      });
    });
    this.filterRoomForm.reset();
  }

  editRoom(id: string) {
    this.dialog.open(EditRoomComponent, {
      data: id
    }).afterClosed().subscribe(res => this.ngOnInit());
  }

  showRoom(id) {
    this.router.navigate([`/rooms/${id}`]);
  }

  deleteRoom(id: string) {
    this.roomService.deleteRoom(id).subscribe(res => this.ngOnInit());
  }
}
