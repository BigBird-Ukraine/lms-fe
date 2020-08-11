import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IFullModule} from '../interfaces';
import {Observable} from 'rxjs';
import {AdminModuleService} from '../services';

@Injectable()
export class SingleModuleResolverService implements Resolve<IFullModule> {

  constructor(private aModuleService: AdminModuleService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFullModule> | Promise<IFullModule> | IFullModule {
    const prodId = route.paramMap.get('id');
    return this.aModuleService.getOneFullModule(prodId);
  }
}
