import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class AddHeaderInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        let modifiedRequest = req.clone({
            setHeaders:{
                'Content-Type':'application/json'
            }
        });
        console.log(`IN AddHeader ${modifiedRequest}` );
        return next.handle(modifiedRequest);
    }

}