import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  informationForm !: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private api: ApiService,
               private dialogRef:  MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    // This is how you create a form with its deferent fields
    this.informationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age : ['', Validators.required] // this should be a number
    });
  }

  addInfo(): void {
    if (this.informationForm.valid){
        this.api.postInfo(this.informationForm.value)
            .subscribe({
              next: (res) => {
                Swal.fire({
                  title: 'Success!',
                  text: 'Do you want to continue',
                  icon: 'success',
                  confirmButtonText: 'Cool'
                })
                this.informationForm.reset()
                this.dialogRef.close();
              },
              error(err) {
                  console.log('error encountered while adding the information')
              },
            })
    }
  }



}


