import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    public allowed: boolean;

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.afAuth.authState.map(res => {
            if (res && res.uid) {
                this.allowed = true;
            } else {
                this.router.navigate(['/login']);
                this.allowed = false;
            }

            return this.allowed;
        }).first();
    }
}