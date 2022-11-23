import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'age'];
  dataSource!: MatTableDataSource<any>;
  /*
  Paginator ref: https://material.angular.io/components/paginator/api

  */
  @ViewChild( MatPaginator ) paginator!: MatPaginator;
  @ViewChild( MatSort ) sort!: MatSort;

  constructor (private dialog: MatDialog, private api: ApiService ){ }

  ngOnInit(): void {
    this.getAllInfo();
  }

  openDialog(): void {
     this.dialog.open(DialogComponent, {

    });
  }

  getAllInfo(){
    this.api.getAllInfo()
        .subscribe({
          next: (res) => {
            // generates the table with the response of the server
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error(err) {
              console.log('Error while fetching data')
          },
        })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
