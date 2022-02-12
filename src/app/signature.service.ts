import { Injectable } from "@angular/core";

import { SOCKET_URL } from "./service.service";
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable()
export class SignatureService {
  api: WebSocketSubject<any> = webSocket(SOCKET_URL);
  constructor() {    
  }
  connect(){
    this.api.subscribe((res)=>{
      console.log("WS",res)
    },
    (err) => {
      console.log("ws",err);
    }
    );
  }
  send(data){
    this.api.next(JSON.stringify(data));
  }
}