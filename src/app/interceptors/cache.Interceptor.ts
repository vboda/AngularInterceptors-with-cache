import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UsersCacheService } from '../users/users-cache.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class CacheInterceptor implements HttpInterceptor{

    constructor(private userCacheService:UsersCacheService){}
    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        // pass along non-cachable requests
        if(req.method!=="GET"){
            console.log(`Invalidating cache: ${req.method} ${req.url}`);
            this.userCacheService.invalidateCache();
            return next.handle(req);            
        }

        // attempt to retrieve a cached response
        const cachedResponse:HttpResponse<any> = this.userCacheService.get(req.url)
        //return cached response
        if(cachedResponse){
            console.log(`Returning a cached response: ${cachedResponse.url}`);
            console.log(cachedResponse);
            return of(cachedResponse);
        }

        // send request to server to add response to cache
        return next.handle(req)
        .pipe(
            tap(event=>{
                if(event instanceof HttpResponse){
                    console.log(`Adding item to cache: ${req.url}`);
                    this.userCacheService.put(req.url, event);
                }
            })
        )
    }
}