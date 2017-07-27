import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class NoauthGuard implements CanActivate {
    public allowed:boolean;

    constructor(public afAuth:AngularFireAuth,
                private router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | boolean {
        return this.afAuth.authState.map(res => {
            this.allowed = true;
            if (res && res.uid) {
                this.router.navigate(['/']);
                this.allowed = false;
            }
            return this.allowed;
        }).first();
    }
}
