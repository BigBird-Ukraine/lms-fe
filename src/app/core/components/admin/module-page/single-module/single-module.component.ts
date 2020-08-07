import {Component, OnInit} from '@angular/core';
import {AdminModuleService} from '../../services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single-module',
  templateUrl: './single-module.component.html',
  styleUrls: ['./single-module.component.scss']
})
export class SingleModuleComponent implements OnInit {
  module: any;

  constructor(private moduleService: AdminModuleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => (this.module = res.singleModuleResolverService.data));
  }

  deleteModule(id: string) {
    this.moduleService.delete(id);
  }
}
