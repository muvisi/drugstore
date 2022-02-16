import { EventEmitter, Injectable } from "@angular/core";

import { SOCKET_URL } from "./service.service";
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable()
export class SignatureService {
  api: WebSocketSubject<any>;
  socketEmitter: EventEmitter<number> = new EventEmitter();
  constructor() { 
    if (localStorage.getItem("SIGNATURE_ID")!=null){
      this.api = webSocket(SOCKET_URL+localStorage.getItem("SIGNATURE_ID")+"/");  
      
    }else{
      let id=this.generate_signature_id();
      localStorage.setItem("SIGNATURE_ID",id);
      this.api = webSocket(SOCKET_URL+id+"/");  
   
    }
  }
  connect(){
    this.api.subscribe((res)=>{
      console.log("WS",res)
      this.socketEmitter.next(res);
    },
    (err) => {
      console.log("ws",err);
    }
    );
  }
  send(data){
    this.api.next(JSON.stringify(data));
  }
  socket(){
    return this.socketEmitter;
  }
  generate_signature_id(){
    var gen_str="AAR-SIGNATURE-";
    let random_str="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    for (var i=0;i<=30;i++){
      try{
        let randint=Math.floor((Math.floor(Math.random()*10)*Math.floor(Math.random()*10))/2)
        gen_str+=random_str.charAt(randint)
      }catch(e){

      }
    }
    return gen_str;
  }
}