import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot} from '@angular/router';
import {IFullModule, IModule} from '../interfaces';
import {Observable} from 'rxjs';
import {AdminModuleService} from '../services';

@Injectable()
export class SingleModuleResolverService implements Resolve<IFullModule> {

  constructor(private aModuleService: AdminModuleService, private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFullModule> | Promise<IFullModule> | IFullModule {
    const prodId = route.paramMap.get('id');
    return this.aModuleService.getOneFullModule(prodId);
  }
}
