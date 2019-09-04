import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { RealEstate } from '../model/realEstate';

import { MatDialog, MatDialogConfig,  MatPaginator, MatTableDataSource, MatTable, MatSort} from '@angular/material';
import { RealEstateDialogComponent } from '../real-estate-dialog/real-estate-dialog.component';
import { RealEstateFormService } from '../shared/real-estate-form.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationsService } from '../shared/notifications.service';
import { DeleteService } from '../shared/delete.service';
import { trigger } from '@angular/animations';
import { RealEstateAdRentDialogComponent } from '../real-estate-ad-rent-dialog/real-estate-ad-rent-dialog.component';
import { RealEstateAdSellDialogComponent } from '../real-estate-ad-sell-dialog/real-estate-ad-sell-dialog.component';


@Component({
  selector: 'app-real-estates',
  templateUrl: './real-estates.component.html',
  styleUrls: ['./real-estates.component.scss']
})
export class RealEstatesComponent implements OnInit {
  realEstates: RealEstate[] = [];
  displayedColumns = ['idrealestate', 'type', 'city.name', 'adress', 'rooms', 'area', 'floor', 'desc', 'actions', 'ad-rent', 'ad-sell'];
  dataSource: MatTableDataSource<any>;
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  constructor(private api: ApiService, private dialog: MatDialog, private service: RealEstateFormService, 
    private changeDetectorRefs: ChangeDetectorRef, private notif: NotificationsService, private deleteService: DeleteService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.getAll();
    this.searchFilter();
    
  }

  getAll(){
    this.api.getAllRealestates().subscribe(
      res => {
        res.forEach(element => {
          if(element.owner != null){
          if(element.owner.id === JSON.parse(localStorage.getItem("client")).id){
            this.realEstates.push(element);
          }
        }
        });
        this.dataSource.data = this.realEstates;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        this.notif.warn('Real estates could not be loaded');
      }
    );
    }

    create(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.create();
      this.dialog.open(RealEstateDialogComponent, dialogConfig).afterClosed().subscribe(res => {
        this.changeDetectorRefs.detectChanges();
        location.reload();
        // this.sleep(3000).then(() => {
        //   location.reload();
        // });
      }
      );
    }

    update(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.update(row);
      this.dialog.open(RealEstateDialogComponent, dialogConfig).afterClosed().subscribe(
        res => {
          this.changeDetectorRefs.detectChanges();

          // this.sleep(3000).then(
          //   () => {
          //     location.reload();
          //   }
          // );
        }
      );
    }

    delete(row){
      const index = this.realEstates.indexOf(row);
      this.deleteService.message = 'Are you sure you want to delete this real estate?';
      this.openConfigDialog().afterClosed().subscribe(
        res => {
          if(res){
            this.api.deleteRealEstate(row.idrealestate).subscribe(
              () => {
                this.realEstates.splice(index,1);
                this.dataSource.data = this.realEstates;
                this.changeDetectorRefs.detectChanges();
                this.notif.succes('Succesfully deleted real estate');
              }, err => {
                this.notif.warn('Real estate could not be deleted');
              }
            );
          }
        }
      );
      
    }

    view(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.view(row);
      this.dialog.open(RealEstateDialogComponent, dialogConfig);
    }

    newAdRent(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.viewForAd(row);
      this.dialog.open(RealEstateAdRentDialogComponent, dialogConfig).afterClosed().subscribe(
        res => {
          this.changeDetectorRefs.detectChanges();
          location.reload();
        }
      );
    }

    newAdSell(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.service.viewForAd(row);
      this.dialog.open(RealEstateAdSellDialogComponent, dialogConfig).afterClosed().subscribe(
        res => {
          this.changeDetectorRefs.detectChanges();
          location.reload();

        }
      );
    }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchFilter(){
    this.dataSource.filterPredicate = (order: RealEstate, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const listAsFlatString = (obj): string => {
        let returnVal = '';
        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });

        return returnVal.trim().toLowerCase();
      };

      return listAsFlatString(order).includes(transformedFilter);
    };
  }

  openConfigDialog() {
    return this.dialog.open(DeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '5%' },
      disableClose: true
    });
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
      .reduce((object, key) => object[key] || '',item);
    }
    return item[property];
  }

}
