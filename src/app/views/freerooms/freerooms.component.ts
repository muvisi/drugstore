import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-freerooms',
  templateUrl: './freerooms.component.html',
  styleUrls: ['./freerooms.component.scss']
})
export class FreeroomsComponent implements OnInit {
  // @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  BookRoomForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private service:ServiceService,private toast:ToastrService) { }

  ngOnInit() {
    this.BookRoomForm = this.formBuilder.group({
      Patient_names: ['',Validators.required],
      Patient_email: ['',Validators.required],
      Patient_age: ['',Validators.required],
     Patient_phone:['',Validators.required],
      Patient_gender:['',Validators.required],
      id: this.route.snapshot.params.id,
     
  });
  }
  
  // AvailableRooms() {
  //   this.service.getavailablerooms().subscribe((res) => {
  //    this.dataSource = new MatTableDataSource <[]>(res);
  //    this.dataSource.paginator = this.paginator;
  //   }
  //   );

// }


BookpRoom(){
  console.log(this.BookRoomForm.value)
}
}
